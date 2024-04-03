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