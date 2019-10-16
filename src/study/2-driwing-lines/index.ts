import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
const appElement =  document.getElementById('app') || document.body
appElement.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 500 );
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const material = new THREE.LineBasicMaterial({
    color: 0x0000ff
});

const geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 10, 0));
geometry.vertices.push(new THREE.Vector3(10, 0, 0));
const line = new THREE.Line( geometry, material );

scene.add(line);    
renderer.render(scene, camera);

// function run(){
//     requestAnimationFrame(run);
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;

//     renderer.render(scene, camera);
// }

// export {
//     scene,
//     camera,
//     renderer,
//     run
// }