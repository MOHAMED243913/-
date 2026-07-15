/* Service page: reads ?key= and renders content from SERVICES data */
function renderServicePage() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get('key') || 'home';
  const service = SERVICES[key];
  const hero = document.getElementById('serviceHero');
  const featuresGrid = document.getElementById('serviceFeatures');
  const stepsGrid = document.getElementById('serviceSteps');
  const productsGrid = document.getElementById('serviceProducts');
  const productsSection = document.getElementById('serviceProductsSection');
  const ctaBanner = document.getElementById('serviceCTA');

  if (!service) {
    hero.style.background = 'linear-gradient(120deg, var(--dark), var(--primary-dark))';
    hero.innerHTML = `
      <div class="service-hero-text">
        <h1>الخدمة غير موجودة</h1>
        <p class="tagline">جرّب تصفح خدماتنا من الرئيسية أو تواصل معنا مباشرة</p>
        <div class="service-hero-actions">
          <a href="index.html" class="btn btn-accent">الرئيسية</a>
        </div>
      </div>`;
    return;
  }

  document.title = service.title + ' | صبرة لأنظمة التبريد';
  hero.style.background = service.grad;
  hero.innerHTML = `
    <div class="icon-badge">${Icon(service.icon)}</div>
    <div class="service-hero-text">
      <div class="breadcrumb"><a href="index.html">الرئيسية</a><span>/</span><span>${service.title}</span></div>
      <h1>${service.title}</h1>
      <p class="tagline">${service.tagline}</p>
      <div class="service-hero-actions">
        <a href="contact.html" class="btn btn-accent">اطلب الخدمة الآن</a>
        <a href="products.html?cat=${service.category}" class="btn btn-outline">تصفح المنتجات</a>
      </div>
    </div>`;

  document.getElementById('serviceIntroText').textContent = service.intro;

  featuresGrid.innerHTML = service.features.map(f => `
    <div class="service-card">
      <div class="icon-wrap">${Icon(f.icon)}</div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </div>`).join('');

  stepsGrid.innerHTML = SERVICE_STEPS.map((s, i) => `
    <div class="process-step">
      <div class="step-num">${i + 1}</div>
      <h4>${s.title}</h4>
      <p>${s.desc}</p>
    </div>`).join('');

  const related = PRODUCTS.filter(p => p.category === service.category).slice(0, 6);
  if (related.length) {
    productsGrid.innerHTML = related.map(productCardHTML).join('');
  } else if (productsSection) {
    productsSection.style.display = 'none';
  }

  ctaBanner.innerHTML = `
    <div>
      <h2>هل تحتاج استشارة فنية مجانية عن ${service.title}؟</h2>
      <p>تواصل معنا الآن وسيقوم فريقنا بمعاينة موقعك وتقديم أفضل الحلول المناسبة لاحتياجاتك.</p>
    </div>
    <div class="cta-actions">
      <a href="contact.html" class="btn btn-accent">تواصل معنا</a>
      <a href="products.html?cat=${service.category}" class="btn btn-outline">تصفح المنتجات</a>
    </div>`;
}

document.addEventListener('DOMContentLoaded', renderServicePage);
