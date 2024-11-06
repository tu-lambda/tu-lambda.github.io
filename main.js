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

    // Function to determine if the content is truncated
    const isTruncated = () => {
      return content.scrollHeight > content.clientHeight;
    };

    // Show or hide the toggle button based on truncation
    if (isTruncated()) {
      button.classList.remove('hidden');
    } else {
      button.classList.add('hidden');
    }
  });

  const toggleButtons = document.querySelectorAll('.toggle-button');

  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const abstract = button.closest('.abstract-wrapper');
      const content = abstract.querySelector('.abstract-content');

      // Toggle the line-clamp class
      content.classList.toggle('line-clamp-[10]');

      // Update button text based on the new state
      const isExpanded = !content.classList.contains('line-clamp-[10]');
      const buttonText = button.querySelector('.button-text');
      buttonText.textContent = isExpanded ? 'Show Less' : 'Show More';
    });
  });

  // Re-evaluate button visibility on window resize for responsiveness
  window.addEventListener('resize', () => {
    abstracts.forEach(abstract => {
      const content = abstract.querySelector('.abstract-content');
      const button = abstract.querySelector('.toggle-button');

      // Reset line-clamp to accurately measure
      content.classList.add('line-clamp-[10]');
      // content.classList.remove('line-clamp-none'); // Ensure no conflicting classes

      // Determine truncation
      if (content.scrollHeight > content.clientHeight) {
        button.classList.remove('hidden');
      } else {
        button.classList.add('hidden');
      }

      // If content is not truncated, ensure it is not expanded
      if (!content.classList.contains('line-clamp-[10]') && !button.classList.contains('hidden')) {
        content.classList.add('line-clamp-[10]');
        button.querySelector('.button-text').textContent = 'Show More';
      }
    });
  });
});
