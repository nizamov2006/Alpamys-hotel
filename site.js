const ru = {
  skip: 'К содержанию',
  brand: 'ГОСТИНИЦА В ТУРКЕСТАНЕ',
  menu: 'Меню',
  navLabel: 'Главное меню',
  language: 'Язык',
  aboutNav: 'Гостиница',
  roomsNav: 'Номера',
  galleryNav: 'Галерея',
  contactsNav: 'Контакты',
  book: 'Узнать о номерах',
  bookLabel: 'Запросить свободный номер',
  heroKicker: 'ТУРКЕСТАН, КАЗАХСТАН',
  headline: 'Уютная остановка|в древнем городе',
  heroCopy: 'Добро пожаловать в Туркестан! Остановитесь в Alpamys и знакомьтесь с городом в своём ритме.',
  explore: 'Посмотреть номера',
  directions: 'Как добраться',
  cityAlt: 'Мавзолей Ходжи Ахмеда Ясави в Туркестане',
  credit: 'Мавзолей Ходжи Ахмеда Ясави · Total.kz',
  availability: 'Запросить номер',
  bookingHint: 'Через WhatsApp',
  arrival: 'Заезд',
  departure: 'Выезд',
  guests: 'Число гостей',
  one: '1 гость',
  two: '2 гостя',
  three: '3 гостя',
  four: '4 гостя',
  more: '5 и больше',
  whatsapp: 'Написать в WhatsApp',
  selected: 'Выбранный номер',
  clearRoom: 'Сбросить выбор номера',
  aboutKicker: 'ГОСТИНИЦА ALPAMYS',
  aboutTitle: 'Ваш отдых в Туркестане|начинается здесь',
  aboutCopy: 'Планируете посетить мавзолей, прогуляться по городу или приехать по работе? Связаться с гостиницей можно в любое время. Здесь есть номера для двух, трёх и четырёх гостей.',
  rating: '676 оценок в 2ГИС',
  open: 'Открыто круглосуточно',
  roomsKicker: 'ПРОЖИВАНИЕ',
  roomsTitle: 'Номера',
  roomsCopy: 'Выберите подходящий номер и уточните цену и наличие на ваши даты.',
  twoDouble: '2 гостя · 1 кровать',
  double: 'Двухместный номер',
  doubleCopy: 'Номер с одной большой кроватью.',
  doubleAlt: 'Двухместный номер с одной большой кроватью',
  twoTwin: '2 гостя · 2 кровати',
  twin: 'Номер с двумя кроватями',
  twinCopy: 'Для поездки с другом или коллегой.',
  twinAlt: 'Номер с двумя отдельными кроватями',
  fourBeds: '4 гостя · 4 кровати',
  family: 'Четырёхместный номер',
  familyCopy: 'Для семьи или небольшой компании.',
  familyAlt: 'Четырёхместный номер',
  ask: 'Запросить этот номер',
  allRooms: 'Посмотреть все номера',
  galleryKicker: 'ФОТОГРАФИИ ГОСТИНИЦЫ',
  galleryTitle: 'Внутри Alpamys',
  allPhotos: 'Все фотографии',
  reception: 'Стойка регистрации',
  lobby: 'Холл гостиницы',
  dining: 'Обеденный зал',
  contactsKicker: 'КОНТАКТЫ',
  contactsTitle: 'Ждём вас в гости',
  address: 'Туркестан, улица Кожанова, 43',
  floors: '1–3 этажи · Круглосуточно',
  whatsappSimple: 'WhatsApp',
  map: 'Открыть в 2ГИС',
  faq: 'Частые вопросы',
  priceQ: 'Сколько стоит ночь?',
  priceA: 'Укажите даты заезда и выезда и отправьте запрос через WhatsApp, чтобы узнать стоимость.',
  breakfastQ: 'Входит ли завтрак в цену?',
  breakfastA: 'Уточните у гостиницы, входит ли завтрак в выбранный тариф.',
  earlyQ: 'Возможен ли ранний заезд?',
  earlyA: 'Сообщите гостинице время приезда заранее и уточните возможность раннего заезда.',
  cancelQ: 'Можно ли отменить бронь бесплатно?',
  cancelA: 'Уточните условия отмены в гостинице перед подтверждением брони.',
  footer: 'Alpamys · Туркестан, Казахстан',
  back: 'В начало страницы',
  photoDialog: 'Фотографии гостиницы',
  close: 'Закрыть',
  previous: 'Предыдущее',
  next: 'Следующее',
};

const translatable = [...document.querySelectorAll('[data-i], [data-label], [data-alt]')];
const original = new Map(translatable.map((element) => [
  element,
  {
    text: element.dataset.i ? element.innerHTML : null,
    label: element.getAttribute('aria-label'),
    alt: element.getAttribute('alt'),
  },
]));
const langButtons = document.querySelectorAll('[data-lang]');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navigation');
const booking = document.querySelector('.booking');
const arrival = booking.elements.arrival;
const departure = booking.elements.departure;
const guests = booking.elements.guests;
const roomChoice = document.querySelector('.room-choice');
const roomName = document.querySelector('#selected-room');
const photos = [...document.querySelectorAll('[data-photo]')];
const lightbox = document.querySelector('.lightbox');
const photoImage = document.querySelector('#lightbox-image');
const photoCaption = document.querySelector('#lightbox-caption');
let language = 'kk';
let chosenRoom = '';
let currentPhoto = 0;
let openedFrom = null;

