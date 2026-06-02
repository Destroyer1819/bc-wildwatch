// ============================================
//  BC WildWatch™  —  script.js  v4
//  Single Page App controller
// ============================================

// ---- PAGE ROUTING ----
const pages = ['login','home','report','powerbi','reports'];

window.showPage = function(name, skipTransition) {
  const overlay = document.getElementById('transitionOverlay');

  // Sign out — clear session and reset login page
  if (name === 'login') {
    sessionStorage.removeItem('ww_auth');
    sessionStorage.removeItem('ww_role');
    sessionStorage.removeItem('ww_password');
    const gl = document.getElementById('gateArmLeft');
    const gr = document.getElementById('gateArmRight');
    const lc = document.getElementById('loginCard');
    if (gl) gl.classList.remove('open');
    if (gr) gr.classList.remove('open');
    if (lc) { lc.style.opacity='1'; lc.style.transform=''; lc.style.transition=''; }
    const uField = document.getElementById('loginUsername');
    const pField = document.getElementById('loginPassword');
    if (uField) uField.value = '';
    if (pField) pField.value = '';
    if (typeof clearLoginError === 'function') clearLoginError();
    // Reset login button
    const btnLogin = document.getElementById('btnLogin');
    const loginBtnText = document.getElementById('loginBtnText');
    if (btnLogin) btnLogin.disabled = false;
    if (loginBtnText) loginBtnText.textContent = 'Sign in';
  }

  function doSwitch() {
    pages.forEach(p => {
      const el = document.getElementById('page-' + p);
      if (el) el.classList.remove('page-active');
    });
    const target = document.getElementById('page-' + name);
    if (target) {
      target.classList.add('page-active');
      window.scrollTo(0, 0);
    }
    // Re-init observers for new page
    initReveal();
  }

  if (skipTransition) {
    doSwitch();
    return;
  }

  overlay.classList.add('fade-in');
  setTimeout(() => {
    doSwitch();
    overlay.classList.remove('fade-in');
  }, 350);
}

// ---- NAV REPORT DROPDOWN ----
const navDropdownBtn = document.getElementById('navDropdownBtn');
const navDropdown    = document.getElementById('navDropdown');

window.closeNavDropdown = function() {
  if (navDropdown) navDropdown.classList.remove('open');
}

if (navDropdownBtn) {
  navDropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navDropdown.classList.toggle('open');
  });
}

document.addEventListener('click', (e) => {
  if (navDropdown && navDropdownBtn && !navDropdownBtn.contains(e.target)) {
    window.closeNavDropdown();
  }
});

