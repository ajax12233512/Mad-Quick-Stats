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

//Moment Js
var m = moment();

// searchbar.addEventListener('click', autofill);
searchButton.addEventListener('click', getTeams);
hideResults.addEventListener('click', function() {
    searchResults.classList.remove('show');
})

function getUserInput(){
    var sport = userInputSport.value;
    return sport;
}

function getTeams(){

    //Using if-statement to check the user input for sport
    if(userInputSport.value == 'Basketball')
    {
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
    else if(userInputSport.value == 'Soccer'){
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
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data);
            resultsArray = data.api.teams;
            resultsArray.forEach(element => {
                var newLiEl = document.createElement('li');
                newLiEl.innerText = element.name;

                searchResults.appendChild(newLiEl);
            })
        })
    }
    else if(userInputSport == 'Hockey')
    {
      
    }
}



//Get Basketball information
function getTeamInfo(event){
    // console.log(event.explicitOriginalTarget.attributes[0].nodeValue);
    teamName.innerText = event.explicitOriginalTarget.attributes[1].nodeValue;
    console.log(event);
    var teamId = event.explicitOriginalTarget.attributes[0].nodeValue;

    //Get baskketball players
    fetch(`https://api-nba-v1.p.rapidapi.com/players/teamId/${teamId}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": "2bcab9ead3msh0012ca30e3965cdp19bdc2jsn9ec5386c7f85"
            }
        })
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            // console.log(data);
            playersBody.innerHTML = "";
            var playersArray = data.api.players;
            playersArray.forEach(element => {
                var playerNumber = element.leagues.standard.jersey;
                // console.log(playerNumber);
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
    .then( response => {
        return response.json();
    })
    .then( data => {
        gamesArray = data.api.games;

        //Find the next upcoming game
        var startingGameIndex = gamesArray.find( element => {
            var date = element.startTimeUTC.substring(0, 10);
            momentDate = moment(date, "YYYY-MM-DD");
            return momentDate.isAfter(m);          
        } );
        var indexNum = gamesArray.indexOf(startingGameIndex) - 1;   
        console.log(startingGameIndex);
        //Get the last 5 basketball games
        for(k = 0; k < 5; k++)
        {
            var targetTeam;
            if(gamesArray[indexNum - k].hTeam.fullName.includes(teamName.innerText))
            {
                targetTeam = gamesArray[indexNum - k].hTeam;
            }
            else if(gamesArray[indexNum - k].vTeam.fullName.includes(teamName.innerText))
            {
                targetTeam = gamesArray[indexNum - k].vTeam;
            }

            //Display values
            var homeTeamName = gamesArray[indexNum - k].hTeam.shortName;
            var awayTeamName = gamesArray[indexNum - k].vTeam.shortName;
            var homeScore = gamesArray[indexNum - k].hTeam.score.points;
            var awayScore = gamesArray[indexNum - k].vTeam.score.points;
            var thisRow = tbody.children[k];
            console.log(tbody);
            console.log(thisRow);
            thisRow.children[1].children[0].innerText = homeScore + "-" + awayScore; 
            thisRow.children[2].children[0].innerText = homeTeamName;
            thisRow.children[3].children[0].innerText = awayTeamName;

            //Color Code wins and losses
            if(parseInt(homeScore) < parseInt(awayScore) && parseInt(homeScore) == targetTeam.score.points)
                thisRow.style.color = 'red';
            else if( parseInt(homeScore) > parseInt(awayScore) && parseInt(homeScore) == targetTeam.score.points )   
                thisRow.style.color = 'green';
            else if( parseInt(homeScore) > parseInt(awayScore) && parseInt(awayScore) == targetTeam.score.points )   
                thisRow.style.color = 'red';
            else if( parseInt(homeScore) < parseInt(awayScore) && parseInt(awayScore) == targetTeam.score.points )   
                thisRow.style.color = 'green';
        }
    })
}

