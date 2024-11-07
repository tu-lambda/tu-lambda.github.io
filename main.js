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

document.addEventListener('DOMContentLoaded', () => {
  const abstracts = document.querySelectorAll('.abstract-wrapper');

  abstracts.forEach(abstract => {
    const content = abstract.querySelector('.abstract-content');
    const button = abstract.querySelector('.toggle-button');
    const fadeOverlay = abstract.querySelector('.fade-overlay');


    // Function to determine if the content is truncated
    const isTruncated = () => {
      return content.scrollHeight > content.clientHeight;
    };

    // Show or hide the toggle button and fade overlay based on truncation
    if (isTruncated()) {
      button.classList.remove('hidden');
      fadeOverlay.classList.remove('hidden');
    } else {
      button.classList.add('hidden');
      fadeOverlay.classList.add('hidden');
    }
  });

  const toggleButtons = document.querySelectorAll('.toggle-button');

  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const abstract = button.closest('.abstract-wrapper');
      const content = abstract.querySelector('.abstract-content');
      const fadeOverlay = abstract.querySelector('.fade-overlay');

      // Toggle the line-clamp class
      content.classList.toggle('line-clamp-[8]');

      if (content.classList.contains('line-clamp-[8]')) {
        // If content is clamped, show the fade overlay and set button to "Show More"
        fadeOverlay.classList.remove('hidden');
        button.querySelector('.button-text').textContent = 'Show More';
      } else {
        // If content is expanded, hide the fade overlay and set button to "Show Less"
        fadeOverlay.classList.add('hidden');
        button.querySelector('.button-text').textContent = 'Show Less';
      }
    });
  });

  // Re-evaluate on window resize
  window.addEventListener('resize', () => {
    abstracts.forEach(abstract => {
      const content = abstract.querySelector('.abstract-content');
      const button = abstract.querySelector('.toggle-button');
      const fadeOverlay = abstract.querySelector('.fade-overlay');

      // Reset line-clamp to check truncation accurately
      content.classList.add('line-clamp-[8]');
      fadeOverlay.classList.add('hidden');

      if (content.scrollHeight > content.clientHeight) {
        button.classList.remove('hidden');
        fadeOverlay.classList.remove('hidden');

        // Reset content to clamped state if it was expanded
        if (!content.classList.contains('line-clamp-[8]')) {
          content.classList.add('line-clamp-[8]');
          button.querySelector('.button-text').textContent = 'Show More';
        }
      } else {
        button.classList.add('hidden');
        fadeOverlay.classList.add('hidden');
      }
    });
  });
});
