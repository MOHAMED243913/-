/* Product detail page: reads ?id= and renders product info + related products */
function renderProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = getProductById(id);
  const container = document.getElementById('productDetail');
  const breadcrumb = document.getElementById('breadcrumb');
  const relatedSection = document.getElementById('relatedSection');
  const relatedGrid = document.getElementById('relatedProducts');

  if (!product) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        ${Icon('search')}
        <h3>هذا المنتج غير موجود</h3>
        <p>ربما تم حذفه أو تغيير رابطه، جرّب تصفح المتجر بدلاً من ذلك</p>
        <a href="products.html" class="btn btn-primary" style="margin-top:18px;">تصفح المتجر</a>
      </div>`;
    container.style.display = 'block';
    breadcrumb.innerHTML = `<a href="index.html">الرئيسية</a><span>/</span><a href="products.html">المتجر</a><span>/</span><span>منتج غير موجود</span>`;
    if (relatedSection) relatedSection.style.display = 'none';
    return;
  }

  document.title = product.name + ' | صبرة لأنظمة التبريد';

  breadcrumb.innerHTML = `
    <a href="index.html">الرئيسية</a><span>/</span>
    <a href="products.html">المتجر</a><span>/</span>
    <a href="products.html?cat=${product.category}">${getCategoryLabel(product.category)}</a><span>/</span>
    <span>${product.name}</span>`;

  const wishActive = loadWishlist().includes(product.id) ? 'active' : '';
  const badge = product.badge ? `<span class="product-badge">${product.badge}</span>` : (!product.inStock ? `<span class="product-badge stock-out">غير متوفر</span>` : '');
  const oldPrice = product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : '';

  container.innerHTML = `
    <div class="pd-media" style="background:${product.grad}">
      ${badge}
      <div style="color:#0a5c8a">${Icon(product.icon)}</div>
    </div>
    <div class="pd-info">
      <div class="product-cat">${getCategoryLabel(product.category)}</div>
      <h1>${product.name}</h1>
      <div class="product-rating">${renderStars(product.rating)}<span>(${product.reviews} تقييم)</span></div>
      <p class="pd-desc">${product.desc}</p>
      <div class="pd-price">${formatPrice(product.price)} ${oldPrice}</div>
      <div class="pd-qty-row">
        <div class="qty-stepper qty-stepper-lg">
          <button id="pdMinus" aria-label="إنقاص الكمية">${Icon('minus')}</button>
          <span id="pdQty">1</span>
          <button id="pdPlus" aria-label="زيادة الكمية">${Icon('plus')}</button>
        </div>
        <button class="btn btn-primary" id="pdAddCart" ${product.inStock ? '' : 'disabled'}>${Icon('cart')} ${product.inStock ? 'أضف إلى السلة' : 'غير متوفر حاليًا'}</button>
        <button class="wishlist-btn pd-wish ${wishActive}" data-wishlist="${product.id}" onclick="toggleWishlist('${product.id}')" aria-label="إضافة للمفضلة">${Icon('heart')}</button>
      </div>
      <div class="pd-trust">
        <span>${Icon('shield')} ضمان رسمي</span>
        <span>${Icon('truck')} توصيل وتركيب سريع</span>
        <span>${Icon('wrench')} صيانة مدعومة</span>
      </div>
      <div class="spec-table">
        <h4>المواصفات</h4>
        ${product.specs.map(s => `<div class="spec-row"><span>${s.label}</span><span>${s.value}</span></div>`).join('')}
      </div>
    </div>`;

  let qty = 1;
  const qtyEl = document.getElementById('pdQty');
  document.getElementById('pdPlus').addEventListener('click', () => { qty++; qtyEl.textContent = qty; });
  document.getElementById('pdMinus').addEventListener('click', () => { if (qty > 1) { qty--; qtyEl.textContent = qty; } });
  document.getElementById('pdAddCart').addEventListener('click', () => addToCart(product.id, qty));

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  if (related.length && relatedGrid) {
    relatedGrid.innerHTML = related.map(productCardHTML).join('');
  } else if (relatedSection) {
    relatedSection.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', renderProductDetail);
