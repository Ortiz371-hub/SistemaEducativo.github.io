document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-panels');
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');
    const panelBtns = document.querySelectorAll('.panel-btn');
    let panelTimeout;
    const panelVisibleDuration = 10000; // 10 segundos

    // Función para mostrar los paneles
    function showPanels() {
        leftPanel.classList.add('active');
        rightPanel.classList.add('active');
        
        // Animar los botones del panel
        panelBtns.forEach((btn, index) => {
            btn.style.animation = `panelBtnFadeIn 0.5s ease-out ${index * 0.1}s forwards`;
        });
        
        // Reiniciar el temporizador de ocultamiento
        resetPanelTimeout();
    }

    // Función para ocultar los paneles
    function hidePanels() {
        leftPanel.classList.remove('active');
        rightPanel.classList.remove('active');
        
        // Resetear animaciones de los botones
        panelBtns.forEach(btn => {
            btn.style.animation = '';
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(10px)';
        });
        
        // Limpiar el temporizador
        clearTimeout(panelTimeout);
    }

    // Función para reiniciar el temporizador
    function resetPanelTimeout() {
        clearTimeout(panelTimeout);
        panelTimeout = setTimeout(hidePanels, panelVisibleDuration);
    }

    // Evento para el botón de toggle
    toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (leftPanel.classList.contains('active')) {
            hidePanels();
        } else {
            showPanels();
        }
    });

    // Eventos para mantener los paneles visibles al interactuar con ellos
    leftPanel.addEventListener('mouseenter', resetPanelTimeout);
    rightPanel.addEventListener('mouseenter', resetPanelTimeout);
    leftPanel.addEventListener('click', resetPanelTimeout);
    rightPanel.addEventListener('click', resetPanelTimeout);

    // Ocultar paneles al hacer clic fuera de ellos
    document.addEventListener('click', function(e) {
        if (!leftPanel.contains(e.target) && !rightPanel.contains(e.target) && e.target !== toggleBtn) {
            hidePanels();
        }
    });

    // Manejar el evento de teclado (ESC para cerrar)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hidePanels();
        }
    });

    // Asegurarse de que los paneles estén ocultos al cargar la página
    hidePanels();
});