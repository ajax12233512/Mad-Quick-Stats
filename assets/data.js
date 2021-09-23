var searchResults = document.getElementById('search-results');
var searchButton = document.querySelector('.search-button');
var teamName = document.getElementById('team-name');
var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var hideResults = document.querySelector('.hide-results');
var userInputSport = document.getElementById('user-input-sport');
var searchbar = document.getElementById('searchbar');
var tbody = document.getElementById('games-body');
var playersBody = document.getElementById('players-body');
var customTeamColor1 = document.getElementById('custom-team-color-1');
var customTeamColor2 = document.getElementById('custom-team-color-2');
var customTeamColor3 = document.getElementById('custom-team-color-3');
var customTeamColor4 = document.getElementById('custom-team-color-4');
var customTeamColor5 = document.getElementById('custom-team-color-5');

//Moment Js
var m = moment();

// searchbar.addEventListener('click', autofill);
searchButton.addEventListener('click', getTeams);
hideResults.addEventListener('click', function () {
    searchResults.classList.remove('show');
})

function getUserInput() {
    var sport = userInputSport.value;
    return sport;
}

function getTeams() {

    //Using if-statement to check the user input for sport
    if (userInputSport.value == 'Basketball') {
        searchResults.innerHTML = "";
        searchResults.classList.add('show');
        fetch("https://api-nba-v1.p.rapidapi.com/teams/league/vegas", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                "x-rapidapi-key": "2bcab9ead3msh0012ca30e3965cdp19bdc2jsn9ec5386c7f85"
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {

                var teamsArray = data.api.teams;
                console.log(teamsArray);
                teamsArray.forEach(element => {
                    var teamId = element.teamId;
                    var newLiEl = document.createElement('li');
                    newLiEl.setAttribute('data-teamId', teamId);
                    newLiEl.setAttribute('data-teamName', element.fullName);

                    newLiEl.innerText = element.fullName;
                    searchResults.appendChild(newLiEl);
                    newLiEl.addEventListener('click', getTeamInfo);
                });
            });
    }
    else if (userInputSport.value == 'Soccer') {
        searchResults.innerHTML = "";
        var fetchUrlSoccer = `https://api-football-v1.p.rapidapi.com/v2/teams/search/${searchbar.value}`;
        searchResults.classList.add('show');
        fetch(fetchUrlSoccer, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "2bcab9ead3msh0012ca30e3965cdp19bdc2jsn9ec5386c7f85"
            }
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data);
                resultsArray = data.api.teams;
                resultsArray.forEach(element => {
                    var newLiEl = document.createElement('li');
                    newLiEl.innerText = element.name;

                    searchResults.appendChild(newLiEl);
                })
            })
    }
    else if (userInputSport == 'Hockey') {

    }
}



//Get Basketball information
function getTeamInfo(event) {
    // console.log(event.explicitOriginalTarget.attributes[0].nodeValue);
    teamName.innerText = event.target.attributes[1].nodeValue;

    //Fetch the Team Colors
    var teamNameArray = teamName.innerText.split(' ');
    if (teamNameArray.length == 2) {
        getTeamColors2(teamNameArray[0], teamNameArray[1]);
    }
    else if (teamNameArray.length == 3) {
        getTeamColors3(teamNameArray[0], teamNameArray[1], teamNameArray[2],)
    }

    // console.log(teamNameArray); 
    // console.log(event);
    // console.log(event.target.attributes[1].nodeValue);
    var teamId = event.target.attributes[0].nodeValue;

    //Get baskketball players
    fetch(`https://api-nba-v1.p.rapidapi.com/players/teamId/${teamId}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": "2bcab9ead3msh0012ca30e3965cdp19bdc2jsn9ec5386c7f85"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            playersBody.innerHTML = "";
            var playersArray = data.api.players;
            playersArray.forEach(element => {
                if (element.leagues.standard.jersey == undefined) {
                    var playerNumber = 'N/A';
                }
                else {
                    var playerNumber = element.leagues.standard.jersey;
                }
                // console.log(element.leagues.standard.jersey);
                // console.log(element);
                var playerFirstName = element.firstName;
                var playerLastName = element.lastName;
                var playerCountry = element.country;

                var playerNumberEL = document.createElement('th');
                var firstNameEL = document.createElement('td');
                var lastNameEL = document.createElement('td');
                var countryEl = document.createElement('td');
                var newTableRow = document.createElement('tr');

                playerNumberEL.innerText = playerNumber;
                firstNameEL.innerText = playerFirstName;
                lastNameEL.innerText = playerLastName;
                countryEl.innerText = playerCountry;

                newTableRow.appendChild(playerNumberEL);
                newTableRow.appendChild(firstNameEL);
                newTableRow.appendChild(lastNameEL);
                newTableRow.appendChild(countryEl);


                playersBody.appendChild(newTableRow);

            })
        })

    //get basketball games games
    fetch(`https://api-nba-v1.p.rapidapi.com/games/teamId/${teamId}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": "2bcab9ead3msh0012ca30e3965cdp19bdc2jsn9ec5386c7f85"
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            gamesArray = data.api.games;

            //Find the next upcoming game
            var startingGameIndex = gamesArray.find(element => {
                var date = element.startTimeUTC.substring(0, 10);
                momentDate = moment(date, "YYYY-MM-DD");
                return momentDate.isAfter(m);
            });
            var indexNum = gamesArray.indexOf(startingGameIndex) - 1;
            // console.log(startingGameIndex);

            //Get the last 5 basketball games
            for (k = 0; k < 5; k++) {
                console.log(teamName.innerText);
                var targetTeam;
                if (gamesArray[indexNum - k].hTeam.fullName.includes(teamName.innerText)) {
                    targetTeam = gamesArray[indexNum - k].hTeam;
                    console.log('home');
                }
                else {
                    targetTeam = gamesArray[indexNum - k].vTeam;
                    console.log('away');
                }
                console.log(targetTeam.score.points);
                //Display values
                var homeTeamName = gamesArray[indexNum - k].hTeam.shortName;
                var awayTeamName = gamesArray[indexNum - k].vTeam.shortName;
                var homeScore = gamesArray[indexNum - k].hTeam.score.points;
                var awayScore = gamesArray[indexNum - k].vTeam.score.points;
                console.log(gamesArray[indexNum - k].vTeam);
                var thisRow = tbody.children[k];
                // console.log(tbody);
                // console.log(thisRow);
                thisRow.children[1].children[0].innerText = homeScore + "-" + awayScore;
                thisRow.children[2].children[0].innerText = homeTeamName;
                thisRow.children[3].children[0].innerText = awayTeamName;

                //Color Code wins and losses
                if (parseInt(homeScore) < parseInt(awayScore) && parseInt(homeScore) == parseInt(targetTeam.score.points))
                    thisRow.style.color = 'red';
                else if (parseInt(homeScore) > parseInt(awayScore) && parseInt(homeScore) == parseInt(targetTeam.score.points))
                    thisRow.style.color = 'green';
                else if (parseInt(homeScore) > parseInt(awayScore) && parseInt(awayScore) == parseInt(targetTeam.score.points))
                    thisRow.style.color = 'red';
                else if (parseInt(homeScore) < parseInt(awayScore) && parseInt(awayScore) == parseInt(targetTeam.score.points))
                    thisRow.style.color = 'green';
            }
        })
}

