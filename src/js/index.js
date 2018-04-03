'use strict';


(function(){
  if (location.protocol != 'https:') {
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
  }
  var canvas = document.createElement('canvas');
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  canvas.style.position = 'absolute';
  canvas.style.top = '0px';
  canvas.style.left = '0px';
  var context = canvas.getContext("2d");
  //initilize three js and webgl
	var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 5;
  var renderLoop = [];
  var renderer = new THREE.WebGLRenderer({
    antialias : false,
    alpha : true,
  });
  var ambient = new THREE.AmbientLight( 0xFFFFFF );
  scene.add( ambient );

  var spotLight = new THREE.DirectionalLight( 0xffffff,1 );
  spotLight.position.set( 100, 100, 100 );
  scene.add( spotLight );

  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  //renderer.setClearColor( 0xffffff, 1 );
  document.body.appendChild( renderer.domElement );

  var markerObjectSamsung = new THREE.Object3D();
  scene.add(markerObjectSamsung);
  //add image
  var material = new THREE.SpriteMaterial({
    map: THREE.ImageUtils.loadTexture( '/ar-demos/src/img/Samsung_Logo.svg.png' ),
  });
  var geometry = new THREE.BoxGeometry(1,1,1);
  var object = new THREE.Sprite(material );
  object.scale.set( 2, 1, 1 );
  markerObjectSamsung.add(object);
  
  // gearvr and camera 360
  var camera360Path = '/ar-demos/src/obj/Samsung-Gear-360-OBJ/';
  var gearvrPath = '/ar-demos/src/obj/Gear-VR-2016-OBJ/';
  var gearvr = new THREE.Object3D();
  var camera360 = new THREE.Object3D();
  scene.add(gearvr);
  scene.add(camera360);

  var camMtlLoader = new THREE.MTLLoader();
  camMtlLoader.setTexturePath(camera360Path);
  camMtlLoader.setPath(camera360Path);
  camMtlLoader.load( 'gear360.mtl', materials => {
    //console.log(materials);
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath(camera360Path);
    objLoader.load('gear360.obj', object => {
      object.scale.set( 0.01, 0.01, 0.01 );
      object.rotation.x = Math.PI / 2;
      //scene.add(object);
      camera360.add(object);
    });
  });
  
  var gearMtlLoader = new THREE.MTLLoader();
  gearMtlLoader.setTexturePath(gearvrPath);
  gearMtlLoader.setPath(gearvrPath);
  gearMtlLoader.load( 'Gear-VR-Note-7.mtl', materials => {
    //console.log(materials);
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath(gearvrPath);
    objLoader.load('Gear-VR-Note-7.obj', object => {
      object.scale.set( 0.007, 0.007, 0.007 );
      object.rotation.x = Math.PI / 2;
      gearvr.add(object);
    });
  });
  
  // render scene
  renderLoop.push(function(){
    renderer.render(scene, camera);
  });


  // run the rendering loop
  var previousTime = performance.now();
  requestAnimationFrame(function animate(now){

    requestAnimationFrame( animate );
    
    renderLoop.forEach(function(renderLoop){
      renderLoop(now, now - previousTime);
    });
    
    previousTime  = now;
  });

  //detect markers  
  
  var jsArucoMarker = new markers.arTags(); 
  var backCamera = new camara.camera();
  document.body.appendChild(backCamera.video);
  markerObjectSamsung.visible  = false;
  gearvr.visible = false;
  camera360.visible = false;
  renderLoop.push(function(){
    var markers = jsArucoMarker.detectMarkers(backCamera.video, canvas, context);
    markerObjectSamsung.visible  = false;
    gearvr.visible = false;
    camera360.visible = false;
    markers.forEach(function(marker){
      console.log(marker.id);
      switch(marker.id){
        case 1001:
          jsArucoMarker.markerToObject3D(marker, markerObjectSamsung, canvas);
          markerObjectSamsung.visible = true;
          break;
        case 265:
          jsArucoMarker.markerToObject3D(marker, camera360, canvas);
          camera360.visible = true;
          break;
        case 33:
          jsArucoMarker.markerToObject3D(marker, gearvr, canvas);
          gearvr.visible = true;
        default:
          break;
      }
    });
  });
  var vid = document.getElementById('video');
  window.addEventListener('resize', function(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    vid.style.width = window.innerWidth + 'px';
    vid.style.height = window.innerHeight + 'px';
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }, false);
})();
