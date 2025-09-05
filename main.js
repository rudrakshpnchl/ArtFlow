// Main JavaScript for ArtFlow Social Media Platform

// Global variables
let currentUser =
  JSON.parse(localStorage.getItem("artflow_current_user")) || null;
let posts = JSON.parse(localStorage.getItem("artflow_posts")) || [];
let users = JSON.parse(localStorage.getItem("artflow_users")) || [];
let currentSection = "feed-section";
let dummyCreators = [];
let profileViewUser = null;
let hiddenPosts =
  JSON.parse(localStorage.getItem("artflow_hidden_posts")) || [];
let notifications =
  JSON.parse(localStorage.getItem("artflow_notifications")) || [];
let threads = JSON.parse(localStorage.getItem("artflow_threads")) || [];

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

  // Set up notifications & inbox
  setupNotificationsAndInbox();
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
      categories: ["Digital Art"],
      likes: 1200,
      comments: 89,
      commentList: [
        {
          id: 1,
          userName: "Alex",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
          text: "Stunning palette!",
        },
        {
          id: 2,
          userName: "Maya",
          avatar:
            "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=40&h=40&fit=crop&crop=face",
          text: "Love the mood.",
        },
      ],
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
      categories: ["Photography"],
      likes: 856,
      comments: 67,
      commentList: [
        {
          id: 1,
          userName: "Jon",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          text: "Lines are crisp!",
        },
      ],
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
      categories: ["Writing", "Digital Art"],
      likes: 2100,
      comments: 134,
      commentList: [
        {
          id: 1,
          userName: "Priya",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
          text: "Flow is beautiful!",
        },
      ],
      shares: 67,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      liked: false,
      saved: false,
    },
    {
      id: 4,
      userId: 4,
      userName: "Aarav Patel",
      userAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      content:
        "Layered synthscape inspired by rainy nights. Looping this for hours. #ambient #synth",
      media:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
      categories: ["Music"],
      likes: 312,
      comments: 12,
      commentList: [],
      shares: 8,
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      liked: false,
      saved: false,
    },
    {
      id: 5,
      userId: 5,
      userName: "Lena Müller",
      userAvatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=40&h=40&fit=crop&crop=face",
      content:
        "Street portraits series continues. Chasing light and candid emotions. #portraits",
      media:
        "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?w=600&h=400&fit=crop",
      categories: ["Photography"],
      likes: 987,
      comments: 45,
      commentList: [],
      shares: 21,
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
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

  posts
    .filter((p) => !hiddenPosts.includes(p.id))
    .forEach((post) => {
      const postElement = createPostElement(post);
      feedPosts.appendChild(postElement);
    });
}

function createPostElement(post) {
  const postElement = document.createElement("article");
  postElement.className = "post";
  postElement.dataset.postId = post.id;
  postElement.id = `post-${post.id}`;

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
      <button class="btn btn-more" onclick="openPostMenu(${post.id}, this)">
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
  // Wire modal close buttons
  document.querySelectorAll(".btn-close-modal").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-close");
      const el = document.getElementById(target);
      if (el) el.style.display = "none";
    });
  });

  // Submit comment
  const submitBtn = document.querySelector(".btn-submit-comment");
  const commentInput = document.querySelector(".comment-input");
  if (submitBtn && commentInput) {
    submitBtn.addEventListener("click", () => {
      const text = commentInput.value.trim();
      if (!text) return;
      const postId = Number(
        document.getElementById("comments-modal")?.dataset.postId
      );
      if (!postId) return;
      addComment(postId, text);
      commentInput.value = "";
    });
    commentInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitBtn.click();
      }
    });
  }

  // Share actions
  const copyBtn = document.querySelector(".btn-share-copy");
  if (copyBtn) {
    copyBtn.addEventListener("click", copyShareLink);
  }
  const nativeShareBtn = document.querySelector(".btn-share-native");
  if (nativeShareBtn) {
    nativeShareBtn.addEventListener("click", nativeShare);
  }
}

