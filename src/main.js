const { app, BrowserWindow } = require('electron')
const { startServer, killServer } = require('./utils/py_server.js')
const { createMainWindow } = require('./index.js')

app.on('ready', startServer)        // start the python server on app load
app.on('will-quit', killServer)     // stop the python server on app shutdown

// when the app is ready, load the main window
app.whenReady().then(() => {
    createMainWindow()

    // OSx compatibility
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
})

// quit the app when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
