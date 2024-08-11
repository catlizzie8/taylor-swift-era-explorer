document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('.Eras > div');
  const fyiSection = document.querySelector('.fyi');
  const links = document.querySelectorAll('header a');
  const toggleMusicButton = document.getElementById('toggleMusicButton');
  const audioClips = {
    debut: document.getElementById('debutAudio'),
    fearless: document.getElementById('fearlessAudio'),
    speaknow: document.getElementById('speakNowAudio'),
    red: document.getElementById('redAudio'),
    _1989: document.getElementById('_1989Audio'),
    rep: document.getElementById('repAudio'),
    lover: document.getElementById('loverAudio'),
    folklore: document.getElementById('folkloreAudio'),
    evermore: document.getElementById('evermoreAudio'),
    midnights: document.getElementById('midnightsAudio'),
    ttpd: document.getElementById("ttpdAudio")
  };
  let currentAudio = null;
  let musicWanted = false;

  const setHeaderColor = (sectionClass) => {
    const colorVariable = getComputedStyle(document.documentElement).getPropertyValue(`--${sectionClass}`);
    header.style.backgroundColor = colorVariable;
    const linkColor = (sectionClass === 'ttpd' || sectionClass === '_1989' || sectionClass === 'folklore') ? 'black' : 'white';
    header.style.color = linkColor;
    header.style.borderBottom = (sectionClass === 'ttpd') ? '2px solid black' : 'none';
    links.forEach(link => link.style.color = linkColor);

    if (audioClips[sectionClass] !== currentAudio && currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0; // Reset audio
      toggleMusicButton.textContent = 'Turn Music On';
    }

    if (audioClips[sectionClass]) {
      currentAudio = audioClips[sectionClass];
      if (musicWanted) {
        currentAudio.play();
        toggleMusicButton.textContent = 'Pause Music';
      }
    } else {
      currentAudio = null;
    }
  };

  toggleMusicButton.addEventListener('click', () => {
    if (musicWanted) {
      musicWanted = false;
      toggleMusicButton.textContent = 'Unpause Music';
      if (currentAudio) {
        currentAudio.pause();
      }
    } else {
      musicWanted = true;
      toggleMusicButton.textContent = 'Pause Music';
      if (currentAudio) {
        currentAudio.play();
      } else if (currentAudio === null && document.querySelector('.fyi').getBoundingClientRect().top < window.innerHeight) {
        // Play debutAudio if in fyi section
        currentAudio = audioClips['debut'];
        currentAudio.play();
      }
    }
  });


  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let sectionClass = Array.from(entry.target.classList).find(cls => !['album', 'Info', 'songs', 'text'].includes(cls));
        setHeaderColor(sectionClass);
      }
    });
  }, { threshold: 0.3 });

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
        setHeaderColor('debut'); // Set to 'debut' color
        if (musicWanted) {
          if (currentAudio && currentAudio !== audioClips['debut']) {
            currentAudio.pause();
            currentAudio.currentTime = 0; // Reset audio
          }
          currentAudio = audioClips['debut'];
          currentAudio.play();
        }
      }
    });
  }, { threshold: 0.1 });

  fyiObserver.observe(fyiSection);
});
