// Capturamos todos los elementos de la web
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

// Funciones para generar caracteres aleatorios
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Evento: Botón de copiar al portapapeles
clipboardEl.addEventListener('click', () => {
    const password = resultEl.innerText;
    if (!password || password === 'P4$5W0rD!') {
        return;
    }
    navigator.clipboard.writeText(password).then(() => {
        const originalText = clipboardEl.innerText;
        clipboardEl.innerText = '¡Copiado!';
        setTimeout(() => clipboardEl.innerText = originalText, 2000);
    });
});

// Evento: Botón de generar contraseña
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value; // El símbolo '+' lo convierte en número
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Función principal que construye la contraseña
function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    
    // Si el usuario desmarca todas las casillas, no devuelve nada
    if (typesCount === 0) {
        return 'Selecciona una opción';
    }

    // Creamos un array con las opciones marcadas
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    // Bucle para ir añadiendo caracteres hasta llegar a la longitud deseada
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    // Recortamos por si nos hemos pasado de la longitud exacta y barajamos un poco (opcional, pero buena práctica)
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

// Funciones matemáticas usando códigos ASCII
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}