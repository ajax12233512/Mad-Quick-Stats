var userInputSport = document.getElementById('user-input-sport');
var searchButton = document.querySelector('.search-button');
var searchResults = document.getElementById('search-results');

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
        })
}