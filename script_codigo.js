document.addEventListener('DOMContentLoaded', () => {
    // CONFIGURACIÓN (¡CAMBIA ESTOS VALORES!)
    const correctCode = "123456"; // Código secreto (cámbialo)
    const thinkingCat = "gatito_pensando.gif"; // Ruta de tu GIF
    const happyCat = "gatito_feliz.gif"; // Ruta de tu GIF
    const sadCat = "gatito_triste.gif"; // Ruta de tu GIF

    // Elementos
    const startScreen = document.getElementById('start-screen');
    const successScreen = document.getElementById('success-screen');
    const errorScreen = document.getElementById('error-screen');
    const tryAgainBtn = document.getElementById('try-again-btn');
    const continueBtn = document.getElementById('continue-btn');
    const codeDisplay = document.getElementById('code-display');
    const message = document.getElementById('message');
    const keys = document.querySelectorAll('.key');
    const deleteKey = document.getElementById('delete-key');
    const bgMusic = document.getElementById('bg-music');
    
    let userCode = [];

    // Configurar GIFs
    document.getElementById('happy-cat').src = happyCat;
    document.getElementById('sad-cat').src = sadCat;

    // Teclado
    keys.forEach(key => {
        key.addEventListener('click', () => {
            if (userCode.length < 6) {
                userCode.push(key.textContent);
                updateCodeDisplay();
            }
        });
    });

    // Borrar
    deleteKey.addEventListener('click', () => {
        userCode = [];
        updateCodeDisplay();
    });

    // Intentar de nuevo
    tryAgainBtn.addEventListener('click', () => {
        errorScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
        userCode = [];
        codeDisplay.textContent = "_ _ _ _ _ _";
    });

    // Continuar a la página del sobre
    continueBtn.addEventListener('click', () => {
        window.location.href = "index_sobre.html";
    });

    function updateCodeDisplay() {
        let display = "";
        for (let i = 0; i < 6; i++) {
            display += userCode[i] ? userCode[i] + " " : "_ ";
        }
        codeDisplay.textContent = display.trim().replace(/ /g, " ");

        if (userCode.length === 6) {
            if (userCode.join('') === correctCode) {
                // Éxito
                startScreen.classList.add('hidden');
                successScreen.classList.remove('hidden');
                bgMusic.play();
                
                // Confeti
                import("https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js")
                    .then(() => {
                        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
                    });
            } else {
                // Error
                startScreen.classList.add('hidden');
                errorScreen.classList.remove('hidden');
            }
        }
    }
});