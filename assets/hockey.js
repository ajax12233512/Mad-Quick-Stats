var userInputSport = document.getElementById('user-input-sport');
var searchButton = document.querySelector('.search-button');
var searchResults = document.getElementById('search-results');
var toggleCountry = document.querySelectorAll('.toggle-country');
// var standings1Body = document.getElementById('standings1-body');
// var standings2Body = document.getElementById('standings2-body');


var m = moment().format('YYYY-MM-DD');

searchButton.addEventListener('click', getInfo);

function getInfo(){
    searchResults.innerHTML = "";
    searchResults.classList.add('show');
    if(userInputSport.value == 'Hockey')
    {
        toggleCountry[0].style.display = 'none';
        toggleCountry[1].style.display = 'none';
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
    // getStandings();

    myStorage.setItem(localStorageCounter, event.target.innerText);
    localStorageCounter++;

    console.log(event);
    fetch(`https://statsapi.web.nhl.com/api/v1/teams/${event.target.attributes[0].nodeValue}/roster`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            playersBody.innerHTML = "";
            teamName.innerText = event.target.innerText;
            
            var teamNameArray = teamName.innerText.split(' ');
            if(teamNameArray.length == 2)
            {
                getNhlTeamColors2(teamNameArray[0], teamNameArray[1]);
            }
            else if(teamNameArray.length == 3)
            {
                getNhlTeamColors3(teamNameArray[0], teamNameArray[1], teamNameArray[2],);
            }


            // console.log(data);
            var rosterArray = data.roster;
            var filteredRosterArray = rosterArray.filter((element) => element.jerseyNumber != undefined);//Checks for only players that have a jersey number
            filteredRosterArray.forEach((element) => {
                console.log(element);
                var playerNumber = element.jerseyNumber;
                // console.log(playerNumber);
                var name = element.person.fullName.split(" ");
                var playerFirstName = name[0];
                var playerLastName = name[1];

                var playerNumberEL = document.createElement('th');
                var firstNameEL = document.createElement('td');
                var lastNameEL = document.createElement('td');
                // var countryEl = document.createElement('td');
                var newTableRow = document.createElement('tr');

                playerNumberEL.innerText = playerNumber;
                firstNameEL.innerText = playerFirstName;
                lastNameEL.innerText = playerLastName;
                // countryEl.innerText = playerCountry;

                newTableRow.appendChild(playerNumberEL);
                newTableRow.appendChild(firstNameEL);
                newTableRow.appendChild(lastNameEL);
                // newTableRow.appendChild(countryEl);

                // playersBody.classList.add('animate__animated animate__bounceIn');
                playersBody.appendChild(newTableRow);               
            })

            fetch(`https://statsapi.web.nhl.com/api/v1/schedule?teamId=${event.target.attributes[0].nodeValue}&startDate=2021-04-01&endDate=${m}`)
                    .then(response => {
                        return response.json();
                    })
                    .then(data =>{
                        var dates = data.dates;
                        var last5Games = [5]
                        console.log(dates);
                        //get last 5 games
                        for(k = 0; k < 5; k++){

                            last5Games[k] = dates[(dates.length - 1) - k];
                            
                            var homeTeamName = last5Games[k].games[0].teams.home.team.name;
                            var awayTeamName = last5Games[k].games[0].teams.away.team.name;
                            var homeScore = last5Games[k].games[0].teams.home.score;
                            var awayScore = last5Games[k].games[0].teams.away.score;
                            // console.log(gamesArray[indexNum - k].vTeam);
                            var thisRow = tbody.children[k];
                            console.log(tbody);
                            console.log(thisRow);
                            thisRow.children[1].children[0].innerText = homeScore + "-" + awayScore; 
                            thisRow.children[2].children[0].innerText = homeTeamName;
                            thisRow.children[3].children[0].innerText = awayTeamName;

                            //Sets the text to green or red depending on who won and what team is being selected
                            if(homeTeamName == teamName.innerText)
                            {
                                console.log('home team is selected');
                                if(homeScore < awayScore)
                                {
                                    thisRow.style.color = 'red';
                                }
                                else
                                {
                                    thisRow.style.color = 'green';
                                }
                            }
                            else if(awayTeamName == teamName.innerText)
                            {
                                console.log('away team is selected');
                                if(homeScore < awayScore)
                                {
                                    thisRow.style.color = 'green';
                                }
                                else
                                {
                                    thisRow.style.color = 'red';
                                }
                            }

                        }  
                    })
        })
}        

