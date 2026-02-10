/**
 * RVISTApp Global Logic
 * Handles data fetching, UI updates, and simulated ACID transactions.
 * Author: WAMOTO RAPHAEL
 */

// State Management
const STATE = {
    students: [],
    staff: [],
    courses: [],
    announcements: [],
    projects: [],
    voice: [],
    logs: [],
    user: null
};

const API_CONFIG = {
    baseUrl: 'http://localhost:5000/api/v1', 
    useMock: false // Backend is now active
};

// Simulated ACID Transaction Wrapper
function performTransaction(actionName, operation) {
    const timestamp = new Date().toLocaleTimeString();
    try {
        console.log(`[TRANSACTION START] ${actionName}`);
        const result = operation();
        logActivity(timestamp, "System", actionName, "Success");
        console.log(`[TRANSACTION COMMIT] ${actionName}`);
        return { success: true, result };
    } catch (error) {
        console.error(`[TRANSACTION ROLLBACK] ${actionName}: ${error.message}`);
        logActivity(timestamp, "System", actionName, "Failed");
        return { success: false, error: error.message };
    }
}

// Log Activity to UI
function logActivity(time, user, action, status) {
    STATE.logs.unshift({ time, user, action, status });
    if (STATE.logs.length > 15) STATE.logs.pop(); // Keep only recent 15
    renderLogs();
}

// Render System Logs
function renderLogs() {
    const tbody = document.getElementById('logs-body');
    if (!tbody) return;

    if (STATE.logs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center p-5 text-muted small uppercase ls-1">No operational telemetry captured</td></tr>';
        return;
    }

    tbody.innerHTML = STATE.logs.map(log => `
        <tr class="log-row">
            <td class="x-small text-muted" style="font-family: 'Space Mono', monospace;">${log.time}</td>
            <td><span class="fw-bold small text-white-50">${log.user.toUpperCase()}</span></td>
            <td><span class="small">${log.action}</span></td>
            <td>
                <span class="status-badge ${log.status === 'Success' ? 'status-paid' : 'status-pending'}" style="font-size: 0.6rem; padding: 2px 8px;">
                    ${log.status.toUpperCase()}
                </span>
            </td>
        </tr>
    `).join('');
}

