hljs.initHighlightingOnLoad();

document.addEventListener('DOMContentLoaded', (event) => {
  getCards();

  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
});

let currentSlide = 0;

document.addEventListener("keydown", function(event) {    
  if (clicked !== undefined) {
    if (event.key === "ArrowLeft") {  
      slideNext();
    } else if (event.key === "ArrowRight") {
      slidePrev();
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
