/**
 * Taste of South – South Indian Kitchen
 * Blog Search & Filter Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('blogSearchInput');
  const blogCards = document.querySelectorAll('.blog-card-item');
  const categoryFilters = document.querySelectorAll('.blog-cat-link');
  const emptyNotice = document.getElementById('blogEmptyNotice');

  let activeCat = 'all';
  let searchTerm = '';

  function filterPosts() {
    let matchCount = 0;

    blogCards.forEach(card => {
      const postCat = card.getAttribute('data-category') || '';
      const title = card.querySelector('.blog-card-title')?.innerText.toLowerCase() || '';
      const excerpt = card.querySelector('.blog-excerpt')?.innerText.toLowerCase() || '';

      const matchCat = (activeCat === 'all' || postCat === activeCat);
      const matchSearch = searchTerm === '' || title.includes(searchTerm) || excerpt.includes(searchTerm);

      if (matchCat && matchSearch) {
        card.style.display = 'block';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyNotice) {
      emptyNotice.style.display = matchCount === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      filterPosts();
    });
  }

  categoryFilters.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      categoryFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.getAttribute('data-filter') || 'all';
      filterPosts();
    });
  });
});
