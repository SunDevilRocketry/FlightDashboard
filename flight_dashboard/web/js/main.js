initGauges();
drawGauges();
setInterval(drawGauges, 100);

// document.getElementById("button-name").addEventListener("click", () => {eel.get_random_name()}, false);
// document.getElementById("button-number").addEventListener("click", ()=>{eel.get_random_number()}, false);
// document.getElementById("button-date").addEventListener("click", ()=>{eel.get_date()}, false);
// document.getElementById("button-ip").addEventListener("click", ()=>{eel.get_ip()}, false);

eel.expose(prompt_alerts);
function prompt_alerts(description) {
    alert(description);
}

// let element = document.getElementById('myChart');

// let labels = []
// let params = {
//     labels: labels,
//     datasets: [{
//         label: 'Time Series Data',
//         data: [],
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.0
//     }]
// };

// myChart = new Chart(element, {
//     type: 'line',
//     data: params,
// });

// function addData(chart, label, newData) {
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(newData);
//     });
//     chart.update();
// }

// function removeData(chart) {
//     chart.data.labels.pop();
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.pop();
//     });
//     chart.update();
// }

// function _updateChart(data) {
//     data = JSON.parse(data);
//     addData(myChart, data.label, data.value)
// }

// function updateChart() {
//     eel.get_chart_data()((data) => {
//         _updateChart(data);
//     });
// }

// setInterval(updateChart, 100);
