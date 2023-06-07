export const nextSlide = () => {
  const currentSlide = $('.active');

  currentSlide.removeClass('active');

  let nextSlide = currentSlide.next();

  if (!nextSlide.length) {
    nextSlide = $('.slider__slide:first-child');
  }

  nextSlide.addClass('active');

  const sliderWrapper = $('#sliderWrapper');
  const height = $('.slider__slide').first().outerHeight();
  sliderWrapper.css(
    'transform',
    `translateY(-${height * (nextSlide.data('index') - 1)}px)`
  );
};

export const setFirstSlideActive = () => {
  const firstSlide = $('.slider__slide:first-child');
  firstSlide.addClass('active');
};
