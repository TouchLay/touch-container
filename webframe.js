var exec = require('child_process').exec;
var hash = window.location.hash.substring(1);

// Injected into webview
var inject = function() {
  console.info("Inject successfull")
  document.addEventListener('click', function(ev) {
    if (ev.toElement.tagName == ('INPUT' || 'TEXTAREA')) {
      console.info('!keyboardmanager-touchlay-open');
    } else {
      console.info('!keyboardmanager-touchlay-close');
    }
  });
}

if (hash.length >= 1) {
  var webframe = document.getElementById('webframe');
  var keyboardProcess;
  webframe.src = decodeURIComponent(hash);
  webframe.addEventListener('dom-ready', function() {
    webframe.executeJavaScript('var inject = ' + inject.toString() + '; inject();');
  });
  webframe.addEventListener('console-message', function(ev) {
    if (ev.level === 0) {
      if (ev.message === '!keyboardmanager-touchlay-open') {
        keyboardProcess = exec('"C:\\Program Files\\Common Files\\Microsoft Shared\\ink\\TabTip.exe"', function(error, stdout, stderr) {
          if (error !== null) {
            console.log('exec error: ' + error);
          }
        });
      } else {
        if (keyboardProcess) {
          keyboardProcess.kill('SIGKILL');
        }
      }
    }
  });
} else {
  console.error("Could not get URL");
  document.getElementById('notfound').style.display = 'block';
}
