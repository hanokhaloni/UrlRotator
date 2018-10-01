var urls = [];
var times = [];
var index = 0;

function fileInfo(e) { // CSV file selector
  var file = e.target.files[0];
  return;
}


function loadFileAndStart() {
  var file = document.getElementById("file").files[0];
  var reader = new FileReader();
  reader.onload = function (file) {
    var fileContent = file.target.result;
    processContentAndStart(fileContent);
  };
  reader.readAsText(file);
}

function processContentAndStart(fileContent) {
  processContent(fileContent);
  showUrl();
}

function processContent(fileContent) {
  var rows = fileContent.split(/[\r\n|\n]+/); // Split by carriage returns
  for (var i = 1; i < rows.length; i++) {
    processRow(rows[i]);
  }
}

function processRow(row) {
  contentLines = row.split(',');
  urls.push(contentLines[0]);
  times.push(contentLines[1]);
}

function showUrl() {
  var contentFrameElement = document.getElementById("contentFrame");
  var timeout = times[index % times.length] * 1000;
  var url = urls[index % urls.length];


  contentFrameElement.onload = function () {
    initProgressBar(timeout, url);
    setTimeout(function () {

      showUrl();
    }, timeout);

    index++;
  };

  contentFrameElement.src = url;
  console.log(`loading page ${index} for url ${urls[index]} time ${timeout}`);
}

var progressBarIntervalId;



function initProgressBar(timeout, url) {
  clearInterval(progressBarIntervalId);
  var progressBarElement = document.getElementById("progressBar");
  var progressBarTextElement = document.getElementById("progressBarText");


  var width = 0;
  var updateIntervalInMs = 10;
  var step = (100 / timeout) * updateIntervalInMs;

  progressBarTextElement.textContent = url;
  progressBarIntervalId = setInterval(updateProgressBar, updateIntervalInMs);

  function updateProgressBar() {
    if (width >= 100) {
      console.log(`timer reset`);
      clearInterval(progressBarIntervalId);
    } else {
      width = width + step;
      progressBarElement.style.width = width + '%';

    }
  }
}

function toggleHideFileSelect() {
  var fileSelectElement = document.getElementById("fileSelect");
  if (fileSelectElement.style.display == 'none') {
    fileSelectElement.style.display = '';
  } else {
    fileSelectElement.style.display = 'none';
  }
}