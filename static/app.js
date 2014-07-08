var selfEasyrtcid = "";

var connect = function () {
  easyrtc.setRoomOccupantListener(convertListToButtons);
  easyrtc.easyApp("easyrtc.audioVideo", "selfVideo", ["callerVideo"], loginSuccess, loginFailure);
};

var clearConnectList = function () {
  var otherClientDiv = document.getElementById('otherClients');
  while (otherClientDiv.hasChildNodes()) {
    otherClientDiv.removeChild(otherClientDiv.lastChild);
  }
};

var convertListToButtons = function (roomName, data, isPrimary) {
  clearConnectList();
  var otherClientDiv = document.getElementById('otherClients');
  for (var easyrtcid in data) {
    var button = document.createElement('button');
    button.onclick = function (easyrtcid) {
      return function () {
        performCall(easyrtcid);
      };
    }(easyrtcid);

    var label = document.createTextNode(easyrtc.idToName(easyrtcid));
    button.appendChild(label);
    $(button).css({'background-color': '#ddd', 'cursor': 'pointer'});
    otherClientDiv.appendChild(button);
  }
};

var performCall = function (otherEasyrtcid) {
  easyrtc.hangupAll();

  var successCB = function () {$('#hangup').toggle();};
  var failureCB = function () {};
  easyrtc.call(otherEasyrtcid, successCB, failureCB);
};

var loginSuccess = function (easyrtcid) {
  selfEasyrtcid = easyrtcid;
  document.getElementById("iam").innerHTML = "My ID: " + easyrtc.cleanId(easyrtcid);
};

var loginFailure = function (errorCode, message) {
  easyrtc.showError(errorCode, message);
};

$(function () {
  $('#questions').hide();
  $('#hangup').hide();
  connect();

  $('#showquestions').click(function () {
    $('#connectControls').toggle();
    $('#showquestions').toggle();
    $('#questions').toggle();
  });

  $('#hidequestions').click(function () {
    $('#connectControls').toggle();
    $('#showquestions').toggle();
    $('#questions').toggle();
  });

  $('#hangup').click(function () {
    easyrtc.hangupAll();
    $('#hangup').toggle();
  });
});