function updateRoomChoice() {
  roomChoice.hidden = !chosenRoom;
  roomName.textContent = chosenRoom ? document.querySelector('h3[data-i="' + chosenRoom + '"]').textContent : '';
}

function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  const tile = photos[currentPhoto];
  const alt = tile.querySelector('img').alt;
  photoImage.src = tile.href;
  photoImage.alt = alt;
  photoCaption.textContent = alt + ' · ' + (currentPhoto + 1) + '/' + photos.length;
}

function setLanguage(next) {
  language = next;
  document.documentElement.lang = language;
  document.title = language === 'ru' ? 'Alpamys | Гостиница в Туркестане' : 'Alpamys | Түркістан қонақүйі';
  for (const element of translatable) {
    const start = original.get(element);
    if (element.dataset.i) {
      if (language === 'ru') {
        const lines = ru[element.dataset.i].split('|');
        element.replaceChildren(lines[0]);
        if (lines[1]) element.append(document.createElement('br'), lines[1]);
      } else {
        element.innerHTML = start.text;
      }
    }
    if (element.dataset.label) element.setAttribute('aria-label', language === 'ru' ? ru[element.dataset.label] : start.label);
    if (element.dataset.alt) element.alt = language === 'ru' ? ru[element.dataset.alt] : start.alt;
  }
  for (const button of langButtons) {
    button.setAttribute('aria-pressed', String(button.dataset.lang === language));
  }
  updateRoomChoice();
  if (lightbox.open) showPhoto(currentPhoto);
  syncDates();
}

for (const button of langButtons) {
  button.addEventListener('click', () => {
    setLanguage(button.dataset.lang);
    try { localStorage.setItem('alpamys-language', language); } catch {}
  });
}

function toggleMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
}

menu.addEventListener('click', () => toggleMenu(menu.getAttribute('aria-expanded') === 'false'));
nav.addEventListener('click', (event) => { if (event.target.closest('a')) toggleMenu(false); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    toggleMenu(false);
    menu.focus();
  }
});

function dateString(date) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

function nextDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return dateString(new Date(year, month - 1, day + 1));
}

function syncDates() {
  const today = dateString(new Date());
  arrival.min = today;
  departure.min = nextDate(arrival.value || today);
  departure.setCustomValidity(departure.value && departure.value < departure.min
    ? (language === 'ru' ? 'Выберите дату после заезда.' : 'Келу күнінен кейінгі күнді таңдаңыз.')
    : '');
}

arrival.addEventListener('input', () => {
  syncDates();
  if (departure.value && departure.value < departure.min) {
    departure.value = '';
    syncDates();
  }
});
departure.addEventListener('input', syncDates);

for (const button of document.querySelectorAll('[data-room]')) {
  button.addEventListener('click', () => {
    chosenRoom = button.dataset.room;
    guests.value = chosenRoom === 'family' ? '4' : '2';
    updateRoomChoice();
    booking.scrollIntoView({block: 'start'});
    arrival.focus({preventScroll: true});
  });
}
document.querySelector('#clear-room').addEventListener('click', () => {
  chosenRoom = '';
  updateRoomChoice();
  arrival.focus();
});

function displayDate(value) {
  const [year, month, day] = value.split('-');
  return [day, month, year].join('.');
}

booking.addEventListener('submit', (event) => {
  event.preventDefault();
  syncDates();
  if (!booking.reportValidity()) return;
  const from = displayDate(arrival.value);
  const until = displayDate(departure.value);
  const room = roomName.textContent;
  const message = language === 'ru'
    ? ['Здравствуйте! Есть ли свободный номер в Alpamys на эти даты?', 'Заезд: ' + from, 'Выезд: ' + until, 'Гостей: ' + guests.value, room && 'Номер: ' + room, 'Подскажите, пожалуйста, стоимость.']
    : ['Сәлеметсіз бе! Alpamys қонақүйінде осы күндерге бос нөмір бар ма?', 'Келу күні: ' + from, 'Шығу күні: ' + until, 'Қонақ саны: ' + guests.value, room && 'Нөмір: ' + room, 'Бағасын айтып жібересіз бе?'];
  const url = 'https://wa.me/77054884168?text=' + encodeURIComponent(message.filter(Boolean).join('\n'));
  window.open(url, '_blank', 'noopener,noreferrer');
});

for (const tile of photos) {
  tile.addEventListener('click', (event) => {
    if (!lightbox.showModal || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openedFrom = tile;
    showPhoto(Number(tile.dataset.photo));
    lightbox.showModal();
  });
}

document.querySelector('#close-photo').addEventListener('click', () => lightbox.close());
document.querySelector('#prev-photo').addEventListener('click', () => showPhoto(currentPhoto - 1));
document.querySelector('#next-photo').addEventListener('click', () => showPhoto(currentPhoto + 1));
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
lightbox.addEventListener('close', () => openedFrom?.focus());
lightbox.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showPhoto(currentPhoto + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});

syncDates();
try { if (localStorage.getItem('alpamys-language') === 'ru') setLanguage('ru'); } catch {}
