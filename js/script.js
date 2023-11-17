const elements =
{
    0: { name: "grapes", path: "images/grapes.png", },
    1: { name: "peach",  path: "images/peach.png", },
    2: { name: "orange", path: "images/orange.png", },
    3: { name: "apple",  path: "images/apple.png", },
    length: 4,
}

let player = { name: "Player", }

// Встановлення зображень комірок
let leftColumn = { elements: [], };
let middleColumn = { elements: [], };
let rightColumn = { elements: [], };

for (let i = 0; i < elements.length; i++) {
    leftColumn.elements.push(elements[i]);
    middleColumn.elements.push(elements[i]);
    rightColumn.elements.push(elements[i]);
}
moveElements(middleColumn);
moveElements(middleColumn);
moveElements(rightColumn);

let buttonEnabled = true;
let currentStep = 0;

document.addEventListener("DOMContentLoaded", () => {
    player.name = prompt("Введіть ім'я: ");
    if (player.name == null || !rightName(player.name)) {
        alert("Ви не ввели ім'я!");
        window.location.reload();
    }
    else {
        document.getElementById('name').innerHTML = player.name;
    }

    updateObjects();

    document.getElementById("btn").addEventListener("click", () => {
        if (buttonEnabled) {
            disableButton();
            hideWindow();
            updateStatus();
            generation();
        }
    });

    //Обробка події завершення генерації зображень у комірках
    document.addEventListener('cellsGenerated', () => {
        enableButton();
        if (victory()) {
            disableButton();
            showWindow();
            document.getElementById("current-stage").innerHTML = "Victory!";
            currentStep = 0;
        } else if (currentStep == 3) {
            document.getElementById("current-stage").innerHTML = "You lost!";
        }
    });

    function generation() {
        const displacement1 = Math.floor(Math.random() * 3) + 5;
        const displacement2 = Math.floor(Math.random() * 3) + 5;
        const displacement3 = Math.floor(Math.random() * 3) + 5;

        let theBiggerOneDisplacement = displacement1 > displacement2 ? displacement1 : displacement2;
        theBiggerOneDisplacement = theBiggerOneDisplacement > displacement3 ? theBiggerOneDisplacement : displacement3;

        for (let i = 1; i < theBiggerOneDisplacement; i++) {
            setTimeout(() => {
                if (i < displacement1) { moveElements(leftColumn); }
                if (i < displacement2) { moveElements(middleColumn); }
                if (i < displacement3) { moveElements(rightColumn); }
                updateObjects();

                if (i == theBiggerOneDisplacement - 1) {
                    document.dispatchEvent(new Event('cellsGenerated'));    // Створення події, коли завершено генерацію усіх комірок
                }
            }, i * 100);
        }
    }

    function showWindow() {
        let column1 = document.getElementById("slots").getElementsByClassName("column")[0];
        column1.getElementsByClassName("object")[0].style.boxShadow = '#00adff -7px 5px 7px, #00adff 7px -5px 7px';
        column1.getElementsByClassName("object")[1].style.boxShadow = '#00adff -7px 5px 7px, #00adff 7px -5px 7px';
        column1.getElementsByClassName("object")[2].style.boxShadow = '#00adff -7px 5px 7px, #00adff 7px -5px 7px';
        let column2 = document.getElementById("slots").getElementsByClassName("column")[1];
        column2.getElementsByClassName("object")[0].style.boxShadow = '#00adff -7px 5px 7px, #00adff 7px -5px 7px';
        column2.getElementsByClassName("object")[1].style.boxShadow = '#00adff -7px 5px 7px, #00adff 7px -5px 7px';
        column2.getElementsByClassName("object")[2].style.boxShadow = '#00adff -7px 5px 7px, #00adff 7px -5px 7px';
        let column3 = document.getElementById("slots").getElementsByClassName("column")[2];
        column3.getElementsByClassName("object")[0].style.boxShadow = '#00adff -7px 5px 7px, #00adff 7px -5px 7px';
        column3.getElementsByClassName("object")[1].style.boxShadow = '#00adff -7px 5px 7px, #00adff 7px -5px 7px';
        column3.getElementsByClassName("object")[2].style.boxShadow = '#00adff -7px 5px 7px, #00adff 7px -5px 7px';
    }

    function hideWindow() {
        let column1 = document.getElementById("slots").getElementsByClassName("column")[0];
        column1.getElementsByClassName("object")[0].style.boxShadow = ' ';
        column1.getElementsByClassName("object")[1].style.boxShadow = ' ';
        column1.getElementsByClassName("object")[2].style.boxShadow = ' ';
        let column2 = document.getElementById("slots").getElementsByClassName("column")[1];
        column2.getElementsByClassName("object")[0].style.boxShadow = ' ';
        column1.getElementsByClassName("object")[1].style.boxShadow = ' ';
        column1.getElementsByClassName("object")[2].style.boxShadow = ' ';
        let column3 = document.getElementById("slots").getElementsByClassName("column")[2];
        column3.getElementsByClassName("object")[0].style.boxShadow = ' ';
        column1.getElementsByClassName("object")[1].style.boxShadow = ' ';
        column1.getElementsByClassName("object")[2].style.boxShadow = ' ';
    }

    // Відображення поточних комірок відповідно до позицій
    function updateObjects() {
        let column1 = document.getElementById("slots").getElementsByClassName("column")[0];
        column1.getElementsByClassName("object")[0].style.backgroundImage = 'url(' + leftColumn.elements[0].path + ')';
        column1.getElementsByClassName("object")[1].style.backgroundImage = 'url(' + leftColumn.elements[1].path + ')';
        column1.getElementsByClassName("object")[2].style.backgroundImage = 'url(' + leftColumn.elements[2].path + ')';
        let column2 = document.getElementById("slots").getElementsByClassName("column")[1];
        column2.getElementsByClassName("object")[0].style.backgroundImage = 'url(' + middleColumn.elements[0].path + ')';
        column2.getElementsByClassName("object")[1].style.backgroundImage = 'url(' + middleColumn.elements[1].path + ')';
        column2.getElementsByClassName("object")[2].style.backgroundImage = 'url(' + middleColumn.elements[2].path + ')';
        let column3 = document.getElementById("slots").getElementsByClassName("column")[2];
        column3.getElementsByClassName("object")[0].style.backgroundImage = 'url(' + rightColumn.elements[0].path + ')';
        column3.getElementsByClassName("object")[1].style.backgroundImage = 'url(' + rightColumn.elements[1].path + ')';
        column3.getElementsByClassName("object")[2].style.backgroundImage = 'url(' + rightColumn.elements[2].path + ')';
    }

    function disableButton() {
        document.getElementById("btn").style.background = "#ae3806";
        document.getElementById("btn").style.boxShadow = "inset 0 0 10px black";
        document.getElementById("btn").style.color = "black";
        document.getElementById("btn").style.cursor ="not-allowed";
        buttonEnabled = false;
    }

    function enableButton() {
        document.getElementById("btn").style.background = "linear-gradient(0deg, #e45a1e 0%, rgb(239, 253, 45) 100%)";
        document.getElementById("btn").style.boxShadow = "3px 3px 5px black";
        document.getElementById("btn").style.cursor ="default";
        buttonEnabled = true;
    }

    // Якщо 3 однакових об'єкта в рядку
    function victory() {
        return ((leftColumn.elements[0].name == middleColumn.elements[0].name && leftColumn.elements[0].name == rightColumn.elements[0].name) || (leftColumn.elements[1].name == middleColumn.elements[1].name && leftColumn.elements[1].name == rightColumn.elements[1].name) || (leftColumn.elements[2].name == middleColumn.elements[2].name && leftColumn.elements[2].name == rightColumn.elements[2].name));
    }

    function updateStatus() {
        currentStep++;

        if (currentStep > 3)
            currentStep = 1;

        switch (currentStep) {
            case 1:
                document.getElementById("current-stage").innerHTML = "Attempt 1 of 3";
                break;
            case 2:
                document.getElementById("current-stage").innerHTML = "Attempt 2 of 3";
                break;
            case 3:
                document.getElementById("current-stage").innerHTML = "Attempt 3 of 3";
                break;
            default:
                document.getElementById("current-stage").innerHTML = "Start the game!";
        }
    }
});


// Зміщення об'єктів у стовпці на 1 масив
function moveElements(column) {
    let show = [];
    show[0] = column.elements[elements.length - 1];
    for (let i = 1; i < elements.length; i++) {
        show[i] = column.elements[i - 1];
    }
    column.elements = show;
}

function rightName(name) {
    const acceptableName = name.trim();
    return acceptableName.length > 0 && acceptableName.length <= 18;
}
