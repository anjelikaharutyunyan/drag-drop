const addButton = document.getElementById("add-task");
let cardId = 0;
const cards = [];

const addCard = (event) => {
    const cardTitle = prompt("Enter the title of the task");
    if (cardTitle) {
        const card = document.createElement("div");
        card.className = "card";
        card.id = `card-${cardId}`;
        card.draggable = true;
        card.textContent = cardTitle;

        const closeCard = document.createElement('i');
        closeCard.className = "fa-solid fa-xmark";
        closeCard.addEventListener('click', handleTaskDelete);
        card.append(closeCard);

        card.addEventListener("dragstart", dragStart);
        card.addEventListener("dragend", dragEnd);

        cards.push(cardTitle);
        console.log(cards);

        const column = event.target.closest(".column");
        const container = column.querySelector(".card-container");
        container.appendChild(card);
        cardId++;
    }
};

const addTaskButtons = document.querySelectorAll('.add-task-btn');
addTaskButtons.forEach(button => button.addEventListener('click', addCard));

function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    setTimeout(() => {
        e.target.classList.add("hide");
    }, 0);
}

function dragEnd(e) {
    e.target.classList.remove("hide");
}

const columns = document.querySelectorAll(".card-container");
columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
});

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add("hovered");
}

function dragLeave() {
    this.classList.remove("hovered");
}

function drop(e) {
    this.classList.remove("hovered");
    const cardId = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(cardId);
    e.target.appendChild(card);
}

function search() {
    const input = document.getElementById('search-bar').value.toLowerCase();
    const searchResultsContainer = document.getElementById('search-results');

    searchResultsContainer.innerHTML = '';

    if (input === '') {
        return;
    }

    const results = cards.filter(cardTitle => cardTitle.toLowerCase().includes(input));
    results.forEach(result => {
        let resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.textContent = result;
        searchResultsContainer.appendChild(resultItem);
    });
}

const searchInput = document.getElementById('search-bar');
searchInput.addEventListener('keyup', search);


const handleTaskDelete = (event) => {
    const card = event.target.parentElement;
    const cardTitle = card.textContent;
    const cardIndex = cards.indexOf(cardTitle);

    if (cards.includes(cardTitle)) {
        cards.splice(cardIndex, 1);
    }

    card.remove();
}
