// Main JavaScript for ArtFlow Social Media Platform

// Global variables
let currentUser =
  JSON.parse(localStorage.getItem("artflow_current_user")) || null;
let posts = JSON.parse(localStorage.getItem("artflow_posts")) || [];
let users = JSON.parse(localStorage.getItem("artflow_users")) || [];
let currentSection = "feed-section";

// Initialize the app
document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in
  if (!currentUser) {
    window.location.href = "index.html";
    return;
  }

  // Initialize the app
  initializeApp();

  // Load user data
  loadUserData();

  // Load posts
  loadPosts();
});

function initializeApp() {
  // Set up navigation
  setupNavigation();

  // Set up interactive elements
  setupInteractiveElements();

  // Set up post interactions
  setupPostInteractions();

  // Set up file upload
  setupFileUpload();

  // Set up search functionality
  setupSearchFunctionality();

  // Set up profile functionality
  setupProfileFunctionality();
}

function loadUserData() {
  // Update user avatar in top nav
  const userAvatar = document.querySelector(".user-avatar img");
  if (userAvatar && currentUser) {
    userAvatar.src = currentUser.avatar;
  }

  // Update profile section
  updateProfileSection();
}

function loadPosts() {
  // If no posts exist, create some sample posts
  if (posts.length === 0) {
    createSamplePosts();
  }

  // Render posts
  renderPosts();
}

function createSamplePosts() {
  const samplePosts = [
    {
      id: 1,
      userId: 1,
      userName: "Sarah Chen",
      userAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      content:
        "Just finished this digital painting! The sunset colors were so inspiring today 🌅 #digitalart #sunset #creativity",
      media:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      likes: 1200,
      comments: 89,
      shares: 45,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      liked: false,
      saved: false,
    },
    {
      id: 2,
      userId: 2,
      userName: "Mike Rodriguez",
      userAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      content:
        "New photography series: Urban Architecture 📸 Exploring the geometric patterns in city life #photography #architecture #urban",
      media:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
      likes: 856,
      comments: 67,
      shares: 23,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      liked: false,
      saved: false,
    },
    {
      id: 3,
      userId: 3,
      userName: "Emma Thompson",
      userAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      content:
        "Working on a new watercolor piece. The colors are flowing beautifully today! 🎨 #watercolor #art #painting",
      media:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop",
      likes: 2100,
      comments: 134,
      shares: 67,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      liked: false,
      saved: false,
    },
  ];

  posts = samplePosts;
  localStorage.setItem("artflow_posts", JSON.stringify(posts));
}

function renderPosts() {
  const feedPosts = document.querySelector(".feed-posts");
  if (!feedPosts) return;

  feedPosts.innerHTML = "";

  posts.forEach((post) => {
    const postElement = createPostElement(post);
    feedPosts.appendChild(postElement);
  });
}

function createPostElement(post) {
  const postElement = document.createElement("article");
  postElement.className = "post";
  postElement.dataset.postId = post.id;

  const timeAgo = getTimeAgo(post.timestamp);

  postElement.innerHTML = `
    <div class="post-header">
      <div class="post-user">
        <img src="${post.userAvatar}" alt="User" class="user-avatar-small">
        <div class="user-info">
          <h4>${post.userName}</h4>
          <span class="post-time">${timeAgo}</span>
        </div>
      </div>
      <button class="btn btn-more">
        <i class="fas fa-ellipsis-h"></i>
      </button>
    </div>
    <div class="post-content">
      <p class="post-caption">${post.content}</p>
      <div class="post-media">
        <img src="${post.media}" alt="Post Media">
      </div>
    </div>
    <div class="post-actions">
      <button class="btn btn-like ${
        post.liked ? "active" : ""
      }" onclick="toggleLike(${post.id})">
        <i class="fas fa-heart"></i>
        <span>${post.likes}</span>
      </button>
      <button class="btn btn-comment" onclick="showCommentModal(${post.id})">
        <i class="fas fa-comment"></i>
        <span>${post.comments}</span>
      </button>
      <button class="btn btn-share" onclick="showShareModal(${post.id})">
        <i class="fas fa-share"></i>
        <span>Share</span>
      </button>
      <button class="btn btn-save ${
        post.saved ? "active" : ""
      }" onclick="toggleSave(${post.id})">
        <i class="fas fa-bookmark"></i>
      </button>
    </div>
  `;

  return postElement;
}

