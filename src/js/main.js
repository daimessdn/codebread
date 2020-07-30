const loadCards = document.addEventListener("DOMContentLoaded", () => {
let cardlist = document.getElementById("card-list");

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
          cardContent += `<pre><code>${content.content}</code>
                               <span class="copy" onclick="
                                 copyCode(this.previousElementSibling);
                                 this.innerHTML = 'copied!';
                                " onmouseleave="this.innerHTML = 'copy'">copy</span></pre>`;
          break;
        default:
          break;
      }
    });

    cardSlide += `<div class="cards">${cardContent}</div>`;

    cards += cardSlide;
  });

  bread.tags.forEach((tag) => {
    let bgc, c;
    switch (tag) {
      case "nodejs":
        bgc = "#90c741"; c = "#fff"; break;
      case "javascript":
        bgc = "#e9d44d"; c = "#000"; break;
      case "mongodb":
        bgc = "#12964e"; c = "#fff"; break;
      default:
        bgc = "#242424"; c = "#fff"; break;
    }
    
    breadTags += `<span class="tag" style="background-color: ${bgc}; color: ${c};">${tag}</span>`;
  });

  cardlist.innerHTML += `<div class="slides">
                           ${cards}
                           <div class="tags">
                             ${breadTags}
                           </div>
                         </div>`;
  })
});

let currentSlide = 0;

document.addEventListener("keydown", function(event) {    
  if (clicked !== undefined) {
    if (event.key == "ArrowLeft") {
      currentSlide++;

      if (currentSlide > 0) {
        currentSlide = (-1 * (clicked.children.length - 2));
      }
    } else if (event.key == "ArrowRight") {
      currentSlide--;

      if (currentSlide <= (-1 * (clicked.children.length - 1))) {
        currentSlide = 0;
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

  // console.log(cards);
  
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

const slideNav = (currentSlide) => {
  let motionHeight = currentSlide * 400;
  let clicked = document.getElementById("clicked").children;

  for (let i = 0; i < clicked.length; i++) {
    clicked[i].style.transform = `translateY(${motionHeight}px)`;
  }
}

const copyCode = (element) => {
  let range = document.createRange();
  range.selectNode(element);
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
}

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}