function setupNotificationsAndInbox() {
  const bell = document.getElementById("btn-bell");
  const inbox = document.getElementById("btn-inbox");
  const badgeBell = document.getElementById("badge-bell");
  const badgeInbox = document.getElementById("badge-inbox");
  const markAll = document.getElementById("btn-mark-all-read");

  function refreshBadges() {
    const unread = notifications.filter((n) => !n.read).length;
    if (badgeBell) {
      badgeBell.textContent = String(unread);
      badgeBell.style.display = unread ? "inline-block" : "none";
    }
    const unreadMsgs = threads.reduce((sum, t) => sum + (t.unread || 0), 0);
    if (badgeInbox) {
      badgeInbox.textContent = String(unreadMsgs);
      badgeInbox.style.display = unreadMsgs ? "inline-block" : "none";
    }
  }

  function renderNotifications() {
    const list = document.getElementById("notifications-list");
    if (!list) return;
    if (!notifications.length) {
      list.innerHTML = '<div class="no-results">No notifications yet</div>';
      return;
    }
    list.innerHTML = notifications
      .map(
        (n) => `
        <div class="notification-item" style="opacity:${n.read ? 0.7 : 1}">
          <img src="${n.avatar}" alt="${n.from}">
          <div class="text">${n.text}</div>
        </div>`
      )
      .join("");
  }

  bell?.addEventListener("click", () => {
    const modal = document.getElementById("notifications-modal");
    if (modal) {
      renderNotifications();
      modal.style.display = "flex";
    }
  });
  inbox?.addEventListener("click", () => {
    const modal = document.getElementById("inbox-modal");
    if (modal) {
      renderThreads();
      modal.style.display = "flex";
    }
  });
  markAll?.addEventListener("click", () => {
    notifications = notifications.map((n) => ({ ...n, read: true }));
    localStorage.setItem(
      "artflow_notifications",
      JSON.stringify(notifications)
    );
    renderNotifications();
    refreshBadges();
  });

  refreshBadges();
}

function addNotification(type, data) {
  const map = {
    like: (d) => ({
      text: `${d.from} liked your post`,
      avatar: d.avatar,
      from: d.from,
    }),
    comment: (d) => ({
      text: `${d.from} commented: "${d.text}"`,
      avatar: d.avatar,
      from: d.from,
    }),
    share: (d) => ({
      text: `${d.from} shared your post`,
      avatar: d.avatar,
      from: d.from,
    }),
    follow: (d) => ({
      text: `${d.from} started following you`,
      avatar: d.avatar,
      from: d.from,
    }),
  };
  const item = map[type]?.(data);
  if (!item) return;
  notifications.unshift({ id: Date.now(), read: false, ...item });
  localStorage.setItem("artflow_notifications", JSON.stringify(notifications));
  const badge = document.getElementById("badge-bell");
  if (badge) {
    const count = notifications.filter((n) => !n.read).length;
    badge.textContent = String(count);
    badge.style.display = count ? "inline-block" : "none";
  }
}

// Messaging
function ensureThread(withUser) {
  let thread = threads.find((t) => t.with === withUser.name);
  if (!thread) {
    thread = {
      id: Date.now(),
      with: withUser.name,
      avatar: withUser.avatar,
      messages: [],
      unread: 0,
    };
    threads.unshift(thread);
  }
  return thread;
}

