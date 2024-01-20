import { initGauges, drawGauges } from "../utils/gauge.js";

// let information = $('#info');
// information.html(`This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`)

// document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
//     const isDarkMode = await window.darkMode.toggle();
//     document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light';
// });

// document.getElementById('reset-to-system').addEventListener('click', async () => {
//     await window.darkMode.system();
//     document.getElementById('theme-source').innerHTML = 'System';
// });

// $('#get-datetime').on('click', async () => {
//     const datetime = await $.get('http://127.0.1.1:5002/api');
//     $('#datetime').html(datetime);
// });

// $(async () => {
//     $('#get-datetime').trigger('click');
// });

initGauges();
drawGauges();
setInterval(drawGauges, 100);