// ---- SCROLL REVEAL ----
function initReveal() {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObs.observe(el));

  const cardObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        cardObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.feature-card:not(.visible), .tool-card:not(.visible)').forEach(el => cardObs.observe(el));
}

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ---- MOBILE HAMBURGER ----
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
  document.addEventListener('click', (e) => {
    if (navbar && !navbar.contains(e.target) && mobileMenu && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- FLOATING ANIMAL PARTICLES ----
const particlesWrap = document.getElementById('particlesWrap');
const animals = ['🐍','🦎','🐾','🦂','🐛','🦟','🐝','🦔','🐇','🦗'];

function createParticle() {
  if (!particlesWrap) return;
  const p = document.createElement('div');
  p.className = 'particle';
  p.textContent = animals[Math.floor(Math.random() * animals.length)];
  const side = Math.random() > 0.5;
  p.style.left = side
    ? Math.random() * 200 + 'px'
    : (window.innerWidth - Math.random() * 200) + 'px';
  p.style.bottom = '-40px';
  p.style.fontSize = (14 + Math.random() * 14) + 'px';
  p.style.animationDuration = (6 + Math.random() * 8) + 's';
  p.style.animationDelay = '0s';
  particlesWrap.appendChild(p);
  setTimeout(() => p.remove(), 14000);
}

setInterval(() => {
  const loginPage = document.getElementById('page-login');
  if (loginPage && loginPage.classList.contains('page-active')) {
    createParticle();
  }
}, 2500);

// ---- LOGIN VALIDATION ----
// Client-side validation against Login_Data
// Power Automate HTTP trigger blocked by CORS from browser
// This matches the SharePoint Login_Data list exactly
const LOGIN_DATA = [
  { username: 'Chante_Fasen',      password: '602353', role: 'student' },
  { username: 'Ejoy_Dolo',         password: '602213', role: 'student' },
  { username: 'Albert_Du_Plooy',   password: '601969', role: 'student' },
  { username: 'Maqoba_Mphelo',     password: '602436', role: 'student' },
  { username: 'Ethan_Olgle',       password: '602114', role: 'student' },
  { username: 'Xander_Oosthuyzen', password: '601256', role: 'student' },
  { username: 'Tanya_Richards',    password: '603087', role: 'student' },
  { username: 'Johnathan_Robb',    password: '602367', role: 'student' },
  { username: 'Lethabo_Sekoto',    password: '601740', role: 'student' },
  { username: 'Keegan_Stroud',     password: '601609', role: 'student' },
  { username: 'Admin1',            password: 'Ad1',    role: 'admin'   },
  { username: 'Admin2',            password: 'Ad2',    role: 'admin'   },
];

const loginForm    = document.getElementById('loginForm');
const loginError   = document.getElementById('loginError');
const btnLogin     = document.getElementById('btnLogin');
const loginBtnText = document.getElementById('loginBtnText');
const btnDemoLogin = document.getElementById('btnDemoLogin');
const gateArmLeft  = document.getElementById('gateArmLeft');
const gateArmRight = document.getElementById('gateArmRight');
const loginCard    = document.getElementById('loginCard');
const pwToggle     = document.getElementById('pwToggle');
const loginPassword = document.getElementById('loginPassword');

// Password show/hide toggle
if (pwToggle && loginPassword) {
  pwToggle.addEventListener('click', () => {
    const isPassword = loginPassword.type === 'password';
    loginPassword.type = isPassword ? 'text' : 'password';
    pwToggle.textContent = isPassword ? '🙈' : '👁';
  });
}

function showLoginError(msg) {
  if (!loginError) return;
  loginError.textContent = msg;
  loginError.classList.add('show');
}

function clearLoginError() {
  if (loginError) loginError.classList.remove('show');
}

function setLoginLoading(loading) {
  if (!btnLogin) return;
  btnLogin.disabled = loading;
  if (loginBtnText) loginBtnText.textContent = loading ? 'Signing in...' : 'Sign in';
}

function openGateAndEnter(isAdmin, studentPassword) {
  // Store role and student number in sessionStorage
  sessionStorage.setItem('ww_role', isAdmin ? 'admin' : 'student');
  sessionStorage.setItem('ww_auth', 'true');
  sessionStorage.setItem('ww_password', studentPassword || '');

  // Update alert banner based on role
  const alertBannerText = document.getElementById('alertBannerText');
  if (alertBannerText) {
    if (isAdmin) {
      alertBannerText.textContent = 'Live system — Belgium Campus. Signed in as Administrator.';
    } else if (studentPassword) {
      alertBannerText.textContent = 'Live system — Belgium Campus. Signed in with Microsoft 365 A3.';
    } else {
      alertBannerText.textContent = 'Demo mode — Guest access. Some features may be limited.';
    }
  }

  // Open boom gate
  if (gateArmLeft)  gateArmLeft.classList.add('open');
  if (gateArmRight) gateArmRight.classList.add('open');

  // Fade out login card
  if (loginCard) {
    loginCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    loginCard.style.opacity = '0';
    loginCard.style.transform = 'translate(-50%, -60%)';
  }

  // Transition to home after gate opens
  setTimeout(() => {
    const flash = document.getElementById('loginFlash');
    if (flash) {
      flash.classList.add('active');
      setTimeout(() => {
        window.showPage('home', true);
        flash.classList.remove('active');
        flash.style.pointerEvents = 'none';
      }, 700);
    } else {
      window.showPage('home');
    }
  }, 1400);
}

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearLoginError();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!username || !password) {
      showLoginError('Please enter your username and password.');
      return;
    }

    setLoginLoading(true);

    // Small delay to feel like a real login
    await new Promise(r => setTimeout(r, 800));

    const user = LOGIN_DATA.find(u =>
      u.username.toLowerCase() === username.toLowerCase() &&
      u.password === password
    );

    if (user) {
      openGateAndEnter(user.role === 'admin', password);
    } else {
      showLoginError('Incorrect username or password. Please try again.');
      setLoginLoading(false);
    }
  });
}