function getTimeAgo(timestamp) {
  const now = new Date();
  const postTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now - postTime) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
}

function setupNavigation() {
  const dockItems = document.querySelectorAll(".dock-item");
  const sections = document.querySelectorAll('section[id$="-section"]');

  dockItems.forEach((item) => {
    item.addEventListener("click", function () {
      const targetSection = this.getAttribute("data-section");

      // Remove active class from all dock items
      dockItems.forEach((dockItem) => dockItem.classList.remove("active"));

      // Add active class to clicked item
      this.classList.add("active");

      // Hide all sections
      sections.forEach((section) => {
        section.style.display = "none";
      });

      // Show target section
      const targetElement = document.getElementById(targetSection);
      if (targetElement) {
        targetElement.style.display = "block";
        currentSection = targetSection;

        // Add smooth transition
        targetElement.style.opacity = "0";
        targetElement.style.transform = "translateY(20px)";

        setTimeout(() => {
          targetElement.style.transition = "all 0.3s ease";
          targetElement.style.opacity = "1";
          targetElement.style.transform = "translateY(0)";
        }, 10);
      }
    });
  });
}

function setupInteractiveElements() {
  // Story interactions
  const storyItems = document.querySelectorAll(".story-item");
  storyItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (this.classList.contains("add-story")) {
        openStoryCreation();
      } else {
        viewStory(this);
      }
    });
  });

  // Close button for post creation
  const closeButton = document.querySelector(".btn-close");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      const postSection = document.getElementById("post-section");
      postSection.style.display = "none";

      // Reset to feed
      const feedItem = document.querySelector('[data-section="feed-section"]');
      feedItem.click();
    });
  }

  // Logout functionality
  const userAvatar = document.querySelector(".user-avatar");
  if (userAvatar) {
    userAvatar.addEventListener("click", showUserMenu);
  }
}

function setupPostInteractions() {
  // These will be handled by onclick functions in the post elements
}

function setupFileUpload() {
  const uploadArea = document.querySelector(".upload-area");
  const fileInput = document.querySelector(".file-input");

  if (uploadArea && fileInput) {
    // Click to upload
    uploadArea.addEventListener("click", function () {
      fileInput.click();
    });

    // Drag and drop
    uploadArea.addEventListener("dragover", function (e) {
      e.preventDefault();
      this.style.borderColor = "#3b82f6";
      this.style.background = "rgba(59, 130, 246, 0.1)";
    });

    uploadArea.addEventListener("dragleave", function (e) {
      e.preventDefault();
      this.style.borderColor = "#3b82f6";
      this.style.background = "";
    });

    uploadArea.addEventListener("drop", function (e) {
      e.preventDefault();
      this.style.borderColor = "#3b82f6";
      this.style.background = "";

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    });

    // File input change
    fileInput.addEventListener("change", function (e) {
      if (this.files.length > 0) {
        handleFileUpload(this.files[0]);
      }
    });
  }

  // Publish button
  const publishButton = document.querySelector(".btn-publish");
  if (publishButton) {
    publishButton.addEventListener("click", publishPost);
  }
}

function setupSearchFunctionality() {
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }

  // Category cards
  const categoryCards = document.querySelectorAll(".category-card");
  categoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      const category = this.querySelector("span").textContent;
      searchByCategory(category);
    });
  });
}

function setupProfileFunctionality() {
  // Edit profile button
  const editProfileBtn = document.querySelector(".btn-edit-profile");
  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", editProfile);
  }

  // Settings button
  const settingsBtn = document.querySelector(".btn-settings");
  if (settingsBtn) {
    settingsBtn.addEventListener("click", openSettings);
  }
}

// Post interaction functions
function toggleLike(postId) {
  const post = posts.find((p) => p.id === postId);
  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;

  // Update localStorage
  localStorage.setItem("artflow_posts", JSON.stringify(posts));

  // Update UI
  const postElement = document.querySelector(`[data-post-id="${postId}"]`);
  const likeButton = postElement.querySelector(".btn-like");
  const likeCount = likeButton.querySelector("span");
  const likeIcon = likeButton.querySelector("i");

  likeButton.classList.toggle("active", post.liked);
  likeCount.textContent = post.likes;

  if (post.liked) {
    likeIcon.style.color = "#ef4444";
    likeIcon.style.animation = "heartBeat 0.3s ease";
  } else {
    likeIcon.style.color = "";
    likeIcon.style.animation = "";
  }
}

