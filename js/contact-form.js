/* Contact page: client-side form handling */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const successBox = document.getElementById('formSuccess');

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    successBox.classList.add('show');
    form.reset();
    successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => successBox.classList.remove('show'), 6000);
  });
});
