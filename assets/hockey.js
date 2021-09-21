var userInputSport = document.getElementById('user-input-sport');
var searchButton = document.querySelector('.search-button');
var searchResults = document.getElementById('search-results');

//Moment Current day
var m = moment().format('YYYY-MM-DD');

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
            teamsArray.forEach( element => {
                // console.log(element);
                var newLi = document.createElement('li');
                newLi.setAttribute('data-teamId', element.id);
                newLi.setAttribute('data-name', element.name);
                newLi.addEventListener('click', getTeamRoster)
                newLi.innerText = element.name;
                searchResults.appendChild(newLi);
            })
        }) 
    }
}

//Get Hockey roster
function getTeamRoster(event){
    // console.log(event);
    fetch(`https://statsapi.web.nhl.com/api/v1/teams/${event.target.attributes[0].nodeValue}/roster`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            playersBody.innerHTML = "";
            teamName.innerText = event.target.innerText;
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