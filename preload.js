// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  chooseFolder: () => ipcRenderer.invoke('select-folder'),
  startOrganize: (folderPath, exceptions) => ipcRenderer.invoke('start-organize', { folderPath, exceptions }),

  // ✅ Add this line:
  sendFeedback: (data) => ipcRenderer.invoke('send-feedback', data)
});
