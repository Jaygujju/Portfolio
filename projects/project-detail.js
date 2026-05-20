document.addEventListener('DOMContentLoaded', () => {
  // 1. INITIALIZE VECTOR ICONS
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. RETRIEVE ACTIVE LENS MODE FROM LOCAL STORAGE
  const body = document.body;
  const lensToggle = document.getElementById('lensToggle');
  const labelDev = document.getElementById('labelDev');
  const labelOps = document.getElementById('labelOps');

  function setMode(mode) {
    if (mode === 'dev') {
      body.classList.remove('ops-mode');
      body.classList.add('dev-mode');
      if (labelDev) labelDev.classList.add('active');
      if (labelOps) labelOps.classList.remove('active');
      localStorage.setItem('portfolio-lens', 'dev');
    } else {
      body.classList.remove('dev-mode');
      body.classList.add('ops-mode');
      if (labelOps) labelOps.classList.add('active');
      if (labelDev) labelDev.classList.remove('active');
      localStorage.setItem('portfolio-lens', 'ops');
    }

    // Refresh icons inside dynamically updated layouts
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Set the initial mode based on main-page persistence
  const savedLens = localStorage.getItem('portfolio-lens') || 'dev';
  setMode(savedLens);

  // Click triggers for Lens Toggles on subpages
  if (lensToggle) {
    lensToggle.addEventListener('click', () => {
      if (body.classList.contains('dev-mode')) {
        setMode('ops');
      } else {
        setMode('dev');
      }
    });
  }

  if (labelDev) {
    labelDev.addEventListener('click', () => setMode('dev'));
  }

  if (labelOps) {
    labelOps.addEventListener('click', () => setMode('ops'));
  }
});
