/* Builds the shared header, footer and floating widgets on every page */
const NAV_LINKS = [
  { href: 'index.html', key: 'home', label: 'الرئيسية' },
  { href: 'products.html', key: 'products', label: 'المتجر' },
  { href: 'about.html', key: 'about', label: 'من نحن' },
  { href: 'contact.html', key: 'contact', label: 'اتصل بنا' }
];

function renderHeader(active) {
  const desktopLinks = NAV_LINKS.map(l => `<li><a href="${l.href}" class="${l.key === active ? 'active' : ''}">${l.label}</a></li>`).join('');
  const mobileLinks = NAV_LINKS.map(l => `<li><a href="${l.href}" class="${l.key === active ? 'active' : ''}">${l.label}</a></li>`).join('');

  return `
  <header class="site-header">
    <div class="topbar">
      <div class="container">
        <div class="topbar-info">
          <span>${Icon('phone')} <a href="tel:+201000000000">01000000000</a></span>
          <span>${Icon('mail')} <a href="mailto:info@sabra-cooling.com">info@sabra-cooling.com</a></span>
          <span>${Icon('location')} القاهرة، مصر — نخدم كل المحافظات</span>
        </div>
        <div class="topbar-social">
          <a href="#" aria-label="فيسبوك">${Icon('facebook')}</a>
          <a href="#" aria-label="انستجرام">${Icon('instagram')}</a>
          <a href="#" aria-label="تويتر">${Icon('twitter')}</a>
        </div>
      </div>
    </div>

    <nav class="navbar container">
      <a href="index.html" class="logo">
        <span class="logo-icon">${Icon('snowflake')}</span>
        <span>صبرة<br><small>لأنظمة التبريد</small></span>
      </a>

      <ul class="nav-links">${desktopLinks}</ul>

      <div class="nav-actions">
        <button class="icon-btn" id="cartToggle" aria-label="سلة المشتريات">
          ${Icon('cart')}
          <span class="cart-count">0</span>
        </button>
        <a href="products.html" class="btn btn-primary btn-sm">تسوق الآن</a>
        <button class="menu-toggle" id="menuToggle" aria-label="القائمة">${Icon('menu')}</button>
      </div>
    </nav>
  </header>

  <aside class="mobile-nav" id="mobileNav">
    <div class="mobile-nav-head">
      <span class="logo"><span class="logo-icon">${Icon('snowflake')}</span></span>
      <button class="cart-close" id="mobileNavClose">${Icon('close')}</button>
    </div>
    <ul>${mobileLinks}</ul>
    <a href="products.html" class="btn btn-primary btn-block">تسوق الآن</a>
  </aside>`;
}

function renderFooter() {
  return `
  <div class="container">
    <div class="footer-grid">
      <div class="footer-about">
        <a href="index.html" class="logo">
          <span class="logo-icon">${Icon('snowflake')}</span>
          <span>صبرة<br><small style="color:rgba(255,255,255,0.5)">لأنظمة التبريد</small></span>
        </a>
        <p>شركة رائدة في بيع وتركيب وصيانة أنظمة التكييف والتبريد المنزلية والتجارية والصناعية بخبرة تمتد لأكثر من 15 عامًا.</p>
        <div class="footer-social">
          <a href="#" aria-label="فيسبوك">${Icon('facebook')}</a>
          <a href="#" aria-label="انستجرام">${Icon('instagram')}</a>
          <a href="#" aria-label="تويتر">${Icon('twitter')}</a>
          <a href="#" aria-label="لينكدإن">${Icon('linkedin')}</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>روابط سريعة</h4>
        <ul>
          <li><a href="index.html">الرئيسية</a></li>
          <li><a href="products.html">المتجر</a></li>
          <li><a href="about.html">من نحن</a></li>
          <li><a href="contact.html">اتصل بنا</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>أقسام المتجر</h4>
        <ul>
          <li><a href="products.html?cat=home">تكييف منزلي</a></li>
          <li><a href="products.html?cat=central">تكييف مركزي وتجاري</a></li>
          <li><a href="products.html?cat=cooling">تبريد تجاري وصناعي</a></li>
          <li><a href="products.html?cat=parts">قطع غيار وملحقات</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>تواصل معنا</h4>
        <ul class="footer-contact">
          <li>${Icon('location')} <span>القاهرة، مصر — نخدم كل المحافظات</span></li>
          <li>${Icon('phone')} <a href="tel:+201000000000">01000000000</a></li>
          <li>${Icon('mail')} <a href="mailto:info@sabra-cooling.com">info@sabra-cooling.com</a></li>
          <li>${Icon('clock')} <span>يوميًا من 9 صباحًا حتى 10 مساءً</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span id="year"></span> صبرة لأنظمة التبريد. جميع الحقوق محفوظة.</span>
      <span><a href="#">سياسة الخصوصية</a> · <a href="#">الشروط والأحكام</a></span>
    </div>
  </div>`;
}

function renderWidgets() {
  return `
  <div class="overlay" id="overlay"></div>

  <aside class="cart-drawer" id="cartDrawer">
    <div class="cart-drawer-head">
      <h3>${Icon('cart')} سلة المشتريات</h3>
      <button class="cart-close" id="cartClose">${Icon('close')}</button>
    </div>
    <div class="cart-items" id="cartItems"></div>
    <div class="cart-drawer-foot" id="cartFooter">
      <div class="cart-summary-row"><span>عدد المنتجات</span><span id="cartSubtotal">0 ج.م</span></div>
      <div class="cart-summary-row total"><span>الإجمالي</span><span id="cartTotal">0 ج.م</span></div>
      <button class="btn btn-primary btn-block" id="checkoutBtn">إتمام الطلب عبر واتساب</button>
    </div>
  </aside>

  <div class="toast" id="toast">${Icon('check')}<span></span></div>

  <a href="https://wa.me/201000000000" class="whatsapp-float" target="_blank" aria-label="تواصل عبر واتساب">${Icon('whatsapp')}</a>`;
}

function mountLayout(active) {
  const headerMount = document.getElementById('site-header');
  const footerMount = document.getElementById('site-footer');
  const widgetsMount = document.getElementById('site-widgets');
  if (headerMount) headerMount.outerHTML = renderHeader(active);
  if (footerMount) footerMount.innerHTML = renderFooter();
  if (widgetsMount) widgetsMount.outerHTML = renderWidgets();
}
