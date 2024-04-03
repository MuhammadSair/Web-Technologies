// Get all images
let images = document.querySelectorAll('img');

// Get the first item in the main menu
let firstMenuItem = document.querySelector('.menu-item');

// Add a mouseover event listener to each image
images.forEach(image => {
  image.addEventListener('mouseover', function() {
    // Set the text content of the first menu item to the alt attribute of the image
    firstMenuItem.textContent = this.alt;
  });
});
// Get the slider and the scroll button
let slider = document.querySelector('.slider');
let scrollButton = document.querySelector('#scrollButton');

// Add a click event listener to the scroll button
scrollButton.addEventListener('click', function() {
  // Scroll the slider to the right by 100px
  slider.scrollLeft += 100;
});