function toggleSave(postId) {
  const post = posts.find((p) => p.id === postId);
  if (!post) return;

  post.saved = !post.saved;

  // Update localStorage
  localStorage.setItem("artflow_posts", JSON.stringify(posts));

  // Update UI
  const postElement = document.querySelector(`[data-post-id="${postId}"]`);
  const saveButton = postElement.querySelector(".btn-save");
  const saveIcon = saveButton.querySelector("i");

  saveButton.classList.toggle("active", post.saved);

  if (post.saved) {
    saveIcon.style.color = "#f59e0b";
    showNotification("Post saved to collection!");
  } else {
    saveIcon.style.color = "";
    showNotification("Post removed from collection!");
  }
}

function showCommentModal(postId) {
  showNotification("Comment feature coming soon!");
}

function showShareModal(postId) {
  showNotification("Share feature coming soon!");
}

// File upload functions
function handleFileUpload(file) {
  // Validate file type
  const validTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "video/mp4",
    "video/webm",
  ];

  if (!validTypes.includes(file.type)) {
    showNotification("Please select a valid image or video file!", "error");
    return;
  }

  // Validate file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    showNotification("File size should be less than 10MB!", "error");
    return;
  }

  // Preview file
  const reader = new FileReader();
  reader.onload = function (e) {
    const uploadArea = document.querySelector(".upload-area");
    uploadArea.innerHTML = `
            <img src="${e.target.result}" style="max-width: 100%; max-height: 300px; border-radius: 8px;" alt="Preview">
            <p style="margin-top: 1rem; color: #9ca3af;">File uploaded successfully!</p>
        `;
    showNotification("File uploaded successfully!");
  };
  reader.readAsDataURL(file);
}

function publishPost() {
  const textarea = document.querySelector(".post-textarea");
  const uploadArea = document.querySelector(".upload-area");
  const content = textarea.value.trim();
  const media = uploadArea.querySelector("img")?.src;

  if (!content && !media) {
    showNotification("Please add some content or media to your post!", "error");
    return;
  }

  const newPost = {
    id: Date.now(),
    userId: currentUser.id,
    userName: currentUser.name,
    userAvatar: currentUser.avatar,
    content: content,
    media: media || null,
    likes: 0,
    comments: 0,
    shares: 0,
    timestamp: new Date().toISOString(),
    liked: false,
    saved: false,
  };

  posts.unshift(newPost);
  localStorage.setItem("artflow_posts", JSON.stringify(posts));

  // Reset form
  textarea.value = "";
  uploadArea.innerHTML = `
    <i class="fas fa-cloud-upload-alt"></i>
    <p>Drag and drop your media here or click to browse</p>
    <input type="file" accept="image/*,video/*" class="file-input">
  `;

  showNotification("Post published successfully!");

  // Switch to feed and refresh
  const feedItem = document.querySelector('[data-section="feed-section"]');
  feedItem.click();

  // Re-render posts
  setTimeout(() => {
    renderPosts();
  }, 100);
}

// Search functions
function handleSearch(event) {
  const query = event.target.value.toLowerCase();

  if (query.length < 2) {
    // Show all posts
    renderPosts();
    return;
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(query) ||
      post.userName.toLowerCase().includes(query)
  );

  renderFilteredPosts(filteredPosts);
}

function searchByCategory(category) {
  showNotification(`Searching for ${category} content...`);
  // In a real app, this would filter by category tags
}

