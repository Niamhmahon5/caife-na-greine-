// ===== ACCORDION =====
const accordionBtns = document.querySelectorAll('.accordion-btn');
accordionBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const content = this.nextElementSibling;
    content.classList.toggle('open');
  });
});

// ===== CONTACT FORM =====
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('form-confirmation').style.display = 'block';
    form.reset();
  });
}

// ===== WEATHER API =====
const weatherDiv = document.getElementById('weather');
if (weatherDiv) {
  fetch('https://wttr.in/Dublin?format=3')
    .then(function(response) {
      return response.text();
    })
    .then(function(data) {
      weatherDiv.innerText = data;
    })
    .catch(function() {
      weatherDiv.innerText = 'Weather info unavailable right now.';
    });
}