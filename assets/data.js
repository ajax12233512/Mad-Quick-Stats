var searchResults = document.getElementById('search-results')
var searchButton = document.querySelector('.search-button');
var teamName = document.getElementById('team-name');
var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var hideResults = document.querySelector('.hide-results');
var userInputSport = document.getElementById('user-input-sport');
var searchbar = document.getElementById('searchbar');

// searchbar.addEventListener('click', autofill);
searchButton.addEventListener('click', getTeams);
hideResults.addEventListener('click', function(){
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



}



function getTeamInfo(event){
    // console.log(event.explicitOriginalTarget.attributes[0].nodeValue);
    teamName.innerText = event.explicitOriginalTarget.attributes[1].nodeValue;
    console.log(event);
    var teamId = event.explicitOriginalTarget.attributes[0].nodeValue;
    fetch(`https://api-nba-v1.p.rapidapi.com/standings/standard/2019/teamId/${teamId}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": "2bcab9ead3msh0012ca30e3965cdp19bdc2jsn9ec5386c7f85"
        }
    })
    .then(response => {
        return response.json();
    })
    .then(function(data){
        console.log(data);
        
        // teamName.innerText = even.
        one.innerText = data.api.standings[0].win;
        two.innerText = data.api.standings[0].loss;
        three.innerText = data.api.standings[0].winPercentage;
        // one.innerText = data.api.standings[0].win;
    })
    .catch(function(){
        console.log('error');
        one.innerText = "Could not get Data";
        two.innerText = "Could not get Data";
        three.innerText = "Could not get Data";
    })
    
}

