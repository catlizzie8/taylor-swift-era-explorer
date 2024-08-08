document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('.Eras > div'); // Directly target the divs inside .Eras

  const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const sectionClass = Array.from(entry.target.classList).find(cls => cls !== 'album' && cls !== 'Info' && cls !== 'songs' && cls !== 'text');
              const colorVariable = getComputedStyle(document.documentElement).getPropertyValue(`--${sectionClass}`);
              header.style.backgroundColor = colorVariable;

              if (sectionClass === 'ttpd') {
                  header.style.color = 'black';
                  header.style.borderBottom = '2px solid black';
              } else {
                  if (sectionClass === '_1989' || sectionClass === 'folklore') {
                    header.style.color = 'black';
                  } else {
                  header.style.color = 'white';
                  header.style.borderBottom = 'none';}
              }
          }
      });
  }, { threshold: 0.4 }); // Adjust the threshold as needed

  sections.forEach(section => {
      sectionObserver.observe(section);
  });
});