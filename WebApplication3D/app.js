// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa);

// Set up camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 100);
camera.lookAt(0, 0, 0);

// Set up renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webglCanvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls Setup
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2;
controls.update();

// Helpers (Grid and Axes)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Default material
const defaultMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

// Track the current mesh
let currentMesh = null;

// Add primitive functions
function addCube() {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const cube = new THREE.Mesh(geometry, defaultMaterial);
    cube.position.set(0, 5, 0);
    scene.add(cube);
    currentMesh = cube;
}

function addSphere() {
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const sphere = new THREE.Mesh(geometry, defaultMaterial);
    sphere.position.set(0, 5, 0);
    scene.add(sphere);
    currentMesh = sphere;
}

function addCone() {
    const geometry = new THREE.ConeGeometry(5, 20, 32);
    const cone = new THREE.Mesh(geometry, defaultMaterial);
    cone.position.set(0, 10, 0);
    scene.add(cone);
    currentMesh = cone;
}

// Event listeners for primitives
document.getElementById('addCube').addEventListener('click', addCube);
document.getElementById('addSphere').addEventListener('click', addSphere);
document.getElementById('addCone').addEventListener('click', addCone);

// Material editor
document.getElementById('colorPicker').addEventListener('input', (e) => {
    if (currentMesh) {
        currentMesh.material.color.set(e.target.value);
    }
});

// Lighting functions
function addDirectionalLight() {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(50, 50, 50);
    scene.add(light);
}

function addSpotLight() {
    const light = new THREE.SpotLight(0xffffff);
    light.position.set(50, 50, 50);
    scene.add(light);
}

function addAreaLight() {
    const light = new THREE.RectAreaLight(0xffffff, 5, 10, 10);
    light.position.set(50, 50, 50);
    scene.add(light);
}

// Event listeners for lights
document.getElementById('addDirectionalLight').addEventListener('click', addDirectionalLight);
document.getElementById('addSpotLight').addEventListener('click', addSpotLight);
document.getElementById('addAreaLight').addEventListener('click', addAreaLight);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Resize event
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
