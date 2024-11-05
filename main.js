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
    const lineClamp = 8; // Number of lines set in line-clamp

    // Function to count the number of lines in the content
    const countLines = (element) => {
      const computedStyle = window.getComputedStyle(element);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const height = parseFloat(computedStyle.height);
      return Math.round(height / lineHeight);
    };

    // Determine if the content exceeds the line-clamp
    const isTruncated = () => {
      const totalLines = countLines(content);
      return totalLines > lineClamp;
    };

    // Show or hide the toggle button based on content length
    if (isTruncated()) {
      button.classList.remove('hidden');
    } else {
      button.classList.add('hidden');
    }
  });

  const toggleButtons = document.querySelectorAll('.toggle-button');

  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const wrapper = button.closest('.abstract-wrapper');
      const content = wrapper.querySelector('.abstract-content');
      
      // Toggle expanded state
      // wrapper.classList.toggle('max-h-60'); // Tailwind's max-height: 13rem (52 * 0.25rem)
      // content.classList.toggle('max-h-48'); // Tailwind's max-height: 13rem (52 * 0.25rem)
      content.classList.toggle('line-clamp-[8]');
      content.classList.toggle('line-clamp-none');

      // Update button text
      const isExpanded = !content.classList.contains('line-clamp-[8]');
      const buttonText = button.querySelector('.button-text')
      buttonText.textContent = isExpanded ? 'Show Less' : 'Show More';
      
      // Update aria-expanded attribute for accessibility
      // button.setAttribute('aria-expanded', isExpanded);
    });
  });
});
