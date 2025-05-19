// Array de cassettes con sus pistas y mensajes
const cassettes = [
  { 
    name: "Cassette 1", 
    tracks: [
      "../assets/audio/cassettes/dont smile at me/COPYCAT.mp3", 
      "../assets/audio/cassettes/dont smile at me/idontwannabeyouanymore.mp3", 
      "../assets/audio/cassettes/dont smile at me/my boy.mp3", 
      "../assets/audio/cassettes/dont smile at me/watch.mp3", 
      "../assets/audio/cassettess/dont smile at me/party favor.mp3", 
      "../assets/audio/cassettes/dont smile at me/bellyache.mp3", 
      "../assets/audio/cassettes/dont smile at me/ocean eyes.mp3", 
      "../assets/audio/cassettes/dont smile at me/burn.mp3", 
      "../assets/audio/cassettes/dont smile at me/hostage.mp3", 
      "../assets/audio/cassettes/dont smile at me/lovely.mp3", 
      "../assets/audio/cassettes/dont smile at me/bitches broken hearts.mp3"
    ], 
    message: "Eres la canción que nunca quiero dejar de escuchar.❤" 
  },
  { 
    name: "Cassette 2", 
    tracks: ["../assets/audio/cassettes/everything i wanted/everything i wanted.mp3"], 
    message: "Contigo, todo suena mejor.❤" 
  },
  { 
    name: "Cassette 3", 
    tracks: [
      "../assets/audio/cassettes/Guitar Songs/TV.mp3",
      "../assets/audio/cassettes/Guitar Songs/The 30th.mp3"
    ], 
    message: "Amo que me inundes con esa vibe.❤" 
  },
  { 
    name: "Cassette 4", 
    tracks: [
      "../assets/audio/cassettes/Happier Than Ever/Getting Older.mp3",
      "../assets/audio/cassettes/Happier Than Ever/I Didn t Change My Number.mp3",
      "../assets/audio/cassettes/Happier Than Ever/Billie Bossa Nova.mp3",
      "../assets/audio/cassettes/Happier Than Ever/my future.mp3",
      "../assets/audio/cassettes/Happier Than Ever/Oxytocin.mp3",
      "../assets/audio/cassettes/Happier Than Ever/GOLDWING.mp3",
      "../assets/audio/cassettes/Happier Than Ever/Lost Cause.mp3",
      "../assets/audio/cassettes/Happier Than Ever/Halley s Comet.mp3",
      "../assets/audio/cassettes/Happier Than Ever/Not My Responsibility.mp3",
      "../assets/audio/cassettes/Happier Than Ever/OverHeated.mp3",
      "../assets/audio/cassettes/Happier Than Ever/Everybody Dies.mp3",
      "../assets/audio/cassettes/Happier Than Ever/Your Power.mp3",
      "../assets/audio/cassettes/Happier Than Ever/NDA.mp3",
      "../assets/audio/cassettes/Happier Than Ever/Therefore I Am.mp3",
      "../assets/audio/cassettes/Happier Than Ever/Happier Than Ever.mp3",
      "../assets/audio/cassettes/Happier Than Ever/Male Fantasy.mp3"
    ], 
    message: "Rebobinar el tiempo solo para volver a verte sonreír.❤" 
  },
  { 
    name: "Cassette 5", 
    tracks: [
      "../assets/audio/cassettes/HIT ME HARD AND SOFT/SKINNY.mp3",
      "../assets/audio/cassettes/HIT ME HARD AND SOFT/LUNCH.mp3",
      "../assets/audio/cassettes/HIT ME HARD AND SOFT/CHIHIRO.mp3",
      "../assets/audio/cassettes/HIT ME HARD AND SOFT/BIRDS OF A FEATHER.mp3",
      "../assets/audio/cassettes/HIT ME HARD AND SOFT/WILDFLOWER.mp3",
      "../assets/audio/cassettes/HIT ME HARD AND SOFT/THE GREATEST.mp3",
      "../assets/audio/cassettes/HIT ME HARD AND SOFT/L AMOUR DE MA VIE.mp3",
      "../assets/audio/cassettes/HIT ME HARD AND SOFT/THE DINER.mp3",
      "../assets/audio/cassettes/HIT ME HARD AND SOFT/BITTERSUITE.mp3",
      "../assets/audio/cassettes/HIT ME HARD AND SOFT/BLUE.mp3"
    ], 
    message: "Nuestro amor tiene su propio soundtrack.❤" 
  },
  { 
    name: "Cassette 6", 
    tracks: ["../assets/audio/cassettes/No Time To Die/No Time To Die.mp3"], 
    message: "Mi canción favorita siempre será tu risa.❤" 
  },
  { 
    name: "Cassette 7", 
    tracks: ["../assets/audio/cassettes/What Was I Made For/What Was I Made For.mp3"], 
    message: "Cada nota de este cassette te pertenece.❤" 
  },
  { 
    name: "Cassette 8", 
    tracks: [
      "../assets/audio/cassettes/WHEN WE ALL FALL ASLEEP, WHERE DO WE GO/!!!!!!!.mp3",
      "../assets/audio/cassettes/WHEN WE ALL FALL ASLEEP, WHERE DO WE GO/bad guy.mp3",
      "../assets/audio/cassettes/WHEN WE ALL FALL ASLEEP, WHERE DO WE GO/xanny.mp3",
      "../assets/audio/cassettes/WHEN WE ALL FALL ASLEEP, WHERE DO WE GO/you should see me in a crown.mp3",
      "../assets/audio/cassettes/WHEN WE ALL FALL ASLEEP, WHERE DO WE GO/all the good girls go to hell.mp3",
      "../assets/audio/cassettes/WHEN WE ALL FALL ASLEEP, WHERE DO WE GO/wish you were gay.mp3",
      "../assets/audio/cassettes/WHEN WE ALL FALL ASLEEP, WHERE DO WE GO/when the party s over.mp3",
      "../assets/audio/cassettes/WHEN WE ALL FALL ASLEEP, WHERE DO WE GO/8.mp3",
      "../assets/audio/cassettes/WHEN WE ALL FALL ASLEEP, WHERE DO WE GO/my strange addiction.mp3",
      "../assets/audio/cassettes/WHEN WE ALL FALL ASLEEP, WHERE DO WE GO/bury a friend.mp3",
      "../assets/audio/cassettes/WHEN WE ALL FALL ASLEEP, WHERE DO WE GO/ilomilo.mp3",
      "../assets/audio/cassettes/WHEN WE ALL FALL ASLEEP, WHERE DO WE GO/listen before i go.mp3",
      "../assets/audio/cassettes/WHEN WE ALL FALL ASLEEP, WHERE DO WE GO/i love you.mp3",
      "../assets/audio/cassettes/WHEN WE ALL FALL ASLEEP, WHERE DO WE GO/goodbye.mp3"
    ], 
    message: "No necesito más música si te tengo a ti.❤" 
  }
];

