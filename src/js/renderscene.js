function renderScene(objFile, mtlFile, path, xSize, ySize, zSize, xPos, yPos, zPos) {
	console.log("setting up scene");
	// Set up canvas and scene
	let canvas = document.createElement('canvas');
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.outerHeight + 'px';
  canvas.style.position = 'absolute';
  canvas.style.top = '0px';
  canvas.style.left = '0px';
  let context = canvas.getContext("webgl");
  //initilize three js and webgl
	let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
  let controls = new THREE.DeviceOrientationControls( camera );
  //let controls = new THREE.OrbitControls(camera);
  camera.position.z = 0;
  camera.position.x = 3;
  // camera.position.y = yPos;
  // camera.position.x = xPos;
  controls.update();
  scene.add(camera);
  let renderer = new THREE.WebGLRenderer({
    antialias : false,
    alpha : true,
  });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  let directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
  directionalLight.position.set(0,1,0);
	scene.add( directionalLight );

  let arScene = new THREE.Object3D();
  scene.add(arScene);

  let mtlLoader = new THREE.MTLLoader();
  mtlLoader.setTexturePath(path);
  mtlLoader.setPath(path);
  mtlLoader.load( mtlFile, materials => {
    //console.log(materials);
    materials.preload();
    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath(path);
    objLoader.load(objFile, object => {
      object.scale.set( xSize, ySize, zSize );
      //object.position.set(xPos, yPos,zPos);
      //object.rotation.x = Math.PI/2;
      //scene.add(object);
      arScene.add(object);
    });
  });


  function animate() {
  	requestAnimationFrame(animate);
  	controls.update();
  	renderer.render(scene, camera);
  }
  animate();
  // fetch camera
  console.log("setting up camera")
  let rearCamera =  new camara.camera();
  document.body.appendChild(rearCamera.video);

  // resizing
  let vid = document.getElementById('video');
  window.addEventListener('resize', function(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    vid.style.width = window.innerWidth + 'px';
    vid.style.height = window.outerHeight + 'px';
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }, false);
}