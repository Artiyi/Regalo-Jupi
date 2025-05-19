// Datos de los álbumes
const albums = {
  red: {
    title: "ÁLBUM ROJO",
    thought: "EN CADA FOTO REVIVO LA ALEGRÍA...",
    pages: [
      { image: "../assets/images/album/red/photos/red1.jpg", text: "TUS SONRISAS SON MI PAISAJE FAVORITO." },
      { image: "../assets/images/album/red/photos/red2.jpg", text: "CADA RECUERDO CONTIGO ES UN TESORO." },
      { image: "../assets/images/album/red/photos/red3.jpg", text: "A TU LADO, TODO ES MÁGIA." },
      { image: "../assets/images/album/red/photos/red4.jpg", text: "ESTE ÁLBUM ES UN PEDACITO DE FELICIDAD." },
      { image: "../assets/images/album/red/photos/red5.jpg", text: "EN TUS OJOS ENCUENTRO LA PAZ." },
      { image: "../assets/images/album/red/photos/red6.jpg", text: "AMARTE ES MI AVENTURA MÁS HERMOSA." },
      { image: "../assets/images/album/red/photos/red7.jpg", text: "CADA GESTO TUYO ES UNA CARICIA." },
      { image: "../assets/images/album/red/photos/red8.jpg", text: "ERES MI RAZÓN PARA SONREÍR." }
    ],
    photoSide: "left"
  },
  blue: {
    title: "ÁLBUM AZUL",
    thought: "CONTIGO, LA VIDA TIENE UN COLOR ESPECIAL...",
    pages: [
      { image: "../assets/images/album/blue/photos/blue1.jpg", text: "GUARDO LOS LATIDOS DE MI CORAZÓN POR TI." },
      { image: "../assets/images/album/blue/photos/blue2.jpg", text: "ERES LA RAZÓN DE MIS SONRISAS." },
      { image: "../assets/images/album/blue/photos/blue3.jpg", text: "ESTE ÁLBUM CUENTA NUESTRA HISTORIA." },
      { image: "../assets/images/album/blue/photos/blue4.jpg", text: "EN TUS ABRAZOS ENCUENTRO REFUGIO." },
      { image: "../assets/images/album/blue/photos/blue5.jpg", text: "TUS DETALLES SON MI MELODÍA." },
      { image: "../assets/images/album/blue/photos/blue6.jpg", text: "CELEBRO EL AMOR QUE SIENTO POR TI." },
      { image: "../assets/images/album/blue/photos/blue7.jpg", text: "CADA PÁGINA GRITA LO FELIZ QUE ME HACES." },
      { image: "../assets/images/album/blue/photos/blue8.jpg", text: "NUESTRO AMOR ES EL MEJOR CUENTO." }
    ],
    photoSide: "right"
  }
};

// Variables globales
let currentAlbum = null;
let currentPage = 0;
const bgAudio = document.getElementById('bg-audio');
const audioButton = document.getElementById('audio-toggle');
bgAudio.volume = 0.35;

// Intentar reproducir el audio automáticamente cuando la página cargue
window.addEventListener('load', () => {
  bgAudio.play().catch(e => {
    console.log("Reproducción automática bloqueada por el navegador:", e);
    // Si falla la reproducción automática, mostraremos un mensaje al usuario
    audioButton.textContent = '🔇';
    audioButton.classList.add('muted');
  });
  
  // Si la reproducción es exitosa, actualizamos el botón
  bgAudio.addEventListener('playing', () => {
    audioButton.textContent = '🔊';
    audioButton.classList.remove('muted');
  });
});

// Habilitar audio al primer clic (para evitar bloqueos)
function enableAudio() {
  document.body.removeEventListener('click', enableAudio);
  bgAudio.play().catch(e => console.log("Autoplay bloqueado:", e));
}
document.body.addEventListener('click', enableAudio, { once: true });

