let camera, scene, renderer, elf, clock;

let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let object;

init();
animate();

function init () {

  //const container = document.createElement( 'div' );
  //document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 100);
  //调整文物远近（x,y,z），用z值调整
  camera.position.set(0, 10, 60);

  scene = new THREE.Scene();
  clock = new THREE.Clock();

  // probe
  var ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);

  new THREE.RGBELoader()
    .setDataType(THREE.UnsignedByteType)
    .setPath('/img/canvas/')
    .load('royal_esplanade_1k.hdr', function (texture) {

      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.environment = envMap;

      texture.dispose();
      pmremGenerator.dispose();

      render();

      // model

      const loader = new THREE.GLTFLoader().setPath('/img/canvas/');
      loader.load('stp.glb', function (gltf) {

        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
          }
        });

        elf = gltf.scene;
        elf.position.set(0, -3, 0);
        scene.add(elf);
        render();

      });

    });

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(500, 700);
  // renderer.setSize(canvasContainer.offsetHeight * 1.3 * (5 / 7), canvasContainer.offsetHeight * 1.3);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.querySelector('#canvasContainer').appendChild(renderer.domElement);

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  ambient.intensity = 8;

  camera.aspect = 5 / 7;
  camera.updateProjectionMatrix();

  document.addEventListener('mousemove', onDocumentMouseMove, false);

  window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize () {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = 5 / 7;
  camera.updateProjectionMatrix();
  // renderer.setSize(canvasContainer.offsetHeight * 1.3 * (5 / 7), canvasContainer.offsetHeight * 1.3);
  render();

}

function onDocumentMouseMove (event) {

  mouseX = (event.clientX - windowHalfX) / 30;
  mouseY = (event.clientY - windowHalfY) / 30;

}

//
function animate () {

  requestAnimationFrame(animate);

  render();

}

function render () {

  const delta = clock.getDelta();

  if (elf !== undefined) {
    elf.rotation.y += delta * 0.1;
  }
  camera.aspect = 5 / 7;
  // renderer.setSize(canvasContainer.offsetHeight * 1.3 * (5 / 7), canvasContainer.offsetHeight * 1.3);
  // renderer.setSize($("#pos").outerHeight() * 1.3 * (5 / 7), $("#pos").outerHeight() * 1.3);
  camera.position.x += (mouseX - camera.position.x) * .02;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}