// Sonidos
const insertSound = new Audio('../assets/audio/button/insert.mp3');
const ejectSound = new Audio('../assets/audio/button/eject.mp3');
const pressSound = new Audio('../assets/audio/button/press.mp3');
const audio = new Audio();

let currentCassette = null;
let currentTrackIndex = 0;
let insertedCassetteElement = null;

// === FUNCIONES PRINCIPALES ===
function initCassettes() {
  const floorArea = document.getElementById('floorArea');
  cassettes.forEach((cassette, idx) => {
    const img = document.createElement('img');
    img.src = `../assets/images/cassettes/cassette${idx + 1}.png`;
    img.className = 'cassette';
    img.draggable = true;
    img.dataset.index = idx;

    img.addEventListener('dragstart', (e) => {
      img.classList.add('pickup');
      e.dataTransfer.setData('cassetteIndex', idx);
    });

    img.addEventListener('dragend', () => {
      img.classList.remove('pickup');
    });

    floorArea.appendChild(img);
  });
}

function updateTrackInfo() {
  if (!currentCassette) return;
  const trackName = currentCassette.tracks[currentTrackIndex].split('/').pop().replace('.mp3', '');
  document.getElementById('trackTitle').textContent = 
    `${trackName} (${currentTrackIndex + 1}/${currentCassette.tracks.length})`;
}

