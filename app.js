document.addEventListener('DOMContentLoaded', () => {
  // Dynamic mouse position spotlight tracking for premium custom backdrop effects
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  const body = document.body;
  const lensToggle = document.getElementById('lensToggle');
  const labelDev = document.getElementById('labelDev');
  const labelOps = document.getElementById('labelOps');
  
  const heroTag = document.getElementById('heroTag');
  const heroTitleMode = document.getElementById('heroTitleMode');
  const heroDesc = document.getElementById('heroDesc');
  const heroMainAction = document.getElementById('heroMainAction');
  
  const aboutHeading = document.getElementById('aboutHeading');
  const aboutTextContent = document.getElementById('aboutTextContent');
  
  const stat1Val = document.getElementById('stat1Val');
  const stat1Lbl = document.getElementById('stat1Lbl');
  const stat2Val = document.getElementById('stat2Val');
  const stat2Lbl = document.getElementById('stat2Lbl');
  const stat3Val = document.getElementById('stat3Val');
  const stat3Lbl = document.getElementById('stat3Lbl');
  const stat4Val = document.getElementById('stat4Val');
  const stat4Lbl = document.getElementById('stat4Lbl');
  
  const footerNexusWord = document.getElementById('footerNexusWord');
  const terminalPromptSym = document.getElementById('terminalPromptSym');

  const contentMap = {
    dev: {
      heroTagHTML: '<i data-lucide="code-2"></i><span>Developer Lens</span>',
      heroTitle: 'Computer Programmer',
      heroDesc: 'Seneca Polytechnic Computer Programming graduate specializing in Python automation, relational databases, and data structures. Building clean technical solutions that bridge the gap between software systems and real-world logistics workflows.',
      heroActionText: 'Explore Projects',
      aboutHeading: 'I build software to automate real-world workflows.',
      aboutText: 'I graduated from Seneca Polytechnic with a Computer Programming diploma, gaining a solid foundation in database design, data structures, and Python automation scripting. Outside of programming, I have managed retail centers and shipping hubs across the GTA, handling courier accounts (UPS, FedEx, DHL), coordinating fleet logistics, and sorting high-volume shipments under strict operational timelines. I write clean, logical code to solve practical logistics and workflow problems.',
      stats: {
        s1V: '4.0 / 4.0', s1L: 'Project Grade (Seneca)',
        s2V: '90%', s2L: 'Python Scripting',
        s3V: '8+', s3L: 'Languages & Tools',
        s4V: '3+ Years', s4L: 'Operations Experience'
      },
      footerWord: 'Software Engineering'
    },
    ops: {
      heroTagHTML: '<i data-lucide="truck"></i><span>Operations Lens</span>',
      heroTitle: 'Logistics & Operations Coordinator',
      heroDesc: 'Operations and logistics coordinator with hands-on experience managing retail hubs, multi-carrier shipments, and fleet dispatch. Using data-driven automation to simplify tracking and optimize delivery workflows.',
      heroActionText: 'Explore Projects',
      aboutHeading: 'Streamlining physical logistics with software-driven logic.',
      aboutText: 'I have managed retail distribution centers and shipping hubs in the GTA, coordinating courier accounts (UPS, FedEx, DHL), handling U-Haul fleet dispatch, and overseeing SKU inventory databases. At Complete Mart, my tracking improvements increased fleet turnover by 15%, while my sortation speed at Amazon consistently met outbound safety and timeline standards. I apply a systematic, detail-oriented approach to improve daily operations.',
      stats: {
        s1V: '100%', s1L: 'Outbound SLA Targets',
        s2V: '400+', s2L: 'Packages Sorted / Hour',
        s3V: '500+', s3L: 'Carrier Disputes Resolved',
        s4V: '+15%', s4L: 'Fleet Turnover Increase'
      },
      footerWord: 'Logistics Optimization'
    }
  };

  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const navLinksList = document.getElementById('navLinks');
  
  if (mobileNavToggle && navLinksList) {
    mobileNavToggle.addEventListener('click', () => {
      const expanded = mobileNavToggle.getAttribute('aria-expanded') === 'true' || false;
      mobileNavToggle.setAttribute('aria-expanded', !expanded);
      navLinksList.classList.toggle('active');
      mobileNavToggle.classList.toggle('active');
    });

    const links = navLinksList.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        navLinksList.classList.remove('active');
        mobileNavToggle.classList.remove('active');
      });
    });
  }

  function switchLens(mode) {
    const isDev = (mode === 'dev');
    if (isDev) {
      body.classList.remove('ops-mode');
      body.classList.add('dev-mode');
      labelDev.classList.add('active');
      labelOps.classList.remove('active');
      if (lensToggle) lensToggle.setAttribute('aria-checked', 'false');
      if (terminalPromptSym) terminalPromptSym.innerHTML = 'patel-os ~ $';
      
      updateHeroSection(contentMap.dev);
      localStorage.setItem('portfolio-lens', 'dev');
    } else {
      body.classList.remove('dev-mode');
      body.classList.add('ops-mode');
      labelOps.classList.add('active');
      labelDev.classList.remove('active');
      if (lensToggle) lensToggle.setAttribute('aria-checked', 'true');
      if (terminalPromptSym) terminalPromptSym.innerHTML = 'dispatch-ops ~ #';
      
      updateHeroSection(contentMap.ops);
      localStorage.setItem('portfolio-lens', 'ops');
    }
    
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  const savedLens = localStorage.getItem('portfolio-lens') || 'dev';
  switchLens(savedLens);

  if (lensToggle) {
    lensToggle.addEventListener('click', () => {
      if (body.classList.contains('dev-mode')) {
        switchLens('ops');
      } else {
        switchLens('dev');
      }
    });

    lensToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (body.classList.contains('dev-mode')) {
          switchLens('ops');
        } else {
          switchLens('dev');
        }
      }
    });
  }

  labelDev.addEventListener('click', () => switchLens('dev'));
  labelOps.addEventListener('click', () => switchLens('ops'));

  function updateHeroSection(data) {
    heroTag.innerHTML = data.heroTagHTML;
    heroTag.style.animation = 'none';
    setTimeout(() => { heroTag.style.animation = 'fadeIn 0.4s ease'; }, 10);
    
    heroTitleMode.textContent = data.heroTitle;
    heroDesc.textContent = data.heroDesc;
    heroMainAction.querySelector('span').textContent = data.heroActionText;
    
    aboutHeading.textContent = data.aboutHeading;
    aboutTextContent.textContent = data.aboutText;
    
    stat1Val.textContent = data.stats.s1V;
    stat1Lbl.textContent = data.stats.s1L;
    stat2Val.textContent = data.stats.s2V;
    stat2Lbl.textContent = data.stats.s2L;
    stat3Val.textContent = data.stats.s3V;
    stat3Lbl.textContent = data.stats.s3L;
    stat4Val.textContent = data.stats.s4V;
    stat4Lbl.textContent = data.stats.s4L;
    
    footerNexusWord.textContent = data.footerWord;
  }

  const terminalInput = document.getElementById('terminalInput');
  const terminalOutputLog = document.getElementById('terminalOutputLog');
  const terminalBody = document.getElementById('terminalBody');
  const chips = document.querySelectorAll('.terminal-chip');

  const terminalCommands = {
    help: (isOps) => isOps ? `
Available commands:
  <span style="color: var(--accent-secondary);">about</span>     - Summarize Jay Patel's operations profile
  <span style="color: var(--accent-secondary);">skills</span>    - Output operational competency matrix
  <span style="color: var(--accent-secondary);">contact</span>   - Print direct dispatch lines & socials
  <span style="color: var(--accent-secondary);">mode</span>      - Change theme lens (Syntax: 'mode dev' or 'mode ops')
  <span style="color: var(--accent-secondary);">clear</span>     - Wipe terminal logs
  <span style="color: var(--accent-secondary);">help</span>      - Print this listing
    ` : `
Available commands:
  <span style="color: var(--accent-secondary);">about</span>     - Summarize Jay Patel's programming profile
  <span style="color: var(--accent-secondary);">skills</span>    - Output technical skills matrix
  <span style="color: var(--accent-secondary);">contact</span>   - Print direct contact methods & socials
  <span style="color: var(--accent-secondary);">mode</span>      - Change lens (Syntax: 'mode dev' or 'mode ops')
  <span style="color: var(--accent-secondary);">clear</span>     - Wipe terminal logs
  <span style="color: var(--accent-secondary);">help</span>      - Print this listing
    `,
    about: (isOps) => isOps ? `
<span style="color: var(--text-primary); font-weight: bold;">JAY PATEL - LOGISTICS & OPERATIONS PROFILE</span>
---------------------------------------------------
Location:      Toronto, Ontario, Canada
Focus Areas:   Fulfillment Operations, Multi-Carrier Shipments,
               Fleet Coordination, Retail Store Management
Eligibility:   Eligible to work full-time on implied status
               (active PGWP application pending)
Summary:       An operations coordinator with three years of hands-on
               experience managing retail hubs, coordinating courier
               accounts (UPS, FedEx, DHL), and sorting up to 400+
               packages per hour. Applies database structures to
               optimize tracking and fleet utilization.
---------------------------------------------------
    ` : `
<span style="color: var(--text-primary); font-weight: bold;">JAY PATEL - SOFTWARE PROGRAMMER PROFILE</span>
---------------------------------------------------
Location:      Toronto, Ontario, Canada
Education:     Computer Programming Diploma (Seneca Polytechnic)
Focus Areas:   Relational Databases, Python Automation Scripting,
               Data Structures & Object-Oriented Systems
Eligibility:   Eligible to work full-time on implied status
               (active PGWP application pending)
Summary:       A programmer specializing in backend database design,
               Python CLI automation tools, and script development.
               Focused on building clean code solutions that integrate
               with practical, real-world operational workflows.
---------------------------------------------------
    `,
    skills: (isOps) => isOps ? `
<span style="color: var(--text-primary); font-weight: bold;">OPERATIONS COMPETENCY MATRIX</span>
---------------------------------------------------
📂 <span style="color: var(--accent-primary);">operations/</span>
 ├── 📁 <span style="color: var(--accent-secondary);">fulfillment/</span>
 │    ├── 📦 Sorting Speed (Amazon Hub - 400+ pkgs/hr)
 │    ├── ⚡ RF Scanning Systems & Outbound Logging
 │    └── 🛡️ Health & Safety Standards Compliance
 ├── 📁 <span style="color: var(--accent-secondary);">logistics/</span>
 │    ├── 🚚 Multi-Carrier Courier Portals (DHL, FedEx, UPS)
 │    └── 📦 Fleet Dispatch & Rental Systems (U-Haul)
 └── 📁 <span style="color: var(--accent-secondary);">management/</span>
      ├── 🤝 High-Value Account Dispute De-escalation
      └── 🗃️ Inventory Systems & SKU Auditing (500+ SKUs)
---------------------------------------------------
    ` : `
<span style="color: var(--text-primary); font-weight: bold;">TECHNICAL SKILLS MATRIX</span>
---------------------------------------------------
📂 <span style="color: var(--accent-primary);">skills/</span>
 ├── 📁 <span style="color: var(--accent-secondary);">languages/</span>
 │    ├── 🐍 Python (Automation Scripts, CLI Tools)
 │    ├── 🗄️ SQL (Relational Database Design)
 │    ├── ☕ Java & C++ (OOP Architectures)
 │    └── 🌐 HTML / CSS / JavaScript (Frontend Layouts)
 ├── 📁 <span style="color: var(--accent-secondary);">tools/</span>
 │    ├── 🛠️ Git & GitHub Version Control
 │    ├── 🧪 Playwright (Automated Browser Testing)
 │    └── 🐳 Docker (Containerized Environments)
 └── 📁 <span style="color: var(--accent-secondary);">core-concepts/</span>
      ├── 📊 Data Structures & Sorting Algorithms
      └── 💾 Database Normalization & Query Tuning
---------------------------------------------------
    `,
    contact: (isOps) => isOps ? `
<span style="color: var(--text-primary); font-weight: bold;">DISPATCH DIRECTORIES</span>
---------------------------------------------------
📧 Email:          <a href="mailto:jaynpatel08@gmail.com" style="color: var(--accent-primary);">jaynpatel08@gmail.com</a>
📞 Hotline:        <a href="tel:+14379813545" style="color: var(--accent-primary);">437-981-3545</a>
📍 Location:       Toronto, Ontario, Canada
🔗 LinkedIn:       <a href="https://www.linkedin.com/in/jaygujju/" target="_blank" rel="noopener" style="color: var(--accent-primary);">linkedin.com/in/jaygujju/</a>
---------------------------------------------------
    ` : `
<span style="color: var(--text-primary); font-weight: bold;">DIRECT DIRECTORIES</span>
---------------------------------------------------
📧 Email:     <a href="mailto:jaynpatel08@gmail.com" style="color: var(--accent-primary);">jaynpatel08@gmail.com</a>
📞 Phone:     <a href="tel:+14379813545" style="color: var(--accent-primary);">437-981-3545</a>
📍 Location:  Toronto, Ontario, Canada
🔗 LinkedIn:  <a href="https://www.linkedin.com/in/jaygujju/" target="_blank" rel="noopener" style="color: var(--accent-primary);">linkedin.com/in/jaygujju/</a>
---------------------------------------------------
    `
  };

  function executeTerminalCommand(cmdString) {
    const rawCmd = cmdString.trim().toLowerCase();
    const args = rawCmd.split(' ');
    const primaryCmd = args[0];
    const isOps = body.classList.contains('ops-mode');
    const promptSym = isOps ? 'dispatch-ops ~ #' : 'patel-os ~ $';
    
    // create a styled reflection line
    const reflectionLine = document.createElement('div');
    reflectionLine.className = 'terminal-log-line';
    reflectionLine.innerHTML = `<span class="terminal-prompt-sym">${promptSym}</span> <span style="color: var(--text-primary);">${cmdString}</span>`;
    terminalOutputLog.appendChild(reflectionLine);
    
    // build response
    const responseEl = document.createElement('div');
    responseEl.className = 'terminal-log-line terminal-system-text';
    
    if (primaryCmd === 'clear') {
      terminalOutputLog.innerHTML = '';
      terminalInput.value = '';
      return;
    }
    
    if (primaryCmd === 'mode') {
      const modeArg = args[1];
      if (modeArg === 'dev' || modeArg === 'developer') {
        switchLens('dev');
        responseEl.innerHTML = '<span style="color: #10b981;">✔ Mode changed to: DEVELOPER LENS</span>';
      } else if (modeArg === 'ops' || modeArg === 'operations') {
        switchLens('ops');
        responseEl.innerHTML = '<span style="color: #10b981;">✔ Mode changed to: OPERATIONS LENS</span>';
      } else {
        responseEl.innerHTML = '<span style="color: #ef4444;">✗ Error: Invalid mode argument. Use "mode dev" or "mode ops".</span>';
      }
    } else if (terminalCommands[primaryCmd]) {
      responseEl.innerHTML = terminalCommands[primaryCmd](isOps);
    } else if (primaryCmd === '') {
      responseEl.innerHTML = ''; // do nothing on empty enter
    } else {
      responseEl.innerHTML = `<span style="color: #ef4444;">✗ command not found: ${primaryCmd}</span>. Type <span style="color: var(--accent-primary);">help</span> for available commands.`;
    }
    
    terminalOutputLog.appendChild(responseEl);
    
    // reset inputs and auto-scroll to terminal bottom
    terminalInput.value = '';
    setTimeout(() => {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }, 10);
  }

  // handle command submission via keyboard
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeTerminalCommand(terminalInput.value);
    }
  });

  // handle chip clicks
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      executeTerminalCommand(cmd);
    });
  });


  // intersection observer for scroll reveal effects
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // unobserve after triggering once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // animate skill bars when the skills section is scrolled into view
  const skillsSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.skill-bar-inner');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const widthVal = bar.getAttribute('data-width');
          bar.style.width = widthVal;
        });
        skillObserver.unobserve(skillsSection);
      }
    });
  }, {
    threshold: 0.2
  });

  if (skillsSection) {
    skillObserver.observe(skillsSection);
  }


  // contact form handling and submission
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const btnSubmitForm = document.getElementById('btnSubmitForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('frmName').value;
      const email = document.getElementById('frmEmail').value;
      const subject = document.getElementById('frmSubject').value;
      const message = document.getElementById('frmMessage').value;

      if (!name || !email || !subject || !message) {
        formStatus.textContent = 'Please fill out all required fields.';
        formStatus.className = 'form-status error';
        return;
      }

      // enter loading state
      btnSubmitForm.disabled = true;
      const originalBtnHTML = btnSubmitForm.innerHTML;
      btnSubmitForm.innerHTML = '<span>Processing Dispatch...</span><i class="animate-spin" data-lucide="loader"></i>';
      if (typeof lucide !== 'undefined') {
        lucide.createIcons({ attrs: { class: 'animate-spin' } });
      }

      // retrieve web3forms keys from the form elements
      const accessKey = contactForm.querySelector('input[name="access_key"]').value;
      const botcheck = contactForm.querySelector('input[name="botcheck"]').checked;
      const fromName = contactForm.querySelector('input[name="from_name"]').value;
      const subjectVal = contactForm.querySelector('input[name="subject"]').value;

      // real api network call via fetch
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name,
          email: email,
          subject: subjectVal,
          from_name: fromName,
          custom_subject: subject,
          message: message,
          botcheck: botcheck
        })
      })
      .then(async (response) => {
        const json = await response.json();
        btnSubmitForm.disabled = false;
        btnSubmitForm.innerHTML = originalBtnHTML;
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }

        if (response.status === 200) {
          formStatus.innerHTML = `📬 <strong>Success!</strong> Message sent! Thank you, ${name}. Jay has received your inquiry at jaynpatel08@gmail.com and will reach out shortly.`;
          formStatus.className = 'form-status success';
          contactForm.reset();
        } else {
          formStatus.innerHTML = `❌ <strong>Submission Failed:</strong> ${json.message || 'Error occurred.'}`;
          formStatus.className = 'form-status error';
        }
      })
      .catch((error) => {
        btnSubmitForm.disabled = false;
        btnSubmitForm.innerHTML = originalBtnHTML;
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
        formStatus.innerHTML = `❌ <strong>Network Error:</strong> Unable to connect to submission server. Please try again.`;
        formStatus.className = 'form-status error';
      });
    });
  }

  // update active navigation link on scroll
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // conveyor belt sortation game simulator
  const btnStartGame = document.getElementById('btnStartGame');
  const btnOverlayStart = document.getElementById('btnOverlayStart');
  const btnRestartShift = document.getElementById('btnRestartShift');
  
  const btnRouteAir = document.getElementById('btnRouteAir');
  const btnRouteGround = document.getElementById('btnRouteGround');
  
  const gameActionButtons = document.getElementById('gameActionButtons');
  
  const gameStartOverlay = document.getElementById('gameStartOverlay');
  const gameEndOverlay = document.getElementById('gameEndOverlay');
  const conveyorGameContainer = document.getElementById('conveyorGameContainer');
  const conveyorScreenCard = document.getElementById('conveyorScreenCard');
  const packagesQueueContainer = document.getElementById('packagesQueueContainer');
  
  // hud elements
  const sortCount = document.getElementById('sortCount');
  const sortAccuracy = document.getElementById('sortAccuracy');
  const sortSpeed = document.getElementById('sortSpeed');
  const sortErrors = document.getElementById('sortErrors');
  
  // scan hud elements
  const hudItemCode = document.getElementById('hudItemCode');
  const hudWeight = document.getElementById('hudWeight');
  const hudService = document.getElementById('hudService');
  const hudCarrier = document.getElementById('hudCarrier');
  
  // end screen report elements
  const reportAccuracy = document.getElementById('reportAccuracy');
  const reportSpeed = document.getElementById('reportSpeed');
  const reportVerdict = document.getElementById('reportVerdict');
  
  // receptor elements for visuals
  const receptorLeft = document.getElementById('receptorLeft');
  const receptorRight = document.getElementById('receptorRight');

  let isGameActive = false;
  let currentPkgIndex = 0;
  let errorsCount = 0;
  let startTime = 0;
  let packagesQueue = [];
  const totalPackages = 15;
  
  const carriersList = ['UPS Express', 'DHL Express', 'FedEx Ground', 'Canada Packers', 'UPS Ground', 'DHL Economy'];

  // stately random packages generator
  function generateShiftPackages() {
    const pkgs = [];
    for (let i = 1; i <= totalPackages; i++) {
      const isPriority = Math.random() > 0.45;
      const weight = isPriority 
        ? parseFloat((1.0 + Math.random() * 5.2).toFixed(1)) 
        : parseFloat((4.2 + Math.random() * 8.8).toFixed(1));
      
      const service = isPriority ? 'Priority Express' : 'Super Saver Ground';
      const carrier = carriersList[Math.floor(Math.random() * carriersList.length)];
      
      pkgs.push({
        id: `PKG-${900 + i}`,
        weight: weight,
        service: service,
        carrier: carrier
      });
    }
    return pkgs;
  }

  // visual queue DOM renderer
  function initializeQueueDOM() {
    packagesQueueContainer.innerHTML = '';
    packagesQueue.forEach((pkg, index) => {
      const card = document.createElement('div');
      card.className = 'package-card entering';
      card.id = `card-${index}`;
      
      const isPriority = (pkg.service === 'Priority Express');
      const tagClass = isPriority ? 'priority' : 'ground';
      const tagIcon = isPriority ? '⭐' : '📦';
      
      card.innerHTML = `
        <span class="package-tag ${tagClass}">${tagIcon} ${pkg.service.split(' ')[0]}</span>
        <div class="package-weight-lbl">${pkg.weight.toFixed(1)} kg</div>
        <div class="package-id-lbl">${pkg.id}</div>
      `;
      packagesQueueContainer.appendChild(card);
    });
  }

  // transition and reposition layout cards
  function updateConveyorVisuals() {
    packagesQueue.forEach((pkg, index) => {
      const card = document.getElementById(`card-${index}`);
      if (!card) return;

      // clear inline overrides so CSS stylesheet rules take over for active & routed items
      card.style.left = '';
      card.style.transform = '';
      card.style.opacity = '';

      card.className = 'package-card';
      
      if (index === currentPkgIndex) {
        card.classList.add('scanning');
      } else if (index === currentPkgIndex + 1) {
        card.classList.add('entering');
        card.style.left = '25%';
        card.style.transform = 'translate(-50%, -50%) scale(0.85)';
        card.style.opacity = '0.55';
      } else if (index > currentPkgIndex + 1) {
        card.classList.add('entering');
        card.style.left = '10%';
        card.style.transform = 'translate(-50%, -50%) scale(0.75)';
        card.style.opacity = '0';
      } else if (index < currentPkgIndex) {
        // routed packages hold class assignments from execution decision
        const decision = card.getAttribute('data-decision');
        if (decision === 'air') {
          card.classList.add('routed-left');
        } else {
          card.classList.add('routed-right');
        }
      }
    });

    // populate the scanned telemetries HUD
    if (currentPkgIndex < totalPackages) {
      const activePkg = packagesQueue[currentPkgIndex];
      hudItemCode.textContent = activePkg.id;
      hudWeight.textContent = `${activePkg.weight.toFixed(1)} kg`;
      hudService.textContent = activePkg.service;
      hudCarrier.textContent = activePkg.carrier;
    } else {
      hudItemCode.textContent = '--';
      hudWeight.textContent = '-- kg';
      hudService.textContent = '--';
      hudCarrier.textContent = '--';
    }
  }

  function startShift() {
    isGameActive = true;
    currentPkgIndex = 0;
    errorsCount = 0;
    packagesQueue = generateShiftPackages();
    startTime = Date.now();
    
    // hide screens
    gameStartOverlay.style.display = 'none';
    gameEndOverlay.style.display = 'none';
    
    // show manual click triggers
    gameActionButtons.style.display = 'grid';
    if (btnStartGame) btnStartGame.style.display = 'none';
    
    // start track line animation
    const track = document.querySelector('.conveyor-game-track');
    if (track) track.classList.add('game-active');
    
    // HUD initial status reset
    sortCount.textContent = `0 / ${totalPackages}`;
    sortAccuracy.textContent = '100%';
    sortErrors.textContent = '0';
    sortSpeed.textContent = '0 u/h';

    initializeQueueDOM();
    updateConveyorVisuals();
  }

  function makeSortDecision(decision) {
    if (!isGameActive || currentPkgIndex >= totalPackages) return;

    const pkg = packagesQueue[currentPkgIndex];
    const isPriority = (pkg.service === 'Priority Express');
    
    // SLA standard carrier logic:
    // air express: weight < 5.0 kg and priority express
    // - Heavy Ground: weight >= 5.0 kg OR Super Saver Ground
    const shouldBeAir = (pkg.weight < 5.0) && isPriority;
    const choseAir = (decision === 'air');
    const isCorrect = (shouldBeAir === choseAir);
    
    const activeCard = document.getElementById(`card-${currentPkgIndex}`);
    if (activeCard) {
      activeCard.setAttribute('data-decision', decision);
    }
    
    const track = document.querySelector('.conveyor-game-track');
    
    if (isCorrect) {
      // trigger green neon sweep flash
      if (track) {
        track.classList.remove('flash-success');
        void track.offsetWidth; // reflow
        track.classList.add('flash-success');
        setTimeout(() => track.classList.remove('flash-success'), 400);
      }
      
      const receptor = choseAir ? receptorLeft : receptorRight;
      if (receptor) {
        receptor.classList.add('active');
        setTimeout(() => receptor.classList.remove('active'), 300);
      }
    } else {
      // trigger red shaking vibration
      errorsCount++;
      if (track) {
        track.classList.remove('shake-error');
        void track.offsetWidth; // reflow
        track.classList.add('shake-error');
        setTimeout(() => track.classList.remove('shake-error'), 450);
      }
    }
    
    // increment process counters
    currentPkgIndex++;
    
    // live update HUD metrics
    const scanned = currentPkgIndex;
    const accuracy = Math.round(((scanned - errorsCount) / scanned) * 100);
    sortCount.textContent = `${scanned} / ${totalPackages}`;
    sortAccuracy.textContent = `${accuracy}%`;
    sortErrors.textContent = errorsCount;
    
    // live speed calculation
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const itemsPerHr = Math.round((scanned / elapsedSeconds) * 3600);
    sortSpeed.textContent = `${itemsPerHr} u/h`;
    
    updateConveyorVisuals();

    // end game condition
    if (currentPkgIndex === totalPackages) {
      endShift(accuracy, itemsPerHr);
    }
  }

  function endShift(accuracy, speed) {
    isGameActive = false;
    
    // stop track animation
    const track = document.querySelector('.conveyor-game-track');
    if (track) track.classList.remove('game-active');
    
    // show restart panel
    gameActionButtons.style.display = 'none';
    if (btnStartGame) btnStartGame.style.display = 'block';
    
    // compile shift report summaries
    reportAccuracy.textContent = `${accuracy}%`;
    reportSpeed.textContent = `${speed} u/h`;
    
    let verdictHTML = '';
    if (accuracy >= 98.0) {
      verdictHTML = `🏆 <strong>ELITE SLA PRECISION!</strong> You achieved an incredible outbound accuracy. You matched Jay Patel's 99.8% precision sortation standard under Seneca-optimized queues!`;
    } else if (accuracy >= 85.0) {
      verdictHTML = `👌 <strong>COMPLIANT OUTBOUND!</strong> High speed sortation achieved. Just minor misroutes, safe within fulfillment depot tolerances. Excellent work!`;
    } else {
      verdictHTML = `⚠️ <strong>DEPOT SLA FAILURE!</strong> Sort errors caused conveyor backing. Recruiters and dispatch require Jay's automated mathematical routing scripts to salvage accuracy.`;
    }
    reportVerdict.innerHTML = verdictHTML;
    
    gameEndOverlay.style.display = 'flex';
  }

  // keyboard desktop arrow listeners
  window.addEventListener('keydown', (e) => {
    if (!isGameActive) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      makeSortDecision('air');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      makeSortDecision('ground');
    }
  });

  // action click bindings
  if (btnStartGame) btnStartGame.addEventListener('click', startShift);
  if (btnOverlayStart) btnOverlayStart.addEventListener('click', startShift);
  if (btnRestartShift) btnRestartShift.addEventListener('click', startShift);
  
  if (btnRouteAir) btnRouteAir.addEventListener('click', () => makeSortDecision('air'));
  if (btnRouteGround) btnRouteGround.addEventListener('click', () => makeSortDecision('ground'));

  // dual lens reset: clock off game if dev lens is toggled
  const originalSwitchLens = switchLens;
  switchLens = function(mode) {
    originalSwitchLens(mode);
    if (mode === 'dev' && isGameActive) {
      isGameActive = false;
      const track = document.querySelector('.conveyor-game-track');
      if (track) track.classList.remove('game-active');
      gameActionButtons.style.display = 'none';
      if (btnStartGame) btnStartGame.style.display = 'block';
      gameStartOverlay.style.display = 'flex';
      gameEndOverlay.style.display = 'none';
    }
  };
});


