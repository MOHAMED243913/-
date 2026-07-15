/* Wishlist page: renders products saved to localStorage wishlist */
function renderWishlistPage() {
  const grid = document.getElementById('wishlistGrid');
  const count = document.getElementById('wishlistCount');
  if (!grid) return;

  const ids = loadWishlist();
  const items = ids.map(id => getProductById(id)).filter(Boolean);

  count.textContent = items.length > 0 ? `لديك ${items.length} منتج في المفضلة` : '';

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        ${Icon('heart')}
        <h3>لا توجد منتجات في المفضلة بعد</h3>
        <p>اضغط على أيقونة القلب في أي منتج لإضافته هنا</p>
        <a href="products.html" class="btn btn-primary" style="margin-top:18px;">تصفح المتجر</a>
      </div>`;
    return;
  }

  grid.innerHTML = items.map(productCardHTML).join('');
  updateCartUI();
}

document.addEventListener('DOMContentLoaded', renderWishlistPage);
document.addEventListener('wishlist:change', renderWishlistPage);
