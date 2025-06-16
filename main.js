// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { sendFeedbackEmail } = require('./feedbackHandler');
// const nodemailer = require('nodemailer');
const { organizeFiles } = require('./organize');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.setMenuBarVisibility(false); // Hide top menu bar (ribbon)
  win.setMenu(null);               // Disable all menu functionality

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  return result.canceled ? null : result.filePaths[0];
});

ipcMain.handle('start-organize', async (event, { folderPath, exceptions }) => {
  try {
    organizeFiles(folderPath, exceptions);
    return "✅ Organization Complete.";
  } catch (err) {
    return "❌ Error: " + err.message;
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


ipcMain.handle('send-feedback', async (event, data) => {
  try {
    await sendFeedbackEmail(data);
    return { success: true };
  } catch (err) {
    console.error("❌ Feedback email failed:", err);
    return { success: false, message: err.message };
  }
});