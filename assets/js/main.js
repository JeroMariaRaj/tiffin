/**
 * Taste of South – South Indian Kitchen
 * Master JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Theme Toggle (Dark / Light Mode)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('annapoorna_theme');

  const sunIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const moonIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
      themeToggleBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
  }

  const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('annapoorna_theme', newTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 2. RTL Toggle (LTR / RTL Mode)
  // --------------------------------------------------------------------------
  const rtlToggleBtn = document.getElementById('rtlToggleBtn');
  const savedRtl = localStorage.getItem('annapoorna_rtl');

  if (savedRtl === 'true') {
    document.documentElement.setAttribute('dir', 'rtl');
    if (rtlToggleBtn) rtlToggleBtn.innerText = 'LTR';
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    if (rtlToggleBtn) rtlToggleBtn.innerText = 'RTL';
  }

  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      if (isRtl) {
        document.documentElement.setAttribute('dir', 'ltr');
        localStorage.setItem('annapoorna_rtl', 'false');
        rtlToggleBtn.innerText = 'RTL';
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('annapoorna_rtl', 'true');
        rtlToggleBtn.innerText = 'LTR';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Sticky Header on Scroll
  // --------------------------------------------------------------------------
  const header = document.querySelector('.annapoorna-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // --------------------------------------------------------------------------
  // 4. Mobile Navigation Drawer
  // --------------------------------------------------------------------------
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
  const mobileClose = document.querySelector('.mobile-drawer-close');

  function openMobileNav() {
    mobileDrawer?.classList.add('active');
    mobileBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileDrawer?.classList.remove('active');
    mobileBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openMobileNav);
  mobileClose?.addEventListener('click', closeMobileNav);
  mobileBackdrop?.addEventListener('click', closeMobileNav);

  // Accordion inside mobile drawer
  const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-toggle');
  mobileDropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = trigger.closest('.mobile-nav-item');
      const dropdown = parent?.querySelector('.mobile-dropdown');
      dropdown?.classList.toggle('open');
    });
  });

  // --------------------------------------------------------------------------
  // 5. Reservation Modal
  // --------------------------------------------------------------------------
  function getOrCreateReservationModal() {
    let modal = document.getElementById('reservationModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'reservationModal';
      modal.className = 'reservation-modal-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'modalTitle');
      modal.innerHTML = `
        <div class="reservation-modal-card">
          <button id="closeReservationModal" class="modal-close-btn" aria-label="Close Modal">&times;</button>
          <div style="text-align:center; margin-bottom:1.5rem;">
            <span class="section-badge badge-gold">Reservation</span>
            <h3 id="modalTitle" style="font-size:2rem; margin-bottom:0.25rem;">Reserve Your Table</h3>
            <p style="font-size:0.92rem; margin:0;">Experience traditional hospitality. We hold reservations for 15 minutes.</p>
          </div>

          <form action="https://formsubmit.co/annapoorna.chennai@gmail.com" method="POST" data-formsubmit>
            <input type="hidden" name="_subject" value="New Table Reservation – Taste of South Restaurant">
            <input type="hidden" name="_captcha" value="false">

            <div class="row g-3">
              <div class="col-md-6">
                <div class="form-group mb-2">
                  <label class="form-label">Full Name *</label>
                  <input type="text" name="name" class="form-control-custom" placeholder="e.g. Ramesh Kumar" required>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-2">
                  <label class="form-label">Phone Number *</label>
                  <input type="tel" name="phone" class="form-control-custom" placeholder="+91 98765 43210" required>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-2">
                  <label class="form-label">Email Address *</label>
                  <input type="email" name="email" class="form-control-custom" placeholder="ramesh@example.com" required>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-2">
                  <label class="form-label">Number of Guests *</label>
                  <select name="guests" class="form-control-custom" required>
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests" selected>2 Guests</option>
                    <option value="4 Guests">4 Guests</option>
                    <option value="6 Guests">6 Guests</option>
                    <option value="8+ Large Family">8+ Large Family</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-2">
                  <label class="form-label">Reservation Date *</label>
                  <input type="date" name="date" class="form-control-custom" required>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-2">
                  <label class="form-label">Meal Session *</label>
                  <select name="session" class="form-control-custom" required>
                    <option value="Morning Tiffin (7:30 AM - 10:30 AM)">Morning Tiffin (7:30 AM - 10:30 AM)</option>
                    <option value="Traditional Lunch (12:30 PM - 3:00 PM)">Traditional Lunch (12:30 PM - 3:00 PM)</option>
                    <option value="Evening Snacks (5:00 PM - 7:00 PM)">Evening Snacks (5:00 PM - 7:00 PM)</option>
                    <option value="Dinner Tiffin (7:30 PM - 10:00 PM)">Dinner Tiffin (7:30 PM - 10:00 PM)</option>
                  </select>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group mb-3">
                  <label class="form-label">Special Requests / Seating Preference</label>
                  <textarea name="notes" class="form-control-custom" placeholder="e.g. Traditional floor banana leaf seating or quiet veranda table" rows="2"></textarea>
                </div>
              </div>
            </div>

            <button type="submit" class="btn-annapoorna btn-primary-gold w-100 btn-lg">Confirm Table Reservation</button>
            <div class="form-feedback"></div>
          </form>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#closeReservationModal')?.addEventListener('click', closeReservation);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeReservation();
      });
    }
    return modal;
  }

  function openReservation() {
    const modal = getOrCreateReservationModal();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Auto-populate default date if empty
    const dateInput = modal.querySelector('input[type="date"]');
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }
  }

  function closeReservation() {
    const modal = document.getElementById('reservationModal');
    if (modal) {
      modal.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  // Handle all reservation triggers via event delegation
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-reservation-modal, [data-trigger="reservation"]');
    if (trigger) {
      e.preventDefault();
      openReservation();
      return;
    }

    // Modal close button
    if (e.target.closest('#closeReservationModal')) {
      const activeResModal = document.getElementById('reservationModal');
      if (activeResModal) {
        e.preventDefault();
        closeReservation();
        return;
      }
    }

    // Modal backdrop click
    const resModal = document.getElementById('reservationModal');
    if (resModal && e.target === resModal) {
      closeReservation();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeReservation();
    }
  });

  // --------------------------------------------------------------------------
  // 6. Form Validation & Submission Popup
  // --------------------------------------------------------------------------
  function createSubmissionPopup() {
    let popup = document.getElementById('submissionSuccessPopup');
    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'submissionSuccessPopup';
      popup.className = 'submission-popup-backdrop';
      popup.setAttribute('role', 'dialog');
      popup.setAttribute('aria-modal', 'true');
      popup.setAttribute('aria-labelledby', 'popupSuccessTitle');
      popup.innerHTML = `
        <div class="submission-popup-card">
          <button type="button" class="submission-popup-close-x" id="popupCloseX" aria-label="Close dialog">&times;</button>
          <div class="submission-popup-icon-wrap">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 id="popupSuccessTitle" class="submission-popup-title">Submitted Successfully!</h3>
          <p id="popupSuccessDesc" class="submission-popup-desc">
            Thank you for reaching out to Taste of South. Your request has been received with warm hospitality. Our team will contact you shortly to confirm your booking details.
          </p>
          <div id="popupSuccessRef" class="submission-popup-ref">BOOKING REF: TOS-2026-8419</div>
          <div>
            <button type="button" id="popupCloseBtn" class="btn-annapoorna btn-primary-gold w-100">Done / Continue</button>
          </div>
        </div>
      `;
      document.body.appendChild(popup);

      const closePopup = () => {
        popup.classList.remove('active');
        document.body.style.overflow = '';
      };

      popup.querySelector('#popupCloseX').addEventListener('click', closePopup);
      popup.querySelector('#popupCloseBtn').addEventListener('click', closePopup);
      popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
          closePopup();
        }
      });
    }
    return popup;
  }

  function showSubmissionSuccessPopup(customMessage) {
    const popup = createSubmissionPopup();
    const refCode = 'TOS-2026-' + Math.floor(1000 + Math.random() * 9000);
    const refEl = popup.querySelector('#popupSuccessRef');
    if (refEl) refEl.innerText = 'REFERENCE CODE: ' + refCode;
    
    if (customMessage) {
      const descEl = popup.querySelector('#popupSuccessDesc');
      if (descEl) descEl.innerText = customMessage;
    }

    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  const allForms = document.querySelectorAll('form');
  allForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Check native HTML5 validity
      if (!form.checkValidity()) {
        form.reportValidity();
        const feedback = form.querySelector('.form-feedback');
        if (feedback) {
          feedback.className = 'form-feedback error';
          feedback.innerText = 'Please complete all required fields correctly.';
          feedback.style.display = 'block';
        }
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
      }

      // Short delay to give a realistic submission feel, then show popup
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }

        // Close reservation modal if open
        if (typeof closeReservation === 'function') {
          closeReservation();
        }
        const activeModal = document.querySelector('.reservation-modal-backdrop.active');
        if (activeModal) activeModal.classList.remove('active');

        // Reset form
        form.reset();
        const feedback = form.querySelector('.form-feedback');
        if (feedback) {
          feedback.style.display = 'none';
        }

        // Show success popup
        showSubmissionSuccessPopup();
      }, 450);
    });
  });

  // --------------------------------------------------------------------------
  // 7. Back to Top Button
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('active');
    } else {
      backToTopBtn?.classList.remove('active');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --------------------------------------------------------------------------
  // 8. Gallery Lightbox Preview
  // --------------------------------------------------------------------------
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;
        
        const lightbox = document.createElement('div');
        lightbox.className = 'reservation-modal-backdrop active';
        lightbox.innerHTML = `
          <div style="position:relative; max-width:90vw; max-height:90vh; display:flex; align-items:center; justify-content:center;">
            <img src="${img.src}" alt="${img.alt}" style="max-width:100%; max-height:85vh; border-radius:12px; border:2px solid var(--color-gold); box-shadow:0 15px 40px rgba(0,0,0,0.8);">
            <button class="modal-close-btn" style="position:absolute; top:-40px; right:0; color:#fff; font-size:1.8rem; background:none; border:none; cursor:pointer;">&times;</button>
          </div>
        `;
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox || e.target.classList.contains('modal-close-btn')) {
            lightbox.remove();
            document.body.style.overflow = '';
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 9. Stats Animated Counters
  // --------------------------------------------------------------------------
  const counterElements = document.querySelectorAll('[data-counter]');
  let countersAnimated = false;

  function runCounters() {
    counterElements.forEach(el => {
      const target = +el.getAttribute('data-counter');
      const suffix = el.getAttribute('data-suffix') || '';
      let count = 0;
      const speed = target / 50;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          el.innerText = Math.ceil(count) + suffix;
          requestAnimationFrame(updateCount);
        } else {
          el.innerText = target + suffix;
        }
      };
      updateCount();
    });
  }

  if (counterElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          runCounters();
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => observer.observe(el));
  }
});