function getTeamColors2(city, name) {
    fetch(`https://api.teamhex.dev/leagues/nba/${city}%20${name}`)
        .then(function (response) {
            return response.json();
        })
        .then(data => {
            console.log(data.eras[0].colors);

            if (data.eras[0].colors.length == 2) {
                console.log('team has 3');
                customTeamColor1.style.backgroundColor = data.eras[0].colors[0].hex;
                customTeamColor2.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor3.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor4.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor5.style.backgroundColor = data.eras[0].colors[1].hex;
            }
            else if (data.eras[0].colors.length == 3) {
                console.log('team has 3');
                customTeamColor1.style.backgroundColor = data.eras[0].colors[0].hex;
                customTeamColor2.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor3.style.backgroundColor = data.eras[0].colors[2].hex;
                customTeamColor4.style.backgroundColor = data.eras[0].colors[2].hex;
                customTeamColor5.style.backgroundColor = data.eras[0].colors[2].hex;
            }
            else if (data.eras[0].colors.length == 4) {
                console.log('team has 4');
                customTeamColor1.style.backgroundColor = data.eras[0].colors[0].hex;
                customTeamColor2.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor3.style.backgroundColor = data.eras[0].colors[2].hex;
                customTeamColor4.style.backgroundColor = data.eras[0].colors[3].hex;
                customTeamColor5.style.backgroundColor = data.eras[0].colors[3].hex;
            }
            else if (data.eras[0].colors.length == 5) {
                console.log('team has 5');
                customTeamColor1.style.backgroundColor = data.eras[0].colors[0].hex;
                customTeamColor2.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor3.style.backgroundColor = data.eras[0].colors[2].hex;
                customTeamColor4.style.backgroundColor = data.eras[0].colors[3].hex;
                customTeamColor5.style.backgroundColor = data.eras[0].colors[4].hex;
            }

        })
}

function getTeamColors3(city, name, name2) {
    fetch(`https://api.teamhex.dev/leagues/nba/${city}%20${name}%20${name2}`)
        .then(function (response) {
            return response.json();
        })
        .then(data => {
            console.log(data.eras[0].colors);
            if (data.eras[0].colors.length == 3) {
                console.log('team has 3');
                customTeamColor1.style.backgroundColor = data.eras[0].colors[0].hex;
                customTeamColor2.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor3.style.backgroundColor = data.eras[0].colors[2].hex;
                customTeamColor4.style.backgroundColor = data.eras[0].colors[2].hex;
                customTeamColor5.style.backgroundColor = data.eras[0].colors[2].hex;
            }
            else if (data.eras[0].colors.length == 4) {
                console.log('team has 4');
                customTeamColor1.style.backgroundColor = data.eras[0].colors[0].hex;
                customTeamColor2.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor3.style.backgroundColor = data.eras[0].colors[2].hex;
                customTeamColor4.style.backgroundColor = data.eras[0].colors[3].hex;
                customTeamColor5.style.backgroundColor = data.eras[0].colors[3].hex;
            }
            else if (data.eras[0].colors.length == 5) {
                console.log('team has 5');
                customTeamColor1.style.backgroundColor = data.eras[0].colors[0].hex;
                customTeamColor2.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor3.style.backgroundColor = data.eras[0].colors[2].hex;
                customTeamColor4.style.backgroundColor = data.eras[0].colors[3].hex;
                customTeamColor5.style.backgroundColor = data.eras[0].colors[4].hex;
            }

        })
}
// Get Team logos
fetch("https://api-nba-v1.p.rapidapi.com/teams/league/vegas", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
        "x-rapidapi-key": "f911a52402msh198488b602ee88fp19d4e6jsnbfef8763303c"
    }
})
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(data => {
        var logosArray = data.api.teams.forEach(element => {
            var logo = element.logo;
            console.log(logo);
            
        })
    })