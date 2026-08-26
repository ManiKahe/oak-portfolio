// ============================================================================
// INITIALIZATION & SETUP
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeroInteraction();
  initProjectVisuals();
  initMusicPlayer();
  initAboutInteraction();
  initScrollObserver();
  initPointerTracking();
});

// ============================================================================
// NAVIGATION - Active State on Scroll
// ============================================================================

let currentSection = 'hero';

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  // Click handlers
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Update active state on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        currentSection = entry.target.id;
        updateActiveNavLink(entry.target.id);
      }
    });
  }, {
    threshold: 0.3
  });

  sections.forEach(section => observer.observe(section));
}

function updateActiveNavLink(sectionId) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('data-section') === sectionId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ============================================================================
// HERO SECTION - Pointer Tracking & SVG Interaction
// ============================================================================

function initHeroInteraction() {
  const heroSvg = document.querySelector('.hero-svg');
  const orbitalSystem = document.querySelector('.orbital-system');

  // Mouse/touch tracking for subtle geometric shifts
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Subtle shift based on mouse position
    if (orbitalSystem) {
      const offsetX = (x - 0.5) * 20;
      const offsetY = (y - 0.5) * 20;
      orbitalSystem.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }
  });

  // Touch support
  document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const x = touch.clientX / window.innerWidth;
    const y = touch.clientY / window.innerHeight;

    if (orbitalSystem) {
      const offsetX = (x - 0.5) * 15;
      const offsetY = (y - 0.5) * 15;
      orbitalSystem.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }
  });
}

// ============================================================================
// PROJECT VISUALS - Interactive Geometry
// ============================================================================

function initProjectVisuals() {
  const projects = document.querySelectorAll('.lab-project');

  projects.forEach(project => {
    const svg = project.querySelector('svg');
    const projectNum = project.getAttribute('data-project');

    if (projectNum === '01') {
      initN7Visual(project, svg);
    } else if (projectNum === '02') {
      initExp02Visual(project, svg);
    }
  });
}

function initN7Visual(project, svg) {
  const dots = svg.querySelectorAll('.n7-dot');

  // Mouse tracking
  project.addEventListener('mousemove', (e) => {
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Move dots subtly toward pointer
    dots.forEach((dot, index) => {
      const offsetX = (x - centerX) * 0.15;
      const offsetY = (y - centerY) * 0.15;
      
      dot.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });

  // Touch support
  project.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const rect = svg.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    dots.forEach((dot) => {
      const offsetX = (x - centerX) * 0.1;
      const offsetY = (y - centerY) * 0.1;
      
      dot.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });

  // Reset on mouse leave
  project.addEventListener('mouseleave', () => {
    dots.forEach(dot => {
      dot.style.transform = 'translate(0, 0)';
    });
  });
}

function initExp02Visual(project, svg) {
  const floatRects = svg.querySelectorAll('.float-rect');
  const dots = svg.querySelectorAll('.exp02-dot');

  project.addEventListener('mousemove', (e) => {
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const distX = (x - centerX) * 0.1;
    const distY = (y - centerY) * 0.1;

    // Move elements
    floatRects.forEach((element, index) => {
      const multiplier = 0.5 + index * 0.3;
      element.style.transform = `translate(${distX * multiplier}px, ${distY * multiplier}px)`;
    });

    dots.forEach((dot) => {
      dot.style.transform = `translate(${distX * 0.2}px, ${distY * 0.2}px)`;
    });
  });

  // Touch support
  project.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const rect = svg.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const distX = (x - centerX) * 0.08;
    const distY = (y - centerY) * 0.08;

    floatRects.forEach((element, index) => {
      const multiplier = 0.5 + index * 0.2;
      element.style.transform = `translate(${distX * multiplier}px, ${distY * multiplier}px)`;
    });
  });

  // Reset on leave
  project.addEventListener('mouseleave', () => {
    floatRects.forEach(element => {
      element.style.transform = 'translate(0, 0)';
    });
    dots.forEach(dot => {
      dot.style.transform = 'translate(0, 0)';
    });
  });
}

// ============================================================================
// MUSIC PLAYER - Playback & Waveform Animation
// ============================================================================

