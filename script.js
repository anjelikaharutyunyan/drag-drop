const addButton = document.getElementById("add-task");
const addCard = () => {
    let cardId = 0;
    const cardTitle = prompt("Enter the title of the task");
    if (cardTitle) {
        const card = document.createElement("div");
        card.className = "card";
        card.id = `card-${cardId++}`;
        card.draggable = true;
        card.textContent = cardTitle;
        card.addEventListener("dragstart", dargStart);
        card.addEventListener("dragend", dargEnd);
        document.getElementById("todo-container").appendChild(card);
    }
};
addButton.addEventListener("click", addCard);
function dargStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    setTimeout(() => {
        e.target.classList.add("hide");
    }, 0);
}
function dargEnd(e) {
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
    const lists = document.getElementsByClassName("column");
    const board = document.querySelector(".board");
    let draggedElement = null;
    for (let list of lists) {
        list.addEventListener("dragstart", function(e) {
            draggedElement = list;
        });
        list.addEventListener("dragend", function() {
            draggedElement = null;
        });
    }
    board.addEventListener("dragover", function(e) {
        e.preventDefault();
    });
    board.addEventListener("drop", function(e) {
                board.appendChild(draggedElement);
                draggedElement = null;
    });