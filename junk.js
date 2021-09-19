// //Get Basketball information
// function getTeamInfo(event){
//     // console.log(event.explicitOriginalTarget.attributes[0].nodeValue);
//     teamName.innerText = event.explicitOriginalTarget.attributes[1].nodeValue;
//     console.log(event);
//     var teamId = event.explicitOriginalTarget.attributes[0].nodeValue;

//     //Get baskketball players
//     fetch(`https://api-nba-v1.p.rapidapi.com/players/teamId/${teamId}`, {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
//             "x-rapidapi-key": "2bcab9ead3msh0012ca30e3965cdp19bdc2jsn9ec5386c7f85"
//             }
//         })
//         .then(function (response){
//             return response.json();
//         })
//         .then(function(data){
//             // console.log(data);
//             playersBody.innerHTML = "";
//             var playersArray = data.api.players;
//             playersArray.forEach(element => {
//                 var playerNumber = element.leagues.standard.jersey;
//                 // console.log(playerNumber);
//                 var playerFirstName = element.firstName;
//                 var playerLastName = element.lastName;
//                 var playerCountry = element.country;

//                 var playerNumberEL = document.createElement('th');
//                 var firstNameEL = document.createElement('td');
//                 var lastNameEL = document.createElement('td');
//                 var countryEl = document.createElement('td');
//                 var newTableRow = document.createElement('tr');

//                 playerNumberEL.innerText = playerNumber;
//                 firstNameEL.innerText = playerFirstName;
//                 lastNameEL.innerText = playerLastName;
//                 countryEl.innerText = playerCountry;

//                 newTableRow.appendChild(playerNumberEL);
//                 newTableRow.appendChild(firstNameEL);
//                 newTableRow.appendChild(lastNameEL);
//                 newTableRow.appendChild(countryEl);

//                 playersBody.appendChild(newTableRow);
//             })
// //         })

//     //get basketball games games
//     fetch(`https://api-nba-v1.p.rapidapi.com/games/teamId/${teamId}`, {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
//             "x-rapidapi-key": "2bcab9ead3msh0012ca30e3965cdp19bdc2jsn9ec5386c7f85"
//         }
//     })
//     .then( response => {
//         return response.json();
//     })
//     .then( data => {
//         gamesArray = data.api.games;

//         //Find the next upcoming game
//         var startingGameIndex = gamesArray.find( element => {
//             var date = element.startTimeUTC.substring(0, 10);
//             momentDate = moment(date, "YYYY-MM-DD");
//             return momentDate.isAfter(m);          
//         } );
//         var indexNum = gamesArray.indexOf(startingGameIndex) - 1;   
//         console.log(startingGameIndex);
//         //Get the last 5 basketball games
//         for(k = 0; k < 5; k++)
//         {
//             var targetTeam;
//             if(gamesArray[indexNum - k].hTeam.fullName.includes(teamName.innerText))
//             {
//                 targetTeam = gamesArray[indexNum - k].hTeam;
//             }
//             else if(gamesArray[indexNum - k].vTeam.fullName.includes(teamName.innerText))
//             {
//                 targetTeam = gamesArray[indexNum - k].vTeam;
//             }

//             //Display values
//             var homeTeamName = gamesArray[indexNum - k].hTeam.shortName;
//             var awayTeamName = gamesArray[indexNum - k].vTeam.shortName;
//             var homeScore = gamesArray[indexNum - k].hTeam.score.points;
//             var awayScore = gamesArray[indexNum - k].vTeam.score.points;
//             var thisRow = tbody.children[k];
//             console.log(tbody);
//             console.log(thisRow);
//             thisRow.children[1].children[0].innerText = homeScore + "-" + awayScore; 
//             thisRow.children[2].children[0].innerText = homeTeamName;
//             thisRow.children[3].children[0].innerText = awayTeamName;

//             //Color Code wins and losses
//             if(parseInt(homeScore) < parseInt(awayScore) && parseInt(homeScore) == targetTeam.score.points)
//                 thisRow.style.color = 'red';
//             else if( parseInt(homeScore) > parseInt(awayScore) && parseInt(homeScore) == targetTeam.score.points )   
//                 thisRow.style.color = 'green';
//             else if( parseInt(homeScore) > parseInt(awayScore) && parseInt(awayScore) == targetTeam.score.points )   
//                 thisRow.style.color = 'red';
//             else if( parseInt(homeScore) < parseInt(awayScore) && parseInt(awayScore) == targetTeam.score.points )   
//                 thisRow.style.color = 'green';
//         }
//     })
// }




// fetch("https://nba-player-individual-stats.p.rapidapi.com/playerseasongames/player/226/2021", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
// 		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
// 	}
// })


// .then(response => {

//     return response.json();

// })
// 	.then(data => {
		
// 		console.log(data);

// 	})

// 	.catch(err => {
// 		console.error(err);
// 	});

//NHL API
// https://statsapi.web.nhl.com/api/v1/teams

fetch("https://statsapi.web.nhl.com/api/v1/standings")

.then(response => {
    return response.json();
})
.then(data => {
    console.log(data);
})

.catch(err => {
	console.error(err);
});


BEST ONE 
https://rapidapi.com/kaylanhusband/api/nba-player-individual-stats/

Get Players By Database Player ID

fetch("https://nba-player-individual-stats.p.rapidapi.com/players/297", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
	}
})

Get Player By Full Name

fetch("https://nba-player-individual-stats.p.rapidapi.com/players/fullname?name=Cade_Cunningham", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
	}
})

Get Players By LastName

fetch("https://nba-player-individual-stats.p.rapidapi.com/players/lastname?lastname=James", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
	}
})

Get Players By Team (The Full up to date Roster)

fetch("https://nba-player-individual-stats.p.rapidapi.com/players/team?name=Lakers", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
	}
})

Get All Players

fetch("https://nba-player-individual-stats.p.rapidapi.com/players", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
	}
})

Get Every season of a Player By ID (Including stats per season, year, team played for)

fetch("https://nba-player-individual-stats.p.rapidapi.com/playerseasons?playerId=226", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
	}
})

Get Player by ID and ever game in season selected

fetch("https://nba-player-individual-stats.p.rapidapi.com/playerseasongames/player/226/2021", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
	}
})

Get All Teams (Symbols included)

fetch("https://nba-player-individual-stats.p.rapidapi.com/teams", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
	}
})

// Kevin Durant fetch


var kD = fetch("https://nba-player-individual-stats.p.rapidapi.com/players/fullname?name=Kevin_durant", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
	}
})


	.then(response => {
		return response.json();
	})
		.then(data => {
			return data.id;
			console.log(data.id);
		});



// .catch(err => {
// 	console.error(err);
// });

// kD();
console.log(kD);




// .then(kD => {
// 	console.log(kD.id);
// })