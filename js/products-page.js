/* Store page: filtering, search, sort */
(function () {
  const MAX_PRICE = Math.max(...PRODUCTS.map(p => p.price));
  const state = {
    cats: new Set(),
    search: '',
    maxPrice: MAX_PRICE,
    sort: 'default'
  };

  function buildSidebar() {
    const wrap = document.getElementById('categoryFilters');
    wrap.innerHTML = CATEGORIES.map(c => {
      const count = PRODUCTS.filter(p => p.category === c.key).length;
      return `
      <label class="filter-option">
        <span class="filter-option-inner">
          <input type="checkbox" value="${c.key}" class="cat-check">
          ${c.label}
        </span>
        <span class="count">${count}</span>
      </label>`;
    }).join('');

    document.getElementById('priceRange').max = MAX_PRICE;
    document.getElementById('priceRange').value = MAX_PRICE;
    document.getElementById('priceValue').textContent = formatPrice(MAX_PRICE);

    wrap.querySelectorAll('.cat-check').forEach(chk => {
      chk.addEventListener('change', () => {
        if (chk.checked) state.cats.add(chk.value);
        else state.cats.delete(chk.value);
        render();
      });
    });
  }

  function applyFilters() {
    let list = PRODUCTS.slice();

    if (state.cats.size > 0) {
      list = list.filter(p => state.cats.has(p.category));
    }
    if (state.search.trim()) {
      const q = state.search.trim().toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
    }
    list = list.filter(p => p.price <= state.maxPrice);

    switch (state.sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return list;
  }

  function render() {
    const list = applyFilters();
    const grid = document.getElementById('productsGrid');
    const count = document.getElementById('resultsCount');
    count.textContent = `عرض ${list.length} من ${PRODUCTS.length} منتج`;

    if (list.length === 0) {
      grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        ${Icon('search')}
        <h3>لا توجد منتجات مطابقة</h3>
        <p>جرّب تعديل الفلاتر أو كلمات البحث</p>
      </div>`;
      return;
    }
    grid.innerHTML = list.map(productCardHTML).join('');
    updateCartUI();
  }

  function resetFilters() {
    state.cats.clear();
    state.search = '';
    state.maxPrice = MAX_PRICE;
    state.sort = 'default';
    document.querySelectorAll('.cat-check').forEach(c => c.checked = false);
    document.getElementById('searchInput').value = '';
    document.getElementById('sortSelect').value = 'default';
    document.getElementById('priceRange').value = MAX_PRICE;
    document.getElementById('priceValue').textContent = formatPrice(MAX_PRICE);
    render();
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildSidebar();

    const params = new URLSearchParams(window.location.search);
    const initialCat = params.get('cat');
    if (initialCat && CATEGORIES.some(c => c.key === initialCat)) {
      state.cats.add(initialCat);
      const chk = document.querySelector(`.cat-check[value="${initialCat}"]`);
      if (chk) chk.checked = true;
    }

    document.getElementById('searchInput').addEventListener('input', e => {
      state.search = e.target.value;
      render();
    });
    document.getElementById('sortSelect').addEventListener('change', e => {
      state.sort = e.target.value;
      render();
    });
    document.getElementById('priceRange').addEventListener('input', e => {
      state.maxPrice = parseInt(e.target.value, 10);
      document.getElementById('priceValue').textContent = formatPrice(state.maxPrice);
      render();
    });
    document.getElementById('resetFilters').addEventListener('click', resetFilters);

    render();
  });
})();
