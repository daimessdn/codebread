const loadCards = document.addEventListener("DOMContentLoaded", () => {
let cardlist = document.getElementById("card-list");

const endMsg = `
  <div id="end-msg">
    <p>Hey, you reach <strong>at the end</strong> of the blog presentation.</p>
    <p>You can press <strong>one more next button</strong> to exit fullscreen, or<br />
       you can see previous slide with one or more <strong>previous button</strong>
    </p>
  </div>
`;

breads.reverse().forEach((bread) => {
  let cards = "";
  let breadTags = "";

  bread.slides.forEach((slide) => {
    let cardSlide = "";
    let cardContent = "";

    if (slide.title !== "") {
      cardContent += `<h3>${slide.title}</h3>`;
    }
    
    slide.contents.forEach((content) => {

      let contentType = content.type;

      switch (contentType) {
        case "text":
          cardContent += `<p>${content.content}</p>`;
          break;
        case "image":
          cardContent += `<img src="${content.content.url}"
                               alt="${content.content.alt}">`;
          break;
        case "code":
          cardContent += `<pre><code class="${content.lang}">${content.content}</code>
                               <span class="copy" onclick="
                                 copyCode(this.previousElementSibling);
                                 this.innerHTML = 'copied!';
                                " onmouseleave="this.innerHTML = 'copy'">copy</span></pre>`;
          break;
        case "homepage":
          cardContent += `<iframe src="${content.url}" style="width: 30%; height: 70%;"></iframe>`;
          break;
        case "youtube":
          cardContent += `<iframe width="560" height="315" src="${content.url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        default:
          break;
      }
    });

    cardSlide += `<div class="cards">${cardContent}</div>`;

    cards += cardSlide;
  });

  bread.tags.forEach((tag) => {
    const tc = getTagColor(tag);
    
    breadTags += `<span class="tag" style="background-color: ${tc.bgc}; color: ${tc.c};">${tag}</span>`;
  });

  cardlist.innerHTML += `<div class="slides">
                           ${cards}
                           ${endMsg}
                           <div class="tags">
                             ${breadTags}
                           </div>
                         </div>`;
  })
});

let currentSlide = 0;

document.addEventListener("keydown", function(event) {    
  if (clicked !== undefined) {
    if (event.key === "ArrowLeft") {  
      slideNext();
      event.altKey;

    } else if (event.key === "ArrowRight") {
      slidePrev();
      event.altKey;

    } else if (event.key === "Escape") {
      if (document.fullscreen === true) {
        currentSlide = 0;
        slideNav(currentSlide);
        event.altKey;

        closeFullscreen(clicked);
      }
    }
    // console.log(currentSlide);
  }
  slideNav(currentSlide);
});

document.addEventListener('click', function(e) {
  let clicked = document.getElementById("clicked");

  e = e || window.event;
  var target = e.target || e.srcElement,
  text = target.textContent || target.innerText;
  
  const cards = document.querySelectorAll(".slides");

  if (target.tagName.toLowerCase() !== "button" &&
      target.className !== "copy") {
    if (clicked) {
      document.body.style.backgroundColor = "#fff";

      cards.forEach((card) =>{
        card.style.opacity = 1;
      });

      currentSlide = 0;
      slideNav(currentSlide);
      clicked.removeAttribute("id");
    }
    document.querySelector(".button").style.display = "none";
  }

  if (target.className === "slides") {
    target.id = "clicked";

    // currentSlide--;
    // slideNav(currentSlide);

    document.querySelector(".button").style.display = "block";
    document.body.style.backgroundColor = "#aaa";
    cards.forEach((card) => {
      if (card.id !== "clicked") {
        card.style.opacity = 0.3;
      }
    });
  } else if (target.className === "cards") {
    target.parentElement.id = "clicked";

    // currentSlide--;
    // slideNav(currentSlide);

    document.querySelector(".button").style.display = "block";
    document.body.style.backgroundColor = "#aaa";

    cards.forEach((card) => {
      if (card.id !== "clicked") {
        card.style.opacity = 0.3;
      }
    });
  } else if (target.parentElement.className === "cards") {
    target.parentElement.parentElement.id = "clicked";
    
    // currentSlide--;
    // slideNav(currentSlide);

    document.querySelector(".button").style.display = "block";
    document.body.style.backgroundColor = "#aaa";
    cards.forEach((card) => {
      if (card.id !== "clicked") {
        card.style.opacity = 0.3;
      }
    });
  }
}, false);

const slideNav = (currentSlide, motion = (document.fullscreen === true ? screen.height : 400)) => {

  let motionHeight = currentSlide * motion;
  let clicked = document.getElementById("clicked").children;

  for (let i = 0; i < clicked.length; i++) {
    clicked[i].style.transform = `translateY(${motionHeight}px)`;
  }
};

const copyCode = (element) => {
  let range = document.createRange();
  range.selectNode(element);
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
};

const openFullscreen = (elem) => {

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }

  slideNav(currentSlide, screen.height); 
};

const closeFullscreen = (elem) => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
  slideNav(currentSlide, 400);
};

const slideNext = () => {
  currentSlide++;

  if (currentSlide > 0) {
    currentSlide = (-1 * (clicked.children.length - 3));
  }
};

const slidePrev = () => {
  currentSlide--;

  if (currentSlide <= (-1 * (clicked.children.length)) + 1) {
    if (document.fullscreen === true) {
      closeFullscreen(clicked);
      currentSlide = 0;
    }

  } else if (currentSlide <= (-1 * (clicked.children.length)) + 2) {
    if (document.fullscreen === false) {
      currentSlide = 0;
    }
  }
};

const getTagColor = (tag) => {
  switch (tag) {
    case "nodejs":
      return {bgc: "#90c741", c: "#fff"};
    case "javascript":
      return {bgc: "#e9d44d", c: "#000"};
    case "mongodb":
      return {bgc: "#12964e", c: "#fff"};
    default:
      return {bgc: "#242424", c: "#fff"};
  }
};