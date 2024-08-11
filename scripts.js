document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('.Eras > div');
  const fyiSection = document.querySelector('.fyi');
  const links = document.querySelectorAll('header a');
  const toggleMusicButton = document.getElementById('toggleMusicButton');
  const debutAudio = document.getElementById('debut-audio');
  let wantedAudio = ""

  const setHeaderColor = (sectionClass) => {
    const colorVariable = getComputedStyle(document.documentElement).getPropertyValue(`--${sectionClass}`);
    header.style.backgroundColor = colorVariable;
    wantedAudio = sectionClass+"Audio"
    const linkColor = (sectionClass === 'ttpd' || sectionClass === '_1989' || sectionClass === 'folklore') ? 'black' : 'white';
    header.style.color = linkColor;
    header.style.borderBottom = (sectionClass === 'ttpd') ? '2px solid black' : 'none';
    links.forEach(link => link.style.color = linkColor);
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionClass = Array.from(entry.target.classList).find(cls => !['album', 'Info', 'songs', 'text'].includes(cls));
        setHeaderColor(sectionClass);
        if (sectionClass === 'debut') {
          wantedAudio = debutAudio;
        }
      }
    });
  }, { threshold: 0.3 });

  toggleMusicButton.addEventListener('click', () => {
    if (wantedAudio.paused) {
      wantedAudio.play();
      toggleMusicButton.textContent = 'Turn Music Off';
    } else {
      wantedAudio.pause();
      toggleMusicButton.textContent = 'Turn Music On';
    }
  });

  sections.forEach(section => sectionObserver.observe(section));

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      const headerHeight = window.innerWidth < 468 ? 150 : window.innerWidth < 550 ? 180 : 200;
      const offsetTop = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    });
  });

  const fyiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setHeaderColor('debut');
      }
    });
  }, { threshold: 0.1 });
});
