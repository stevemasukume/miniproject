const events = [
  { date: '09 OCT', type: 'Workshop', title: 'Make it useful', description: 'Prototype a small solution to a real campus problem.', location: 'Innovation Hub 2.14' },
  { date: '16 OCT', type: 'Conversation', title: 'Creative confidence', description: 'A candid conversation about sharing unfinished work.', location: 'Library Garden' },
  { date: '23 OCT', type: 'Open studio', title: 'Bring your weird idea', description: 'A relaxed making session with tools, tea and good company.', location: 'Innovation Hub 2.14' },
  { date: '30 OCT', type: 'Showcase', title: 'Demo day: small wins', description: 'See what members have been building this month.', location: 'Main Auditorium' }
];

function renderEvents(items) {
  const eventList = document.getElementById('eventList');
  if (!eventList) return;
  eventList.innerHTML = items.map(event => `
    <article class="event-item">
      <div class="event-date">${event.date}</div>
      <div><span class="event-type">${event.type}</span><h3>${event.title}</h3><p>${event.description}</p></div>
      <div class="event-action"><p>${event.location}</p><a href="join.html">Reserve a place &rarr;</a></div>
    </article>`).join('');
}

function setupMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function setupForm() {
  const form = document.getElementById('joinForm');
  if (!form) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    let valid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const fields = [{ input: name, error: 'nameError', text: 'Please tell us your name.' }, { input: email, error: 'emailError', text: 'Please enter a valid email.' }, { input: message, error: 'messageError', text: 'Please add a short message.' }];
    fields.forEach(field => {
      const error = document.getElementById(field.error);
      const isEmail = field.input === email;
      const passes = field.input.value.trim() !== '' && (!isEmail || field.input.validity.valid);
      error.textContent = passes ? '' : field.text;
      field.input.setAttribute('aria-invalid', String(!passes));
      valid = valid && passes;
    });
    if (!valid) {
      document.getElementById('formStatus').textContent = 'Please review the highlighted fields.';
      return;
    }
    const submittedName = document.getElementById('name').value.trim();
    const interest = document.getElementById('interest').value.toLowerCase();
    form.innerHTML = `<div class="response-mark">&#10003;</div><p class="eyebrow">Message received</p><h2>See you<br><em>at the table.</em></h2><p class="response-copy">Thanks, ${submittedName}. We will be in touch about ${interest} soon.</p><a class="button button-primary" href="activities.html">Browse events <span aria-hidden="true">&rarr;</span></a>`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderEvents(events);
  setupMenu();
  setupForm();
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const showAllButton = document.getElementById('showAllButton');
  if (showAllButton) showAllButton.addEventListener('click', () => renderEvents(events));
});