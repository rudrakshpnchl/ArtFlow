// Home Page JavaScript for ArtFlow

// User data storage (in real app, this would be in a database)
let users = JSON.parse(localStorage.getItem('artflow_users')) || [];
let currentUser = JSON.parse(localStorage.getItem('artflow_current_user')) || null;

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    if (currentUser) {
        redirectToMain();
    }
});

// Modal functions
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openSignupModal() {
    document.getElementById('signupModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

function switchModal(closeModalId, openModalId) {
    closeModal(closeModalId);
    openModal(openModalId);
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Authentication functions
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('artflow_current_user', JSON.stringify(user));
        showNotification('Login successful!', 'success');
        setTimeout(() => {
            closeModal('loginModal');
            redirectToMain();
        }, 1000);
    } else {
        showNotification('Invalid email or password!', 'error');
    }
}

function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Validation
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters!', 'error');
        return;
    }
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        showNotification('User with this email already exists!', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face&v=${Date.now()}`,
        bio: 'Digital Artist & Designer',
        followers: 0,
        following: 0,
        posts: 0,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('artflow_users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('artflow_current_user', JSON.stringify(newUser));
    
    showNotification('Account created successfully!', 'success');
    setTimeout(() => {
        closeModal('signupModal');
        redirectToMain();
    }, 1000);
}

// Navigation functions
function redirectToMain() {
    window.location.href = 'main.html';
}

function openGallery() {
    showNotification('Gallery feature coming soon!', 'info');
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        backdrop-filter: blur(20px);
        border: 1px solid ${getNotificationBorderColor(type)};
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 300px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success':
            return 'fa-check-circle';
        case 'error':
            return 'fa-exclamation-circle';
        case 'warning':
            return 'fa-exclamation-triangle';
        case 'info':
            return 'fa-info-circle';
        default:
            return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success':
            return 'rgba(34, 197, 94, 0.9)';
        case 'error':
            return 'rgba(239, 68, 68, 0.9)';
        case 'warning':
            return 'rgba(245, 158, 11, 0.9)';
        case 'info':
            return 'rgba(59, 130, 246, 0.9)';
        default:
            return 'rgba(59, 130, 246, 0.9)';
    }
}

function getNotificationBorderColor(type) {
    switch (type) {
        case 'success':
            return 'rgba(34, 197, 94, 0.3)';
        case 'error':
            return 'rgba(239, 68, 68, 0.3)';
        case 'warning':
            return 'rgba(245, 158, 11, 0.3)';
        case 'info':
            return 'rgba(59, 130, 246, 0.3)';
        default:
            return 'rgba(59, 130, 246, 0.3)';
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    
    if (event.target === loginModal) {
        closeModal('loginModal');
    }
    if (event.target === signupModal) {
        closeModal('signupModal');
    }
}

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const loginModal = document.getElementById('loginModal');
        const signupModal = document.getElementById('signupModal');
        
        if (loginModal.style.display === 'block') {
            closeModal('loginModal');
        }
        if (signupModal.style.display === 'block') {
            closeModal('signupModal');
        }
    }
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.1rem;
    }
    
    .notification-content span {
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);
