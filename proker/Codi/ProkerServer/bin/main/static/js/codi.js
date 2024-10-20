function sendParameters() {
    console.log("S'han enviat les dades al servidor");
    sendPost("http://localhost:8080/proker", getInfoParameters, updateInfo, "application/json");
}document.getElementById("playedGames").value = data["playedGames"];

function getInfoParameters() {
    var data = {};
    data.players    = document.getElementById("players").value;
    data.hand       = document.getElementById("hand").value;
    data.flop       = document.getElementById("flop").value;
    data.turn       = document.getElementById("turn").value;
    data.river      = document.getElementById("river").value;
    return data;
}

function updateInfo(data) {
    console.log("data recieved: " + data);
    console.log(data);

    var percentWon  = round((data["wonGames"]  / data["playedGames"]) * 100, 2);
    var percentTie  = round((data["tiedGames"] / data["playedGames"]) * 100, 2);
    var percentLost = round((data["lostGames"] / data["playedGames"]) * 100, 2);
    document.getElementById("wonGames").value    = percentWon + '%';
    document.getElementById("tiedGames").value   = percentTie + '%';
    document.getElementById("lostGames").value   = percentLost + '%';
    document.getElementById("playedGames").value = data["playedGames"];

    var table_info  = document.getElementById("table_info");
    removeRowsInBody(table_info);
    var listOrdered = [];
    for (const [key,value] of Object.entries(data.bestCombinations)) {
        var obj = {};
        obj.totalPercent = round((value["total"] / data["playedGames"]) * 100, 2);
        obj.bestHandName = key;
        obj.winPercent   = round((value["win"]  / value["total"]) * 100, 2);
        obj.tiePercent   = round((value["tie"]  / value["total"]) * 100, 2);
        obj.losePercent  = round((value["lost"] / value["total"]) * 100, 2);
        insertOrdered(listOrdered,obj);
    }
    appendListInBody(table_info,listOrdered);
    // appendRowInBody(table_info,totalPercent,bestHandName,winPercent,tiePercent,losePercent);
}

function insertOrdered(list,obj) {
    console.log(list);
    var i=list.length;
    while (i>0 && list[i-1]['totalPercent'] > obj['totalPercent']) {
        list[i] = list[i-1];
        i--;
    }
    list[i] = obj;
}

function appendListInBody(table,listOrdered) {
    var tbody = table.getElementsByTagName('tbody')[0];
    for (var i=0; i<listOrdered.length; i++) {
        var obj = listOrdered[i];
        var row = tbody.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = obj.totalPercent + '%';
        cell2.innerHTML = obj.bestHandName;
        cell3.innerHTML = obj.winPercent + '%';
        cell4.innerHTML = obj.tiePercent + '%';
        cell5.innerHTML = obj.losePercent + '%';
    }
}

function removeRowsInBody(table) {
    var tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
}

function appendRowInBody(table,totalPercent,bestHandName,winPercent,tiePercent,losePercent) {
    var tbody = table.getElementsByTagName('tbody')[0];
    var row = tbody.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = totalPercent + '%';
    cell2.innerHTML = bestHandName;
    cell3.innerHTML = winPercent + '%';
    cell4.innerHTML = tiePercent + '%';
    cell5.innerHTML = losePercent + '%';
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}