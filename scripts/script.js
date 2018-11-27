const slideWidth = 1024;
const slider = document.querySelector('.carousel--slider-container');
const wrapper = slider.querySelector('.carousel--slider-wrapper');
const slides = slider.querySelectorAll('.carousel--slide');
const indicators = slider.querySelectorAll('.carousel--slider--indicators a');
const controls = document.querySelector('.carousel--slider--controls');
let isPlaying = true;

let timer;
let resetInterval;
let interval = 3000;
const progress = document.querySelector('.progress');
let resetCounter = 0;
let i = 0;

document.addEventListener('DOMContentLoaded', ($) => {
  controls.querySelector('.previous').addEventListener('click', () => {
    prevSlide();
    resetTimer();
  });
  controls.querySelector('.next').addEventListener('click', () => {
    nextSlide();
    resetTimer();
  });

  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      jumpTo();
      resetTimer();
    });
  });

  // setResetInterval(isPlaying);
  startTimer();
  controls.querySelector('.carousel--slider--control_toggle').addEventListener('change', e => {
    // setResetInterval(e.target.checked);

    const icon = controls.querySelector('i.fa');
    if (e.target.checked) {
      icon.classList.add('fa-pause');
      icon.classList.remove('fa-play');
    } else {
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-play');
    }
  });

  slides.forEach(slide => {
    slide.addEventListener('mouseover', stopTimer);
    slide.addEventListener('mouseleave', startTimer);
  });

});

let adjustWidth = () => {
  i++;
  progress.style.width = `${100 - (100 / (interval / 1000)) * i}%`;
}

const nextSlide = () => {
  const activeBox = slider.querySelector('.carousel--slide .carousel--box-wrapper.active');
  const activeSlide = activeBox.parentElement;
  const next = (activeBox.parentElement.nextElementSibling) ?
    activeBox.parentElement.nextElementSibling.querySelector('.carousel--box-wrapper') :
    slides[0].querySelector('.carousel--box-wrapper');
  const wrapperMargin = parseInt(wrapper.style.marginLeft.replace('px', ''));

  wrapper.style.marginLeft = (activeBox.parentElement.nextElementSibling) ?
    `${wrapperMargin - slideWidth}px` : 0;

  activeBox.classList.remove('active');
  next.classList.add('active');

  const nodes = Array.prototype.slice.call(slides);
  const index = nodes.indexOf(activeSlide) + 1;
  const indicators = document.querySelectorAll('.carousel--slider--indicators li a');
  indicators.forEach(indicator => {
    indicator.classList.remove('active');
  });

  const targetIndicator = (indicators[index]) ? indicators[index] : indicators[0];
  targetIndicator.classList.add('active');
};

const prevSlide = () => {
  const activeBox = slider.querySelector('.carousel--slide .carousel--box-wrapper.active');
  const activeSlide = activeBox.parentElement;
  const prev = (activeBox.parentElement.previousElementSibling) ?
    activeBox.parentElement.previousElementSibling.querySelector('.carousel--box-wrapper') :
    slides[slides.length - 1].querySelector('.carousel--box-wrapper');
  const wrapperMargin = parseInt(wrapper.style.marginLeft.replace('px', ''));

  wrapper.style.marginLeft = (activeBox.parentElement.previousElementSibling) ?
    `${wrapperMargin + slideWidth}px` :
    `${(-1 * (slideWidth * (slides.length - 1)))}px`;

  activeBox.classList.remove('active');
  prev.classList.add('active');

  const nodes = Array.prototype.slice.call(slides);
  const index = nodes.indexOf(activeSlide) - 1;
  const indicators = document.querySelectorAll('.carousel--slider--indicators li a');
  indicators.forEach(indicator => {
    indicator.classList.remove('active');
  });

  const targetIndicator = (indicators[index]) ? indicators[index] : indicators[indicators.length - 1];
  targetIndicator.classList.add('active');
};

const jumpTo = (slide) => {
  slide.preventDefault();
  indicators.forEach(indicator => {
    indicator.classList.remove('active');
  });

  const parentLink = slide.target.closest('a');
  parentLink.classList.add('active');

  const rel = parentLink.getAttribute('rel');
  const index = rel.replace('step', '') - 1;

  slides.forEach(slide => {
    slide.querySelector('.carousel--box-wrapper').classList.remove('active')
  });

  wrapper.style.marginLeft = `${(-1 * index * slideWidth)}px`;
  slides[index].querySelector('.carousel--box-wrapper').classList.add('active');
}

const startTimer = () => {
  resetInterval = setInterval(autoPlay, interval);
  timer = setTimeout(function myTimer() {
    adjustWidth();
    resetCounter++;

    timer = setTimeout(myTimer, 1000);
  }, 1000);
}

const stopTimer = () => {
  console.log('stop!');
  clearTimeout(timer);
  clearInterval(resetInterval);
}

const autoPlay = () => {
  nextSlide();
  resetTimer();
}

// run this function every interval seconds
const resetTimer = () => {
  i = 0;
  progress.style.width = `100%`;

  stopTimer();
  startTimer();
}

const setResetInterval = (isActive) => {
  const slideSpeed = 4500;
  const slidesLength = slides.length;
  let i = 0;

  if (isActive) {
    timer = setInterval(function () {
      // console.log('shift!');

      setTimeout(function () {
        nextSlide();
        // console.log('timeout');
        // insert cycle animation here
      }, 3000);
    }, slideSpeed);
  } else {
    clearInterval(timer);
  }
}

document.addEventListener('keyup', (e) => {
  if (e.defaultPrevented) {
    return;
  }

  // only slide if slider is in viewport;
  let bounding = slider.getBoundingClientRect();
  if (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  ) {
    if (e.keyCode === 37) {
      prevSlide();
      resetTimer();
    } else if (e.keyCode === 39) {
      nextSlide();
      resetTimer();
    }
  } else {
    return;
  }
});