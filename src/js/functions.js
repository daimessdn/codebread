const getCards = () => {
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
        cardContent += addCardContent(contentType, content);
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
    breadTags += `<span class="tag" 
                        style="
                          background-color: ${tc.bgc};
                          color: ${tc.c};
                  ">
                    ${tag}
                  </span>`;
  });

  cardlist.innerHTML += `<div class="slides">
                           ${cards}
                           ${endMsg}
                           <div class="tags">
                             ${breadTags}
                           </div>
                         </div>`;
  });
};

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

const addCardContent = (contentType, content) => {
  switch (contentType) {
    case "text":
      return `<p>${content.content}</p>`;
    case "image":
      return `<img src="${content.content.url}"
                           alt="${content.content.alt}">`;
    case "code":
      return`<pre><code
                              class="${content.lang}"
                            >${content.content}</code><span
                                                            class="copy"
                                                            onclick="
                                                                     copyCode(this.previousElementSibling);
                                                                     this.innerHTML = 'copied!';
                                                            " onmouseleave="this.innerHTML = 'copy'">copy</span></pre>`;
    case "homepage":
      return`<iframe src="${content.url}"
                              style="width: 30%; height: 70%;"></iframe>`;
    case "youtube":
      return`<iframe width="560"
                              height="315"
                              src="${content.url}"
                              frameborder="0"
                              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                              allowfullscreen>
                      </iframe>`;
    default:
      return;
  }

  return cardContent;
};
