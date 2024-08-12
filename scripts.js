document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('.Eras > div');
  const fyiSection = document.querySelector('.fyi');
  const furtherReadingSection = document.querySelector('.furtherReading');
  const links = document.querySelectorAll('header a');
  const toggleMusicButton = document.getElementById('toggleMusicButton');
  const songTitleElement = document.getElementById('songTitle');
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
    ttpd: document.getElementById('ttpdAudio')
  };
  
  const songTitles = {
    debut: "Picture to Burn",
    fearless: "Love Story (Taylor's Version)",
    speaknow: "Speak Now (Taylor's Version)",
    red: "All Too Well (Taylor's Version)",
    _1989: "Welcome to New York (Taylor's Version)",
    rep: "... Ready for It?",
    lover: "Miss Americana & The Heartbreak Prince",
    folklore: "betty",
    evermore: "champagne problems",
    midnights: "Anti-Hero",
    ttpd: "Fortnight (feat. Post Malone)"
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
      console.log("resetting audio");
    }

    if (audioClips[sectionClass]) {
      currentAudio = audioClips[sectionClass];
      if (musicWanted) { // changes the audio while scrolling
        currentAudio.play();
        toggleMusicButton.textContent = 'Pause Music';
        console.log("changing audio clip");
        songTitleElement.textContent = `Now Playing: ${songTitles[sectionClass]}`;
      }
    } else {
      currentAudio = null;
      songTitleElement.textContent = "Now Playing: ...";
    }
  };

  toggleMusicButton.addEventListener('click', () => {
    if (musicWanted) {
      musicWanted = false;
      toggleMusicButton.textContent = 'Unpause Music';
      if (currentAudio) {
        currentAudio.pause();
        console.log("pausing");
        songTitleElement.textContent = "Now Playing: ...";
      }
    } else {
      musicWanted = true;
      toggleMusicButton.textContent = 'Pause Music';
      console.log("playing");
      if (currentAudio)  { // first starts the audio
        currentAudio.play();
        const sectionClass = Object.keys(audioClips).find(key => audioClips[key] === currentAudio);
        if (sectionClass && songTitles[sectionClass]) {
          songTitleElement.textContent = `Now Playing: ${songTitles[sectionClass]}`;
        }
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
      const headerHeight = window.innerWidth < 468 ? 160 : window.innerWidth < 550 ? 190 : 210;
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
        header.style.backgroundColor = 'green';
        header.style.color = 'white';
        header.style.borderBottom = 'none';
        links.forEach(link => link.style.color = 'white');
        if (musicWanted && currentAudio !== audioClips['debut']) {
          if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0; // Reset audio
          }
          currentAudio = audioClips['debut'];
          currentAudio.play();
          songTitleElement.textContent = `Now Playing: ${songTitles['debut']}`;
        }
      }
    });
  }, { threshold: 0.1 });

  fyiObserver.observe(fyiSection);

  const furtherReadingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        header.style.backgroundColor = 'white';
        header.style.color = 'black';
        header.style.borderBottom = '1px solid black';
        links.forEach(link => link.style.color = 'black');

        if (musicWanted && currentAudio !== audioClips['ttpd']) {
          if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0; // Reset audio
          }
          currentAudio = audioClips['ttpd'];
          currentAudio.play();
          songTitleElement.textContent = `Now Playing: ${songTitles['ttpd']}`;
        }
      }
    });
  }, { threshold: 0.1 });

  furtherReadingObserver.observe(furtherReadingSection);
});
