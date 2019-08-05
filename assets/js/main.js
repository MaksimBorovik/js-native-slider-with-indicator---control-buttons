let slider = document.querySelectorAll('.slider-item');

let currentSliderItem = 0;
let sliderInterval = setInterval(nextSlide, 3000);

let playing = true;
let pausePlayButton = document.querySelector('#pause-play');
let nextButton = document.querySelector('#next');
let previousButton = document.querySelector('#previous');

let sliderPanel = document.querySelector('.slider-panel');
let indContainer = document.querySelector('.slider-panel__navigation');
let indItem = document.querySelectorAll('.indicator');

sliderPanel.style.display = 'flex';

pausePlayButton.addEventListener('click', () => {
    if (playing) pauseSlideShow();
    else playSlideShow();
});

nextButton.addEventListener('click', () => {
    pauseSlideShow();
    nextSlide();
});

previousButton.addEventListener('click', () => {
    pauseSlideShow();
    prevSlide();
});

indContainer.addEventListener('click', (event) => {
    let target = event.target;

    if (target.classList.contains("indicator")) {
        pauseSlideShow();
        goToSlide(+target.getAttribute("data-slide-to"));
    }
});

//---------------------------------------------------------------------
document.addEventListener('keydown', keyNavigation);

function keyNavigation(event) {

    if (event.code === 'ArrowLeft') { //стрелка влево
        pauseSlideShow();
        prevSlide();
    }
    if (event.code === 'ArrowRight') { //стрелка вправо
        pauseSlideShow();
        nextSlide();
    }
    if (event.code === 'Space') { //пробел
        if (playing) pauseSlideShow();
        else playSlideShow();
    }
}

//---------------------------------------------------------------------

function nextSlide() {
    goToSlide(currentSliderItem + 1);
}

function prevSlide() {
    goToSlide(currentSliderItem - 1);
}

function goToSlide(n) {
    slider[currentSliderItem].className = 'slider-item';
    indItem[currentSliderItem].classList.toggle('active');
    indItem[currentSliderItem].className = 'far fa-circle indicator';

    currentSliderItem = (slider.length + n) % slider.length;

    slider[currentSliderItem].className = 'slider-item active';
    indItem[currentSliderItem].classList.toggle('active');
    indItem[currentSliderItem].className = 'fas fa-circle indicator';
}

function pauseSlideShow() {
    pausePlayButton.className = 'far fa-play-circle';
    playing = false;
    clearInterval(sliderInterval);
}

function playSlideShow() {
    pausePlayButton.className = 'far fa-pause-circle';
    playing = true;
    sliderInterval = setInterval(nextSlide, 3000);
}