document.addEventListener('DOMContentLoaded', function() {
  let nextBtn = document.querySelector(".next");
  let prevBtn = document.querySelector(".prev");
  let slider = document.querySelector(".slider");
  let sliderItems = document.querySelectorAll(".slider .list .item");
  let thumbnailItems = document.querySelectorAll(".thumbnail .item");
  let progressBar = document.querySelector(".progress-bar");
  let timeElement = document.querySelector(".time");
  
  let currentIndex = 0;
  let intervalId;
  let timeoutId;
  
  // Initialize slider
  function initSlider() {
    sliderItems[currentIndex].classList.add('active');
    thumbnailItems[currentIndex].classList.add('active');
    updateTime();
    startAutoSlide();
  }
  
  // Show slide by index
  function showSlide(index) {
    // Reset all slides
    sliderItems.forEach(item => item.classList.remove('active'));
    thumbnailItems.forEach(item => item.classList.remove('active'));
    
    // Set new index
    currentIndex = (index + sliderItems.length) % sliderItems.length;
    
    // Show current slide
    sliderItems[currentIndex].classList.add('active');
    thumbnailItems[currentIndex].classList.add('active');
    
    // Reset and restart progress bar animation
    progressBar.style.animation = 'none';
    void progressBar.offsetWidth; // Trigger reflow
    progressBar.style.animation = 'progress 5s linear infinite';
    
    // Update time
    updateTime();
    
    // Restart auto slide
    resetAutoSlide();
  }
  
  // Next slide
  function nextSlide() {
    showSlide(currentIndex + 1);
  }
  
  // Previous slide
  function prevSlide() {
    showSlide(currentIndex - 1);
  }
  
  // Update time display
  function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;
  }
  
  // Auto slide
  function startAutoSlide() {
    intervalId = setInterval(nextSlide, 5000);
  }
  
  function resetAutoSlide() {
    clearInterval(intervalId);
    startAutoSlide();
  }
  
  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Thumbnail click
  thumbnailItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      showSlide(index);
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });
  
  // Pause on hover
  slider.addEventListener('mouseenter', () => {
    clearInterval(intervalId);
    progressBar.style.animationPlayState = 'paused';
  });
  
  slider.addEventListener('mouseleave', () => {
    resetAutoSlide();
    progressBar.style.animationPlayState = 'running';
  });
  
  // Initialize
  initSlider();
});