document.addEventListener('DOMContentLoaded', () => {
  // 1. INITIALIZE VECTOR ICONS
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. DUAL LENS MODE CONTROLLER
  const body = document.body;
  const lensToggle = document.getElementById('lensToggle');
  const labelDev = document.getElementById('labelDev');
  const labelOps = document.getElementById('labelOps');
  
  // Dynamic Hero Elements
  const heroTag = document.getElementById('heroTag');
  const heroTitleMode = document.getElementById('heroTitleMode');
  const heroDesc = document.getElementById('heroDesc');
  const heroMainAction = document.getElementById('heroMainAction');
  
  // Dynamic About Elements
  const aboutHeading = document.getElementById('aboutHeading');
  const aboutTextContent = document.getElementById('aboutTextContent');
  
  // Dynamic Stats Dashboard Elements
  const stat1Val = document.getElementById('stat1Val');
  const stat1Lbl = document.getElementById('stat1Lbl');
  const stat2Val = document.getElementById('stat2Val');
  const stat2Lbl = document.getElementById('stat2Lbl');
  const stat3Val = document.getElementById('stat3Val');
  const stat3Lbl = document.getElementById('stat3Lbl');
  const stat4Val = document.getElementById('stat4Val');
  const stat4Lbl = document.getElementById('stat4Lbl');
  
  const footerNexusWord = document.getElementById('footerNexusWord');

  // Core content maps for Developer vs. Operations Lens
  const contentMap = {
    dev: {
      heroTagHTML: '<i data-lucide="code-2"></i><span>Developer Lens Engaged</span>',
      heroTitle: 'Computer Programmer',
      heroDesc: 'Seneca Polytechnic Programming graduate specializing in Python, SQL, and database algorithms. Creating streamlined technical answers to bridge the gap between software development and complex operational systems.',
      heroActionText: 'Explore Projects',
      aboutHeading: 'I build software that drives real-world throughput.',
      aboutText: 'With a Computer Programming Diploma from Seneca Polytechnic, I developed a strong foundation in algorithmic reasoning, database structures, and object-oriented architectures. Unlike traditional developers, I spent years leading operations at Complete Mart, managing high-volume sorting at Amazon, and coordinating courier accounts (UPS, FedEx, DHL) for Sunshine Corporation. I thrive where operational workflows meet technological automation.',
      stats: {
        s1V: '4.0 / 4.0', s1L: 'Seneca Code Quality',
        s2V: '90%', s2L: 'Python Automation Spec',
        s3V: '8+', s3L: 'Languages & Tools',
        s4V: '1.2s', s4L: 'Avg Script Latency'
      },
      footerWord: 'Software Engineering'
    },
    ops: {
      heroTagHTML: '<i data-lucide="truck"></i><span>Operations Lens Engaged</span>',
      heroTitle: 'Logistics & SLA Specialist',
      heroDesc: 'A proven operations manager with extensive experience handling Amazon logistics hubs, Complete Mart fleet systems, and Sunshine Corporation shipping accounts. Leveraging technical coding logic to streamline SLA times and dispute recoveries.',
      heroActionText: 'Explore Case Studies',
      aboutHeading: 'I coordinate operational hubs with mathematical accuracy.',
      aboutText: 'I have managed retail stores and shipment nodes in Canada, handling over 500 carrier disputes for DHL, FedEx, and UPS accounts. My logistics coordination at U-Haul boosted rental turnovers by 15%, while my fast-paced execution at Amazon sorted up to 400 packages an hour at 99.8% precision. I bring procedural accuracy, client dispute de-escalation, and software structures to streamline physical systems.',
      stats: {
        s1V: '100%', s1L: 'Outbound SLA Compliance',
        s2V: '400+', s2L: 'Sorting Units / Hour',
        s3V: '500+', s3L: 'Carrier Disputes Solved',
        s4V: '+15%', s4L: 'U-Haul Turnover Boost'
      },
      footerWord: 'Logistics Optimization'
    }
  };

  function switchLens(mode) {
    if (mode === 'dev') {
      body.classList.remove('ops-mode');
      body.classList.add('dev-mode');
      labelDev.classList.add('active');
      labelOps.classList.remove('active');
      
      updateHeroSection(contentMap.dev);
      localStorage.setItem('portfolio-lens', 'dev');
    } else {
      body.classList.remove('dev-mode');
      body.classList.add('ops-mode');
      labelOps.classList.add('active');
      labelDev.classList.remove('active');
      
      updateHeroSection(contentMap.ops);
      localStorage.setItem('portfolio-lens', 'ops');
    }
    
    // Refresh Lucide Icons in dynamically injected elements
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Initial Load Check from LocalStorage
  const savedLens = localStorage.getItem('portfolio-lens') || 'dev';
  switchLens(savedLens);

  function updateHeroSection(data) {
    // Inject Tag & Animate
    heroTag.innerHTML = data.heroTagHTML;
    heroTag.style.animation = 'none';
    setTimeout(() => { heroTag.style.animation = 'fadeIn 0.4s ease'; }, 10);
    
    // Inject Text Content
    heroTitleMode.textContent = data.heroTitle;
    heroDesc.textContent = data.heroDesc;
    heroMainAction.querySelector('span').textContent = data.heroActionText;
    
    aboutHeading.textContent = data.aboutHeading;
    aboutTextContent.textContent = data.aboutText;
    
    // Inject Stats with subtle roll transition
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

  // Click Trigger for Toggle Switch
  lensToggle.addEventListener('click', () => {
    if (body.classList.contains('dev-mode')) {
      switchLens('ops');
    } else {
      switchLens('dev');
    }
  });

  // Label Click Triggers
  labelDev.addEventListener('click', () => switchLens('dev'));
  labelOps.addEventListener('click', () => switchLens('ops'));


  // 3. INTERACTIVE PATEL TERMINAL ENGINE
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutputLog = document.getElementById('terminalOutputLog');
  const terminalBody = document.getElementById('terminalBody');
  const chips = document.querySelectorAll('.terminal-chip');

  const terminalCommands = {
    help: () => `
Available commands:
  <span style="color: var(--accent-secondary);">about</span>     - Summarize Jay Patel's professional history
  <span style="color: var(--accent-secondary);">skills</span>    - Output technical & operations skills folder tree
  <span style="color: var(--accent-secondary);">contact</span>   - Print direct contact methods & socials
  <span style="color: var(--accent-secondary);">mode</span>      - Change lens (Syntax: 'mode dev' or 'mode ops')
  <span style="color: var(--accent-secondary);">clear</span>     - Wipe terminal logs
  <span style="color: var(--accent-secondary);">help</span>      - Print this listing
    `,
    about: () => `
<span style="color: var(--text-primary); font-weight: bold;">JAY PATEL - CORE PROFILE</span>
---------------------------------------------------
Location:      Toronto, Ontario, Canada
Education:     Diploma in Computer Programming
               (Seneca Polytechnic, Dec 2025)
Focus Area:    Relational Databases, Python Automation,
               SLA Optimization & Logistics Coordinator
Status:        Implied Work Status (PGWP applied, 3 yr duration)
Summary:       A software engineering graduate with over 3 years
               of direct warehouse sorting, fleet leasing, and 
               SLA escalation resolutions. Expert in building 
               automated pipelines that connect digital scripts 
               with physical workflows.
---------------------------------------------------
    `,
    skills: () => `
<span style="color: var(--text-primary); font-weight: bold;">SKILLS MATRIX FOLDER TREE</span>
---------------------------------------------------
📂 <span style="color: var(--accent-primary);">skills/</span>
 ├── 📁 <span style="color: var(--accent-secondary);">software-engineering/</span>
 │    ├── 🐍 Python (Automation, CLI Compilers)  [90%]
 │    ├── 🗄️ SQL & Databases (Relational design) [85%]
 │    ├── 📊 Algorithms & Data Structures       [80%]
 │    └── 🌐 HTML / CSS / Vanilla JS            [75%]
 ├── 📁 <span style="color: var(--accent-secondary);">logistics-operations/</span>
 │    ├── 📦 Courier SLA (UPS, FedEx, DHL)     [95%]
 │    ├── 🚚 Fleet rental & dispatch layouts   [85%]
 │    └── ⚡ Amazon Sortation (400 units/hr)    [90%]
 └── 📁 <span style="color: var(--accent-secondary);">customer-success/</span>
      ├── 🤝 Escalation dispute recovery       [95%]
      └── ☕ POS & front-desk throughput        [90%]
---------------------------------------------------
    `,
    contact: () => `
<span style="color: var(--text-primary); font-weight: bold;">DIRECT DIRECTORIES</span>
---------------------------------------------------
📧 Email:     <a href="mailto:jaynpatel08@gmail.com" style="color: var(--accent-primary);">jaynpatel08@gmail.com</a>
📞 Phone:     <a href="tel:+14379813545" style="color: var(--accent-primary);">437-981-3545</a>
📍 Address:   Toronto, Ontario, Canada
🔗 LinkedIn:  <a href="https://www.linkedin.com/in/jaygujju/" target="_blank" rel="noopener" style="color: var(--accent-primary);">linkedin.com/in/jaygujju/</a>
---------------------------------------------------
    `
  };

  function executeTerminalCommand(cmdString) {
    const rawCmd = cmdString.trim().toLowerCase();
    const args = rawCmd.split(' ');
    const primaryCmd = args[0];
    
    // 1. Create a styled reflection line
    const reflectionLine = document.createElement('div');
    reflectionLine.className = 'terminal-log-line';
    reflectionLine.innerHTML = `<span class="terminal-prompt-sym">patel-os ~ $</span> <span style="color: var(--text-primary);">${cmdString}</span>`;
    terminalOutputLog.appendChild(reflectionLine);
    
    // 2. Build Response
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
      responseEl.innerHTML = terminalCommands[primaryCmd]();
    } else if (primaryCmd === '') {
      responseEl.innerHTML = ''; // Do nothing on empty enter
    } else {
      responseEl.innerHTML = `<span style="color: #ef4444;">✗ command not found: ${primaryCmd}</span>. Type <span style="color: var(--accent-primary);">help</span> for available commands.`;
    }
    
    terminalOutputLog.appendChild(responseEl);
    
    // Reset inputs and auto-scroll to terminal bottom
    terminalInput.value = '';
    setTimeout(() => {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }, 10);
  }

  // Handle Command Submission via Keyboard
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeTerminalCommand(terminalInput.value);
    }
  });

  // Handle Chip Clicks
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      executeTerminalCommand(cmd);
    });
  });


  // 4. INTERSECTION OBSERVER FOR SCROLL REVEALS
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Unobserve after triggering once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // 5. ANIMATED SKILLS METER GRID
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


  // 6. CONTACT FORM CONTROLLER & MOCK SUBMIT
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

      // Enter simulated loading state
      btnSubmitForm.disabled = true;
      const originalBtnHTML = btnSubmitForm.innerHTML;
      btnSubmitForm.innerHTML = '<span>Processing Dispatch...</span><i class="animate-spin" data-lucide="loader"></i>';
      if (typeof lucide !== 'undefined') {
        lucide.createIcons({ attrs: { class: 'animate-spin' } });
      }

      // Simulate API network call
      setTimeout(() => {
        // Reset button
        btnSubmitForm.disabled = false;
        btnSubmitForm.innerHTML = originalBtnHTML;
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }

        // Show Success status
        formStatus.innerHTML = `📬 <strong>Success!</strong> Delivery accepted. Thank you, ${name}! Your inquiry has been routed to Jay's account. He will reach out shortly.`;
        formStatus.className = 'form-status success';
        
        // Reset form inputs
        contactForm.reset();
      }, 1500);
    });
  }

  // 7. SMOOTH NAVIGATION LINK INTERSECTIONS
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
});
