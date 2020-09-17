export const loadLeaderboard = () => {
	// Create new XML Https Request.
	const requestObject = new XMLHttpRequest()

	// The method specified to request the data.
	requestObject.open('GET', 'https://quiz.clow.nl/v1/highscores/s1162762', true)

	requestObject.send()

	// Await server response.
	let studentData
	requestObject.onreadystatechange = () => {
		// Check if server response succeeded.
		if (requestObject.readyState === requestObject.DONE && requestObject.status === 200) {
			createTable(JSON.parse(requestObject.responseText))
		}
	}
	// Check if server response failed.
	requestObject.onerror = () => alert('API verzoek mislukt.')


}

const createTable = students => {
	// Get the top scores.
	let topScores = students.sort((a, b) => {
		return  b.points - a.points
	})

	// Slice everything off except the top 10.
	topScores = topScores.slice(0, (10 - students.length))

	// Leaderboard.
	let html = '<table id="leaderboard" class="leaderboard"> <tr> <th>Studentnummer</th> <th>Naam</th> <th>Score</th> <th>Datum</th> <th>Tijdstip</th> </tr><caption id="caption" class="caption">Leaderboard</caption>'
	topScores.forEach(student => {

		// Make dynamic time unit word.
		let word = 'secondes'
		if (student.time > 60) {
			totalTime /= totalTime
			if (student.time < 1.99) word = 'minuut'
			if (student.time >= 2) word = 'minuten'
		}

		html += `<tr>
				<td>${student.player.number}</td>
				<td>${student.player.firstName} ${student.player.lastName}</td>
				<td>${student.points}</td>
				<td>${student.date}</td>
				<td>${student.time} ${word}</td>
				</tr>`
	})
	html += '</table>'
	const container = document.getElementById('container')
	container.innerHTML += html
}