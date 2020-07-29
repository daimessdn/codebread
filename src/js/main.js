const loadCards = document.addEventListener("DOMContentLoaded", () => {
let cardlist = document.getElementById("card-list");

breads.forEach((bread) => {
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
          cardContent += `<pre><code>${content.content}</code></pre>`;
          break;
        default:
          break;
      }
    });

    cardSlide += `<div class="cards">${cardContent}</div>`;

    cards += cardSlide;
  });

  bread.tags.forEach((tag) => {
    breadTags += `<span class="tag">${tag}</span>`;
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
    } else if (event.key == "ArrowRight") {
      currentSlide--;
    }
  }
  slideNav(currentSlide);
});

document.addEventListener('click', function(e) {
  let clicked = document.getElementById("clicked");
  if (clicked) {
    currentSlide = 0;
    slideNav(currentSlide);
    clicked.removeAttribute("id");
  }

  e = e || window.event;
  var target = e.target || e.srcElement,
  text = target.textContent || target.innerText;

  if (target.className === "slides") {
    target.id = "clicked";
  } else if (target.className === "cards") {
    target.parentElement.id = "clicked";
  } else if (target.parentElement.className === "cards") {
    target.parentElement.parentElement.id = "clicked";
  }
}, false);

const slideNav = (currentSlide) => {
  let motionHeight = currentSlide * 385;
  let clicked = document.getElementById("clicked").children;

  for (let i = 0; i < clicked.length; i++) {
    clicked[i].style.transform = `translateY(${motionHeight}px)`;
  }
}