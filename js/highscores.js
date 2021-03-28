highscoreTable = document.getElementById('highscoreTable')

fetch('http://localhost/bullsmouth/src/getHighScores.php')
    .then(response => response.json())
    .then(data =>
        {
            for (let i = data.length - 1; i >= 0 ; i--){
                const row = highscoreTable.insertRow(1);
                const cell0 = row.insertCell(0);
                const cell1 = row.insertCell(1);
                const cell2 = row.insertCell(2);
                cell0.innerHTML = i + 1
                cell1.innerHTML = data[i].score
                cell2.innerHTML = data[i].name
            }
        }
    )
    .catch(console.error)
