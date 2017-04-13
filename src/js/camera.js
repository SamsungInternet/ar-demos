/*
  grab the back facing camera of your phone
  based off https://www.html5rocks.com/en/tutorials/getusermedia/intro/
  which is deprecated, but the method I am using, 
  'navigator.mediaDevices.getUserMedia()', is the current standard of 
  retrieving the camera stream
*/
var camara = camara || {};

camara.camera = function(){
  // Older browsers might not implement mediaDevices at all, so we set an empty object first
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }

  // Some browsers partially implement mediaDevices. We can't just assign an object
  // with getUserMedia as it would overwrite existing properties.
  // Here, we will just add the getUserMedia property if it's missing.
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function(constraints) {

      // First get ahold of the legacy getUserMedia, if present
      var getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia);

      // Some browsers just don't implement it - return a rejected promise with an error
      // to keep a consistent interface
      if (!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
      }

      // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
      return new Promise((resolve, reject) => {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    }
  }
  //grab video tag
  var video = document.createElement('video');
  video.style.width = window.innerWidth + 'px';
  video.style.height = window.innerHeight + 'px';
  video.id = 'video';
  video.style.position = 'absolute';
  video.style.top = '0px';
  video.style.left = '0px';
  video.style.zIndex = -10;
  
  //cycle through media devices and grab last
  navigator.mediaDevices.enumerateDevices().then( devices => {
    // define getUserMedia() constraints
    var constraints = {
      video: true,
      audio: false,
    }
    devices.forEach( device => {
      if(device.kind !== 'videoinput') return;
      constraints.video = {
        optional: [{sourceId: device.deviceId }]
      }
    });

    //get user camera
    navigator.mediaDevices.getUserMedia( constraints).then( mediaStream => {
      video.src = window.URL.createObjectURL(mediaStream);
    }).catch(function(error) {
      console.error("Cant getUserMedia()! due to ", error);
    });
  });
  
  this.video = video;
}