// socketInstance.js
let ioInstance = null;

function setIoInstance(io) {
  ioInstance = io;
}

function getIoInstance() {
  return ioInstance;
}

module.exports = { setIoInstance, getIoInstance };