function getNhlTeamColors2(city, name){
    fetch(`https://api.teamhex.dev/leagues/nhl/${city}%20${name}`)
        .then(function(response){
            return response.json();
        })
        .then(data => {
            console.log(data);

            if(data.eras[0].colors.length == 2)
            {
                console.log('team has 3');
                customTeamColor1.style.backgroundColor = data.eras[0].colors[0].hex;
                customTeamColor2.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor3.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor4.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor5.style.backgroundColor = data.eras[0].colors[1].hex;
            }
            else if(data.eras[0].colors.length == 3)
            {
                console.log('team has 3');
                customTeamColor1.style.backgroundColor = data.eras[0].colors[0].hex;
                customTeamColor2.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor3.style.backgroundColor = data.eras[0].colors[2].hex;
                customTeamColor4.style.backgroundColor = data.eras[0].colors[2].hex;
                customTeamColor5.style.backgroundColor = data.eras[0].colors[2].hex;
            }
            else if(data.eras[0].colors.length == 4)
            {
                console.log('team has 4');
                customTeamColor1.style.backgroundColor = data.eras[0].colors[0].hex;
                customTeamColor2.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor3.style.backgroundColor = data.eras[0].colors[2].hex;
                customTeamColor4.style.backgroundColor = data.eras[0].colors[3].hex;
                customTeamColor5.style.backgroundColor = data.eras[0].colors[3].hex; 
            }
            else if(data.eras[0].colors.length == 5)
            {
                console.log('team has 5');
                customTeamColor1.style.backgroundColor = data.eras[0].colors[0].hex;
                customTeamColor2.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor3.style.backgroundColor = data.eras[0].colors[2].hex;
                customTeamColor4.style.backgroundColor = data.eras[0].colors[3].hex;
                customTeamColor5.style.backgroundColor = data.eras[0].colors[4].hex; 
            }

        })       
}

function getNhlTeamColors3(city, name, name2){
    fetch(`https://api.teamhex.dev/leagues/nhl/${city}%20${name}%20${name2}`)
        .then(function(response){
            return response.json();
        })
        .then(data => {
            console.log(data.eras[0].colors);

            if(data.eras[0].colors.length == 2)
            {
                console.log('team has 2');
                customTeamColor1.style.backgroundColor = data.eras[0].colors[0].hex;
                customTeamColor2.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor3.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor4.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor5.style.backgroundColor = data.eras[0].colors[1].hex;
            }
            else if(data.eras[0].colors.length == 3)
            {
                console.log('team has 3');
                customTeamColor1.style.backgroundColor = data.eras[0].colors[0].hex;
                customTeamColor2.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor3.style.backgroundColor = data.eras[0].colors[2].hex;
                customTeamColor4.style.backgroundColor = data.eras[0].colors[2].hex;
                customTeamColor5.style.backgroundColor = data.eras[0].colors[2].hex;
            }
            else if(data.eras[0].colors.length == 4)
            {
                console.log('team has 4');
                customTeamColor1.style.backgroundColor = data.eras[0].colors[0].hex;
                customTeamColor2.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor3.style.backgroundColor = data.eras[0].colors[2].hex;
                customTeamColor4.style.backgroundColor = data.eras[0].colors[3].hex;
                customTeamColor5.style.backgroundColor = data.eras[0].colors[3].hex; 
            }
            else if(data.eras[0].colors.length == 5)
            {
                console.log('team has 5');
                customTeamColor1.style.backgroundColor = data.eras[0].colors[0].hex;
                customTeamColor2.style.backgroundColor = data.eras[0].colors[1].hex;
                customTeamColor3.style.backgroundColor = data.eras[0].colors[2].hex;
                customTeamColor4.style.backgroundColor = data.eras[0].colors[3].hex;
                customTeamColor5.style.backgroundColor = data.eras[0].colors[4].hex; 
            }

        })       
}

// function saveToLocalStorage() {
//     var storageInput = userInputSport.value
//     // userInputSport.value = '';

//     if(searchHistory){
//         localtStorage.setItem("storedSearch", storageInput + " " + searchHistory)
//         searchedHistory = localStorage.getItem('storedSearch')
//     }   
//         else {
//             localStorage.setItem("storedSearch", storageInput)
//         }
    
// }
// searchButton.addEventListener("click", function(){
//     saveToLocalStorage()
// })