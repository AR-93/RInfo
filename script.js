document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('header nav');

    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when a navigation link is clicked
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            nav.classList.remove('active');
        });
    });
});






// Utility to set a cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    console.log(`Cookie set: ${name}=${value}`);
  }
  
  // Utility to get a cookie value
  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
      const [key, val] = cookie.split('=');
      if (key === name) return decodeURIComponent(val);
    }
    return null;
  }
  
  // Function to handle view increment when thumbnail is clicked
  function incrementViews(thumbnailElement) {
    const articleElement = thumbnailElement.closest('article'); // Find the closest article
    const articleId = articleElement.dataset.articleId; // Get the article ID from data-article-id
    const viewsKey = `views_${articleId}`;
  
    let currentViews = parseInt(getCookie(viewsKey), 10) || 0;
    currentViews += 1;
    setCookie(viewsKey, currentViews, 7); // Save updated views count in cookies
  
    const viewsIcon = articleElement.querySelector('[data-action="views"]');
    if (viewsIcon) {
      viewsIcon.textContent = currentViews; // Update the displayed views count
    }
  }
  
  // Attach event listeners to all thumbnails (images) for tracking views
  document.querySelectorAll('article img').forEach((thumbnail) => {
    // Ensure the thumbnail has a closest article with the correct data-article-id
    const articleElement = thumbnail.closest('article');
    const articleId = articleElement?.dataset.articleId;
  
    if (!articleId) {
      console.error('Article does not have a data-article-id:', articleElement);
      return;
    }
  
    // Add click listener to the thumbnail image to increment views
    thumbnail.addEventListener('click', () => incrementViews(thumbnail));
  
    // Attach other actions (like comments, likes, shares) to the icons
    articleElement.querySelectorAll('.icon').forEach((icon) => {
      const action = icon.getAttribute('data-action');
      
      if (action === 'comments') {
        icon.addEventListener('click', () => addComment(articleElement));
      } else {
        // Standard counter logic for likes, shares
        const countersKey = `${action}_${articleId}`;
        let currentCount = parseInt(getCookie(countersKey), 10) || 0;
        icon.textContent = currentCount;
  
        icon.addEventListener('click', () => {
          currentCount += 1;
          icon.textContent = currentCount;
          setCookie(countersKey, currentCount, 7); // Save updated counter to cookies
        });
      }
    });
  });
  
  