document.addEventListener('DOMContentLoaded', () => {
    const showProfileFormButton = document.getElementById('showProfileForm');
    const showPostFormButton = document.getElementById('showPostForm');
    const profileForm = document.getElementById('profileForm');
    const postForm = document.getElementById('postForm');
    const saveProfileButton = document.getElementById('saveProfile');
    const savePostButton = document.getElementById('savePost');
    const profileNameInput = document.getElementById('profileName');
    const postContentInput = document.getElementById('postContent');
    const postsContainer = document.getElementById('postsContainer');
    const profileDisplay = document.getElementById('profileDisplay');
  
    function loadProfile() {
      const profileName = localStorage.getItem('profileName');
      if (profileName) {
        profileDisplay.innerHTML = `<div class="profile-info">Profile Name: ${profileName}</div>`;
      }
    }
  
    function loadPosts() {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      postsContainer.innerHTML = '';
      posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
          <p>${post.content}</p>
          <button onclick="likePost(${index})">Like (${post.likes || 0})</button>
          <button onclick="commentOnPost(${index})">Comment</button>
          <div class="comments">${post.comments ? post.comments.map(comment => `<div>${comment}</div>`).join('') : ''}</div>
        `;
        postsContainer.appendChild(postDiv);
      });
    }
  
    window.likePost = (index) => {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      if (!posts[index].likes) posts[index].likes = 0;
      posts[index].likes += 1;
      localStorage.setItem('posts', JSON.stringify(posts));
      loadPosts();
    };
  
    window.commentOnPost = (index) => {
      const comment = prompt('Enter your comment:');
      if (comment) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        if (!posts[index].comments) posts[index].comments = [];
        posts[index].comments.push(comment);
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
      }
    };
  
    showProfileFormButton.addEventListener('click', () => {
      profileForm.classList.toggle('hidden');
      postForm.classList.add('hidden');
    });
  
    showPostFormButton.addEventListener('click', () => {
      postForm.classList.toggle('hidden');
      profileForm.classList.add('hidden');
    });
  
    saveProfileButton.addEventListener('click', () => {
      const profileName = profileNameInput.value.trim();
      if (profileName) {
        localStorage.setItem('profileName', profileName);
        loadProfile();
        profileForm.classList.add('hidden');
      }
    });
  
    savePostButton.addEventListener('click', () => {
      const postContent = postContentInput.value.trim();
      if (postContent) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ content: postContent });
        localStorage.setItem('posts', JSON.stringify(posts));
        postContentInput.value = '';
        loadPosts();
        postForm.classList.add('hidden');
      }
    });
  
    // Initial load
    loadProfile();
    loadPosts();
  });
  
