var userInputSport = document.getElementById('user-input-sport');
var searchButton = document.querySelector('.search-button');
var searchResults = document.getElementById('search-results');
// var standings1Body = document.getElementById('standings1-body');
// var standings2Body = document.getElementById('standings2-body');

searchButton.addEventListener('click', getInfo);

function getInfo(){
    searchResults.innerHTML = "";
    searchResults.classList.add('show');
    if(userInputSport.value == 'Hockey')
    {
        fetch('https://statsapi.web.nhl.com/api/v1/teams')
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            // console.log(data.teams);
            teamsArray = data.teams;
            teamsArray.forEach( element =>{
                // console.log(element);
                var newLi = document.createElement('li');
                newLi.setAttribute('data-teamId', element.id);
                newLi.addEventListener('click', getTeamRoster)
                newLi.innerText = element.name;
                searchResults.appendChild(newLi);
            })
        }) 
    }
}


//Get Hockey roster
function getTeamRoster(event){
    getStandings();
    console.log(event);
    fetch(`https://statsapi.web.nhl.com/api/v1/teams/${event.target.attributes[0].nodeValue}/roster`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            playersBody.innerHTML = "";
            // console.log(data);
            var rosterArray = data.roster;
            var filteredRosterArray = rosterArray.filter((element) => element.jerseyNumber != undefined);//Checks for only players that have a jersey number
            filteredRosterArray.forEach((element) => {
                var playerNumber = element.jerseyNumber;
                // console.log(playerNumber);
                var name = element.person.fullName.split(" ");
                var playerFirstName = name[0];
                var playerLastName = name[1];
    
                var playerNumberEL = document.createElement('th');
                var firstNameEL = document.createElement('td');
                var lastNameEL = document.createElement('td');
                var anchorFirstEl = document.createElement('a')
                var anchorSecondEl = document.createElement('a')
                

                anchorFirstEl.setAttribute("href", "playerstats.html")
                anchorSecondEl.setAttribute("href", "playerstats.html")

                anchorFirstEl.innerText = playerFirstName
                anchorSecondEl.innerText = playerLastName
              
                // var countryEl = document.createElement('td');
                var newTableRow = document.createElement('tr');

                playerNumberEL.innerText = playerNumber;
                // debugger;
                firstNameEL.appendChild(anchorFirstEl);
                lastNameEL.appendChild(anchorSecondEl);1
                

                // countryEl.innerText = playerCountry;

                newTableRow.appendChild(playerNumberEL);
                newTableRow.appendChild(firstNameEL);
                newTableRow.appendChild(lastNameEL);
                //newTableRow.appendChild(positionEl);
                // newTableRow.appendChild(countryEl);

                // playersBody.classList.add('animate__animated animate__bounceIn');
                playersBody.appendChild(newTableRow);

                // console.log(element.position.name)
                var playerPosition = element.position.name
                var positionEl = document.createElement('td')
                positionEl.innerText = playerPosition
                newTableRow.appendChild(positionEl)
            })
        })
        
}
function getStandings() {
    standings1.innerHTML = "";
    standings2.innerHTML = "";
    standings3.innerHTML = "";
    standings4.innerHTML = "";
    console.log("getStandings")
fetch("https://statsapi.web.nhl.com/api/v1/standings/regularSeason")
.then(response => {
    return response.json();
})
.then(data => {

    console.log("thisFetch")



    console.log(data);
    
    var teamsArrW = data.records[0].teamRecords
    var teamsArrC = data.records[1].teamRecords
    var teamsArrE = data.records[2].teamRecords
    var teamsArrN = data.records[3].teamRecords

    //Array for West Div
    teamsArrW.forEach(element =>{
        var teamName = element.team.name;
        // console.log(teamName)
        var teamWins = element.leagueRecord.wins
        // console.log(teamWins)
        var teamLosses = element.leagueRecord.losses
        // console.log(teamLosses)
        var teamTies = element.leagueRecord.ot
        // console.log(teamTies) 
        var teamPoints = element.points
        // console.log(teamPoints)

        var tableRow = document.createElement('tr')
        var teamNameEl = document.createElement('th')
        var teamWinsEl = document.createElement('td')
        var teamLossesEl = document.createElement('td')
        var teamTiesEl = document.createElement('td')
        var teamPointsEl = document.createElement('td')
        var standings1 = document.querySelector('#standings1-body')
    

        teamNameEl.innerText = teamName
        teamWinsEl.innerText = teamWins
        teamLossesEl.innerText = teamLosses
        teamTiesEl.innerText = teamTies
        teamPointsEl.innerText = teamPoints

        tableRow.appendChild(teamNameEl);
        tableRow.appendChild(teamWinsEl);
        tableRow.appendChild(teamLossesEl);
        tableRow.appendChild(teamTiesEl);
        tableRow.appendChild(teamPointsEl);
        (standings1).appendChild(tableRow);
    })

    //Array for East Div
    teamsArrE.forEach(element =>{
        var teamName = element.team.name;
        var teamWins = element.leagueRecord.wins;
        var teamLosses = element.leagueRecord.losses;
        var teamTies = element.leagueRecord.ot;
        var teamPoints = element.points;


        var tableRow = document.createElement('tr')
        var teamNameEl = document.createElement('th')
        var teamWinsEl = document.createElement('td')
        var teamLossesEl = document.createElement('td')
        var teamTiesEl = document.createElement('td')
        var teamPointsEl = document.createElement('td')
        var standings2 = document.querySelector('#standings2-body')

        teamNameEl.innerHTML = teamName
        teamWinsEl.innerHTML = teamWins
        teamLossesEl.innerHTML = teamLosses
        teamTiesEl.innerHTML = teamTies
        teamPointsEl.innerHTML = teamPoints

        tableRow.appendChild(teamNameEl);
        tableRow.appendChild(teamWinsEl);
        tableRow.appendChild(teamLossesEl);
        tableRow.appendChild(teamTiesEl);
        tableRow.appendChild(teamPointsEl);
        (standings2).appendChild(tableRow);
    })

      //Array for North Div
        teamsArrN.forEach(element =>{
            var teamName = element.team.name;
            var teamWins = element.leagueRecord.wins
            var teamLosses = element.leagueRecord.losses
            var teamTies = element.leagueRecord.ot
            var teamPoints = element.points

        var tableRow = document.createElement('tr')
        var teamNameEl = document.createElement('th')
        var teamWinsEl = document.createElement('td')
        var teamLossesEl = document.createElement('td')
        var teamTiesEl = document.createElement('td')
        var teamPointsEl = document.createElement('td')
        var standings3 = document.querySelector('#standings3-body')

        teamNameEl.innerHTML = teamName
        teamWinsEl.innerHTML = teamWins
        teamLossesEl.innerHTML = teamLosses
        teamTiesEl.innerHTML = teamTies
        teamPointsEl.innerHTML = teamPoints

        tableRow.appendChild(teamNameEl);
        tableRow.appendChild(teamWinsEl);
        tableRow.appendChild(teamLossesEl);
        tableRow.appendChild(teamTiesEl);
        tableRow.appendChild(teamPointsEl);
        (standings3).appendChild(tableRow);
    })	

    //Array for Central Div
    teamsArrC.forEach(element =>{
        var teamName = element.team.name;
        var teamWins = element.leagueRecord.wins
        var teamLosses = element.leagueRecord.losses
        var teamTies = element.leagueRecord.ot
        var teamPoints = element.points

        var tableRow = document.createElement('tr')
        var teamNameEl = document.createElement('th')
        var teamWinsEl = document.createElement('td')
        var teamLossesEl = document.createElement('td')
        var teamTiesEl = document.createElement('td')
        var teamPointsEl = document.createElement('td')
        var standings4 = document.querySelector('#standings4-body')

        teamNameEl.innerHTML = teamName
        teamWinsEl.innerHTML = teamWins
        teamLossesEl.innerHTML = teamLosses
        teamTiesEl.innerHTML = teamTies
        teamPointsEl.innerHTML = teamPoints

        tableRow.appendChild(teamNameEl);
        tableRow.appendChild(teamWinsEl);
        tableRow.appendChild(teamLossesEl);
        tableRow.appendChild(teamTiesEl);
        tableRow.appendChild(teamPointsEl);
        (standings4).appendChild(tableRow);
    })
})
}

var saveToLocalStorage = function () {
    var storageInput = userInputSport.value
    userInputSport.value = '';

    if(searchHistory){
        localtStorage.setItem("storedSearch", storageInput + " " + searchHistory)
        searchedHistory = localStorage.getItem('storedSearch')
    }   
        else {
            localStorage.setItem("storedSearch", storageInput)
        }
    
}
searchButton.addEventListener("click", function(){
    saveToLocalStorage()
})