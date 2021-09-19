// fetch(`https://api-nba-v1.p.rapidapi.com/games/teamId/${teamId}`, {
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
//         "x-rapidapi-key": "2bcab9ead3msh0012ca30e3965cdp19bdc2jsn9ec5386c7f85"
//     }
// })

// fetch("https://api-nba-v1.p.rapidapi.com/teams/city/Detroit", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
// 		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
// 	}
// })

// .then( response => {
//     return response.json();
// })
// .then( data => {
//     console.log(data)
//     })
//example to fetch teams in nba
// fetch("https://api-nba-v1.p.rapidapi.com/players/teamId/1/", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
// 		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
// 	}
// })
// .then(response => {
//     return response.json();
// })
// .then(data => {
//     console.log(data)})
	


fetch("https://statsapi.web.nhl.com/api/v1/standings/regularSeason")
.then(response => {
    console.log(response)
    return response.json();
})
.then(data => {
    // console.log(data);

    var teamsArrW = data.records[0].teamRecords
    var teamsArrC = data.records[1].teamRecords
    var teamsArrE = data.records[2].teamRecords
    var teamsArrN = data.records[3].teamRecords

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
        // (AppendRowtowhere?).appendChild(tableRow);
    })

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
        // (AppendRowtowhere?).appendChild(tableRow);
    })

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
        // (AppendRowtowhere?).appendChild(tableRow);

    })

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
        // (AppendRowtowhere?).appendChild(tableRow);
    })	
})

.catch(err => {
	console.error(err);
});


// NHL API end points.
// fetch("https://statsapi.web.nhl.com/api/v1/teams")
// - grabs teams, grab id for each team here 
// 	- data.teams[i].id
// Detroit Redwings ID = 17

// Current Standings
// fetch("https://statsapi.web.nhl.com/api/v1/standings")
// Record: data.records[0].teamRecords
// 		[0] = rankings
// 		.leagueRecord = season record
// 		.team = the team of the record you pulled



// All teams with all rosters with player positions 
// fetch("https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster")
// data.teams[0]. Index being the team

// Team standing information
// fetch("https://statsapi.web.nhl.com/api/v1/teams/17/stats")
// Record: data.stats[0].splits[0].stat
// - this will grab a number of pieces of information, as well



// Team Rosters
// fetch("https://statsapi.web.nhl.com/api/v1/teams/{id}/roster")
// 	- grab players from roster by Id 
// 		- data.roster[i].person.Id
// 		- example: Robby Fabbri data.roster[1].person.id
// 			- id returns 8477952

// Individual player stats per season selected. Must have player id and year selected                                                
// fetch("https://statsapi.web.nhl.com/api/v1/people/8476459/stats?stats=statsSingleSeason&season=20182019")
// - data.stats[0].splits[0].stat.{choose stat: goals, assists, points}

// Grab Player by ID. 
// fetch("https://statsapi.web.nhl.com/api/v1/people/8477474")
// - bio info 
// data.people[0].birthCity
// data.people[0].birthCountry


/////////////////////////////////////////////////////////////////////////////






// var player; 

// var lebron = fetch("https://nba-player-individual-stats.p.rapidapi.com/players/fullname?name=lebron_james", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
// 		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
// 	}
// })
// .then(response => {
//     return response.json();
// })
// .then(data => {
//     player = data.id; 
// 	// console.log(data.id);
// 	return data.id;
// })

// .catch(err => {
// 	console.error(err);
// });



// console.log(player)


// BEST ONE 
// https://rapidapi.com/kaylanhusband/api/nba-player-individual-stats/

// Get Players By Database Player ID

// fetch("https://nba-player-individual-stats.p.rapidapi.com/players/297", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
// 		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
// 	}
// })

// Get Player By Full Name

// fetch("https://nba-player-individual-stats.p.rapidapi.com/players/fullname?name=Cade_Cunningham", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
// 		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
// 	}
// })

// Get Players By LastName

// fetch("https://nba-player-individual-stats.p.rapidapi.com/players/lastname?lastname=James", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
// 		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
// 	}
// })

// Get Players By Team (The Full up to date Roster)

// fetch("https://nba-player-individual-stats.p.rapidapi.com/players/team?name=Lakers", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
// 		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
// 	}
// })

// Get All Players

// fetch("https://nba-player-individual-stats.p.rapidapi.com/players", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
// 		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
// 	}
// })

// Get Every season of a Player By ID (Including stats per season, year, team played for)

// fetch("https://nba-player-individual-stats.p.rapidapi.com/playerseasons?playerId=226", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
// 		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
// 	}
// })

// Get Player by ID and ever game in season selected

// fetch("https://nba-player-individual-stats.p.rapidapi.com/playerseasongames/player/226/2021", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
// 		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
// 	}
// })

// Get All Teams (Symbols included)

// fetch("https://nba-player-individual-stats.p.rapidapi.com/teams", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
// 		"x-rapidapi-key": "cc83e369bemsh3371fa0cf8bff65p1fcbaejsn65f8668e5821"
// 	}
// })
