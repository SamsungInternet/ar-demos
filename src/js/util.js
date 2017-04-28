/*
 performance issues on large video sizes
*/

window.onload = function() {
  if (location.protocol != 'https:') {
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
  }
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var tracker = new tracking.ObjectTracker('face');
  var image = new Image();
  loadImg(image).then( image => {
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    tracking.track('#video', tracker, { camera: true });
    context.drawImage(image, 0, 0);
    tracker.on('track', function(event) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      event.data.forEach(function(e) {
        context.drawImage(image, e.x, e.y - 50);
      });
    });
  }, (error) => {
    console.warn('failed to fetch image');
  });
}

function loadImg(image){
  return new Promise( (resolve, reject) =>{
    image.src = '/ar-demos/src/img/Jester_Hat_small.png';
    image.onerror = function(){
      reject(Error('failed to load image'));
    }
    image.style.width = '35px';
    image.style.height = '25px';
    image.onload = function(){
      resolve(image);
    }
  });
}