function renderThreads() {
  const list = document.getElementById("threads");
  const messagesView = document.getElementById("messages");
  if (!list || !messagesView) return;
  if (!threads.length) {
    list.innerHTML = '<div class="no-results">No messages yet</div>';
    messagesView.innerHTML = "";
    return;
  }
  list.innerHTML = threads
    .map(
      (t, idx) => `
      <div class="thread-item" data-idx="${idx}">
        <img src="${
          t.avatar
        }" style="width:28px;height:28px;border-radius:50%" alt="${t.with}">
        <div style="display:flex;flex-direction:column">
          <span style="color:var(--text-primary);font-weight:600">${
            t.with
          }</span>
          <span style="color:var(--text-secondary);font-size:0.85rem">${
            t.messages[t.messages.length - 1]?.text || ""
          }</span>
        </div>
        ${
          t.unread
            ? `<span class="badge" style="position:static;margin-left:auto">${t.unread}</span>`
            : ""
        }
      </div>`
    )
    .join("");

  list.querySelectorAll(".thread-item").forEach((el) => {
    el.addEventListener("click", () => {
      const idx = Number(el.getAttribute("data-idx"));
      openThread(idx);
    });
  });
}

function openThread(idx) {
  const thread = threads[idx];
  const messagesView = document.getElementById("messages");
  const input = document.getElementById("message-input");
  const sendBtn = document.getElementById("btn-send-message");
  if (!thread || !messagesView || !input || !sendBtn) return;
  thread.unread = 0;
  localStorage.setItem("artflow_threads", JSON.stringify(threads));
  messagesView.innerHTML = thread.messages
    .map(
      (m) =>
        `<div class="message ${m.from === currentUser.name ? "me" : ""}">${
          m.text
        }</div>`
    )
    .join("");
  sendBtn.onclick = () => {
    const text = input.value.trim();
    if (!text) return;
    thread.messages.push({ from: currentUser.name, text, ts: Date.now() });
    localStorage.setItem("artflow_threads", JSON.stringify(threads));
    input.value = "";
    openThread(idx);
  };
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
    searchInput.addEventListener("focus", () =>
      renderLiveResults(searchInput.value)
    );
  }

  // Category cards
  const categoryCards = document.querySelectorAll(".category-card");
  categoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      const category = this.querySelector("span").textContent;
      searchByCategory(category);
    });
  });

  // Back to categories
  const backBtn = document.querySelector(".btn-back-to-categories");
  if (backBtn) {
    backBtn.addEventListener("click", showCategoriesView);
  }

  // Populate dummy creators
  populateDummyCreators();
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
    if (currentUser && post.userId !== currentUser.id) {
      addNotification("like", {
        from: currentUser.name,
        avatar: currentUser.avatar,
        postId,
      });
    }
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

function openPostMenu(postId, trigger) {
  // remove any existing menu
  document.querySelectorAll(".post-menu").forEach((m) => m.remove());

  const post = posts.find((p) => p.id === postId);
  if (!post) return;
  const isOwner = currentUser && post.userId === currentUser.id;

  const menu = document.createElement("div");
  menu.className = "post-menu";
  menu.innerHTML = isOwner
    ? `
      <div class="menu-item" onclick="editPost(${postId})"><i class="fas fa-edit"></i><span>Edit</span></div>
      <div class="menu-item" onclick="archivePost(${postId})"><i class="fas fa-box-archive"></i><span>${
        hiddenPosts.includes(postId) ? "Unarchive" : "Archive"
      }</span></div>
      <div class="menu-item" onclick="deletePost(${postId})" style="color:#ef4444"><i class="fas fa-trash"></i><span>Delete</span></div>
    `
    : `
      <div class="menu-item" onclick="copyShareLinkFromPost(${postId})"><i class="fas fa-link"></i><span>Copy link</span></div>
      <div class="menu-item" onclick="reportPost(${postId})"><i class="fas fa-flag"></i><span>Report</span></div>
      <div class="menu-item" onclick="hidePost(${postId})"><i class="fas fa-eye-slash"></i><span>Not interested</span></div>
    `;

  // position near trigger
  const rect = trigger.getBoundingClientRect();
  menu.style.top = `${rect.bottom + window.scrollY + 8}px`;
  menu.style.left = `${rect.right + window.scrollX - 220}px`;

  document.body.appendChild(menu);

  // close on outside click
  setTimeout(() => {
    document.addEventListener("click", function onDocClick(e) {
      if (!menu.contains(e.target)) {
        menu.remove();
        document.removeEventListener("click", onDocClick);
      }
    });
  }, 10);
}

