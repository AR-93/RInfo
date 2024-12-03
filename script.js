document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const nav = document.querySelector("header nav");

  hamburgerMenu.addEventListener("click", function () {
    hamburgerMenu.classList.toggle("active");
    nav.classList.toggle("active");
  });

  
  const navLinks = document.querySelectorAll("header nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburgerMenu.classList.remove("active");
      nav.classList.remove("active");
    });
  });
});

// set a cookie
function setCookie(name, value, days) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
  console.log(`Cookie set: ${name}=${value}`);
}


function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, val] = cookie.split("=");
    if (key === name) return decodeURIComponent(val);
  }
  return null;
}


function incrementViews(thumbnailElement) {
  const articleElement = thumbnailElement.closest("article"); 
  const articleId = articleElement.dataset.articleId; 
  const viewsKey = `views_${articleId}`;

  let currentViews = parseInt(getCookie(viewsKey), 10) || 0;
  currentViews += 1;
  setCookie(viewsKey, currentViews, 7); 

  const viewsIcon = articleElement.querySelector('[data-action="views"]');
  if (viewsIcon) {
    viewsIcon.textContent = currentViews; 
  }
}

function addComment(articleElement) {
  const userComment = prompt("Enter your comment:");
  if (userComment) {
    const articleId = articleElement.dataset.articleId;
    const commentsKey = `comments_${articleId}`;
    const existingComments = getCookie(commentsKey) || "";
    const updatedComments = existingComments
      ? `${existingComments}||${userComment}`
      : userComment;
    setCookie(commentsKey, updatedComments, 7); 
  }
}


document.querySelectorAll("article img").forEach((thumbnail) => {

  const articleElement = thumbnail.closest("article");
  const articleId = articleElement?.dataset.articleId;

  if (!articleId) {
    console.error("Article does not have a data-article-id:", articleElement);
    return;
  }

 
  thumbnail.addEventListener("click", () => incrementViews(thumbnail));

 
  articleElement.querySelectorAll(".icon").forEach((icon) => {
    const action = icon.getAttribute("data-action");

    if (action === "comments") {
      icon.addEventListener("click", () => addComment(articleElement));
    } else {

      const countersKey = `${action}_${articleId}`;
      let currentCount = parseInt(getCookie(countersKey), 10) || 0;
      icon.textContent = currentCount;

      icon.addEventListener("click", () => {
        currentCount += 1;
        icon.textContent = currentCount;
        setCookie(countersKey, currentCount, 7);
      });
    }
  });
});

const swiper = new Swiper(".swiper", {
  loop: true,
  autoplay: {
    delay: 3000, 
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
