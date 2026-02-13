/**
 * RVISTApp Utility Functions
 * Common helper functions for the application
 */

// Toast Notification System
class ToastNotification {
    constructor() {
        this.createToastContainer();
    }

    createToastContainer() {
        if (document.getElementById('toast-container')) return;
        
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'toast glass-panel';
        
        const colors = {
            success: 'var(--success)',
            error: 'var(--danger)',
            warning: 'var(--accent)',
            info: 'var(--text-light)'
        };

        const icons = {
            success: 'ph-check-circle',
            error: 'ph-warning-circle',
            warning: 'ph-warning',
            info: 'ph-info'
        };

        toast.style.cssText = `
            padding: 1rem 1.5rem;
            min-width: 300px;
            border-left: 4px solid ${colors[type] || colors.info};
            animation: slideIn 0.3s ease-out;
        `;

        toast.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <i class="ph ${icons[type]} fs-1_5rem" style="color: ${colors[type]}"></i>
                <span>${message}</span>
            </div>
        `;

        document.getElementById('toast-container').appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

// Initialize toast system
const toast = new ToastNotification();

// Form Validation Utilities
const FormValidator = {
    email: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    phone: (phone) => {
        const re = /^(\+254|0)[17]\d{8}$/; // Kenyan phone format
        return re.test(phone.replace(/\s/g, ''));
    },

    nationalId: (id) => {
        return /^\d{7,8}$/.test(id);
    },

    password: (password) => {
        return password.length >= 8 && password.length <= 16;
    },

    required: (value) => {
        return value && value.trim().length > 0;
    }
};

// Local Storage Wrapper
const Storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(`rvist_${key}`, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage Error:', e);
            return false;
        }
    },

    get: (key) => {
        try {
            const item = localStorage.getItem(`rvist_${key}`);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Storage Error:', e);
            return null;
        }
    },

    remove: (key) => {
        localStorage.removeItem(`rvist_${key}`);
    },

    clear: () => {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('rvist_'));
        keys.forEach(key => localStorage.removeItem(key));
    }
};

// Modal Manager
class ModalManager {
    static show(title, content, actions = []) {
        const modalId = 'dynamic-modal';
        let modal = document.getElementById(modalId);
        
        if (!modal) {
            modal = document.createElement('div');
            modal.id = modalId;
            modal.className = 'modal fade';
            document.body.appendChild(modal);
        }

        const actionButtons = actions.map(action => 
            `<button type="button" class="btn ${action.class || 'btn-primary'}" 
                onclick="${action.onclick}">${action.label}</button>`
        ).join('');

        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content glass-panel border-white-10">
                    <div class="modal-header border-bottom-white-10">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    <div class="modal-footer border-top-white-10">
                        ${actionButtons}
                        <button type="button" class="btn glass-panel" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `;

        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
        return bootstrapModal;
    }

    static confirm(message, onConfirm) {
        return this.show(
            'Confirm Action',
            `<p>${message}</p>`,
            [{
                label: 'Confirm',
                class: 'btn-primary',
                onclick: `(${onConfirm.toString()})(); bootstrap.Modal.getInstance(document.getElementById('dynamic-modal')).hide();`
            }]
        );
    }
}

// Export utilities
window.RVISTToast = toast;
window.RVISTValidator = FormValidator;
window.RVISTStorage = Storage;
window.RVISTModal = ModalManager;

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('🔧 Utilities loaded successfully');