function editPost(postId) {
  const post = posts.find((p) => p.id === postId);
  if (!post) return;
  // Open post section with content prefilled
  const postNav = document.querySelector('[data-section="post-section"]');
  if (postNav) postNav.click();
  const textarea = document.querySelector(".post-textarea");
  if (textarea) textarea.value = post.content;
  showNotification(
    "Edit mode: update content and publish to add a new version"
  );
}

function archivePost(postId) {
  const index = hiddenPosts.indexOf(postId);
  if (index === -1) hiddenPosts.push(postId);
  else hiddenPosts.splice(index, 1);
  localStorage.setItem("artflow_hidden_posts", JSON.stringify(hiddenPosts));
  renderPosts();
  showNotification(index === -1 ? "Post archived" : "Post unarchived");
}

function deletePost(postId) {
  const post = posts.find((p) => p.id === postId);
  if (!post) return;
  if (!currentUser || post.userId !== currentUser.id) {
    showNotification("You can only delete your own post", "error");
    return;
  }
  posts = posts.filter((p) => p.id !== postId);
  localStorage.setItem("artflow_posts", JSON.stringify(posts));
  renderPosts();
  showNotification("Post deleted");
}

function copyShareLinkFromPost(postId) {
  const link = `${location.origin}${location.pathname}#post-${postId}`;
  navigator.clipboard
    .writeText(link)
    .then(() => showNotification("Link copied"));
}

function reportPost(postId) {
  showNotification("Thanks for your report. We will review it.");
}

function hidePost(postId) {
  if (!hiddenPosts.includes(postId)) {
    hiddenPosts.push(postId);
    localStorage.setItem("artflow_hidden_posts", JSON.stringify(hiddenPosts));
  }
  renderPosts();
  showNotification("We will show you fewer posts like this");
}

function showCommentModal(postId) {
  const modal = document.getElementById("comments-modal");
  if (!modal) return;
  modal.dataset.postId = String(postId);
  renderComments(postId);
  modal.style.display = "flex";
}

function showShareModal(postId) {
  const modal = document.getElementById("share-modal");
  if (!modal) return;
  modal.dataset.postId = String(postId);
  modal.style.display = "flex";
}

function renderComments(postId) {
  const list = document.getElementById("comments-list");
  if (!list) return;
  const post = posts.find((p) => p.id === postId);
  if (!post) return;
  const items = (post.commentList || []).map(
    (c) => `
    <div class="comment-item">
      <img src="${c.avatar}" alt="${c.userName}">
      <div class="comment-bubble">
        <span class="name">${c.userName}</span>
        <span class="text">${c.text}</span>
      </div>
    </div>
  `
  );
  list.innerHTML =
    items.join("") || '<div class="no-results">Be the first to comment</div>';
}

function addComment(postId, text) {
  const post = posts.find((p) => p.id === postId);
  if (!post) return;
  if (!post.commentList) post.commentList = [];
  const newComment = {
    id: Date.now(),
    userName: currentUser?.name || "You",
    avatar: currentUser?.avatar || "https://api.dicebear.com/7.x/identicon/svg",
    text,
  };
  post.commentList.push(newComment);
  post.comments = (post.comments || 0) + 1;
  localStorage.setItem("artflow_posts", JSON.stringify(posts));
  renderComments(postId);
  // Update count in UI
  const postElement = document.querySelector(`[data-post-id="${postId}"]`);
  if (postElement) {
    const btn = postElement.querySelector(".btn-comment span");
    if (btn) btn.textContent = post.comments;
  }
  if (currentUser && post.userId !== currentUser.id) {
    addNotification("comment", {
      from: currentUser.name,
      avatar: currentUser.avatar,
      text,
      postId,
    });
  }
}

