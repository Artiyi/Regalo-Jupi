// Datos de los VHS
const vhsTapes = [
  {
    id: 'vhs1',
    videoSrc: '../assets/videos/vhs/video1.mp4'
  },
  {
    id: 'vhs2',
    videoSrc: '../assets/videos/vhs/video2.mp4'
  },
  {
    id: 'vhs3',
    videoSrc: '../assets/videos/vhs/video3.mp4'
  },
  {
    id: 'vhs4',
    videoSrc: '../assets/videos/vhs/video4.mp4'
  }
];

// Variables globales
let currentVHS = null;
let isPlaying = false;
let isPaused = false;
let isRewinding = false;
let isForwarding = false;
let rewindInterval = null;
let forwardInterval = null;
let videoPlayer = null;
let tvScreen = null;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar referencias a elementos DOM
  videoPlayer = document.getElementById('vhsPlayer');
  tvScreen = document.getElementById('tv-screen');
  
  // Crear los VHS
  createVHSTapes();
  
  // Configurar eventos del reproductor de video
  setupVideoEvents();
  
  // Configurar el botón de regreso
  document.getElementById('back-button').addEventListener('click', function() {
    window.location.href = '../index.html';
  });
  
  // Establecer volumen inicial
  if (videoPlayer) {
    videoPlayer.volume = 0.7;
  }
  
  // Añadir efecto de ruido VHS a la pantalla
  const noiseElement = document.createElement('div');
  noiseElement.className = 'vhs-noise';
  tvScreen.appendChild(noiseElement);
  
  // Configurar el área de inserción como zona de destino para soltar
  setupDropZone();
  
  // Inicializar la casetera si existe la función
  if (window.caseteraFunctions && typeof window.caseteraFunctions.initCasetera === 'function') {
    window.caseteraFunctions.initCasetera();
  }
});

// Crear los VHS en el contenedor
function createVHSTapes() {
  const vhsContainer = document.getElementById('floorArea');
  
  // Limpiar el contenedor primero
  vhsContainer.innerHTML = '';
  
  // Crear solo 4 VHS usando los datos del array vhsTapes
  for (let i = 0; i < vhsTapes.length; i++) {
    const vhsData = vhsTapes[i];
    const vhsTape = document.createElement('div');
    vhsTape.className = 'vhs-tape';
    vhsTape.dataset.id = vhsData.id;
    vhsTape.dataset.videoSrc = vhsData.videoSrc;
    
    // Crear la imagen del VHS usando la imagen correspondiente al número
    const vhsImage = document.createElement('img');
    vhsImage.src = `../assets/images/vhs/vhs${i+1}.png`;
    vhsImage.alt = 'VHS ' + (i+1);
    vhsImage.draggable = false; // Evitar que la imagen sea arrastrable por sí sola
    
    vhsTape.appendChild(vhsImage);
    vhsContainer.appendChild(vhsTape);
    
    // Hacer el VHS arrastrable
    vhsTape.setAttribute('draggable', 'true');
    vhsTape.addEventListener('dragstart', handleDragStart);
    vhsTape.addEventListener('dragend', handleDragEnd);
    
    // Añadir evento de clic para seleccionar
    vhsTape.addEventListener('click', function() {
      selectVHS(this);
    });
  }
}

// Configurar la zona de destino para soltar VHS
function setupDropZone() {
  const dropZone = document.getElementById('vhs-slot');
  
  dropZone.addEventListener('dragover', function(e) {
    e.preventDefault(); // Permitir soltar
    this.classList.add('drop-hover');
  });
  
  dropZone.addEventListener('dragleave', function() {
    this.classList.remove('drop-hover');
  });
  
  dropZone.addEventListener('drop', handleDrop);
}

// Manejar el inicio del arrastre
function handleDragStart(e) {
  this.classList.add('dragging');
  e.dataTransfer.setData('text/plain', this.dataset.id);
  
  // Seleccionar el VHS al comenzar a arrastrarlo
  selectVHS(this);
}

// Manejar el fin del arrastre
function handleDragEnd() {
  this.classList.remove('dragging');
}

// Manejar cuando se suelta un VHS en la zona de inserción
function handleDrop(e) {
  e.preventDefault();
  this.classList.remove('drop-hover');
  
  const vhsId = e.dataTransfer.getData('text/plain');
  const vhsTape = document.querySelector(`.vhs-tape[data-id="${vhsId}"]`);
  
  if (vhsTape && currentVHS && currentVHS.element === vhsTape) {
    // Llamar a la función insertVHS de la casetera
    if (window.caseteraFunctions && typeof window.caseteraFunctions.insertVHS === 'function') {
      window.caseteraFunctions.insertVHS();
    }
  }
}

// Seleccionar un VHS
function selectVHS(vhsTape) {
  // Quitar la selección de todos los VHS
  document.querySelectorAll('.vhs-tape').forEach(tape => {
    tape.classList.remove('selected');
  });
  
  // Seleccionar el VHS actual
  vhsTape.classList.add('selected');
  
  // Guardar la referencia al VHS seleccionado
  currentVHS = {
    element: vhsTape,
    id: vhsTape.dataset.id,
    videoSrc: vhsTape.dataset.videoSrc
  };
  
  // Actualizar el mensaje de estado
  const statusMessage = document.getElementById('statusMessage');
  if (statusMessage) {
    statusMessage.textContent = 'VHS SELECCIONADO';
  }
}

// Configurar eventos del reproductor de video
function setupVideoEvents() {
  // Actualizar la barra de progreso durante la reproducción
  videoPlayer.addEventListener('timeupdate', function() {
    // Llamar a las funciones de la casetera
    if (window.caseteraFunctions) {
      if (typeof window.caseteraFunctions.updateProgressBar === 'function') {
        window.caseteraFunctions.updateProgressBar();
      }
      if (typeof window.caseteraFunctions.updateTimeCounter === 'function') {
        window.caseteraFunctions.updateTimeCounter();
      }
    }
  });
  
  // Cuando el video termina
  videoPlayer.addEventListener('ended', function() {
    if (window.caseteraFunctions && typeof window.caseteraFunctions.stopVideo === 'function') {
      window.caseteraFunctions.stopVideo();
    }
    const statusMessage = document.getElementById('statusMessage');
    if (statusMessage) {
      statusMessage.textContent = 'REPRODUCCIÓN FINALIZADA';
    }
  });
  
  // Cuando se carga la metadata del video
  videoPlayer.addEventListener('loadedmetadata', function() {
    if (window.caseteraFunctions && typeof window.caseteraFunctions.updateTimeCounter === 'function') {
      window.caseteraFunctions.updateTimeCounter();
    }
  });
  
  // Cuando comienza a reproducirse
  videoPlayer.addEventListener('play', function() {
    tvScreen.classList.add('playing');
  });
  
  // Cuando se pausa o detiene
  videoPlayer.addEventListener('pause', function() {
    if (!isPlaying && !isPaused) {
      tvScreen.classList.remove('playing');
    }
  });
}