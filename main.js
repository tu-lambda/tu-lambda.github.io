document.addEventListener('DOMContentLoaded', function() {
  const meetupContainer = document.getElementById('meetups-container');
  const scrollLeftBtn = document.getElementById('meetups-scroll-left');
  const scrollRightBtn = document.getElementById('meetups-scroll-right');

  if (scrollLeftBtn && scrollRightBtn && meetupContainer) {
      scrollLeftBtn.addEventListener('click', () => {
          const containerWidth = meetupContainer.clientWidth;
          const scrollAmount = containerWidth * 1.0;
          meetupContainer.scrollBy({
              left: -scrollAmount,
              behavior: 'smooth'
          });
      });

      scrollRightBtn.addEventListener('click', () => {
          const containerWidth = meetupContainer.clientWidth;
          const scrollAmount = containerWidth * 1.0;
          meetupContainer.scrollBy({
              left: scrollAmount,
              behavior: 'smooth'
          });
      });
  } else {
      console.error('One or more required elements are missing from the DOM');
  }
});
