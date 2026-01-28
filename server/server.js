const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Path to data files (syncing with frontend data for now)
const DATA_PATH = path.join(__dirname, '../RVISTApp/data');

// Utility to read data
const readData = (filename) => {
    const filePath = path.join(DATA_PATH, `${filename}.json`);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Utility to write data
const writeData = (filename, data) => {
    const filePath = path.join(DATA_PATH, `${filename}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
};

/**
 * AUTO-INCREMENT & EMAIL GENERATION LOGIC
 */
app.post('/api/v1/students/register', (req, res) => {
    try {
        const students = readData('students');
        const newStudent = req.body;

        // Auto-increment ID
        const lastId = students.length > 0 ? students[students.length - 1].id : 0;
        newStudent.id = lastId + 1;
        newStudent.name = `${newStudent.firstName} ${newStudent.surname}`;

        // Auto-generate Admission Number if not provided
        const year = new Date().getFullYear();
        if (!newStudent.admissionNo) {
            const numericPart = String(newStudent.id).padStart(3, '0');
            newStudent.admissionNo = `RVNP/${year}/${numericPart}`;
        }
        
        // Clean numeric version for email (removing slashes etc)
        const cleanAdmission = (newStudent.admissionNo || "").replace(/[^0-9]/g, '');

        // Auto-generate Student Email: surname + admission_number + @students.rvnp.ac.ke
        const surname = (newStudent.surname || 'student').toLowerCase();
        newStudent.email = `${surname}${cleanAdmission}@students.rvnp.ac.ke`;

        // Timestamp
        newStudent.createdAt = new Date().toISOString();
        newStudent.expectedCompletion = new Date(new Date().setFullYear(new Date().getFullYear() + 3)).toISOString();

        students.push(newStudent);
        writeData('students', students);

        res.status(201).json({
            success: true,
            message: "Student profile initialized successfully",
            data: newStudent
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * AUTHENTICATION (PHONE-BASED)
 */
app.post('/api/v1/auth/login', (req, res) => {
    const { phone, password } = req.body;
    const students = readData('students');

    const student = students.find(s => s.phone === phone && s.password === password);

    if (student) {
        res.json({
            success: true,
            user: {
                id: student.id,
                name: student.name,
                email: student.email,
                role: 'student',
                department: student.department
            }
        });
    } else {
        res.status(401).json({ success: false, message: "Invalid phone number or password" });
    }
});

/**
 * DEPARTMENTAL ANNOUNCEMENTS (Fixed Partitioning)
 */
app.get('/api/v1/announcements', (req, res) => {
    const { department } = req.query;
    try {
        const announcements = readData('announcements');
        
        // Strictly filter: ALL OR exact Department match
        const filtered = announcements.filter(a => {
            const target = (a.target || a.department || '').toUpperCase();
            return target === 'ALL' || target === 'GENERAL' || target === department.toUpperCase();
        });

        res.json({
            success: true,
            data: filtered
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * ACADEMIC COLLABORATION (Messaging/Calls)
 */
app.post('/api/v1/collaboration/message', (req, res) => {
    const { senderId, receiverId, message, type } = req.body;
    // In a production system, this would be written to a Message DB
    res.json({
        success: true,
        data: {
            id: uuidv4(),
            timestamp: new Date().toISOString(),
            status: "Delivered via Academic Secure Layer"
        }
    });
});

/**
 * @section Finance & Settlements
 * Handles fee payments and automated receipt generation
 */
app.post('/api/v1/finance/settle', (req, res) => {
    try {
        const { admissionNo, amount, method, studentEmail, studentName } = req.body;
        const fees = readData('fees');
        const students = readData('students');

        // Generate Transaction Reference (Alpha-Numeric)
        const txnId = 'RVNP' + Math.random().toString(36).substring(2, 10).toUpperCase();

        const newSettlement = {
            id: txnId,
            studentId: admissionNo,
            studentName: studentName || "Unknown Student",
            amount: parseFloat(amount),
            date: new Date().toISOString(),
            method: method || "M-Pesa Express",
            status: "Completed"
        };

        // Update Fees Ledger
        fees.unshift(newSettlement);
        writeData('fees', fees);

        // Update Student Balance (if student exists)
        const studentIndex = students.findIndex(s => s.admissionNo === admissionNo || s.email === studentEmail);
        if (studentIndex !== -1) {
            students[studentIndex].feePaid = (students[studentIndex].feePaid || 0) + parseFloat(amount);
            students[studentIndex].feeBalance = Math.max(0, (students[studentIndex].feeTotal || 0) - students[studentIndex].feePaid);
            writeData('students', students);
        }

        // Construct Institutional Receipt (for simulated dispatch)
        const disclaimer = `Disclaimer: This message and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you are not the named addressee, you should not disseminate, distribute, or copy this e-mail.\n\nIf you have received this e-mail by mistake, please notify the sender by immediately replying to this email and delete it from your system. Email transmission cannot be guaranteed to be secure or error-free.`;
        
        const receiptEmail = {
            to: studentEmail || "student@rvnp.ac.ke",
            cc: ["finance@rvnp.ac.ke", "principal@rvnp.ac.ke"],
            subject: `Payment Confirmation: ${txnId}`,
            body: `Greetings ${studentName || 'Student'},\n\nWe have received your payment of KES ${amount} with reference number ${txnId}. Check your financial statement in the student portal for more details.\n\nThis is an automated email. Do not reply. Should you have any queries or need clarification, please write to finance@rvnp.ac.ke.\n\n${disclaimer}`
        };

        res.status(201).json({
            success: true,
            data: newSettlement,
            receipt: receiptEmail
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 RVIST Backend Kernel running on port ${PORT}`);
    console.log(`📁 Data linked to: ${DATA_PATH}`);
});
