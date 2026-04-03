document.addEventListener('DOMContentLoaded', function() {

  // ===== ACCORDION =====
  const accordionBtns = document.querySelectorAll('.accordion-btn');
  accordionBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const content = this.nextElementSibling;
      document.querySelectorAll('.accordion-content').forEach(function(c) {
        if (c !== content) c.classList.remove('open');
      });
      content.classList.toggle('open');
    });
  });

  // ===== WEATHER API =====
  const weatherDiv = document.getElementById('weather');
  if (weatherDiv) {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=53.3498&longitude=-6.2603&current_weather=true')
      .then(function(response) { return response.json(); })
      .then(function(data) {
        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;
        const code = data.current_weather.weathercode;
        let description = 'Clear skies';
        if (code >= 1 && code <= 3) description = 'Partly cloudy';
        if (code >= 45 && code <= 48) description = 'Foggy';
        if (code >= 51 && code <= 67) description = 'Rainy';
        if (code >= 71 && code <= 77) description = 'Snowy';
        if (code >= 80 && code <= 82) description = 'Showers';
        if (code >= 95) description = 'Thunderstorms';
        weatherDiv.innerHTML = '🌤️ Dublin: ' + temp + '°C — ' + description + ' | 💨 Wind: ' + wind + ' km/h';
      })
      .catch(function() {
        weatherDiv.innerText = 'Weather info unavailable right now.';
      });
  }

  // ===== IMAGE SLIDER =====
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let current = 0;

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;
    document.querySelector('.slides').style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach(function(dot) { dot.classList.remove('active'); });
    if (dots[current]) dots[current].classList.add('active');
  }

  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  if (prevBtn) prevBtn.addEventListener('click', function() { goToSlide(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function() { goToSlide(current + 1); });

  dots.forEach(function(dot) {
    dot.addEventListener('click', function() {
      goToSlide(parseInt(this.getAttribute('data-index')));
    });
  });

  if (slides.length > 0) {
    setInterval(function() { goToSlide(current + 1); }, 4000);
  }

  // ===== DRINK BUILDER =====
  const drinkChoice = document.getElementById('drink-choice');
  const drinkSize = document.getElementById('drink-size');
  const drinkMilk = document.getElementById('drink-milk');
  const extras = document.querySelectorAll('.extra');
  const drinkTotal = document.getElementById('drink-total');
  const addToOrder = document.getElementById('add-to-order');
  const orderConfirmation = document.getElementById('order-confirmation');

  function calculateTotal() {
    let total = parseFloat(drinkChoice.value);
    total += parseFloat(drinkSize.value);
    total += parseFloat(drinkMilk.value);
    extras.forEach(function(extra) {
      if (extra.checked) total += parseFloat(extra.value);
    });
    drinkTotal.innerText = '€' + total.toFixed(2);
  }

  if (drinkChoice) {
    drinkChoice.addEventListener('change', calculateTotal);
    drinkSize.addEventListener('change', calculateTotal);
    drinkMilk.addEventListener('change', calculateTotal);
    extras.forEach(function(extra) {
      extra.addEventListener('change', calculateTotal);
    });
  }

  if (addToOrder) {
    addToOrder.addEventListener('click', function() {
      orderConfirmation.style.display = 'block';
      setTimeout(function() { orderConfirmation.style.display = 'none'; }, 3000);
    });
  }

  // ===== CONTACT FORM VALIDATION =====
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.setAttribute('novalidate', true);
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      document.querySelectorAll('.js-error').forEach(function(el) { el.remove(); });
      document.querySelectorAll('.error-border').forEa