$(document).ready(function() {

  var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

  camera.position.z = 5;

  var red = new THREE.Color(0xFFFFFF);
  var green = new THREE.Color(0x00FF00);

  var material1 = new THREE.MeshBasicMaterial({color: red});
  var material2 = new THREE.MeshBasicMaterial({color: green});

  var loader = new THREE.FontLoader();

  var string = 'N';

  var textMesh = {};

  loader.load('./fonts/testFont8.json', function(font) {
  	var textGeom = new THREE.TextGeometry(string, {
  		font: font,
  		size: 10,
  		height: 5
  	});

    textGeom.normalize();
    console.log(textGeom)

    textMesh = new THREE.Mesh(textGeom, [material1, material2]);
    console.log(textMesh)

    scene.add(textMesh)

    animate();
  });

	var animate = function () {
		requestAnimationFrame( animate );
    textMesh.rotation.y += 0.05;
		renderer.render(scene, camera);
	};
});
