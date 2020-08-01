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