function copyShareLink() {
  const modal = document.getElementById("share-modal");
  const postId = Number(modal?.dataset.postId);
  const link = `${location.origin}${location.pathname}#post-${postId}`;
  navigator.clipboard.writeText(link).then(() => {
    showNotification("Link copied to clipboard!");
  });
}

function nativeShare() {
  const modal = document.getElementById("share-modal");
  const postId = Number(modal?.dataset.postId);
  const link = `${location.origin}${location.pathname}#post-${postId}`;
  if (navigator.share) {
    navigator.share({ title: "Check this post", url: link }).catch(() => {});
  } else {
    copyShareLink();
  }
  // Notify share if sharing someone else's post
  const post = posts.find((p) => p.id === postId);
  if (post && currentUser && post.userId !== currentUser.id) {
    addNotification("share", {
      from: currentUser.name,
      avatar: currentUser.avatar,
      postId,
    });
  }
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

  renderLiveResults(query);
}

function searchByCategory(category) {
  const resultsWrapper = document.getElementById("category-results");
  const title = document.getElementById("category-title");
  const ideasList = document.getElementById("ideas-list");
  const postsGrid = document.getElementById("posts-grid");
  const categoriesGrid = document.querySelector(".category-grid");
  const suggestions = document.querySelector(".search-suggestions");

  if (!resultsWrapper || !title || !ideasList || !postsGrid) return;

  title.textContent = category;

  const filtered = posts
    .filter(
      (p) => Array.isArray(p.categories) && p.categories.includes(category)
    )
    .filter((p) => !hiddenPosts.includes(p.id));

  // Ideas are captions for now
  ideasList.innerHTML = "";
  filtered.forEach((p) => {
    const idea = document.createElement("div");
    idea.className = "idea-card";
    idea.innerHTML = `
      <i class="fas fa-lightbulb"></i>
      <div class="idea-content">
        <h4>${p.userName}</h4>
        <p>${p.content}</p>
      </div>
    `;
    ideasList.appendChild(idea);
  });

  // Posts grid
  postsGrid.innerHTML = "";
  filtered.forEach((p) => {
    const item = document.createElement("div");
    item.className = "post-card";
    item.innerHTML = `
      <img src="${p.media}" alt="${category} post">
      <div class="post-card-meta">
        <img src="${p.userAvatar}" class="user-avatar-tiny" alt="${p.userName}">
        <span>${p.userName}</span>
      </div>
    `;
    postsGrid.appendChild(item);
  });

  if (categoriesGrid) categoriesGrid.style.display = "none";
  if (suggestions) suggestions.style.display = "none";
  resultsWrapper.style.display = "block";
}

function showCategoriesView() {
  const resultsWrapper = document.getElementById("category-results");
  const categoriesGrid = document.querySelector(".category-grid");
  const suggestions = document.querySelector(".search-suggestions");
  if (resultsWrapper) resultsWrapper.style.display = "none";
  if (categoriesGrid) categoriesGrid.style.display = "grid";
  if (suggestions) suggestions.style.display = "block";
}

