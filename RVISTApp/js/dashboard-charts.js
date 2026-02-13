/**
 * RVIST Dashboard Charts & Interactions
 * Handles real-time system monitoring visualizations.
 */

document.addEventListener('DOMContentLoaded', () => {
    initSystemChart();
});

// System Load Chart (Chart.js)
let systemChartInstance;

function initSystemChart() {
    const ctx = document.getElementById('systemChart');
    if (!ctx) return;

    // Initial Data
    const initialData = {
        labels: Array.from({ length: 20 }, (_, i) => i),
        datasets: [
            {
                label: 'CPU Load (%)',
                data: Array.from({ length: 20 }, () => Math.floor(Math.random() * 30) + 20),
                borderColor: '#0d6efd', // Primary
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 0
            },
            {
                label: 'Memory Usage (%)',
                data: Array.from({ length: 20 }, () => Math.floor(Math.random() * 20) + 40),
                borderColor: '#198754', // Success
                backgroundColor: 'rgba(25, 135, 84, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 0
            }
        ]
    };

    systemChartInstance = new Chart(ctx, {
        type: 'line',
        data: initialData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 0 }, // Disable animation for smooth real-time effect
            plugins: {
                legend: { display: false },
                tooltip: { 
                    mode: 'index', 
                    intersect: false,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#00ffcc',
                    bodyColor: '#fff'
                }
            },
            scales: {
                x: { display: false },
                y: {
                    min: 0,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: 'rgba(255, 255, 255, 0.5)', font: { size: 10 } }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });

    // Start Real-time Update Loop
    setInterval(updateSystemChart, 1000);
}

function updateSystemChart() {
    if (!systemChartInstance) return;

    // Generate new random data points
    const newCpu = Math.floor(Math.random() * 30) + 20 + (Math.random() > 0.8 ? 15 : 0); // Occasional spike
    const newMem = Math.floor(Math.random() * 10) + 40 + (Math.sin(Date.now() / 1000) * 5); // Sine wave variance based on time

    // Remove oldest
    systemChartInstance.data.datasets[0].data.shift();
    systemChartInstance.data.datasets[1].data.shift();

    // Add newest
    systemChartInstance.data.datasets[0].data.push(newCpu);
    systemChartInstance.data.datasets[1].data.push(newMem);

    systemChartInstance.update('none'); // Update without full re-render
}

// Global System Actions Trigger
window.triggerSystemAction = function(actionType) {
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    
    // Set Loading State
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Executing...`;
    btn.disabled = true;

    // Simulate API Call via App.js Utils if available, or locally
    // Since we are simulating, we just use timeout
    setTimeout(() => {
        // Success State
        btn.innerHTML = `<i class="ph ph-check me-2"></i> Done`;
        btn.classList.remove('btn-outline-danger', 'btn-outline-warning', 'btn-outline-info', 'btn-outline-success');
        btn.classList.add('btn-success');

        // Log to Dashboard Table
        if (window.RVISTUtils && window.RVISTUtils.logActivity) {
            window.RVISTUtils.logActivity(
                new Date().toLocaleTimeString(),
                'ADMIN',
                `Executed Global Action: ${actionType}`,
                'Success'
            );
        }

        // Close Modal after delay
        setTimeout(() => {
            const modalEl = document.getElementById('globalActionModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();

            // Reset Button
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                // Restore classes (simplification: reload page or just leave as success for session)
                // ideally we would store original classes
                 if(actionType === 'LOCKDOWN') btn.classList.add('btn-outline-danger');
                 else if(actionType === 'CACHE_CLEAR') btn.classList.add('btn-outline-warning');
                 else if(actionType === 'SYNC_LMS') btn.classList.add('btn-outline-info');
                 else btn.classList.add('btn-outline-success');
                 btn.classList.remove('btn-success');
            }, 500);
        }, 800);

    }, 1500);
};
