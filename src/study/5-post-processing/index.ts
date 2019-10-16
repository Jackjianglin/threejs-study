/**
 * 很多three.js应用程序是直接将三维物体渲染到屏幕上的。 
 * 有时，你或许希望应用一个或多个图形效果，例如景深、发光、胶片微粒或是各种类型的抗锯齿。 
 * 后期处理是一种被广泛使用、用于来实现这些效果的方式。 
 * 
 * 首先，场景被渲染到一个渲染目标上，渲染目标表示的是一块在显存中的缓冲区。 
 * 接下来，在图像最终被渲染到屏幕之前，一个或多个后期处理过程将滤镜和效果应用到图像缓冲区。
 * three.js通过EffectComposer（效果合成器），提供了一个完整的后期处理解决方案来实现这样的工作流程。
 */

 import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
 import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
 import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

 import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader'
 import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader'
import * as THREE from 'three'

let camera, scene, renderer, composer:EffectComposer;
let object : THREE.Object3D, light;
init();
anim()
function init(){
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1 ,1000);
    camera.position.z = 400;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 1000);

    object = new THREE.Object3D()
    scene.add(object);

    const geometry = new THREE.SphereBufferGeometry(1, 4, 4);
    const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true
    })

    for (let index = 0; index < 100; index++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        mesh.position.multiplyScalar(Math.random() * 400);

        mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
        object.add(mesh);
    }

    scene.add(new THREE.AmbientLight(0x222222));

    light = new THREE.DirectionalLight(0xffffff);

    light.position.set(1, 1, 1);
    scene.add(light);

    composer = new EffectComposer(renderer);

    composer.addPass(new RenderPass(scene, camera));

    // const dotEffect = new ShaderPass(DotScreenShader);
    // dotEffect.uniforms['scale'].value = 4;

    // composer.addPass(dotEffect);

    // const rgbEffect = new ShaderPass(RGBShiftShader);
    // rgbEffect.uniforms['amount'].value = 0.0015;

    // composer.addPass(rgbEffect);

}

function anim(){
    requestAnimationFrame(anim);
    object.rotation.x += 0.005
    object.rotation.y += 0.01
    composer.render();
}