function populateDummyCreators() {
  const creatorList = document.getElementById("creator-list");
  if (!creatorList) return;
  dummyCreators = [
    { name: "Aarav Patel", tag: "@aarav.art" },
    { name: "Lena Müller", tag: "@lenam" },
    { name: "Noah Williams", tag: "@noahdraws" },
    { name: "Sofia Rossi", tag: "@rossishots" },
    { name: "Yuki Tanaka", tag: "@yuki.wav" },
    { name: "Kwame Mensah", tag: "@kwamelines" },
  ];
  creatorList.innerHTML = dummyCreators
    .map(
      (c) => `
      <li class="creator-item" data-name="${c.name}">
        ${
          c.avatar
            ? `<img src="${
                c.avatar
              }" style="width:20px;height:20px;border-radius:50%" onerror="this.onerror=null;this.src='https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                c.name
              )}'">`
            : '<i class="fas fa-user-circle"></i>'
        }
        <span class="creator-name">${c.name}</span>
        <span class="creator-tag">${c.tag}</span>
      </li>`
    )
    .join("");

  // Make suggested creators clickable
  creatorList.querySelectorAll(".creator-item").forEach((el) => {
    el.addEventListener("click", () => {
      const name = el.getAttribute("data-name");
      openProfileByName(name);
    });
  });
}

function renderLiveResults(query) {
  const dropdown = document.getElementById("search-live-results");
  if (!dropdown) return;

  const q = (query || "").toLowerCase().trim();
  if (q.length < 1) {
    dropdown.style.display = "none";
    dropdown.innerHTML = "";
    return;
  }

  // creators
  const matchedCreators = dummyCreators
    .filter(
      (c) => c.name.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q)
    )
    .slice(0, 5);

  // categories from category cards
  const categories = ["Digital Art", "Photography", "Music", "Writing"];
  const matchedCategories = categories
    .filter((c) => c.toLowerCase().includes(q))
    .slice(0, 4);

  // posts by caption/author
  const matchedPosts = posts
    .filter(
      (p) =>
        p.content.toLowerCase().includes(q) ||
        p.userName.toLowerCase().includes(q) ||
        (Array.isArray(p.categories) &&
          p.categories.join(" ").toLowerCase().includes(q))
    )
    .filter((p) => !hiddenPosts.includes(p.id))
    .slice(0, 4);

  // build html
  let html = "";
  if (matchedCreators.length) {
    html += `<div class="search-group-title">Creators</div>`;
    html += matchedCreators
      .map(
        (c) => `
        <div class="search-item" data-type="creator" data-name="${c.name}">
          <img src="${
            c.avatar ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
              c.name
            )}`
          }" alt="${
          c.name
        }" onerror="this.onerror=null;this.src='https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
          c.name
        )}'">
          <div class="meta">
            <span class="primary">${c.name}</span>
            <span class="secondary">${c.tag}</span>
          </div>
        </div>`
      )
      .join("");
  }

  if (matchedCategories.length) {
    html += `<div class="search-group-title">Categories</div>`;
    html += matchedCategories
      .map(
        (c) => `
        <div class="search-item" data-type="category" data-category="${c}">
          <img src="https://img.icons8.com/?size=80&id=84710&format=png" alt="${c}">
          <div class="meta">
            <span class="primary">${c}</span>
            <span class="secondary">Browse posts</span>
          </div>
        </div>`
      )
      .join("");
  }

  if (matchedPosts.length) {
    html += `<div class="search-group-title">Posts</div>`;
    html += matchedPosts
      .map(
        (p) => `
        <div class="search-item" data-type="post" data-post-id="${p.id}">
          <img src="${p.userAvatar}" alt="${p.userName}">
          <div class="meta">
            <span class="primary">${p.userName}</span>
            <span class="secondary">${p.content.substring(0, 60)}${
          p.content.length > 60 ? "..." : ""
        }</span>
          </div>
        </div>`
      )
      .join("");
  }

  if (
    !matchedCreators.length &&
    !matchedCategories.length &&
    !matchedPosts.length
  ) {
    html = `<div class="search-group-title">No results</div>`;
  }

  dropdown.innerHTML = html;
  dropdown.style.display = "block";

  // attach click handlers
  dropdown.querySelectorAll(".search-item").forEach((el) => {
    el.addEventListener("click", () => {
      const type = el.getAttribute("data-type");
      if (type === "category") {
        const cat = el.getAttribute("data-category");
        searchByCategory(cat);
      } else if (type === "creator") {
        const name = el.getAttribute("data-name");
        openProfileByName(name);
      } else if (type === "post") {
        const id = Number(el.getAttribute("data-post-id"));
        const target = document.querySelector(`[data-post-id="${id}"]`);
        if (target) {
          const feedItem = document.querySelector(
            '[data-section="feed-section"]'
          );
          if (feedItem) feedItem.click();
          setTimeout(
            () => target.scrollIntoView({ behavior: "smooth", block: "start" }),
            100
          );
        }
      }
      dropdown.style.display = "none";
    });
  });
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
  if (!currentUser && !profileViewUser) return;

  const user = profileViewUser || currentUser;

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

  if (profileAvatar) profileAvatar.src = user.avatar;
  if (profileName) profileName.textContent = user.name;
  if (profileBio) profileBio.textContent = user.bio || "";
  if (followersCount) followersCount.textContent = user.followers || 0;
  if (followingCount) followingCount.textContent = user.following || 0;
  if (postsCount) postsCount.textContent = user.posts || 0;

  // Add Follow and Message buttons dynamically if viewing others
  const actions = document.querySelector(".profile-actions");
  if (actions) {
    actions.innerHTML = "";
    if (
      profileViewUser &&
      (!currentUser || profileViewUser.id !== currentUser.id)
    ) {
      const followBtn = document.createElement("button");
      followBtn.className = "btn btn-edit-profile";
      followBtn.textContent = "Follow";
      followBtn.onclick = () => {
        addNotification("follow", {
          from: currentUser.name,
          avatar: currentUser.avatar,
        });
        showNotification(`You followed ${profileViewUser.name}`);
        followBtn.textContent = "Following";
      };
      const msgBtn = document.createElement("button");
      msgBtn.className = "btn btn-settings";
      msgBtn.innerHTML = '<i class="fas fa-envelope"></i>';
      msgBtn.onclick = () => {
        const t = ensureThread({
          name: profileViewUser.name,
          avatar: profileViewUser.avatar,
        });
        localStorage.setItem("artflow_threads", JSON.stringify(threads));
        const inboxBtn = document.getElementById("btn-inbox");
        if (inboxBtn) inboxBtn.click();
        renderThreads();
      };
      actions.appendChild(followBtn);
      actions.appendChild(msgBtn);
    } else {
      const editBtn = document.createElement("button");
      editBtn.className = "btn btn-edit-profile";
      editBtn.textContent = "Edit Profile";
      editBtn.onclick = editProfile;
      const settingsBtn = document.createElement("button");
      settingsBtn.className = "btn btn-settings";
      settingsBtn.innerHTML = '<i class="fas fa-cog"></i>';
      settingsBtn.onclick = openSettings;
      actions.appendChild(editBtn);
      actions.appendChild(settingsBtn);
    }
  }
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
  profileViewUser = null;
  updateProfileSection();
  const profileItem = document.querySelector(
    '[data-section="profile-section"]'
  );
  profileItem.click();
}

function openProfileByName(name) {
  const postUser = posts.find((p) => p.userName === name);
  if (postUser) {
    profileViewUser = {
      id: postUser.userId,
      name: postUser.userName,
      avatar: postUser.userAvatar,
      bio: `Artist • ${postUser.categories?.join(", ") || "Creator"}`,
      followers: Math.max(100, Math.floor(Math.random() * 5000)),
      following: Math.max(50, Math.floor(Math.random() * 1000)),
      posts: posts.filter((p) => p.userId === postUser.userId).length,
    };
  } else {
    const dc = dummyCreators.find((d) => d.name === name) || { name };
    profileViewUser = {
      id: Date.now(),
      name: dc.name,
      avatar:
        dc.avatar ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
          dc.name
        )}`,
      bio: "Creator",
      followers: Math.max(100, Math.floor(Math.random() * 5000)),
      following: Math.max(50, Math.floor(Math.random() * 1000)),
      posts: 0,
    };
  }
  const profileNav = document.querySelector('[data-section="profile-section"]');
  if (profileNav) {
    profileNav.click();
    setTimeout(updateProfileSection, 50);
  }
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
  openProfileByName(userName);
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
