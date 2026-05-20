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

      // Enter loading state
      btnSubmitForm.disabled = true;
      const originalBtnHTML = btnSubmitForm.innerHTML;
      btnSubmitForm.innerHTML = '<span>Processing Dispatch...</span><i class="animate-spin" data-lucide="loader"></i>';
      if (typeof lucide !== 'undefined') {
        lucide.createIcons({ attrs: { class: 'animate-spin' } });
      }

      // Retrieve Web3Forms keys from the form elements
      const accessKey = contactForm.querySelector('input[name="access_key"]').value;
      const botcheck = contactForm.querySelector('input[name="botcheck"]').checked;
      const fromName = contactForm.querySelector('input[name="from_name"]').value;
      const subjectVal = contactForm.querySelector('input[name="subject"]').value;

      // Real API network call via fetch
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

  // ========================================================
  // 8. LOGIFLOW REVENUE RECOVERY AUDITOR SIMULATOR
  // ========================================================
  const btnRunAudit = document.getElementById('btnRunAudit');
  const btnAuditCustom = document.getElementById('btnAuditCustom');
  const scannerLaserBar = document.getElementById('scannerLaserBar');
  const auditCount = document.getElementById('auditCount');
  const auditSavings = document.getElementById('auditSavings');
  const auditSLA = document.getElementById('auditSLA');
  const auditDiscrepancies = document.getElementById('auditDiscrepancies');
  
  const parcels = [
    { id: 'P-109', carrier: 'UPS Express', actualWt: 4.5, l: 30, w: 20, h: 15, billed: 42.00, rate: 8.00 },
    { id: 'P-110', carrier: 'DHL Express', actualWt: 1.2, l: 45, w: 30, h: 25, billed: 58.50, rate: 10.00 },
    { id: 'P-111', carrier: 'FedEx Ground', actualWt: 8.0, l: 20, w: 20, h: 20, billed: 31.20, rate: 3.90 },
    { id: 'P-112', carrier: 'UPS Standard', actualWt: 3.0, l: 50, w: 40, h: 30, billed: 48.00, rate: 4.00 },
    { id: 'P-113', carrier: 'Canada Packers', actualWt: 12.5, l: 25, w: 25, h: 20, billed: 54.00, rate: 4.30 },
    { id: 'P-114', carrier: 'DHL Economy', actualWt: 2.1, l: 35, w: 30, h: 20, billed: 49.90, rate: 9.50 }
  ];

  let isAuditing = false;
  let customParcelIdCounter = 115;

  // Global helper function to animate number tick ups
  function animateCounter(element, start, end, duration, prefix = '', suffix = '') {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentVal = start + progress * (end - start);
      if (prefix === '$') {
        element.textContent = `${prefix}${currentVal.toFixed(2)}${suffix}`;
      } else {
        element.textContent = `${prefix}${Math.floor(currentVal)}${suffix}`;
      }
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (prefix === '$') {
          element.textContent = `${prefix}${end.toFixed(2)}${suffix}`;
        } else {
          element.textContent = `${prefix}${end}${suffix}`;
        }
      }
    }
    requestAnimationFrame(update);
  }

  if (btnRunAudit) {
    btnRunAudit.addEventListener('click', () => {
      if (isAuditing) return;
      isAuditing = true;

      // 1. Enter active state for button
      btnRunAudit.disabled = true;
      if (btnAuditCustom) btnAuditCustom.disabled = true;
      const originalBtnHTML = btnRunAudit.innerHTML;
      btnRunAudit.innerHTML = '<span>Scanning Invoices...</span><i class="animate-spin" data-lucide="loader"></i>';
      if (typeof lucide !== 'undefined') {
        lucide.createIcons({ attrs: { class: 'animate-spin' } });
      }

      // 2. Trigger glowing scanner laser bar sweep
      if (scannerLaserBar) {
        scannerLaserBar.classList.remove('active');
        void scannerLaserBar.offsetWidth; // Trigger reflow to restart animation
        scannerLaserBar.classList.add('active');
      }

      // 3. Reset stats panel
      auditCount.textContent = `0 / ${parcels.length}`;
      auditSavings.textContent = '$0.00';
      auditDiscrepancies.textContent = '0';
      auditSLA.textContent = '100.0%';

      // 4. Reset table body display
      const rows = document.querySelectorAll('#auditorTableBody tr');
      rows.forEach(row => {
        row.className = ''; // Remove success/flagged/auditing classes
        const colVolumetric = row.querySelector('.col-volumetric');
        const colCorrect = row.querySelector('.col-correct');
        const statusTd = row.querySelector('td:last-child');

        if (colVolumetric) colVolumetric.textContent = '-';
        if (colCorrect) colCorrect.textContent = '-';
        if (statusTd) {
          statusTd.innerHTML = '<span class="audit-status pending">Pending</span>';
        }
      });

      let currentScanned = 0;
      let currentDiscrepancies = 0;
      let currentLeakage = 0;

      // 5. Staggered row-by-row scanning processing
      parcels.forEach((parcel, index) => {
        const row = document.querySelector(`#auditorTableBody tr[data-parcel="${parcel.id}"]`);
        
        // Stagger scanning start
        setTimeout(() => {
          if (!row) return;

          // Mark row as currently scanning
          row.classList.add('auditing-now');
          const statusTd = row.querySelector('td:last-child');
          if (statusTd) {
            statusTd.innerHTML = '<span class="audit-status scanning">Scanning</span>';
          }
          
          // Stagger actual audit completion (300ms after scanning starts)
          setTimeout(() => {
            row.classList.remove('auditing-now');
            
            // Volumetric Weight Calculation
            const volumetricWt = (parcel.l * parcel.w * parcel.h) / 5000;
            const billableWt = Math.max(parcel.actualWt, volumetricWt);
            const correctRate = billableWt * parcel.rate;
            const discrepancy = Math.abs(parcel.billed - correctRate);

            // Update row text cells
            const colVolumetric = row.querySelector('.col-volumetric');
            const colCorrect = row.querySelector('.col-correct');
            if (colVolumetric) colVolumetric.textContent = `${volumetricWt.toFixed(2)} kg`;
            if (colCorrect) colCorrect.textContent = `$${correctRate.toFixed(2)}`;

            let isFlagged = discrepancy > 0.05;
            let rowLeakage = 0;

            if (isFlagged) {
              row.classList.add('audited-discrepancy');
              if (statusTd) {
                statusTd.innerHTML = '<span class="audit-status flagged"><i data-lucide="alert-triangle" style="width:12px;height:12px;display:inline-block;margin-right:4px;vertical-align:middle;"></i>Flagged</span>';
              }
              currentDiscrepancies++;
              
              // Only count overcharges towards recovered leakage
              if (parcel.billed > correctRate) {
                rowLeakage = parcel.billed - correctRate;
              }
            } else {
              row.classList.add('audited-success');
              if (statusTd) {
                statusTd.innerHTML = '<span class="audit-status success"><i data-lucide="check" style="width:12px;height:12px;display:inline-block;margin-right:4px;vertical-align:middle;"></i>Audited</span>';
              }
            }

            // Cache calculations on the row element for global recount
            row.setAttribute('data-leakage', rowLeakage);
            row.setAttribute('data-discrepancy', isFlagged ? '1' : '0');

            // Create Lucide Icons for dynamic row elements
            if (typeof lucide !== 'undefined') {
              lucide.createIcons();
            }

            // Update Stats Variables
            currentScanned++;
            const prevLeakage = currentLeakage;
            currentLeakage += rowLeakage;

            // Update Stats Meters
            auditCount.textContent = `${currentScanned} / ${parcels.length}`;
            animateCounter(auditDiscrepancies, parseFloat(auditDiscrepancies.textContent), currentDiscrepancies, 250);
            
            if (rowLeakage > 0) {
              animateCounter(auditSavings, prevLeakage, currentLeakage, 350, '$');
            }

            // Custom SLA calculation
            const finalSLATarget = 100 - ((currentDiscrepancies / parcels.length) * 15);
            if (currentScanned === parcels.length) {
              animateCounter(auditSLA, parseFloat((auditSLA.textContent || '100%').replace('%', '')), Math.max(70.0, finalSLATarget), 500, '', '%');
            } else {
              auditSLA.textContent = `${(100 - ((currentDiscrepancies / currentScanned) * 15)).toFixed(1)}%`;
            }

            // Final Parcel cleanups
            if (currentScanned === parcels.length) {
              setTimeout(() => {
                if (scannerLaserBar) scannerLaserBar.classList.remove('active');
                btnRunAudit.disabled = false;
                if (btnAuditCustom) btnAuditCustom.disabled = false;
                btnRunAudit.innerHTML = originalBtnHTML;
                if (typeof lucide !== 'undefined') {
                  lucide.createIcons();
                }
                isAuditing = false;
              }, 400);
            }

          }, 300);

        }, index * 350); // Stagger scanning of rows every 350ms
      });
    });
  }

  // 9. AUDIT CUSTOM SHIPMENT FORM
  if (btnAuditCustom) {
    btnAuditCustom.addEventListener('click', () => {
      if (isAuditing) return;

      const carrier = document.getElementById('inputCarrier').value;
      const billed = parseFloat(document.getElementById('inputBilled').value);
      const actualWt = parseFloat(document.getElementById('inputActualWt').value);
      const rate = parseFloat(document.getElementById('inputRatePerKg').value);
      const l = parseInt(document.getElementById('inputL').value);
      const w = parseInt(document.getElementById('inputW').value);
      const h = parseInt(document.getElementById('inputH').value);

      if (!carrier || isNaN(billed) || isNaN(actualWt) || isNaN(rate) || isNaN(l) || isNaN(w) || isNaN(h)) {
        alert('Please fill out all fields with valid numbers before auditing.');
        return;
      }
      if (billed <= 0 || actualWt <= 0 || rate <= 0 || l <= 0 || w <= 0 || h <= 0) {
        alert('All dimensional, weight, and pricing parameters must be positive numbers.');
        return;
      }

      isAuditing = true;

      // Enter loading state for buttons
      btnAuditCustom.disabled = true;
      if (btnRunAudit) btnRunAudit.disabled = true;

      const originalCustomBtnHTML = btnAuditCustom.innerHTML;
      btnAuditCustom.innerHTML = '<span>Auditing...</span><i class="animate-spin" data-lucide="loader"></i>';
      if (typeof lucide !== 'undefined') {
        lucide.createIcons({ attrs: { class: 'animate-spin' } });
      }

      // Generate a unique ID and push to parcels array
      const parcelId = `P-${customParcelIdCounter++}`;
      const newParcel = {
        id: parcelId,
        carrier: carrier,
        actualWt: actualWt,
        l: l,
        w: w,
        h: h,
        billed: billed,
        rate: rate
      };
      parcels.push(newParcel);

      // Prepend a new row to the table body
      const newRowHTML = `
        <tr data-parcel="${parcelId}">
          <td>${parcelId}</td>
          <td>${newParcel.carrier}</td>
          <td>${newParcel.actualWt.toFixed(1)} kg</td>
          <td>${newParcel.l} x ${newParcel.w} x ${newParcel.h}</td>
          <td class="col-volumetric">-</td>
          <td>$${newParcel.billed.toFixed(2)}</td>
          <td class="col-correct">-</td>
          <td><span class="audit-status pending">Pending</span></td>
        </tr>
      `;
      const tableBody = document.getElementById('auditorTableBody');
      if (tableBody) {
        tableBody.insertAdjacentHTML('afterbegin', newRowHTML);
      }

      // Trigger glowing scanner laser bar sweep
      if (scannerLaserBar) {
        scannerLaserBar.classList.remove('active');
        void scannerLaserBar.offsetWidth; // Reflow
        scannerLaserBar.classList.add('active');
      }

      // Audit specific row after short delay
      setTimeout(() => {
        const row = document.querySelector(`#auditorTableBody tr[data-parcel="${parcelId}"]`);
        if (!row) return;

        // Mark as scanning
        row.classList.add('auditing-now');
        const statusTd = row.querySelector('td:last-child');
        if (statusTd) {
          statusTd.innerHTML = '<span class="audit-status scanning">Scanning</span>';
        }

        setTimeout(() => {
          row.classList.remove('auditing-now');

          // Calculations
          const volumetricWt = (newParcel.l * newParcel.w * newParcel.h) / 5000;
          const billableWt = Math.max(newParcel.actualWt, volumetricWt);
          const correctRate = billableWt * newParcel.rate;
          const discrepancy = Math.abs(newParcel.billed - correctRate);

          // Update text cells
          const colVolumetric = row.querySelector('.col-volumetric');
          const colCorrect = row.querySelector('.col-correct');
          if (colVolumetric) colVolumetric.textContent = `${volumetricWt.toFixed(2)} kg`;
          if (colCorrect) colCorrect.textContent = `$${correctRate.toFixed(2)}`;

          let isFlagged = discrepancy > 0.05;
          let rowLeakage = 0;

          if (isFlagged) {
            row.classList.add('audited-discrepancy');
            if (statusTd) {
              statusTd.innerHTML = '<span class="audit-status flagged"><i data-lucide="alert-triangle" style="width:12px;height:12px;display:inline-block;margin-right:4px;vertical-align:middle;"></i>Flagged</span>';
            }
            if (newParcel.billed > correctRate) {
              rowLeakage = newParcel.billed - correctRate;
            }
          } else {
            row.classList.add('audited-success');
            if (statusTd) {
              statusTd.innerHTML = '<span class="audit-status success"><i data-lucide="check" style="width:12px;height:12px;display:inline-block;margin-right:4px;vertical-align:middle;"></i>Audited</span>';
            }
          }

          // Cache calculations on the row element for global recount
          row.setAttribute('data-leakage', rowLeakage);
          row.setAttribute('data-discrepancy', isFlagged ? '1' : '0');

          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }

          // Recount total stats from all rows
          const allRows = document.querySelectorAll('#auditorTableBody tr');
          let auditedCount = 0;
          let discrepancyCount = 0;
          let totalLeakage = 0;

          allRows.forEach(r => {
            if (r.classList.contains('audited-success') || r.classList.contains('audited-discrepancy')) {
              auditedCount++;
              const leak = parseFloat(r.getAttribute('data-leakage') || '0');
              const disc = parseInt(r.getAttribute('data-discrepancy') || '0');
              totalLeakage += leak;
              discrepancyCount += disc;
            }
          });

          // Update stats panel
          auditCount.textContent = `${auditedCount} / ${allRows.length}`;
          animateCounter(auditDiscrepancies, parseFloat(auditDiscrepancies.textContent || '0'), discrepancyCount, 250);
          animateCounter(auditSavings, parseFloat((auditSavings.textContent || '$0.00').replace('$', '')), totalLeakage, 350, '$');

          // SLA target calculation
          const finalSLATarget = auditedCount === 0 ? 100.0 : Math.max(70.0, 100.0 - (discrepancyCount / auditedCount) * 15.0);
          animateCounter(auditSLA, parseFloat((auditSLA.textContent || '100%').replace('%', '')), finalSLATarget, 500, '', '%');

          // Clean up buttons
          setTimeout(() => {
            if (scannerLaserBar) scannerLaserBar.classList.remove('active');
            btnAuditCustom.disabled = false;
            btnAuditCustom.innerHTML = originalCustomBtnHTML;
            if (btnRunAudit) {
              btnRunAudit.disabled = false;
            }
            if (typeof lucide !== 'undefined') {
              lucide.createIcons();
            }
            isAuditing = false;
          }, 400);

        }, 300);

      }, 600);
    });
  }
});

