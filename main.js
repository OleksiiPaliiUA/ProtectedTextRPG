const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            devTools: false, // False - при пакуванні
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.setMenu(null)
    win.loadFile('window/index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => { // Windows and Linux support
    if (process.platform !== 'darwin') app.quit()
})
