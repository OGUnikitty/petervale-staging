document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.querySelector(".hamburger");
  const navBar = document.querySelector(".navbar");

  hamburger.addEventListener("click", function() {
      navBar.classList.toggle("active");
      document.body.classList.toggle("overflow_hidden");
  });
});

//SLIDER LOGIC

animateSlider("service__list")

function animateSlider(ulClassName) {
    const ul = document.querySelector('.' + ulClassName);
    const li = ul.querySelector('li');
    const liWidth = li.offsetWidth;
  
    const liCount = ul.getElementsByTagName('li').length;
    console.log(liCount);
  
    // Set custom property (optional)
    ul.style.setProperty('--liCount', liCount);
    ul.style.setProperty('--liWidth', `-${liWidth}px`);

    //duplucate all <li> children
    for (let i = 0; i < liCount; i++) {
      const originalLi = ul.children[i]; // Get the original li in order
      const newLi = originalLi.cloneNode(true); // Clone with child nodes
      ul.appendChild(newLi);
    }
    //native js animation (possible to be worked on)
    // ul.animate([
    //   { transform: 'translateX(0)' },
    //   { transform: 'translateX(-100%)' }
    // ], {
    //   duration: 5000, // 5 seconds
    //   iterations: Infinity,
    //   easing: 'linear'
    // });
  }


//Adjust slogan size 
adjustFontSize(slogan_banner)
function adjustFontSize(childElement) {
  const parentContainer = childElement.parentElement;
  const availableWidth = parentContainer.offsetWidth;

  // Calculate desired font size based on available width (adjust divisor as needed)
  const desiredFontSize = availableWidth / 10;

  // Set the calculated font size as a custom property on the child element
  childElement.style.setProperty('--font-size', `${desiredFontSize}px`);
}