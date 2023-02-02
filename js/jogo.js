const grid = document.querySelector('.grid');
const divPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const popup = document.querySelector('.pop-up');
const popupMensagem = document.querySelector('.mensagem-pop');

const characters = [
	'beth', 'jerry', 'jessica', 'morty', 'pessoa-passaro', 'pickle-rick', 'rick', 'summer', 'meeseeks', 'scroopy',
	];

const createElement = (tag, className) => {
	const element = document.createElement(tag);
	element.className = className;
	return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
	const disabledCards = document.querySelectorAll('.disabled-card');

	if (disabledCards.length === 20) {
		clearInterval(this.loop);
		popupMensagem.innerHTML = `Parabéns, ${divPlayer.innerHTML}, seu tempo foi: ${timer.innerHTML} <br> Jogo em desenvolvimento com novas funções em breve <br><br> *jogar novamente desativado*`;
		popup.classList.remove('d-none');
	}
}

const checkCards = () => {
	const firstCharacter = firstCard.getAttribute('data-character');
	const secondCharacter = secondCard.getAttribute('data-character');

	if (firstCharacter === secondCharacter) {

		firstCard.firstChild.classList.add('disabled-card');
		secondCard.firstChild.classList.add('disabled-card');

		firstCard = '';
		secondCard = '';

		checkEndGame();

	} else {

		//Seta um tempo que a pessoa visualiza o card
		setTimeout(() => {
			firstCard.classList.remove('reveal-card');
      		secondCard.classList.remove('reveal-card');

			//Limpar a variavel para trazer vazio
			firstCard = '';
			secondCard = '';

		}, 500);		
	}
}

const revealCard = ({ target }) => {
	//se a carta já foi selecionada, voltar nada
	if (target.parentNode.className.includes('reveal-card')) {
	   return;
	}

	if (firstCard === '') {
		target.parentNode.classList.add('reveal-card');
		firstCard = target.parentNode;
	} else if (secondCard === '') {
		target.parentNode.classList.add('reveal-card');
		secondCard = target.parentNode;

		checkCards();
	}
}

const createCard = (character) => {
	const card = createElement('div', 'card');
	const front = createElement('div', 'front face');
	const back = createElement('div', 'back face');

	card.appendChild(front);
	card.appendChild(back);

	//Chamar imagem do card
	front.style.backgroundImage = `url('../images/${character}.png')`;

	card.addEventListener('click', revealCard);

	//Adiciona um atributo na div
	card.setAttribute('data-character', character);

	return card;
}

const loadGame = () => {
	//Duplica o array
	const duplicateCharacters = [ ... characters, ... characters ];

	//Metodo sort tem a função de ordenar os objetos em ordem alfabetica
	const shuffledArray = duplicateCharacters.sort( () => Math.random() - 0.5 );

	// ForEach tem objetivo de percorrer todos os elementos de um array
	shuffledArray.forEach((character) => {

		const card = createCard(character);
		grid.appendChild(card);

	});
}

const startTimer = () => {

	this.loop = setInterval(() => {

		const currentTime = +timer.innerHTML;
		timer.innerHTML = currentTime + 1;

		if(currentTime < 9){
			timer.innerHTML = '0' + timer.innerHTML;
		}

	}, 1000);

}

//Executar elemento apenas quando o player(navegador) estiver carregado
window.onload = () => {

	const playerName = localStorage.getItem('player');

	divPlayer.innerHTML = playerName;

	startTimer();
	loadGame();
}
