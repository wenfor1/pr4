// 1. Пошук елементів DOM за допомогою querySelector / querySelectorAll
const audioPlayer = document.querySelector('#mainAudio');
const trackRows = document.querySelectorAll('.track-row');
const nowPlayingText = document.querySelector('#nowPlaying');
const likeBtn = document.querySelector('#likeBtn');
const likeCount = document.querySelector('#likeCount');
const commentForm = document.querySelector('#commentForm');
const commentInput = document.querySelector('#commentInput');
const commentsList = document.querySelector('#commentsList');
const commentCount = document.querySelector('#commentCount');

let likes = 42;
let totalComments = 0;

// 2. Обробка події "click" (Миша) + Маніпуляція classList та textContent
likeBtn.addEventListener('click', () => {
  likeBtn.classList.toggle('liked');
  if (likeBtn.classList.contains('liked')) {
    likes++;
  } else {
    likes--;
  }
  likeCount.textContent = likes;
});

// Клік по ряду таблиці: вибір та автоматичне відтворення треку
trackRows.forEach(row => {
  row.addEventListener('click', () => {
    trackRows.forEach(r => r.classList.remove('active-track'));
    row.classList.add('active-track');
    
    const trackTitle = row.cells[1].textContent;
    const trackSrc = row.getAttribute('data-src');
    
    nowPlayingText.textContent = trackTitle;
    audioPlayer.src = trackSrc;
    audioPlayer.play();
  });
});

// 3. Обробка події "submit" (Форма) + preventDefault() + Створення нових DOM-вузлів
commentForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Скасування стандартного перезавантаження сторінки
  
  const text = commentInput.value.trim();
  if (text !== '') {
    // Динамічне створення DOM-елемента
    const newComment = document.createElement('div');
    newComment.className = 'comment-item';
    newComment.textContent = text;
    
    commentsList.appendChild(newComment);
    
    totalComments++;
    commentCount.textContent = totalComments;
    commentInput.value = '';

    // 4. BOM (Browser Object Model): вивід діалогового вікна alert
    alert('Дякуємо! Ваш відгук успішно опубліковано.');
  }
});

// 5. Обробка події "keydown" (Клавіатура): Пробіл (Space) для паузи/відтворення
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && document.activeElement !== commentInput) {
    event.preventDefault(); // Скасовуємо скрол сторінки вниз пробілом
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  }
});

// BOM: Відстеження розміру вікна браузера
window.addEventListener('resize', () => {
  console.log(`Ширина екрана змінена: ${window.innerWidth}px`);
});