function initMusicPlayer() {
  const playBtn = document.getElementById('playBtn');
  const playIcon = playBtn.querySelector('.play-icon');
  const pauseIcon = playBtn.querySelector('.pause-icon');
  const playhead = document.querySelector('.playhead');
  const waveformContainer = document.querySelector('.waveform-container');
  const timeCurrentEl = document.querySelector('.time-current');
  const timeDurationEl = document.querySelector('.time-duration');

  // Song configuration
  const duration = 263; // 4:23 in seconds
  let currentTime = 0;
  let isPlaying = false;
  let playbackInterval = null;

  // Play/Pause toggle
  playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'inline';
      startPlayback();
    } else {
      playIcon.style.display = 'inline';
      pauseIcon.style.display = 'none';
      stopPlayback();
    }
  });

  function startPlayback() {
    playbackInterval = setInterval(() => {
      currentTime += 0.1;
      if (currentTime >= duration) {
        currentTime = duration;
        isPlaying = false;
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        clearInterval(playbackInterval);
      }
      updatePlayhead();
    }, 100);
  }

  function stopPlayback() {
    if (playbackInterval) {
      clearInterval(playbackInterval);
    }
  }

  function updatePlayhead() {
    const percentage = (currentTime / duration) * 100;
    const waveformWidth = waveformContainer.offsetWidth;
    const newX = (percentage / 100) * waveformWidth;

    playhead.setAttribute('x1', newX);
    playhead.setAttribute('x2', newX);

    // Update time display
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    timeCurrentEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Waveform animation
  animateWaveform();
}

function animateWaveform() {
  const waveformLine = document.querySelector('.waveform-line');
  if (!waveformLine) return;

  const originalPoints = "0,100 20,95 40,85 60,75 80,85 100,90 120,85 140,70 160,60 180,70 200,85 220,90 240,95 260,100 280,105 300,115 320,125 340,130 360,125 380,115 400,105 420,100 440,95 460,90 480,95 500,105 520,120 540,135 560,140 580,135 600,120 620,105 640,95 660,90 680,95 700,105 720,115 740,120 760,115 780,105 800,100 820,95 840,90 860,95 880,105 900,115 920,120 940,115 960,105 980,100 1000,100";
  
  let time = 0;

  setInterval(() => {
    time += 0.02;
    const points = originalPoints.split(' ').map((point, i) => {
      const [x, y] = point.split(',').map(Number);
      const wave = Math.sin((x / 100) + time) * 5;
      const newY = y + wave;
      return `${x},${newY}`;
    }).join(' ');

    waveformLine.setAttribute('points', points);
  }, 50);
}

// ============================================================================
// ABOUT SECTION - Text Interaction
// ============================================================================

function initAboutInteraction() {
  const roleItems = document.querySelectorAll('.role-item h3');

  roleItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      roleItems.forEach(i => {
        if (i !== item) {
          i.style.opacity = '0.5';
        }
      });
    });

    item.addEventListener('mouseleave', () => {
      roleItems.forEach(i => {
        i.style.opacity = '1';
      });
    });
  });

  // Touch support - tap to focus
  roleItems.forEach(item => {
    item.addEventListener('touchstart', () => {
      roleItems.forEach(i => {
        i.style.opacity = i === item ? '1' : '0.5';
      });
    });
  });
}

// ============================================================================
// SCROLL OBSERVER - Reveal Elements on Scroll
// ============================================================================

function initScrollObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger animations for projects
        if (entry.target.classList.contains('lab-project')) {
          entry.target.style.opacity = '1';
        }

        // Trigger animations for about section
        if (entry.target.classList.contains('role-item')) {
          entry.target.style.opacity = '1';
        }

        // Trigger music player section
        if (entry.target.classList.contains('music-player')) {
          animateWaveformOnView();
        }
      }
    });
  }, observerOptions);

  // Observe projects
  document.querySelectorAll('.lab-project').forEach(el => {
    observer.observe(el);
  });

  // Observe about items
  document.querySelectorAll('.role-item').forEach(el => {
    observer.observe(el);
  });

  // Observe music player
  const musicPlayer = document.querySelector('.music-player');
  if (musicPlayer) {
    observer.observe(musicPlayer);
  }
}

function animateWaveformOnView() {
  const waveformSvg = document.querySelector('.waveform-svg');
  if (waveformSvg && !waveformSvg.hasAttribute('data-animated')) {
    waveformSvg.setAttribute('data-animated', 'true');
    animateWaveform();
  }
}

// ============================================================================
// POINTER TRACKING - Parallax & Visual Effects
// ============================================================================

function initPointerTracking() {
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Parallax effect on SVGs
    updateParallaxElements(x, y);
  });

  document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const x = touch.clientX / window.innerWidth;
      const y = touch.clientY / window.innerHeight;

      updateParallaxElements(x, y, 0.5); // Reduced effect for touch
    }
  });
}

function updateParallaxElements(x, y, intensity = 1) {
  // Future parallax effects can be added here
  // This is a foundation for advanced pointer interactions
}

// ============================================================================
// SMOOTH SCROLL EASING
// ============================================================================

function smoothScrollTo(element) {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

// ============================================================================
// PERFORMANCE OPTIMIZATION - Debounce Window Resize
// ============================================================================

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Recalculate any necessary values on resize
    updatePlayhead();
  }, 150);
});

// ============================================================================
// PREFERS REDUCED MOTION - Accessibility
// ============================================================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  document.documentElement.style.scrollBehavior = 'auto';
  document.querySelectorAll('*').forEach(el => {
    el.style.animationDuration = '0.01ms !important';
    el.style.transitionDuration = '0.01ms !important';
  });
}
