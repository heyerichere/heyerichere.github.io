// Begining of extension
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(300, 300);
renderer.setClearColor(0x000000, 0);
document.getElementById("container3D").appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Orbit Controls for interactivity
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth movement
controls.dampingFactor = 0.05;
controls.enableZoom = true; // Allow zooming in/out
controls.minDistance = 5; // Minimum zoom distance
controls.maxDistance = 20; // Maximum zoom distance

let bee;
const loader = new GLTFLoader();
loader.load(
    'static/images/demon_bee_full_texture.glb',
    (gltf) => {
        bee = gltf.scene;
        bee.scale.set(5, 5, 5);
        bee.position.set(0, 0, 0);
        scene.add(bee);
    },
    (xhr) => {
        console.log(`${(xhr.loaded / xhr.total * 100).toFixed(2)}% loaded`);
    },
    (error) => {
        console.error('Error loading model:', error);
    }
);

function animate() {
    requestAnimationFrame(animate);
    if (bee) {
        bee.rotation.y += 0.005; // Slow, continuous rotation
    }
    controls.update(); // Update controls
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = 300 / 300;
    camera.updateProjectionMatrix();
    renderer.setSize(300, 300);
});

animate();
// End of extension

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

document.getElementById('year').textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
    document.querySelectorAll('.fade-in').forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (position < screenPosition) {
            element.classList.add('active');
        }
    });
});