// Abrir álbum
function openAlbumHandler(albumId) {
  currentAlbum = albums[albumId];
  currentPage = 0;
  renderAlbum();
  document.getElementById('album-selection').classList.add('hidden');
  document.getElementById('open-album').classList.remove('hidden');
  audioButton.classList.remove('hidden');
  bgAudio.play().catch(e => console.log("Error al reproducir:", e));
}

// Renderizar página actual
function renderAlbum() {
  const pagesContainer = document.querySelector('.pages-container');
  pagesContainer.innerHTML = '';

  const pageElement = document.createElement('div');
  pageElement.className = 'page';

  const leftPage = document.createElement('div');
  const rightPage = document.createElement('div');
  leftPage.className = 'left-page';
  rightPage.className = 'right-page';

  if (currentPage === 0) {
    leftPage.innerHTML = `<h1>${currentAlbum.title}</h1>`;
    rightPage.innerHTML = `<p>${currentAlbum.thought}</p>`;
  } else {
    const pageData = currentAlbum.pages[currentPage - 1];
    if (currentAlbum.photoSide === 'left') {
      leftPage.innerHTML = `<img src="${pageData.image}" alt="Foto">`;
      rightPage.innerHTML = `<p>${pageData.text}</p>`;
    } else {
      leftPage.innerHTML = `<p>${pageData.text}</p>`;
      rightPage.innerHTML = `<img src="${pageData.image}" alt="Foto">`;
    }
  }

  pageElement.appendChild(leftPage);
  pageElement.appendChild(rightPage);
  pagesContainer.appendChild(pageElement);

  updateControls();
}

// Actualizar controles
function updateControls() {
  document.getElementById('prev-page').disabled = currentPage === 0;
  document.getElementById('next-page').disabled = currentPage === currentAlbum.pages.length;
}

// Pasar página
function nextPage() {
  if (currentPage >= currentAlbum.pages.length) return;

  const pagesContainer = document.querySelector('.pages-container');
  const currentPageElement = document.querySelector('.page');
  const rightPage = currentPageElement.querySelector('.right-page');

  const pageTurn = document.createElement('div');
  pageTurn.className = 'page-turn';
  
  const front = document.createElement('div');
  front.className = 'page-turn-front';
  front.innerHTML = rightPage.innerHTML;

  const back = document.createElement('div');
  back.className = 'page-turn-back';

  pageTurn.appendChild(front);
  pageTurn.appendChild(back);
  pagesContainer.appendChild(pageTurn);

  setTimeout(() => pageTurn.classList.add('turning'), 10);
  setTimeout(() => {
    currentPage++;
    renderAlbum();
    pageTurn.remove();
  }, 800);
}

// Retroceder página
function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    renderAlbum();
  }
}

// Salir del álbum
function exitAlbum() {
  document.getElementById('open-album').classList.add('hidden');
  document.getElementById('album-selection').classList.remove('hidden');
  audioButton.classList.add('hidden');
  bgAudio.pause();
}

// Event listeners
document.querySelectorAll('.album-option').forEach(album => {
  album.addEventListener('click', () => openAlbumHandler(album.dataset.album));
});

document.getElementById('exit-button').addEventListener('click', exitAlbum);
document.getElementById('prev-page').addEventListener('click', prevPage);
document.getElementById('next-page').addEventListener('click', nextPage);
document.getElementById('back-button').addEventListener('click', () => {
  window.location.href = 'room.html';
});

// Función para controlar el audio
document.getElementById('audio-toggle').addEventListener('click', function() {
  const audio = document.getElementById('bg-audio');
  const button = document.getElementById('audio-toggle');
  
  if (audio.paused) {
    audio.play();
    button.textContent = '🔊'; // Símbolo de audio encendido
    button.classList.remove('muted');
  } else {
    audio.pause();
    button.textContent = '🔇'; // Símbolo de audio apagado
    button.classList.add('muted');
  }
});