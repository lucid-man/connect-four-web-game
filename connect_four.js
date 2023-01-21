const GREY = "rgb(128, 128, 128)";
const BLUE = "rgb(27, 23, 235)";
const RED = "rgb(235, 23, 23)";
const GREEN = "rgb(3, 255, 70)";

var winner = 0;
var winningSequence = [
    {row: null, column: null},
    {row: null, column: null},
    {row: null, column: null},
    {row: null, column: null}
]

function getButtonColor(row, column) {
    return $("#board").find("tr").eq(row).find("button").eq(column).css("background-color");
}

function setButtonColor(row, column, color) {
    return $("#board").find("tr").eq(row).find("button").eq(column).css("background-color", color);
}

function setButtonBorder(row, column, color) {
    return $("#board").find("tr").eq(row).find("button").eq(column).css("border", "4px solid " + color);
}

function checkIfFourMatchingColors(color1, color2, color3, color4) {
    return (color1 === color2 && color1 === color3 && color1 === color4 && color1 !== GREY && color1 !== undefined);
}

function getUnoccupiedRow(column) {
    for (var row = 5; row >= 0; row--) {
        if (getButtonColor(row, column) === GREY) {
            return row;
        }
    }
}

function checkHorizontalWin() {
    for (var row = 0; row < 6; row++) {
        for(var column = 0; column < 4; column++ ) {
            var checkedFour = [
                {row: row, column: column},
                {row: row, column: column + 1},
                {row: row, column: column + 2},
                {row: row, column: column + 3}
            ]
            if (checkIfFourMatchingColors(
                getButtonColor(checkedFour[0]["row"], checkedFour[0]["column"]),
                getButtonColor(checkedFour[1]["row"], checkedFour[1]["column"]),
                getButtonColor(checkedFour[2]["row"], checkedFour[2]["column"]),
                getButtonColor(checkedFour[3]["row"], checkedFour[3]["column"]),
                )) {
                    winningSequence = checkedFour;
                    if (getButtonColor(checkedFour[0]["row"], checkedFour[0]["column"]) == BLUE) winner = 1;
                    else if (getButtonColor(checkedFour[0]["row"], checkedFour[0]["column"]) == RED) winner = 2;
                    return true;
            } else {
                continue;
            }
        }
    }
}

function checkVerticalWin() {
    for (var column = 0; column < 7; column++) {
        for (var row = 0; row < 3; row++) {
            var checkedFour = [
                {row: row, column: column},
                {row: row + 1, column: column},
                {row: row + 2, column: column},
                {row: row + 3, column: column}
            ]
            if (checkIfFourMatchingColors(
                getButtonColor(checkedFour[0]["row"], checkedFour[0]["column"]),
                getButtonColor(checkedFour[1]["row"], checkedFour[1]["column"]),
                getButtonColor(checkedFour[2]["row"], checkedFour[2]["column"]),
                getButtonColor(checkedFour[3]["row"], checkedFour[3]["column"]),
                )) {
                    winningSequence = checkedFour;
                    if (getButtonColor(checkedFour[0]["row"], checkedFour[0]["column"]) == BLUE) winner = 1;
                    else if (getButtonColor(checkedFour[0]["row"], checkedFour[0]["column"]) == RED) winner = 2;
                    return true;
            } else {
                continue;
            }
        }
    }
}

function checkDiagonalWin() {
    for (var column = 0; column < 5; column++) {
        for (var row = 0; row < 7; row++) {
            var checkedFour = [
                {row: row, column: column},
                {row: row + 1, column: column +1},
                {row: row + 2, column: column +2},
                {row: row + 3, column: column +3}
            ]
            if (checkIfFourMatchingColors(
                getButtonColor(checkedFour[0]["row"], checkedFour[0]["column"]),
                getButtonColor(checkedFour[1]["row"], checkedFour[1]["column"]),
                getButtonColor(checkedFour[2]["row"], checkedFour[2]["column"]),
                getButtonColor(checkedFour[3]["row"], checkedFour[3]["column"]),
                )) {
                    winningSequence = checkedFour;
                    if (getButtonColor(checkedFour[0]["row"], checkedFour[0]["column"]) == BLUE) winner = 1;
                    else if (getButtonColor(checkedFour[0]["row"], checkedFour[0]["column"]) == RED) winner = 2;
                    return true;
            }
            checkedFour = [
                {row: row, column: column},
                {row: row - 1, column: column +1},
                {row: row - 2, column: column +2},
                {row: row - 3, column: column +3}
            ]
            if (checkIfFourMatchingColors(
                getButtonColor(checkedFour[0]["row"], checkedFour[0]["column"]),
                getButtonColor(checkedFour[1]["row"], checkedFour[1]["column"]),
                getButtonColor(checkedFour[2]["row"], checkedFour[2]["column"]),
                getButtonColor(checkedFour[3]["row"], checkedFour[3]["column"]),
                )) {
                    winningSequence = checkedFour;
                    if (getButtonColor(checkedFour[0]["row"], checkedFour[0]["column"]) == BLUE) winner = 1;
                    else if (getButtonColor(checkedFour[0]["row"], checkedFour[0]["column"]) == RED) winner = 2;
                    return true;
            }
        }
    }
}

function setMessage() {
    if (currentPlayer === 1) {
        $("h3").text(player1+": It's your turn. Select a column to drop your blue chip.");
    } else {
        $("h3").text(player2+": It's your turn. Select a column to drop your red chip.");
    }
}

function winningScreen() {

    gameState = "over";

    $("h2").fadeOut();
    $("h3").fadeOut();

    for(object of winningSequence) {
        setButtonBorder(object["row"], object["column"], GREEN);
    }

    if (winner === 1) {
        $("h1").text(player1+": You win! Congratulations. Refresh the page to play again.")
    } else {
        $("h1").text(player2+": You win! Congratulations. Refresh the page to play again.")
    }
}

function switchPlayer() {
    if (currentPlayer === 1) currentPlayer = 2;
    else currentPlayer = 1;
}

function dropChip(column) {

    if (gameState == "playing") {
        console.log("Chip dropped in column " + column);
        var color;
        if (currentPlayer === 1) color = BLUE;
        else color = RED;

        var unoccupied = getUnoccupiedRow(column);

        if (unoccupied !== undefined) {
            setButtonColor(unoccupied, column, color);

            if (checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin()) {
                winningScreen();
            } else {
                switchPlayer();
                setMessage();
            }
        }

    }
    

}



var player1 = prompt("Player 1 enter your name. You will be blue.");
var player2 = prompt("Player 2 enter your name. You will be red.");

gameState = "playing";
currentPlayer = 1;
setMessage();




$(".column1").click(function() { 
    dropChip(0);
});
$(".column2").click(function() { 
    dropChip(1);
});
$(".column3").click(function() { 
    dropChip(2);
});
$(".column4").click(function() { 
    dropChip(3);
});
$(".column5").click(function() { 
    dropChip(4);
});
$(".column6").click(function() { 
    dropChip(5);
});
$(".column7").click(function() { 
    dropChip(6);
});
