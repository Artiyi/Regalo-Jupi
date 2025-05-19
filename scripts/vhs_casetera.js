// Variables globales para la casetera
let progressFill = null;
let statusMessage = null;
let timeCounter = null;
let isVHSInserted = false; // Variable para rastrear si hay un VHS insertado

// Inicializar la casetera
function initCasetera() {
  // Inicializar referencias a elementos DOM
  progressFill = document.getElementById('progressFill');
  statusMessage = document.getElementById('statusMessage');
  timeCounter = document.getElementById('timeCounter');
  
  // Configurar los botones
  setupCaseteraButtons();
  
  // Crear barra de progreso en la casetera si no existe
  if (!progressFill) {
    const progressBar = document.createElement('div');
    progressBar.id = 'display-progress-bar';
    progressBar.style.width = '100%';
    progressBar.style.height = '10px';
    progressBar.style.backgroundColor = '#472357';
    progressBar.style.position = 'absolute';
    progressBar.style.bottom = '10px';
    progressBar.style.left = '0';
    
    const fill = document.createElement('div');
    fill.id = 'progressFill';
    fill.style.width = '0%';
    fill.style.height = '100%';
    fill.style.backgroundColor = '#64faff';
    
    progressBar.appendChild(fill);
    document.querySelector('.screen').appendChild(progressBar);
    
    progressFill = fill;
  }
}

// Configurar los botones de control de la casetera
function setupCaseteraButtons() {
  // Botón de insertar/expulsar
  document.getElementById('btnEject').addEventListener('click', function() {
    if (currentVHS) {
      if (!isVHSInserted) {
        insertVHS();
      } else {
        ejectVHS();
      }
    } else {
      statusMessage.textContent = 'SELECCIONA VHS';
    }
  });
  
  // Botón de reproducir
  document.getElementById('btnPlay').addEventListener('click', function() {
    if (isVHSInserted) {
      playVideo();
    } else {
      statusMessage.textContent = 'INSERTA VHS';
    }
  });
  
  // Botón de pausa
  document.getElementById('btnPause').addEventListener('click', function() {
    if (isPlaying) {
      pauseVideo();
    }
  });
  
  // Botón de detener
  document.getElementById('btnStop').addEventListener('click', function() {
    if (isPlaying || isPaused) {
      stopVideo();
    }
  });
  
  // Botón de rebobinar
  document.getElementById('btnRew').addEventListener('mousedown', function() {
    if (isVHSInserted) {
      // Guardar el estado de reproducción actual
      const wasPlaying = isPlaying;
      startRewind();
      // Guardar el estado en el elemento
      this.dataset.wasPlaying = wasPlaying;
    }
  });
  
  document.getElementById('btnRew').addEventListener('mouseup', function() {
    if (isRewinding) {
      // Verificar si estaba reproduciendo antes
      const wasPlaying = this.dataset.wasPlaying === "true";
      stopRewind(wasPlaying);
      // Limpiar el dataset
      delete this.dataset.wasPlaying;
    }
  });
  
  document.getElementById('btnRew').addEventListener('mouseleave', function() {
    if (isRewinding) {
      // Verificar si estaba reproduciendo antes
      const wasPlaying = this.dataset.wasPlaying === "true";
      stopRewind(wasPlaying);
      // Limpiar el dataset
      delete this.dataset.wasPlaying;
    }
  });
  
  // Botón de avance rápido
  document.getElementById('btnFwd').addEventListener('mousedown', function() {
    if (isVHSInserted) {
      // Guardar el estado de reproducción actual
      const wasPlaying = isPlaying;
      startForward();
      // Guardar el estado en el elemento
      this.dataset.wasPlaying = wasPlaying;
    }
  });
  
  document.getElementById('btnFwd').addEventListener('mouseup', function() {
    if (isForwarding) {
      // Verificar si estaba reproduciendo antes
      const wasPlaying = this.dataset.wasPlaying === "true";
      stopForward(wasPlaying);
      // Limpiar el dataset
      delete this.dataset.wasPlaying;
    }
  });
  
  document.getElementById('btnFwd').addEventListener('mouseleave', function() {
    if (isForwarding) {
      // Verificar si estaba reproduciendo antes
      const wasPlaying = this.dataset.wasPlaying === "true";
      stopForward(wasPlaying);
      // Limpiar el dataset
      delete this.dataset.wasPlaying;
    }
  });
  
  // Botones de volumen
  const volUpBtn = document.getElementById('btnVolUp');
  const volDownBtn = document.getElementById('btnVolDown');
  
  if (volUpBtn) {
    volUpBtn.addEventListener('click', function() {
      increaseVolume();
    });
  }
  
  if (volDownBtn) {
    volDownBtn.addEventListener('click', function() {
      decreaseVolume();
    });
  }
}

