hljs.initHighlightingOnLoad();

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
});

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

  let slideOrder = 1;

  bread.slides.forEach((slide) => {
    let cardSlide = "";
    let cardContent = "";

    if (slide.title !== "") {
      cardContent += `<h3>${slide.title}</h3>`;
    }    

    slide.contents.forEach((content) => {
      let contentType = content.type;
      addCardContent(contentType, content, cardContent);
    });

    cardSlide += `<div class="cards">
                    ${cardContent}
                    <div class="slide-nav">
                      <span class="pages">${slideOrder} / ${bread.slides.length}</span>
                      <span class="ss-btn" onclick="closeFullscreen()">&times;</span>
                    </div>
                  </div>`;

    cards += cardSlide;

    slideOrder++;
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

    } else if (event.key === "ArrowRight") {
      slidePrev();

    } else if (event.key === "Escape") {
      if (document.fullscreen === true) {
        currentSlide = 0;
        slideNav(currentSlide);

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

  if (target.parentElement.className !== "button" &&
      target.className !== "copy" &&
      target.parentElement.className !== "slide-nav") {
    if (clicked) {
      if (target.parentElement !== clicked &&
          target.parentElement.parentElement !== clicked) {
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