function renderFilteredPosts(filteredPosts) {
  const feedPosts = document.querySelector(".feed-posts");
  if (!feedPosts) return;

  feedPosts.innerHTML = "";

  if (filteredPosts.length === 0) {
    feedPosts.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>No results found</h3>
        <p>Try searching with different keywords</p>
      </div>
    `;
    return;
  }

  filteredPosts.forEach((post) => {
    const postElement = createPostElement(post);
    feedPosts.appendChild(postElement);
  });
}

// Profile functions
function updateProfileSection() {
  if (!currentUser) return;

  const profileAvatar = document.querySelector(".profile-avatar img");
  const profileName = document.querySelector(".profile-info h2");
  const profileBio = document.querySelector(".profile-info p");
  const followersCount = document.querySelector(
    ".stat:nth-child(1) .stat-number"
  );
  const followingCount = document.querySelector(
    ".stat:nth-child(2) .stat-number"
  );
  const postsCount = document.querySelector(".stat:nth-child(3) .stat-number");

  if (profileAvatar) profileAvatar.src = currentUser.avatar;
  if (profileName) profileName.textContent = currentUser.name;
  if (profileBio) profileBio.textContent = currentUser.bio;
  if (followersCount) followersCount.textContent = currentUser.followers;
  if (followingCount) followingCount.textContent = currentUser.following;
  if (postsCount) postsCount.textContent = currentUser.posts;
}

function editProfile() {
  showNotification("Profile editing feature coming soon!");
}

function openSettings() {
  showNotification("Settings feature coming soon!");
}

function showUserMenu() {
  const menu = document.createElement("div");
  menu.className = "user-menu";
  menu.innerHTML = `
    <div class="menu-item" onclick="viewProfile()">
      <i class="fas fa-user"></i>
      <span>View Profile</span>
    </div>
    <div class="menu-item" onclick="openSettings()">
      <i class="fas fa-cog"></i>
      <span>Settings</span>
    </div>
    <div class="menu-item" onclick="logout()">
      <i class="fas fa-sign-out-alt"></i>
      <span>Logout</span>
    </div>
  `;

  menu.style.cssText = `
    position: absolute;
    top: 60px;
    right: 20px;
    background: var(--secondary-black);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 0.5rem;
    z-index: 1000;
    min-width: 150px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  `;

  document.body.appendChild(menu);

  // Remove menu when clicking outside
  setTimeout(() => {
    document.addEventListener("click", function removeMenu(e) {
      if (
        !menu.contains(e.target) &&
        !document.querySelector(".user-avatar").contains(e.target)
      ) {
        menu.remove();
        document.removeEventListener("click", removeMenu);
      }
    });
  }, 10);
}

function viewProfile() {
  const profileItem = document.querySelector(
    '[data-section="profile-section"]'
  );
  profileItem.click();
}

function logout() {
  localStorage.removeItem("artflow_current_user");
  window.location.href = "index.html";
}

// Story functions
function openStoryCreation() {
  showNotification("Story creation feature coming soon!");
}

function viewStory(storyElement) {
  const userName = storyElement.querySelector("span").textContent;
  showNotification(`Viewing ${userName}'s story...`);
}

// Notification system
function showNotification(message, type = "success") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${
              type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
            }"></i>
            <span>${message}</span>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${
          type === "success"
            ? "rgba(34, 197, 94, 0.9)"
            : "rgba(239, 68, 68, 0.9)"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        backdrop-filter: blur(20px);
        border: 1px solid ${
          type === "success"
            ? "rgba(34, 197, 94, 0.3)"
            : "rgba(239, 68, 68, 0.3)"
        };
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
    notification.style.transform = "translateX(0)";
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Add CSS animations and styles
const style = document.createElement("style");
style.textContent = `
    @keyframes heartBeat {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.1rem;
    }
    
    .user-menu {
        animation: slideDown 0.2s ease;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .menu-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.2s ease;
        color: var(--text-primary);
    }
    
    .menu-item:hover {
        background: var(--glass-bg);
    }
    
    .menu-item i {
        width: 16px;
        color: var(--text-secondary);
    }
    
    .no-results {
        text-align: center;
        padding: 3rem 1rem;
        color: var(--text-secondary);
    }
    
    .no-results i {
        font-size: 3rem;
        margin-bottom: 1rem;
        opacity: 0.5;
    }
    
    .no-results h3 {
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }
`;
document.head.appendChild(style);

// Smooth scrolling for main content
const mainContent = document.querySelector(".main-content");
if (mainContent) {
  mainContent.style.scrollBehavior = "smooth";
}

// Add loading animation for posts
function addLoadingAnimation() {
  const posts = document.querySelectorAll(".post");
  posts.forEach((post, index) => {
    post.style.opacity = "0";
    post.style.transform = "translateY(20px)";

    setTimeout(() => {
      post.style.transition = "all 0.5s ease";
      post.style.opacity = "1";
      post.style.transform = "translateY(0)";
    }, index * 200);
  });
}

// Initialize loading animation
setTimeout(addLoadingAnimation, 500);
