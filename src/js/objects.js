

// not used
function boat(){
	var b_terrain = new THREE.Object3D();
  var b_sail = new THREE.Object3D();
  var b_pole =new THREE.Object3D();
  var b_topleft = new THREE.Object3D();
  var b_head =new THREE.Object3D();
  var b_topright =new THREE.Object3D();
  var b_left =new THREE.Object3D();
  var b_body =new THREE.Object3D();
  var b_right =new THREE.Object3D();
  var b_tail =new THREE.Object3D();

  scene.add(b_terrain);
  scene.add(b_sail);
  scene.add(b_pole);
  scene.add(b_topleft);
  scene.add(b_head);
  scene.add(b_topright);
  scene.add(b_left);
  scene.add(b_body);
  scene.add(b_right);
  scene.add(b_tail);

  
  (function(){
    //base of boat
    var geometry = new THREE.BoxGeometry( 0.7, 0.5, 0.1);
    var sides = new THREE.BoxGeometry(0.7, 0.2, 0.1);
    var otherSides = new THREE.BoxGeometry(0.5, 0.2, 0.1);

    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3(0,0,0));
    geo.vertices.push(new THREE.Vector3(0.5,0,0));
    geo.vertices.push(new THREE.Vector3(0.25,0.5,0));
    geo.faces.push(new THREE.Face3(0,1,2));
    geo.computeFaceNormals();

    //var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  
    var material;
    var loader = new THREE.TextureLoader();
    loader.load(
      'src/img/wood.jpg',
      function(texture){
        var material = new THREE.MeshBasicMaterial({
          map: texture
        });

        //components of boat
        var body = new THREE.Mesh( geometry, material );
        var tail = new THREE.Mesh( otherSides, material );
        var head = new THREE.Mesh(geo, material);
        var right = new THREE.Mesh( sides, material );
        var left = new THREE.Mesh( sides, material );
        var topRight = new THREE.Mesh( otherSides, material );
        var topLeft = new THREE.Mesh( otherSides, material );

        //sail - what physics
        var cylinder = new THREE.CylinderGeometry( 0.025, 0.025, 0.7, 32 );
        //var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
        var pole = new THREE.Mesh(cylinder, material);

        var sailMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        var sphereSlice = new THREE.SphereGeometry(0.3, 16, 8, 0, 1.5, 1, 1.2);
        var sail = new THREE.Mesh(sphereSlice, sailMaterial);
         //initial positions

        body.rotation.x = -0.5;
        body.position.y = 0.15;

        head.position.x = -0.3;
        head.rotation.x = -0.5;
        head.position.y = -0.05;
        head.rotation.z = 1.6;

        tail.position.x = 0.3;
        tail.rotation.x = 1.1;
        tail.position.y = 0.2;
        tail.rotation.y = 1.5;
        
        left.rotation.x = 1.1;
        left.position.y = -0.02;
        left.position.z = 0.1;

        right.position.y = 0.4;
        right.rotation.x = 1.1;

        topRight.position.x = -0.55;
        topRight.rotation.x = 1.1;
        topRight.position.y = 0.3;
        topRight.rotation.y = 0.5;

        topLeft.position.x = -0.55;
        topLeft.rotation.x = 1.1;
        topLeft.rotation.y = -0.5;
        topLeft.position.y = 0.1;

        pole.rotation.x = 1;
        pole.position.z = 0.2;
        pole.position.y = 0.25;

        sail.rotation.x = 1;
        sail.position.x = 0.25;
        sail.position.y = 0.4;
        sail.position.z = 0.4;
        sail.rotation.y = -0.4;

       
        b_sail.add(sail);
        b_pole.add(pole);
        b_topleft.add(topLeft);
        b_topright.add(topRight);
        b_head.add(head);
        b_left.add(left);
        b_body.add(body);
        b_right.add(right);
        b_tail.add(tail);
    });
    
    //var water
    var waterImg = new THREE.TextureLoader().load(
      'src/img/water.jpg',
      function(texture){
        var waterMaterial = new THREE.MeshBasicMaterial({
          map: texture
        });
        var water = new THREE.PlaneGeometry(2, 2);
        var terrain = new THREE.Mesh(water, waterMaterial);
        terrain.rotation.x = -0.5;
        terrain.position.z = -0.2;
        b_terrain.add(terrain);
      });
    //var waterMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff, side: THREE.DoubleSide});

  })();

  /*
  jsArucoMarker.markerToObject3D(marker, b_terrain, canvas);
  jsArucoMarker.markerToObject3D(marker, b_sail, canvas);
  jsArucoMarker.markerToObject3D(marker, b_pole, canvas);
  jsArucoMarker.markerToObject3D(marker, b_topleft, canvas);
  jsArucoMarker.markerToObject3D(marker, b_topright, canvas);
  jsArucoMarker.markerToObject3D(marker, b_head, canvas);
  jsArucoMarker.markerToObject3D(marker, b_left, canvas);
  jsArucoMarker.markerToObject3D(marker, b_body, canvas);
  jsArucoMarker.markerToObject3D(marker, b_right, canvas);
  jsArucoMarker.markerToObject3D(marker, b_tail, canvas);
  b_terrain.visible = true;
  b_sail.visible = true;
  b_pole.visible = true;
  b_topleft.visible = true;
  b_topright.visible = true;
  b_head.visible = true;
  b_left.visible = true;
  b_body.visible = true;
  b_right.visible = true;
  b_tail.visible = true;
  */
}

// not used

function cube(){
  //cube
  (function(){
    var geometry = new THREE.BoxGeometry( 2, 2, 2 );
    for ( var i = 0; i < geometry.faces.length; i += 2 ) {
      var hex = Math.random() * 0xffffff;
      geometry.faces[ i ].color.setHex( hex );
      geometry.faces[ i + 1 ].color.setHex( hex );
    }
    var material = [
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('/src/img/dice1.png')
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('/src/img/dice2.png')
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('/src/img/dice3.png')
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('/src/img/dice4.png')
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('/src/img/dice5.png')
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('/src/img/dice6.png')
       })
    ];
    //var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );
    //var box = new THREE.Mesh( geometry, material );
    var box = new THREE.Mesh(
      geometry,
      new THREE.MultiMaterial( material ) 
    );
    box.position.y = 0;
    box.position.x = 0;
    cube.add( box );   
  })();
}