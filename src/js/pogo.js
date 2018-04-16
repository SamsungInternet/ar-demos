(function(){
	// webrtc works only in secure origins
  if (location.protocol != 'https:') {
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
  }

	// global vars and init three.js stuff 
	let gMap = document.getElementById("map");
	let canvas = document.createElement('canvas');
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  canvas.style.position = 'absolute';
  canvas.style.top = '0px';
  canvas.style.left = '0px';
  let context = canvas.getContext("2d");
  //initilize three js and webgl
	let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  let controls = new THREE.DeviceOrientationControls( camera );
  //let controls = new THREE.OrbitControls( camera );
  camera.position.z = 50;
  camera.position.y = 20;
  controls.update();
  let renderer = new THREE.WebGLRenderer({
    antialias : false,
    alpha : true,  // transparent canvas to overlay on top of video
  });
  
  // add some lighting to scene
  let ambient = new THREE.AmbientLight( 0xFFFFFF );
  scene.add( ambient );
  let directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
	directionalLight.position.set(0,1,0);
	scene.add( directionalLight );

  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  let pScene = new THREE.Object3D();
  scene.add(pScene);
  // Add grid so the entire model moves together
  let pokeballGrid = new THREE.GridHelper(10,10);
  pokeballGrid.name = "grid";
  pokeballGrid.transparent = true;
  pokeballGrid.position.set(0,-8,25);
  pokeballGrid.scale.set(1,1,1);
  let pokeballScene = new THREE.Object3D();
  pokeballGrid.add(pokeballScene);
  scene.add(pokeballGrid);
  // drag controls for pokeball
  let objects = [pokeballGrid];
  let pokeballControls = new THREE.DragControls(objects, camera, renderer.domElement);
  pokeballControls.addEventListener("dragstart", dragStart);
  pokeballControls.addEventListener("dragend", dragEnd);
  document.onmousedown = cursorMove;
  document.ontouchstart = cursorMove;
  document.onmouseup = cursorEnd;
  document.ontouchend = cursorEnd;
  // pokeball position for reset and initial position
  let cursorStart = {};
  function cursorMove(e) {
  	cursorStart.x = event.pageX;
  	cursorStart.y = event.pageY;
  	console.log(cursorStart);
  }
  let cursorStop = {};
  function cursorEnd(e) {
  	cursorStop.x = event.pageX;
  	cursorStop.y = event.pageY;
  	console.log(cursorStop);
  }
  loadModel("src/obj/pokeball/", "masterball", 0.05, 0.05, 0.05, 0, 0, 0,0, 4);
  let startTime;
  canvas.style.display = "none";

  /**
   * return random float between 0.00001 & 0.001
   * for map coords for each pokemon
   */
  function randomVals() {
  	let flip = (Math.random() * (1.0 - 0.0) + 0.0) > 0.5 ? 1 : -1;
  	let value = (flip * (Math.random() * (0.0001 - 0.00001) + 0.0001)).toFixed(6);
  	return value;
  }
	/**
	 * initilize google maps
	 */
	function initGMap() {
		if (navigator.geolocation) {
			let options = {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			}
      navigator.geolocation.getCurrentPosition( (position) => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(pos);
       	let map = new google.maps.Map(gMap, {
					center: pos,
					zoom: 20,
			  	tilt: 45
				});
				let infoWindow = new google.maps.InfoWindow;
				//infoWindow.setPosition(pos);
		    infoWindow.open(map);
		    map.setCenter(pos);
		    let marker = new google.maps.Marker({
          position: pos,
          icon: "src/img/ic_room_black_24dp_1x.png",
          map: map
        });
		    // add markers to map
		    let features = [
		    	{
		    		position: new google.maps.LatLng(parseFloat(pos.lat) + parseFloat(randomVals()), parseFloat(pos.lng) + parseFloat(randomVals())),
		    		img: "src/img/bulbasaur_48.png",
		    		name: "bulbasaur",
		    		scaleX: 50,
		    		scaleY: 50,
		    		scaleZ: 50,
		    		rotateX: 0,
		    		rotateY: Math.PI,
		    		rotateZ: 0,
		    		positionZ: -30,
		    		positionY: 0,
		    		number: 0
		    	},
		    	{
		    		position: new google.maps.LatLng(parseFloat(pos.lat) + parseFloat(randomVals()), parseFloat(pos.lng) + parseFloat(randomVals())),
		    		img: "src/img/squirtle_48.png",
		    		name: "squirtle",
		    		scaleX: 9,
		    		scaleY: 9,
		    		scaleZ: 9,
		    		rotateX: 0,
		    		rotateY: 0,
		    		rotateZ: 0,
		    		positionZ: -50,
		    		positionY: 5,
		    		number: 1
		    	},
		    	{
		    		position: new google.maps.LatLng(parseFloat(pos.lat) + parseFloat(randomVals()), parseFloat(pos.lng) + parseFloat(randomVals())),
		    		img: "src/img/charmander_48.png",
		    		name: "charmander",
		    		scaleX: 9,
		    		scaleY: 9,
		    		scaleZ: 9,
		    		rotateX: 0,
		    		rotateY: 0,
		    		rotateZ: 0,
		    		positionZ: -30,
		    		positionY: 0,
		    		number: 2
		    	},
		    	{
		    		position: new google.maps.LatLng(parseFloat(pos.lat) + parseFloat(randomVals()), parseFloat(pos.lng) + parseFloat(randomVals())),
		    		img: "src/img/pikachu_48.png",
		    		name: "pikachu",
		    		scaleX: 8,
		    		scaleY: 8,
		    		scaleZ: 8,
		    		rotateX: 0,
		    		rotateY: 0,
		    		rotateZ: 0,
		    		positionZ: -40,
		    		positionY: 5,
		    		number: 3
		    	},
		    	{
		    		position: new google.maps.LatLng(parseFloat(pos.lat) + parseFloat(randomVals()), parseFloat(pos.lng) + parseFloat(randomVals())),
		    		img: "src/img/magikarp_48.png",
		    		name: "magikarp",
		    		scaleX: 5,
		    		scaleY: 5,
		    		scaleZ: 5,
		    		rotateX: 0,
		    		rotateY: 0,
		    		rotateZ: 0,
		    		positionZ: -30,
		    		positionY: 0,
		    		number: 4
		    	},
		    	{
		    		position: new google.maps.LatLng(parseFloat(pos.lat) + parseFloat(randomVals()), parseFloat(pos.lng) + parseFloat(randomVals())),
		    		img: "src/img/lapras_48.png",
		    		name: "lapras",
		    		scaleX: 5,
		    		scaleY: 5,
		    		scaleZ: 5,
		    		rotateX: 0,
		    		rotateY: 0,
		    		rotateZ: 0,
		    		positionZ: -30,
		    		positionY: 0,
		    		number: 5
		    	}
		    ];
		    let allMarkers = {};
		    features.forEach((feature) => {
		    	console.log(feature.position.lat() +"," + feature.position.lng());
          let marker = new google.maps.Marker({
            position: feature.position,
            icon: feature.img,
            map: map
          });
          allMarkers[feature.number] = marker;
          marker.addListener("click", () => {
          	let name = feature.name;
          	console.log(name);
          	gMap.style.display = "none";
          	loadModel("src/obj/"+ name + "/",  name, feature.scaleX, feature.scaleY, feature.scaleZ, feature.rotateX, feature.rotateY, feature.rotateZ, feature.positionY,feature.positionZ);
          	initCamera();
        		//console.log(feature.number + ": " + allMarkers[feature.number]);
        		console.log(scene);
        		allMarkers[feature.number].setMap(null);
          });
        });
      }, () => {
         console.warn("Unable to get location - location services off?");
      }, options);
    } else {
      // Browser doesn't support Geolocation
      console.error("Browser doesn't support Geolocation API");
    }
	}

	/**
	 * Loads model and add model to scene
	 */
	function loadModel(path, object, scaleX, scaleY, scaleZ, rotateX, rotateY, rotateZ,translateY, translateZ) {
		let gltfLoader = new THREE.GLTF2Loader();
		gltfLoader.load(path + object + ".gltf", ( gltf) => {
			// set position?
			gltf.name = object;
			gltf.scene.scale.set( scaleX, scaleY, scaleZ);
			gltf.scene.rotation.set(rotateX, rotateY, rotateZ);
			gltf.scene.position.set(0,translateY,translateZ);
			// masterball has 100% catch rate
			if (object === "masterball") {
				pokeballScene.add(gltf.scene);
			} else {
				scene.add( gltf.scene );
			}
		},( xhr ) => {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
	  ( error ) =>{
				console.warn("Failed to load " + error);
			}
		);
		animate();
		canvas.style.display = "block";
	}

	/**
	 * drag start to move pokeball
	 */
	function dragStart() {
		console.log("drag start");
		startTime = performance.now();
		controls.enabled = false;
	}

	/**
	 * drag end to stop moving pokeball
	 */
	function dragEnd() {
		console.log("drag end");
		let endTime = performance.now() - startTime;
		pokeballScene.enable = false;
		pokeballGrid.position.set(
    	( event.clientX / window.innerWidth ) * 2 - 1,
      - ( event.clientY / window.innerHeight ) * 2 + 1,
    	0.5 );
		projectile(endTime);
		controls.enabled = true;
	}

	/**
	 * constant velocities to simplify the physics for now.
	 */
	function projectile(endTime){
		let xVelocity = 0.0;
		let yVelocity = 5.0;
		let zVelocity = -5.0;
		let distance = -30.0;
		let apex = -15.0;
		if (xVelocity || yVelocity || zVelocity)
			updatePokeballPosition(xVelocity, yVelocity, zVelocity, distance, apex, endTime);
	}

	/**
	 * update pokeball position for toss
	 */
	function updatePokeballPosition(xVelocity, yVelocity, zVelocity, distance, apex, endTime) {
		let startZ = 0.0;
		let startY = 0.0;
		let startX = 0.0;
		let collided = collision(0.0, 0.000001, 0.0);
		let timeStep = setInterval( () => {
			if (startZ <= Math.abs(distance) || !collided) {
				startZ += zVelocity;
				if (startZ < apex) {
					startY -= yVelocity;
				} else {
					startY += yVelocity;
				}
				console.log(startX + ", " + startY + ", " + startZ);
				pokeballGrid.position.set(startX, startY, startZ);
				collided = collision(startX, startY, startZ);
				if (collided) {
					clearInterval(timeStep);
					pokeballGrid.position.set(0.0,0.0,0.0);
					pokeballEffects();
				}
			} else {
				clearInterval(timeStep);
				pokeballScene.position.set(0.0,0.0,0.0);
			}
		}, 16);
	}
	/**
	 * limits of the scene
	 */
	function collision(startX, startY, startZ) {
		if (false) {
			// compare pokeball with pokemon position
			return true;
		} else if (startY < 0.0 || startX > 25.0 || startX < -25.0 || startY > 25.0 || startZ < -40.0 || startZ > 25.0){
			// bounds of scene
			return true;
		} else {
			return false;
		}
	}

	/**
	 * init camera
	 */
	function initCamera() {
		let rearCamera =  new camara.camera();
		document.body.appendChild(rearCamera.video);
	}

	/**
	 * clear scene when user captures da pokemon
	 */
	function clearScene() {
		for (let i = 0; i < scene.children.length; i++) {
			if (scene.children[i].name == "OSG_Scene")
				scene.remove(scene.children[i]);
		}
	  document.getElementById("video").remove();
		console.log("finish clear scene");
	}

	/**
	 * show pokeball capture gif, because the animation I created was ugly
	 */
	function pokeballEffects() {
		let image = document.getElementById("image");
		canvas.style.display = "none";
		image.style.display = "block";
		setTimeout(()=> {
			image.style.display = "none";
			gMap.style.display = "block";
			clearScene();
		}, 2000);
	}

  /**
   * animate scene
   */
  function animate() {
  	requestAnimationFrame(animate);
  	controls.update();
  	renderer.render(scene, camera);
	}
	initGMap();
})();
