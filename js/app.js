$(document).ready(function() {

  var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

  camera.position.z = 10;

  var red = new THREE.Color(0xFFFFFF);
  var green = new THREE.Color(0x00FF00);

  var material1 = new THREE.MeshBasicMaterial({color: red});
  var material2 = new THREE.MeshBasicMaterial({color: green});

  var loader = new THREE.FontLoader();

  loader.load('./fonts/testFont8.json', function ( font ) {
    console.log(font)
  	var textGeom = new THREE.TextGeometry('Nice', {
  		font: font,
  		size: 10,
  		height: 10,
  		curveSegments: 10
  	});

    textGeom.normalize();

    var textMesh = new THREE.Mesh(textGeom, [material1, material2]);

    scene.add(textMesh)
  });

	var animate = function () {
		requestAnimationFrame( animate );
		renderer.render(scene, camera);
	};

	animate();

});
