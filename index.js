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
    TextureLoader,
    AmbientLight,
    HemisphereLightProbe,
    AxesHelper,
    GridHelper
} from 'three';
import CameraControls from 'camera-controls';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import gsap from 'gsap';

//1 The scene
const scene = new Scene()
const canvas = document.getElementById('three-canvas');

const axes = new AxesHelper();
axes.material.depthTest = false;
axes.renderOrder = 2;
scene.add(axes)

const grid = new GridHelper();
grid.renderOrder = 1;
scene.add(grid)

//2 The Object

const loader = new TextureLoader();

const geometry = new BoxGeometry(0.5, 0.5, 0.5);
const orangeMaterial = new MeshLambertMaterial( {color: 0xfff909} );
const greenMaterial = new MeshLambertMaterial( {color: 0xffffff,
map: loader.load('./sample.png')
} );

const blueMaterial = new MeshLambertMaterial( {color: 0x00ffcc} );

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
camera.position.z = 5; // Z let's you move backwards and forwards. X is sideways, Y is upward and do
camera.position.y = 5;
camera.position.x = 5;
camera.lookAt(axes.position);
scene.add( camera );

//4 The Renderer
const renderer = new WebGLRenderer({ canvas }); 
renderer.setPixelRatio(Math.min (window.devicePixelRatio, 2));
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
renderer.setClearColor (0xffffff, 1)

// 5 light
const light1 = new DirectionalLight ();
light1.position.set(3,2,1).normalize();
scene.add(light1);
const color = 0xFFFFFF;
const intensity = 1;
const light = new DirectionalLight(color, intensity);
light.position.set(0,2,0);
scene.add(light);
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

// 9 DEbugging
const gui = new GUI();

const min = -3;
const max = 3;
const step = 0.01;

const transformationFolder = gui.addFolder ('Transformation')
gui.add(greenCube.position, 'y', min, max, step).name ("Position Y")
gui.add(greenCube.position, 'x', min, max, step).name ("Position X")
gui.add(greenCube.position, 'z', min, max, step).name ("Position Z")


gui.addFolder('Visibility').add(blueCube, 'visible')

const  colorParam = {
    value: 0xff0000
}
gui.addColor(colorParam, 'value').name("Color").onChange(() => {
    blueCube.material.color.set(colorParam.value);
})


const functionParam = {
	spin: () => {
		gsap.to(greenCube.rotation, { y: greenCube.rotation.y +10, duration: 1 });
	}
}

gui.add(functionParam, 'spin');