// Demo/guest login
if (btnDemoLogin) {
  btnDemoLogin.addEventListener('click', () => {
    sessionStorage.setItem('ww_role', 'guest');
    sessionStorage.setItem('ww_auth', 'guest');
    openGateAndEnter(false, '');
  });
}

// ---- REPORT FORM ----
const WEBHOOK_URL = 'https://defaultea1a909b66004a2582a50c6ed7d051.3b.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/71ca790ac54b4c69957e5c451e76babf/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=V_uvkinLBJyt7YgkCF_zyokYTfRDjv3mSm3BumffIO8';

const reportForm    = document.getElementById('reportForm');
const formSuccess   = document.getElementById('formSuccess');
const formError     = document.getElementById('formError');
const submitBtn     = document.getElementById('submitBtn');
const submitText    = document.getElementById('submitText');
const submitSpinner = document.getElementById('submitSpinner');

function resetForm() {
  if (reportForm) {
    reportForm.reset();
    reportForm.style.display = 'flex';
  }
  if (formSuccess) formSuccess.classList.remove('show');
  if (formError)   formError.classList.remove('show');
}

function setLoading(loading) {
  if (!submitBtn) return;
  submitBtn.disabled = loading;
  if (submitText)    submitText.style.display   = loading ? 'none'   : 'inline';
  if (submitSpinner) submitSpinner.style.display = loading ? 'inline' : 'none';
}

function showError(msg) {
  if (!formError) return;
  formError.textContent = msg;
  formError.classList.add('show');
}

