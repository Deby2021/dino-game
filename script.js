//aqui seleciono dino no documento para manipula-lo
const dino = document.querySelector('.dino');

const background = document.querySelector('.background');

//se estiver pulando
let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    //setInterval cria um intervalo para determinado
    //código ser executado repetidamente
    //no caso aqui sera a cada 20 milésimos de segundos
    let upInterval = setInterval(() => {
        if (position >= 150) {
            // Descendo
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    //propriedades css
                    dino.style.bottom = position + 'px';
                }
            }, 20);//milésimos de segundo
        } else {
            // Subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');

    //posicão a direita
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    //adicionar a aparência do nosso cactus
    cactus.classList.add('cactus');
    //adicionando um filho 
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftTimer = setInterval(() => {
        if (cactusPosition < -60) {
            // Saiu da tela
            clearInterval(leftTimer);
            background.removeChild(cactus);

            //para o cactus bater em nosso dino ele tem
            //que estar maior que 0 e menor que 60, pois 60
            //é a altura do nosso cactus
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            // Game over
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);