function ejectCassette() {
  if (!currentCassette) return;
  
  // Sonido de expulsión
  ejectSound.currentTime = 0;
  ejectSound.play();
  
  audio.pause();
  document.getElementById('cassetteDeck').classList.remove('inserted');
  document.getElementById('insertedCassette').style.opacity = '0';
  
  // Mostrar cassette nuevamente en el área inferior
  if (insertedCassetteElement) {
    insertedCassetteElement.style.visibility = 'visible';
  }
  
  // Restaurar mensajes
  const banner = document.getElementById('banner');
  banner.textContent = "❤ Bienvenida al reproductor de Archie ❤";
  banner.classList.add('banner-updated');
  
  document.getElementById('statusMessage').textContent = "Cassette expulsado";
  document.getElementById('trackTitle').textContent = "Ningún cassette insertado";
  currentCassette = null;
  currentTrackIndex = 0;
  
  // Abrir la tapa automáticamente
  const walkman = document.getElementById('walkman-container');
  const lidButton = document.getElementById('lid-button');
  const deck = document.getElementById('cassetteDeck');
  
  walkman.classList.add('open');
  lidButton.textContent = 'Cerrar Tapa';
  deck.style.pointerEvents = 'auto';
}

// === EVENT LISTENERS ===
document.addEventListener('DOMContentLoaded', () => {
  initCassettes();

  document.getElementById('back-button').addEventListener('click', function() {
    window.location.href = '../scenes/room.html';
  });
  // Control de tapa del Walkman
  const walkman = document.getElementById('walkman-container');
  const lidButton = document.getElementById('lid-button');
  const deck = document.getElementById('cassetteDeck');
  
  lidButton.addEventListener('click', () => {
    walkman.classList.toggle('open');
    lidButton.textContent = walkman.classList.contains('open') ? 'Cerrar Tapa' : 'Abrir Tapa';
    deck.style.pointerEvents = walkman.classList.contains('open') ? 'auto' : 'none';
  });

  // Drag & Drop
  deck.addEventListener('dragover', (e) => e.preventDefault());
  
  deck.addEventListener('drop', (e) => {
    e.preventDefault();
    if (!walkman.classList.contains('open') || currentCassette) {
      if (currentCassette) {
        document.getElementById('statusMessage').textContent = "¡Ya hay un cassette insertado!";
        deck.classList.add('shake');
        setTimeout(() => deck.classList.remove('shake'), 400);
      }
      return;
    }

    const index = e.dataTransfer.getData('cassetteIndex');
    currentCassette = cassettes[index];
    currentTrackIndex = 0;
    
    audio.src = currentCassette.tracks[currentTrackIndex];
    
    // Sonido de inserción
    insertSound.currentTime = 0;
    insertSound.play();
    
    // Mostrar cassette en el reproductor (ajustado para mantener tamaño)
    const insertedCassette = document.getElementById('insertedCassette');
    insertedCassette.innerHTML = `<img src="../assets/images/cassettes/cassette${parseInt(index) + 1}.png" alt="Cassette insertado">`;
    insertedCassette.style.opacity = '1';
    deck.classList.add('inserted');
    
    // Ocultar cassette del área inferior
    insertedCassetteElement = document.querySelector(`img[data-index="${index}"]`);
    if (insertedCassetteElement) {
      insertedCassetteElement.style.visibility = 'hidden';
    }
    
    // Actualizar mensajes
    const banner = document.getElementById('banner');
    banner.textContent = currentCassette.message;
    banner.classList.add('banner-updated');
    
    document.getElementById('statusMessage').textContent = "Cassette insertado";
    updateTrackInfo();
    
    // Cerrar tapa automáticamente
    walkman.classList.remove('open');
    lidButton.textContent = 'Abrir Tapa';
    deck.style.pointerEvents = 'none';
  });

  // Controles
  document.getElementById('btnPlay').addEventListener('click', () => {
    const walkman = document.getElementById('walkman-container');
    
    // Verificar si la tapa está abierta
    if (walkman.classList.contains('open')) {
      document.getElementById('statusMessage').textContent = "❌ Cierra la tapa primero";
      return;
    }
    
    if (!currentCassette) {
      document.getElementById('statusMessage').textContent = "❌ Inserta un cassette primero";
      return;
    }
    
    audio.play();
    document.getElementById('statusMessage').textContent = "Reproduciendo...";
  });

  document.getElementById('btnPause').addEventListener('click', () => {
    if (!currentCassette) return;
    audio.pause();
    document.getElementById('statusMessage').textContent = "Pausado";
  });
  
  document.getElementById('btnPrev').addEventListener('click', () => {
    if (!currentCassette || currentTrackIndex <= 0) return;
    currentTrackIndex--;
    audio.src = currentCassette.tracks[currentTrackIndex];
    audio.play();
    updateTrackInfo();
    document.getElementById('statusMessage').textContent = "Reproduciendo...";
  });

  document.getElementById('btnNext').addEventListener('click', () => {
    if (!currentCassette || currentTrackIndex >= currentCassette.tracks.length - 1) return;
    currentTrackIndex++;
    audio.src = currentCassette.tracks[currentTrackIndex];
    audio.play();
    updateTrackInfo();
    document.getElementById('statusMessage').textContent = "Reproduciendo...";
  });

  document.getElementById('btnEject').addEventListener('click', () => {
    ejectCassette();
  });

  // Controles de volumen
  document.getElementById('btnVolDown').addEventListener('click', () => {
    audio.volume = Math.max(0, audio.volume - 0.1);
    pressSound.currentTime = 0;
    pressSound.play();
    document.getElementById('statusMessage').textContent = `Volumen: ${Math.round(audio.volume * 100)}%`;
  });

  document.getElementById('btnVolUp').addEventListener('click', () => {
    audio.volume = Math.min(1, audio.volume + 0.1);
    pressSound.currentTime = 0;
    pressSound.play();
    document.getElementById('statusMessage').textContent = `Volumen: ${Math.round(audio.volume * 100)}%`;
  });


  // Control de volumen
  document.getElementById('volumeSlider').addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
  });

  // Actualización de la barra de progreso
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const percent = (audio.currentTime / audio.duration) * 100;
      const progressMarker = document.getElementById('progressMarker');
      progressMarker.style.left = `${percent}%`;
    }
  });

// Permitir clic en la barra de progreso para cambiar la posición
document.getElementById('progressBar').addEventListener('click', (e) => {
  const bar = e.currentTarget;
  const clickPosition = (e.clientX - bar.getBoundingClientRect().left) / bar.offsetWidth;
  audio.currentTime = clickPosition * audio.duration;
});

  audio.addEventListener('ended', () => {
    if (!currentCassette) return;
    if (currentTrackIndex < currentCassette.tracks.length - 1) {
      currentTrackIndex++;
      audio.src = currentCassette.tracks[currentTrackIndex];
      audio.play();
      updateTrackInfo();
    } else {
      ejectCassette();
    }
  });
});

// Actualización de la barra de progreso
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    const progressMarker = document.getElementById('progressMarker');
    progressMarker.style.left = `${percent}%`;
  }
});

// Permitir clic en la barra de progreso para cambiar la posición
document.getElementById('progressBar').addEventListener('click', (e) => {
  if (!currentCassette) return;
  
  const bar = e.currentTarget;
  const rect = bar.getBoundingClientRect();
  const clickPosition = (e.clientX - rect.left) / rect.width;
  
  if (clickPosition >= 0 && clickPosition <= 1) {
    audio.currentTime = clickPosition * audio.duration;
  }
});