// Insertar el VHS seleccionado
function insertVHS() {
  // Verificar si ya hay un VHS insertado
  if (isVHSInserted) {
    statusMessage.textContent = 'YA HAY UN VHS';
    return; // Salir de la función si ya hay un VHS insertado
  }

  // Si no hay VHS seleccionado, no hacer nada
  if (!currentVHS) {
    statusMessage.textContent = 'SELECCIONA VHS';
    return;
  }

  // Reproducir sonido de inserción
  const insertSound = document.getElementById('insertSound');
  if (insertSound) {
    insertSound.currentTime = 0;
    insertSound.play();
  }

  // Ocultar el VHS seleccionado
  currentVHS.element.style.display = 'none';
  
  // Marcar el VHS como insertado
  currentVHS.element.classList.add('inserted');

  // Actualizar el mensaje de estado
  statusMessage.textContent = 'VHS INSERTADO';

  // Mostrar mensaje de insertado brevemente
  const insertedMsg = document.getElementById('inserted');
  if (insertedMsg) {
    insertedMsg.textContent = currentVHS.id;
    insertedMsg.style.opacity = 1;
    setTimeout(() => {
      insertedMsg.style.opacity = 0;
    }, 2000);
  }

  // Ocultar el texto de insertar si existe
  const insertText = document.getElementById('insert-text');
  if (insertText) {
    insertText.style.display = 'none';
  }

  // Cargar el video
  videoPlayer.src = currentVHS.videoSrc;
  videoPlayer.style.display = 'block';

  // Marcar que hay un VHS insertado
  isVHSInserted = true;

  // Actualizar el texto del botón de eject
  const ejectButton = document.getElementById('btnEject');
  if (ejectButton && ejectButton.querySelector('.pixel-icon')) {
    ejectButton.querySelector('.pixel-icon').textContent = 'EJECT';
  }
}

// Expulsar el VHS
function ejectVHS() {
  // Si no hay VHS insertado, no hacer nada
  if (!isVHSInserted) {
    statusMessage.textContent = 'NO HAY VHS';
    return;
  }
  
  // Detener la reproducción si está activa
  if (isPlaying || isPaused) {
    stopVideo();
  }
  
  // Reproducir sonido de expulsión
  const ejectSound = document.getElementById('ejectSound');
  if (ejectSound) {
    ejectSound.currentTime = 0;
    ejectSound.play();
  }
  
  // Quitar la marca de insertado
  if (currentVHS && currentVHS.element) {
    currentVHS.element.classList.remove('inserted');
    currentVHS.element.style.display = 'flex';
  }
  
  // Ocultar el video
  videoPlayer.src = '';
  videoPlayer.style.display = 'none';
  
  // Actualizar el mensaje de estado
  statusMessage.textContent = 'VHS EXPULSADO';
  
  // Reiniciar la barra de progreso
  progressFill.style.width = '0%';
  
  // Reiniciar el contador de tiempo
  timeCounter.textContent = '00:00 / 00:00';
  
  // Quitar la clase playing del tv-screen
  tvScreen.classList.remove('playing');
  
  // Ocultar el nombre del VHS insertado
  const inserted = document.getElementById('inserted');
  if (inserted) {
    inserted.innerHTML = '';
    inserted.style.opacity = 0;
  }
  
  // Mostrar el texto de insertar
  const insertText = document.getElementById('insert-text');
  if (insertText) {
    insertText.style.display = 'block';
  }
  
  // Restablecer la variable de VHS insertado
  isVHSInserted = false;
  
  // Actualizar el texto del botón de eject
  const ejectButton = document.getElementById('btnEject');
  if (ejectButton && ejectButton.querySelector('.pixel-icon')) {
    ejectButton.querySelector('.pixel-icon').textContent = 'INSERT';
  }
}

// Reproducir video
function playVideo() {
  // Si está pausado, continuar la reproducción
  if (isPaused) {
    videoPlayer.play();
    isPaused = false;
    isPlaying = true;
    statusMessage.textContent = 'REPRODUCIENDO';
    return;
  }
  
  // Iniciar la reproducción
  videoPlayer.play();
  isPlaying = true;
  
  // Actualizar el mensaje de estado
  statusMessage.textContent = 'REPRODUCIENDO';
  
  // Añadir la clase playing al tv-screen
  tvScreen.classList.add('playing');
  
  // Detener rebobinado o avance rápido si están activos
  if (isRewinding || isForwarding) {
    isRewinding = false;
    isForwarding = false;
    if (rewindInterval) clearInterval(rewindInterval);
    if (forwardInterval) clearInterval(forwardInterval);
    videoPlayer.playbackRate = 1.0;
    tvScreen.classList.remove('rewinding', 'fast-forward');
  }
}

// Pausar video
function pauseVideo() {
  videoPlayer.pause();
  isPlaying = false;
  isPaused = true;
  
  // Actualizar el mensaje de estado
  statusMessage.textContent = 'PAUSADO';
}

