const path = require('path')
const { BrowserWindow, Menu, ipcMain, nativeTheme } = require("electron")
const { MENU_TEMPLATE } = require("./constants")

const createMainWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        icon: 'static/images/SDRLogo5.png'
    })

    const menuTemplate = MENU_TEMPLATE

    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)

    win.loadFile('src/html/index.html')
}

ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light'
    } else {
        nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
})

exports.createMainWindow = createMainWindow
