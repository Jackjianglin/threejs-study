import * as THREE from 'three'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1 ,1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

const planeGeometry = new THREE.PlaneGeometry(10, 10)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xdbdbdb
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
// camera.lookAt(plane.position)
camera.position.x = 5;
renderer.render(scene, camera)