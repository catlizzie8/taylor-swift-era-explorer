document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('.Eras > div'); // Directly target the divs inside .Eras
  const fyiSection = document.querySelector('.fyi');
  const links = document.querySelectorAll('header a');

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      // Determine the offset based on the browser width
      let headerHeight = window.innerWidth < 468 ? 150 : 200;
      headerHeight = window.innerWidth < 550 ? 180 : 200;
      const offsetTop = targetElement.offsetTop - headerHeight; // Subtract the appropriate header height

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    });
  });

  const setHeaderColor = (sectionClass) => {
    const colorVariable = getComputedStyle(document.documentElement).getPropertyValue(`--${sectionClass}`);
    header.style.backgroundColor = colorVariable;
  
    if (sectionClass === 'ttpd') {
      header.style.color = 'black';
      header.style.borderBottom = '2px solid black';
      links.forEach(link => link.style.color = 'black');
    } else if (sectionClass === 'folklore' || sectionClass === '_1989') {
      header.style.color = 'black';
      links.forEach(link => link.style.color = 'black');
    } else {
      header.style.color = 'white';
      header.style.borderBottom = 'none';
      links.forEach(link => link.style.color = 'white');
    }
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionClass = Array.from(entry.target.classList).find(cls => cls !== 'album' && cls !== 'Info' && cls !== 'songs' && cls !== 'text');
        setHeaderColor(sectionClass);
      }
    });
  }, { threshold: 0.4 }); // Adjust the threshold as needed

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Set the initial header background color if the .fyi section is visible
  const fyiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setHeaderColor('debut'); // Set to 'debut' color
      }
    });
  }, { threshold: 0.1 });

  fyiObserver.observe(fyiSection);
});
