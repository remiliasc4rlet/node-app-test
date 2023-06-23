const { app, BrowserWindow, Tray } = require('electron');
const express = require('express');
const path = require('path');

let mainWindow;
let tray = null;

const appServer = express();
const serverPort = 3000;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, 'icon.ico'), // Simge dosyasının yolunu burada belirtin
    titleBarStyle: 'default', // Başlık çubuğunu gizle
    frame: true, // Pencere çerçevesini gizle
    fullscreenable: false, // Tam ekran tuşlarını kaldır
    resizable: false, // Yeniden boyutlandırmayı devre dışı bırak
});

    mainWindow.setMenu(null);
    mainWindow.loadURL(`http://localhost:${serverPort}`);

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    tray = new Tray('icon.ico'); // Kullanmak istediğiniz ikonun yolunu buraya ekleyin

    // Tray'ın üzerine gelindiğinde görünecek metni ayarla
    tray.setToolTip('Uygulama adı veya açıklaması');
    
    tray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
    
    tray.on('right-click', () => {
        app.quit();
    });
}
  
app.on('ready', function () {
  appServer.use(express.static(path.join(__dirname, '/public')));

  appServer.listen(serverPort, function () {
    createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
