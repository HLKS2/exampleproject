import {
    Scene,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    PerspectiveCamera,
    WebGLRenderer,
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils,
    Clock,
    MeshLambertMaterial,
    DirectionalLight,
    TextureLoader
} from 'three';
import CameraControls from 'camera-controls';


//1 The scene
const scene = new Scene()
const canvas = document.getElementById('three-canvas');

//2 The Object

const loader = new TextureLoader();

const geometry = new BoxGeometry(0.5, 0.5, 0.5);
const orangeMaterial = new MeshLambertMaterial( {color: 0xfff909} );
const greenMaterial = new MeshBasicMaterial( {color: 0xffffff,
map: loader.load('./sample.png')
} );

const blueMaterial = new MeshBasicMaterial( {color: 0x00ff00} );

const orangeCube = new Mesh( geometry, orangeMaterial );
scene.add( orangeCube );

const greenCube = new Mesh( geometry, greenMaterial );
greenCube.position.x += 1;
greenCube.scale.set(2,2,2);
scene.add(greenCube);

const blueCube = new Mesh( geometry, blueMaterial );
blueCube.position.x -= 1;

scene.add(blueCube);

//3 The Camera
const camera = new PerspectiveCamera(75, canvas.clientWidth/ canvas.clientHeight);
camera.position.z = 3; // Z let's you move backwards and forwards. X is sideways, Y is upward and do
scene.add( camera );

//4 The Renderer
const renderer = new WebGLRenderer({ canvas }); 
renderer.setPixelRatio(Math.min (window.devicePixelRatio, 2));
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);


// 5 light
const light1 = new DirectionalLight ();
light1.position.set(3,2,1).normalize();
scene.add(light1);

const light2 = new DirectionalLight ();
light2.position.set(-3,2,-1).normalize();
scene.add(light2);

// 6 Responsivity

window.addEventListener('resize', () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
});

//7 Contorls
const subsetOfTHREE = {
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils: {
      DEG2RAD: MathUtils.DEG2RAD,
      clamp: MathUtils.clamp
    }
  };

  CameraControls.install( { THREE: subsetOfTHREE } );
const clock = new Clock();
const cameraControls = new CameraControls(camera, canvas);
cameraControls.dollyToCursor = true;

//8 Animation
function animate() {
    const delta = clock.getDelta();
      cameraControls.update( delta );
      renderer.render( scene, camera );
    requestAnimationFrame(animate);
}
animate();
function animatecube() {
    orangeCube.rotation.x += 0.01;
    orangeCube.rotation.z += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animatecube);
}

animatecube();