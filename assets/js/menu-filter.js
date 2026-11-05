/**
 * Taste of South – South Indian Kitchen
 * Interactive Menu Filtering & Live Dish Search
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-pill-btn');
  const foodCards = document.querySelectorAll('.food-card-wrapper');
  const searchInput = document.getElementById('menuSearchInput');
  const emptyState = document.getElementById('menuEmptyState');
  const resultCounter = document.getElementById('menuResultCount');

  let activeCategory = 'all';
  let searchQuery = '';

  function filterMenu() {
    let visibleCount = 0;

    foodCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardTitle = card.querySelector('.food-title')?.innerText.toLowerCase() || '';
      const cardDesc = card.querySelector('.food-desc')?.innerText.toLowerCase() || '';
      const cardRegional = card.querySelector('.food-regional-name')?.innerText.toLowerCase() || '';

      const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
      const matchesSearch = searchQuery === '' || 
        cardTitle.includes(searchQuery) || 
        cardDesc.includes(searchQuery) || 
        cardRegional.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    if (resultCounter) {
      resultCounter.innerText = `Showing ${visibleCount} delicious dishes`;
    }
  }

  // Category Pill Clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter') || 'all';
      filterMenu();
    });
  });

  // Search Input Keyup
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterMenu();
    });
  }

  // Quick View Modal for Food Cards
  const quickViewBtns = document.querySelectorAll('.open-dish-modal');
  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.food-card');
      if (!card) return;

      const title = card.querySelector('.food-title')?.innerText || '';
      const regional = card.querySelector('.food-regional-name')?.innerText || '';
      const desc = card.querySelector('.food-desc')?.innerText || '';
      const price = card.querySelector('.food-price')?.innerText || '';
      const imgSrc = card.querySelector('.food-card-thumb img')?.src || '';

      const modal = document.createElement('div');
      modal.className = 'reservation-modal-backdrop active';
      modal.innerHTML = `
        <div class="reservation-modal-card" style="max-width: 640px; padding: 0; overflow: hidden;">
          <button class="modal-close-btn" style="z-index: 10; background: rgba(0,0,0,0.6); color: #fff; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">&times;</button>
          <div style="height: 280px; position: relative;">
            <img src="${imgSrc}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div style="padding: 2rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <span class="veg-indicator"><span class="dot"></span></span>
              <span style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 700; color: var(--color-terracotta);">${price}</span>
            </div>
            <h3 style="font-size: 2rem; margin-bottom: 0.25rem;">${title}</h3>
            <p style="font-family: var(--font-accent); font-style: italic; color: var(--color-terracotta); margin-bottom: 1rem;">${regional}</p>
            <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 1.5rem;">${desc}</p>
            <div style="display: flex; gap: 1rem; align-items: center;">
              <button class="btn-annapoorna btn-primary-gold open-reservation-modal" style="flex: 1;">Order for Table</button>
              <button class="btn-annapoorna btn-outline-forest close-this-modal" style="flex: 1;">Back to Menu</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';

      const closeThis = () => {
        modal.remove();
        document.body.style.overflow = '';
      };

      modal.querySelector('.modal-close-btn')?.addEventListener('click', closeThis);
      modal.querySelector('.close-this-modal')?.addEventListener('click', closeThis);
      modal.querySelector('.open-reservation-modal')?.addEventListener('click', () => {
        closeThis();
        const resModal = document.getElementById('reservationModal');
        resModal?.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
      modal.addEventListener('click', (ev) => {
        if (ev.target === modal) closeThis();
      });
    });
  });
});
