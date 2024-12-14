document.getElementById('predictionForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const resultDiv = document.getElementById('result');
    const performanceChart = document.getElementById('performanceChart');
    const headToHeadChart = document.getElementById('headToHeadChart');
    const predictionButton = event.submitter;

    // Show loading animation
    resultDiv.innerHTML = '<div class="loading-spinner"></div>';
    predictionButton.disabled = true;

    // Simulate a delay for prediction
    setTimeout(() => {
        const battingTeam = document.getElementById('battingTeam').value;
        const bowlingTeam = document.getElementById('bowlingTeam').value;

        if (battingTeam === bowlingTeam) {
            resultDiv.innerText = "Please select different teams!";
            predictionButton.disabled = false;
            return;
        }

        // Mock prediction result
        const battingTeamWinProbability = Math.random() * 50 + 25; // Random probability for demo
        const bowlingTeamWinProbability = 100 - battingTeamWinProbability;

        resultDiv.innerHTML = `
            <p><strong>${battingTeam}</strong>: ${battingTeamWinProbability.toFixed(2)}% chance to win</p>
            <p><strong>${bowlingTeam}</strong>: ${bowlingTeamWinProbability.toFixed(2)}% chance to win</p>
        `;

        predictionButton.disabled = false;

        // Display the graphs
        performanceChart.style.display = 'block';
        headToHeadChart.style.display = 'block';

        // Call the chart rendering functions
        renderPerformanceChart(battingTeam);
        renderHeadToHeadChart(battingTeam, bowlingTeam);
    }, 2000); // Delay of 2 seconds
});

// Function to render the performance chart for the selected team
function renderPerformanceChart(team) {
    const ctx = document.getElementById('performanceChart').getContext('2d');

    // Mock historical data
    const data = {
        "Mumbai Indians": [10, 12, 15, 20, 18],
        "Chennai Super Kings": [14, 15, 17, 19, 22],
        "Kolkata Knight Riders": [8, 9, 12, 14, 13],
        "Royal Challengers Bangalore": [5, 8, 10, 11, 12],
        "Delhi Capitals": [12, 13, 15, 17, 20],
        "Sunrisers Hyderabad": [9, 10, 12, 14, 16],
        "Punjab Kings": [8, 10, 11, 14, 17],
        "Rajasthan Royals": [9, 11, 12, 14, 18],
        "Lucknow Super Giants": [8, 10, 14],
        "Gujarat Titans": [9, 11, 13],
        "Deccan Chargers": [7, 8, 9],
        "Kochi Tuskers Kerala": [6, 8, 9],
        "Pune Warriors India": [5, 7, 9]
    };

    const labels = ["2018", "2019", "2020", "2021", "2022"];

    // If previous chart exists, destroy it
    if (window.performanceChartInstance) {
        window.performanceChartInstance.destroy();
    }

    // Create the performance chart
    window.performanceChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Performance of ${team} (Wins per year)`,
                data: data[team] || [],
                borderColor: '#ff7e5f',
                backgroundColor: 'rgba(255, 126, 95, 0.2)',
                borderWidth: 2,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 14
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ffffff'
                    }
                },
                y: {
                    ticks: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });
}

// Function to render the head-to-head comparison chart
function renderHeadToHeadChart(team1, team2) {
    const ctx = document.getElementById('headToHeadChart').getContext('2d');

    // Mock head-to-head data
    const headToHeadData = {
        "Mumbai Indians": {
            "Chennai Super Kings": [6, 5],  // [wins, losses]
            "Kolkata Knight Riders": [10, 3],
            "Royal Challengers Bangalore": [12, 7],
            "Delhi Capitals": [8, 5],
            "Sunrisers Hyderabad": [10, 4],
            "Punjab Kings": [9, 5],
            "Rajasthan Royals": [7, 6],
            "Lucknow Super Giants": [1, 0],
            "Gujarat Titans": [2, 1]
        },
        "Chennai Super Kings": {
            "Mumbai Indians": [5, 6],
            "Kolkata Knight Riders": [15, 7],
            "Royal Challengers Bangalore": [14, 8],
            "Delhi Capitals": [10, 7],
            "Sunrisers Hyderabad": [11, 6],
            "Punjab Kings": [13, 6],
            "Rajasthan Royals": [9, 8],
            "Lucknow Super Giants": [1, 0],
            "Gujarat Titans": [1, 2]
        },
        "Kolkata Knight Riders": {
            "Mumbai Indians": [3, 10],
            "Chennai Super Kings": [7, 15],
            "Royal Challengers Bangalore": [9, 12],
            "Delhi Capitals": [7, 8],
            "Sunrisers Hyderabad": [8, 5],
            "Punjab Kings": [6, 9],
            "Rajasthan Royals": [5, 6],
            "Lucknow Super Giants": [1, 1],
            "Gujarat Titans": [0, 1]
        }
    };

    // Check if both teams have head-to-head data
    if (!headToHeadData[team1] || !headToHeadData[team1][team2]) {
        resultDiv.innerText = "No head-to-head data available for this match.";
        return; // No data for this head-to-head pair
    }

    const headToHead = headToHeadData[team1][team2];
    const labels = ["Wins", "Losses"];
    const data = {
        labels: labels,
        datasets: [{
            label: `${team1} vs ${team2}`,
            data: headToHead,
            borderColor: '#ff7e5f',
            backgroundColor: 'rgba(255, 126, 95, 0.2)',
            borderWidth: 2,
            tension: 0.3
        }]
    };

    // If previous head-to-head chart exists, destroy it
    if (window.headToHeadChartInstance) {
        window.headToHeadChartInstance.destroy();
    }

    // Create the head-to-head chart
    window.headToHeadChartInstance = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 14
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ffffff'
                    }
                },
                y: {
                    ticks: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });
}
