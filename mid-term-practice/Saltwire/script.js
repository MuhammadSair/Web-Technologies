const track = document.querySelector('.carousel__track');
const leftButton = document.querySelector('.carousel__button--left');
const rightButton = document.querySelector('.carousel__button--right');

leftButton.addEventListener('click', () => {
  track.scrollBy({ left: -100, behavior: 'smooth' });
});

rightButton.addEventListener('click', () => {
  track.scrollBy({ left: 100, behavior: 'smooth' });
});