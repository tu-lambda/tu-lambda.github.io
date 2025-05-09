document.addEventListener('DOMContentLoaded', function() {
  const meetupContainer = document.getElementById('meetups-container');
  const scrollLeftBtn = document.getElementById('meetups-scroll-left');
  const scrollRightBtn = document.getElementById('meetups-scroll-right');

  if (scrollLeftBtn && scrollRightBtn && meetupContainer) {
    const leftmostElemIsShown = () => {
      let { clientWidth, scrollLeft, scrollWidth } = meetupContainer
      scrollLeft = Math.abs(scrollLeft)
      errorMargin = scrollWidth * 0.01

      res = (scrollLeft > scrollWidth - clientWidth - errorMargin)
      return res
    }
    const rightmostElemIsShown = () => {
      let { scrollLeft, scrollWidth } = meetupContainer
      scrollLeft = Math.abs(scrollLeft)
      errorMargin = scrollWidth * 0.01

      res = (scrollLeft < errorMargin)
      return res
    }

    const deactivate = (button) => {
      button.classList.add('opacity-0');
      button.classList.remove('opacity-100', 'hover:cursor-pointer', 'hover:scale-125');
      button.disabled = true;
    }

    const activate = (button) => {
      button.classList.add('opacity-100', 'hover:cursor-pointer', 'hover:scale-125');
      button.classList.remove('opacity-0');
      button.disabled = false;
    }

    // Function to update button visibility
    const updateButtonVisibility = () => {
      // Check if the container is scrolled to the left
      if (leftmostElemIsShown()) {
        deactivate(scrollLeftBtn)
      } else {
        activate(scrollLeftBtn)
      }

      // Check if the container is scrolled to the right
      if (rightmostElemIsShown()) {
        deactivate(scrollRightBtn)
      } else {
        activate(scrollRightBtn)
      }
    };

    // Initial check on page load
    updateButtonVisibility();

    // Scroll Left Button
    scrollLeftBtn.addEventListener('click', () => {
      const containerWidth = meetupContainer.clientWidth;
      meetupContainer.scrollBy({
        left: -containerWidth,
        behavior: 'smooth'
      });
    });

    // Scroll Right Button
    scrollRightBtn.addEventListener('click', () => {
      const containerWidth = meetupContainer.clientWidth;
      meetupContainer.scrollBy({
        left: containerWidth,
        behavior: 'smooth'
      });
    });

    // Update buttons after scrolling
    meetupContainer.addEventListener('scroll', () => {
      // Throttle the updates to improve performance
      clearTimeout(meetupContainer.updateTimer);
      meetupContainer.updateTimer = setTimeout(updateButtonVisibility, 100);
    });

    // Also update on window resize in case the container size changes
    window.addEventListener('resize', updateButtonVisibility);

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
