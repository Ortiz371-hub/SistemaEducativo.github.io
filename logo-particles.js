document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#animated-logo');
    const logo = document.querySelector('.logo');
    const colors = ['#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb', '#a6c1ee'];
    const particleCount = 20; // Cantidad reducida para mejor rendimiento en pantallas pequeñas

    // Solo crear partículas si el contenedor existe
    if (!container) return;

    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'logo-particle';
        
        // Tamaño aleatorio (2px a 5px)
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Color aleatorio
        const color1 = colors[Math.floor(Math.random() * colors.length)];
        const color2 = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = `linear-gradient(145deg, ${color1}, ${color2})`;
        
        // Posición inicial centrada (para el efecto orbital)
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        
        // Propiedades de animación
        particle.style.opacity = '0.7';
        particle.style.mixBlendMode = 'screen';
        particle.style.borderRadius = '50%';
        particle.style.position = 'absolute';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        particle.style.willChange = 'transform, left, top';
        
        container.appendChild(particle);
        
        // Iniciar animación orbital
        animateParticle(particle, centerX, centerY);
    }

    function animateParticle(particle, centerX, centerY) {
        let angle = Math.random() * Math.PI * 2; // Ángulo inicial aleatorio
        const radius = Math.random() * 50 + 30; // Radio orbital reducido para 17"
        const speed = Math.random() * 0.02 + 0.01; // Velocidad
        const fluctuationIntensity = 10; // Reducido para pantallas pequeñas
        
        function move() {
            // Movimiento orbital base
            angle += speed;
            const orbitX = centerX + Math.cos(angle) * radius;
            const orbitY = centerY + Math.sin(angle) * radius;
            
            // Añadir fluctuación aleatoria para efecto orgánico
            const fluctuationX = Math.sin(angle * 3) * fluctuationIntensity;
            const fluctuationY = Math.cos(angle * 2.5) * fluctuationIntensity;
            
            particle.style.transform = `translate(${fluctuationX}px, ${fluctuationY}px)`;
            particle.style.left = `${orbitX}px`;
            particle.style.top = `${orbitY}px`;
            
            requestAnimationFrame(move);
        }
        
        move();
    }

    // Interacción con el mouse (las partículas huyen del cursor)
    container.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.logo-particle');
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        particles.forEach(particle => {
            const particleX = parseFloat(particle.style.left) + parseFloat(particle.style.width) / 2;
            const particleY = parseFloat(particle.style.top) + parseFloat(particle.style.height) / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - particleX, 2) + 
                Math.pow(mouseY - particleY, 2)
            );
            
            if (distance < 60) { // Radio de influencia reducido
                const force = (60 - distance) / 60 * 2; // Fuerza reducida
                const angle = Math.atan2(particleY - mouseY, particleX - mouseX);
                
                particle.style.left = `${particleX + Math.cos(angle) * force}px`;
                particle.style.top = `${particleY + Math.sin(angle) * force}px`;
            }
        });
    });

    // Ajustar partículas al redimensionar
    window.addEventListener('resize', () => {
        const particles = document.querySelectorAll('.logo-particle');
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
        
        particles.forEach(particle => {
            // Recalcular posición basada en el nuevo centro
            const currentLeft = parseFloat(particle.style.left);
            const currentTop = parseFloat(particle.style.top);
            const relativeX = currentLeft - centerX;
            const relativeY = currentTop - centerY;
            
            particle.style.left = `${centerX + relativeX}px`;
            particle.style.top = `${centerY + relativeY}px`;
        });
    });
});