if (reportForm) {
  reportForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (formError) formError.classList.remove('show');

    const studentNumber = document.getElementById('studentNumber').value.trim();
    const animalType    = document.getElementById('animalType').value;
    const area          = document.getElementById('area').value;
    const severity      = document.getElementById('severity').value;
    const locationName  = document.getElementById('locationName').value.trim();
    const description   = document.getElementById('description').value.trim();

    if (!studentNumber || !animalType || !area || !severity || !locationName) {
      showError('Please fill in all required fields.');
      return;
    }

    if (WEBHOOK_URL.includes('PASTE_')) {
      showError('⚠️ Webhook URL not configured yet — paste the Power Automate HTTP trigger URL into script.js.');
      return;
    }

    setLoading(true);

    const payload = {
      StudentNumber: studentNumber,
      AnimalType:    animalType,
      Area:          area,
      Severity:      severity,
      LocationName:  locationName,
      Description:   description,
      ReportedAt:    new Date().toISOString(),
      Source:        'WildWatch Website'
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload)
      });

      if (response.ok || response.status === 202) {
        if (reportForm)   reportForm.style.display = 'none';
        if (formSuccess)  formSuccess.classList.add('show');
      } else {
        showError(`Submission failed (${response.status}). Please try again.`);
      }
    } catch (err) {
      showError('Could not reach the server. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  });
}

// ---- INIT ----
// Add transition overlay to DOM
const overlay = document.createElement('div');
overlay.id = 'transitionOverlay';
overlay.className = 'page-transition-overlay';
document.body.appendChild(overlay);

// Start on login page
showPage('login', true);
initReveal();


// ============================================
//  MY REPORTS PAGE
// ============================================
const REPORTS_WEBHOOK_URL = 'https://defaultea1a909b66004a2582a50c6ed7d051.3b.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/b314370551844a4a949811b6e09ea99a/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=bpCVkmXR9pYN0wFnVC8wO0UC9nDWcqprdHwJh30L6j4';

window.loadMyReports = async function() {
  const loading  = document.getElementById('reportsLoading');
  const error    = document.getElementById('reportsError');
  const empty    = document.getElementById('reportsEmpty');
  const grid     = document.getElementById('reportsGrid');
  const numEl    = document.getElementById('reportsStudentNum');

  // Get logged in student number from sessionStorage
  const studentNumber = sessionStorage.getItem('ww_password') || '';

  if (numEl) numEl.textContent = studentNumber || 'Unknown';

  // Show loading
  if (loading) loading.style.display = 'flex';
  if (error)   error.style.display   = 'none';
  if (empty)   empty.style.display   = 'none';
  if (grid)    grid.style.display    = 'none';

  try {
    const response = await fetch(REPORTS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentNumber })
    });

    const data = await response.json();
    const reports = Array.isArray(data) ? data : (data.value || []);

    if (loading) loading.style.display = 'none';

    if (!reports || reports.length === 0) {
      if (empty) empty.style.display = 'flex';
      return;
    }

    // Build report cards
    grid.innerHTML = reports.map(r => {
      const statusRaw = r.Status?.Value || r.Status || 'New';
      const status    = (typeof statusRaw === 'string' ? statusRaw : 'New').toLowerCase().replace(/\s/g, '');
      const severity  = r.Severity || '';
      const animal    = r['Animal_x0020_Type'] || r.AnimalType || 'Unknown';
      const area      = r.Area || '—';
      const location  = r.Location || '—';
      const desc      = r.Description || '—';
      const date      = r.DateTimeReported
        ? new Date(r.DateTimeReported).toLocaleDateString('en-ZA', { year:'numeric', month:'short', day:'numeric' })
        : '—';
      const incidentId = r.IncidentID || r.ID || '—';
      const imgUrl    = r.Image?.Large || r.Image?.Medium || '';

      const sevClass  = severity === 'High' ? 'sev-high' : severity === 'Medium' ? 'sev-medium' : 'sev-low';
      const statClass = status === 'new' ? 'status-new'
                      : status === 'acknowledged' ? 'status-acknowledged'
                      : status === 'inprogress' || status === 'in progress' ? 'status-inprogress'
                      : status === 'resolved' ? 'status-resolved' : 'status-new';

      return `
        <div class="report-card">
          <div class="report-card-header">
            <span class="report-card-id">Incident #${incidentId}</span>
            <span class="report-status ${statClass}">${statusRaw}</span>
          </div>
          <div class="report-card-body">
            <div class="report-animal">${animal}</div>
            <div class="report-date">📅 ${date}</div>
            <div class="report-field">
              <span class="report-field-label">Area</span>
              <span class="report-field-value">${area}</span>
            </div>
            <div class="report-field">
              <span class="report-field-label">Location</span>
              <span class="report-field-value">${location}</span>
            </div>
            <div class="report-field">
              <span class="report-field-label">Severity</span>
              <span class="report-field-value"><span class="report-severity ${sevClass}">${severity || '—'}</span></span>
            </div>
            <div class="report-field">
              <span class="report-field-label">Description</span>
              <span class="report-field-value">${desc}</span>
            </div>
          </div>
          ${imgUrl ? `<img src="${imgUrl}" alt="${animal}" class="report-card-img" loading="lazy">` : ''}
        </div>`;
    }).join('');

    grid.style.display = 'grid';

  } catch (err) {
    if (loading) loading.style.display = 'none';
    if (error) {
      document.getElementById('reportsErrorMsg').textContent = err.message;
      error.style.display = 'flex';
    }
  }
};

// Auto-load when reports page becomes active
const origShowPage = window.showPage;
window.showPage = function(name, skipTransition) {
  origShowPage(name, skipTransition);
  if (name === 'reports') {
    setTimeout(window.loadMyReports, 400);
  }
};