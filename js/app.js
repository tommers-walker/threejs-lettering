$(document).ready(function() {

  var mainColor = "#E91E63";

  var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight);
	var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(mainColor);
	document.body.appendChild(renderer.domElement);

  camera.position.z = 100;

  var color1 = new THREE.Color(0xFFFFFF);
  var color2 = new THREE.Color(tinycolor(mainColor).lighten(30).toString()); // "#ffffff");
  var material1 = new THREE.MeshBasicMaterial({color: color1, transparent: true});
  var material2 = new THREE.MeshBasicMaterial({color: color2, transparent: true});

  var loader = new THREE.FontLoader();

  function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function render() {
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', onWindowResize, false);
  TweenMax.ticker.addEventListener("tick", render);

  var tl = new TimelineMax({paused: true});
  var tweens = [];

  var string = 'Nice';

  var stringArray = [
    {
      letter: "N",
      position: {
        x: 0,
        y: 0
      }
    },
    {
      letter: "i",
      position: {
        x: 0.8,
        y: 0.02
      }
    },
    {
      letter: "c",
      position: {
        x: 1.45,
        y: -0.11
      }
    },
    {
      letter: "e",
      position: {
        x: 2.26,
        y: -0.12
      }
    },
    {
      letter: "+",
      position: {
        x: 3.5,
        y: -0.07
      }
    },
    {
      letter: "S",
      position: {
        x: 4.62,
        y: 0
      }
    },
    {
      letter: "e",
      position: {
        x: 5.52,
        y: -0.12
      }
    },
    {
      letter: "r",
      position: {
        x: 6.32,
        y: -0.12
      }
    },
    {
      letter: "i",
      position: {
        x: 6.9,
        y: 0.02
      }
    },
    {
      letter: "o",
      position: {
        x: 7.6,
        y: -0.12
      }
    },
    {
      letter: "u",
      position: {
        x: 8.52,
        y: -0.13
      }
    },
    {
      letter: "s",
      position: {
        x: 9.36,
        y: -0.12
      }
    }
  ]

  var group = new THREE.Group();

  function letterFunction(letter, font) {
    var textGeom = new THREE.TextGeometry(letter.letter, {
      font: font,
      size: 1,
      height: 0.5
    });

    textGeom.center();
    var textMesh = new THREE.Mesh(textGeom, [material1, material2]);

    textMesh.position.x = letter.position.x;
    textMesh.position.y = letter.position.y;
    group.add(textMesh)

    return textMesh;
  }

  function tween(letterMesh, x) {
    var integer = x;
    if (integer > 2) {
      integer = 0;
    }

    switch(integer) {
      case 0:
        tl.add(TweenLite.to(letterMesh.rotation, 0.6, {y: Math.PI * 2, ease: Back.easeOut.config(1.7)}), "-=0.48");
        break;
      case 1:
        tl.add(TweenLite.to(letterMesh.rotation, 0.6, {y: -(Math.PI * 2), ease: Back.easeOut.config(1.7)}), "-=0.48");
        break;
      case 2:
        tl.add(TweenLite.to(letterMesh.rotation, 0.6, {x: -(Math.PI * 2), ease: Back.easeOut.config(1.7)}), "-=0.48");
    }
  }

  // Load font
  loader.load('./fonts/testFont8.json', function(font) {
    for (var i = 0; i < stringArray.length; i++) {
      var letterMesh = letterFunction(stringArray[i], font);
      tween(letterMesh, i)
    }

    // No idea what multiplyScalar does..
    var box = new THREE.Box3().setFromObject(group).getCenter(group.position).multiplyScalar(-1);
    scene.add(group);

    tl.restart();
  });
});
