/*
  based off https://github.com/jeromeetienne/threex.webar
*/

var markers = markers || {};

markers.arTags = function(){
  //var canvas = document.createElement('canvas');
}

// detect if marker is in the frame
markers.arTags.prototype.detectMarkers = function(video, canvas, context){
  let videoScale = 2;
  canvas.width = video.videoWidth/videoScale;
  canvas.height = video.videoHeight/videoScale;
  // draw video feed to canvas and then extract it
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  let imageData;
  try {
    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  } catch (e){

  }
  

  // detect markers
  let detector = new AR.Detector();
  let markers = detector.detect(imageData);
  return markers;
}

// project the webgl object onto the ar marker
markers.arTags.prototype.markerToObject3D = function(marker, object3d, canvas){
  let corners = [];
  let modelSize = 35.0;
  for (let i = 0; i < marker.corners.length; ++i){
    corners.push({
      x : marker.corners[i].x - (canvas.width / 2),
      y : (canvas.height / 2) - marker.corners[i].y,
    })
  }
  // compute the pose from the canvas
  let posit = new POS.Posit(modelSize, canvas.width);
  let pose = posit.pose(corners);
  if( pose === null ) return;

  // Translate pose to THREE.Object3D
  let rotation = pose.bestRotation;
  let translation = pose.bestTranslation;

  object3d.scale.x = modelSize;
  object3d.scale.y = modelSize;
  object3d.scale.z = modelSize;

  object3d.rotation.x = -Math.asin(-rotation[1][2]);
  object3d.rotation.y = -Math.atan2(rotation[0][2], rotation[2][2]);
  object3d.rotation.z =  Math.atan2(rotation[1][0], rotation[1][1]);

  object3d.position.x =  translation[0];
  object3d.position.y =  translation[1];
  object3d.position.z = -translation[2];
  return;
}