// Data Fetching with Error Handling
async function fetchData(endpoint, stateKey) {
    try {
        let finalEndpoint;
        
        if (!API_CONFIG.useMock && endpoint.startsWith('api/')) {
            finalEndpoint = `${API_CONFIG.baseUrl}/${endpoint.replace('api/', '')}`;
        } else {
            const isSubPage = window.location.pathname.includes('/pages/');
            finalEndpoint = isSubPage ? `../${endpoint}` : endpoint;
        }

        const response = await fetch(finalEndpoint);
        if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch ${finalEndpoint}`);
        
        const result = await response.json();
        const data = result.data || result; // Handle both direct JSON and { success, data } structures
        
        STATE[stateKey] = data;
        return { success: true, data };
    } catch (error) {
        console.warn(`Fallback to local data for ${stateKey} due to:`, error.message);
        // Silently fallback to local if backend fails and we weren't already trying local
        if (!endpoint.startsWith('data/')) {
            return fetchData(`data/${stateKey}.json`, stateKey);
        }
        return { success: false, error: error.message };
    }
}

// Initialize Application
async function initApp() {
    console.log('🚀 Initializing RVIST@2026 Application...');
    
    // Load all data in parallel
    const dataPromises = [
        fetchData('data/students.json', 'students'),
        fetchData('data/staff.json', 'staff'),
        fetchData('data/courses.json', 'courses'),
        fetchData('api/announcements?department=General', 'announcements'),
        fetchData('api/analytics/presence', 'presence'),
        fetchData('data/projects.json', 'projects'),
        fetchData('data/voice.json', 'voice')
    ];

    try {
        const results = await Promise.all(dataPromises);
        const successCount = results.filter(r => r.success).length;
        
        console.log(`✅ Loaded ${successCount}/${results.length} data sources successfully`);
        
        // Update UI elements
        updateDashboardStats();
        renderLogs();
        
        // Log initialization
        logActivity(
            new Date().toLocaleTimeString(), 
            "Kernel", 
            "System Protocols Online", 
            "Success"
        );
        
        // Check authentication
        checkAuthentication();
        
    } catch (error) {
        console.error("❌ Critical initialization error:", error);
        logActivity(
            new Date().toLocaleTimeString(), 
            "Kernel", 
            "Protocol Breach/Failure", 
            "Failed"
        );
    }
}

// Update Dashboard Statistics
function updateDashboardStats() {
    // Student count
    const studentCountEl = document.getElementById('stat-students');
    if (studentCountEl && STATE.students.length > 0) {
        const baseCount = 1200;
        const totalCount = baseCount + STATE.students.length;
        animateValue(studentCountEl, 0, totalCount, 1500);
    }

    // Presence Statistics
    if (STATE.presence) {
        const teachersEl = document.getElementById('teachers-present');
        const studentsPresentEl = document.getElementById('students-present');
        const teachersProg = document.getElementById('teachers-progress');
        const studentsProg = document.getElementById('students-progress');

        if (teachersEl) {
            animateValue(teachersEl, 0, STATE.presence.teachersCount, 1000);
            const staffTotal = STATE.staff.length || 150;
            const tPerc = Math.round((STATE.presence.teachersCount / staffTotal) * 100);
            if (teachersProg) teachersProg.style.width = `${tPerc}%`;
            document.getElementById('teachers-meta').innerText = `${tPerc}% Professional Attendance`;
        }

        if (studentsPresentEl) {
            animateValue(studentsPresentEl, 0, STATE.presence.totalStudents, 1000);
            const capacity = STATE.presence.totalCapacity || 1000;
            const sPerc = Math.round((STATE.presence.totalStudents / capacity) * 100);
            if (studentsProg) studentsProg.style.width = `${sPerc}%`;
            document.getElementById('students-meta').innerText = `${sPerc}% Capacity Utilized`;
        }
    }
}

// Animation Utility for Numbers
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Check Authentication Status
function checkAuthentication() {
    const userRole = localStorage.getItem('rvist_user_role');
    const userEmail = localStorage.getItem('rvist_user_email');
    const currentPath = window.location.pathname;
    
    if (!userRole && !currentPath.includes('login.html')) {
        console.warn('⚠️ User not authenticated, redirecting to login...');
        window.location.href = currentPath.includes('/pages/') ? 'login.html' : 'pages/login.html';
    } else if (userRole) {
        STATE.user = { role: userRole, email: userEmail };
        
        // Role-based UI visibility
        if (userRole === 'student') {
            document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
        }

        // Sync with UI
        const userNameEl = document.getElementById('userName');
        const userRoleEl = document.getElementById('userRole');
        const userAvatarEl = document.getElementById('userAvatar');
        const greeting = document.getElementById('greeting');

        if (userEmail) {
            const userName = userEmail.split('@')[0].split('.')[0].toUpperCase();
            
            if (userNameEl) userNameEl.innerText = `${userName} OFFICE`;
            if (userRoleEl) userRoleEl.innerText = userRole === 'admin' ? 'Administrative Access' : 'Student Access';
            if (userAvatarEl) userAvatarEl.innerText = userName.charAt(0);
            if (greeting && (currentPath.endsWith('index.html') || currentPath === '/')) {
                greeting.innerHTML = `Welcome back, <span class="text-accent">${userName}</span>`;
            }
        }
    }
}

// Export utilities for use in other scripts
window.RVISTUtils = {
    performTransaction,
    logActivity,
    animateValue
};

// Export STATE for access from other scripts
window.RVISTState = STATE;

// Initialize on Load
document.addEventListener('DOMContentLoaded', initApp);

// Log page views
window.addEventListener('load', () => {
    const pageName = document.title || 'Unknown Page';
    logActivity(
        new Date().toLocaleTimeString(),
        STATE.user?.email?.split('@')[0] || 'Guest',
        `Navigated to ${pageName.split('|')[1]?.trim() || pageName}`,
        'Success'
    );
});

console.log('👨‍💻 SECURE CAMPUS ERP KERNEL v3.0.4 | RVIST@2026');
