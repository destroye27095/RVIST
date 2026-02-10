const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Helper to read JSON data
const readData = (filename) => {
    try {
        const filePath = path.join(__dirname, '../../data', filename);
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        return [];
    }
};

// --- GET Routes ---

// System Status
router.get('/status', (req, res) => {
    res.json({
        success: true,
        data: {
            status: 'OPERATIONAL',
            uptime: process.uptime(),
            timestamp: new Date()
        }
    });
});

// Students
router.get('/students', (req, res) => {
    const students = readData('students.json');
    res.json({ success: true, count: students.length, data: students });
});

// Staff
router.get('/staff', (req, res) => {
    const staff = readData('staff.json');
    res.json({ success: true, count: staff.length, data: staff });
});

// Courses
router.get('/courses', (req, res) => {
    const courses = readData('courses.json');
    res.json({ success: true, count: courses.length, data: courses });
});

// Analytics - Presence (Simulated)
router.get('/analytics/presence', (req, res) => {
    const students = readData('students.json');
    const staff = readData('staff.json');
    
    // Simulate some randomness for "live" feel
    const variance = Math.floor(Math.random() * 50);
    
    res.json({
        success: true,
        data: {
            totalStudents: students.length + 1200, // Base + actual
            totalCapacity: 3500,
            presentStudents: students.length + 1200 - variance,
            teachersCount: staff.length + 15, // Base + actual
            activeClasses: 42
        }
    });
});

// Announcements
router.get('/announcements', (req, res) => {
    // In a real app we might filter by department here
    const announcements = []; // If you have announcements.json, read it here
    res.json({ success: true, text: "No announcements", data: announcements });
});

// --- POST Routes (Simulations) ---

// Global Action Trigger
router.post('/action', (req, res) => {
    const { action, user } = req.body;
    console.log(`[API] Action triggered: ${action} by ${user}`);
    
    // Simulate processing time
    setTimeout(() => {
        res.json({
            success: true,
            message: `Action '${action}' executed successfully.`
        });
    }, 1500);
});

module.exports = router;