// Detener video
function stopVideo() {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  isPlaying = false;
  isPaused = false;
  
  // Actualizar el mensaje de estado
  statusMessage.textContent = 'DETENIDO';
  
  // Reiniciar la barra de progreso
  progressFill.style.width = '0%';
  
  // Quitar la clase playing del tv-screen
  tvScreen.classList.remove('playing');
  
  // Detener rebobinado o avance rápido si están activos
  if (isRewinding || isForwarding) {
    isRewinding = false;
    isForwarding = false;
    if (rewindInterval) clearInterval(rewindInterval);
    if (forwardInterval) clearInterval(forwardInterval);
    videoPlayer.playbackRate = 1.0;
    tvScreen.classList.remove('rewinding', 'fast-forward');
  }
}

// Iniciar rebobinado
function startRewind() {
  if (isForwarding) {
    // Si estaba en avance rápido, detenerlo
    isForwarding = false;
    if (forwardInterval) clearInterval(forwardInterval);
    tvScreen.classList.remove('fast-forward');
  }
  
  // Activar rebobinado
  isRewinding = true;
  tvScreen.classList.add('rewinding');
  
  // Si estaba reproduciendo, pausar
  if (isPlaying) {
    videoPlayer.pause();
    isPlaying = false;
  }
  
  // Iniciar intervalo para rebobinar
  rewindInterval = setInterval(function() {
    if (videoPlayer.currentTime <= 0) {
      stopRewind(false);
      return;
    }
    videoPlayer.currentTime = Math.max(0, videoPlayer.currentTime - 1);
    updateProgressBar();
    updateTimeCounter();
  }, 100);
  
  // Actualizar el mensaje de estado
  statusMessage.textContent = 'REBOBINANDO';
}

// Detener rebobinado
function stopRewind(resumePlay) {
  if (rewindInterval) clearInterval(rewindInterval);
  isRewinding = false;
  tvScreen.classList.remove('rewinding');
  
  // Si estaba reproduciendo antes, reanudar
  if (resumePlay) {
    playVideo();
  } else {
    statusMessage.textContent = 'PAUSADO';
  }
}

// Iniciar avance rápido
function startForward() {
  if (isRewinding) {
    // Si estaba rebobinando, detenerlo
    isRewinding = false;
    if (rewindInterval) clearInterval(rewindInterval);
    tvScreen.classList.remove('rewinding');
  }
  
  // Activar avance rápido
  isForwarding = true;
  tvScreen.classList.add('fast-forward');
  
  // Si estaba reproduciendo, pausar
  if (isPlaying) {
    videoPlayer.pause();
    isPlaying = false;
  }
  
  // Iniciar intervalo para avanzar
  forwardInterval = setInterval(function() {
    if (videoPlayer.currentTime >= videoPlayer.duration) {
      stopForward(false);
      return;
    }
    videoPlayer.currentTime = Math.min(videoPlayer.duration, videoPlayer.currentTime + 1);
    updateProgressBar();
    updateTimeCounter();
  }, 100);
  
  // Actualizar el mensaje de estado
  statusMessage.textContent = 'AVANCE RÁPIDO';
}

// Detener avance rápido
function stopForward(resumePlay) {
  if (forwardInterval) clearInterval(forwardInterval);
  isForwarding = false;
  tvScreen.classList.remove('fast-forward');
  
  // Si estaba reproduciendo antes, reanudar
  if (resumePlay) {
    playVideo();
  } else {
    statusMessage.textContent = 'PAUSADO';
  }
}

// Aumentar volumen
function increaseVolume() {
  videoPlayer.volume = Math.min(1, videoPlayer.volume + 0.1);
  statusMessage.textContent = `VOLUMEN: ${Math.round(videoPlayer.volume * 100)}%`;
}

// Disminuir volumen
function decreaseVolume() {
  videoPlayer.volume = Math.max(0, videoPlayer.volume - 0.1);
  statusMessage.textContent = `VOLUMEN: ${Math.round(videoPlayer.volume * 100)}%`;
}

// Actualizar barra de progreso
function updateProgressBar() {
  const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
      progressFill.style.width = `${progress}%`;
  }
}

// Actualizar contador de tiempo
function updateTimeCounter() {
  const currentTime = formatTime(videoPlayer.currentTime);
  const duration = formatTime(videoPlayer.duration);
  timeCounter.textContent = `${currentTime} / ${duration}`;
}

// Formatear tiempo en formato MM:SS
function formatTime(seconds) {
  if (isNaN(seconds) || !isFinite(seconds)) {
    return "00:00";
  }
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Exportar funciones para que sean accesibles desde vhs.js
window.caseteraFunctions = {
  initCasetera,
  insertVHS,
  ejectVHS,
  playVideo,
  pauseVideo,
  stopVideo,
  updateProgressBar,
  updateTimeCounter
};