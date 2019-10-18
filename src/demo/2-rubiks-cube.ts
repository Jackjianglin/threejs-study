import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
function simpleCube(x, y, z, num, len, colors){
    
}
function getCubeTexture(rgbaColor){
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;

    const context = canvas.getContext('2d');
    context.fillStyle = 'rgba(0, 0, 0, 1)';
    context.fillRect(16, 16, 224, 224);
    context.lineJoin = 'round';
    context.lineWidth = 16;
    context.fillStyle = rgbaColor;
    context.strokeStyle = rgbaColor;
    context.stroke();
    context.fill();
    return canvas;
}

const BasicCube = {
    x: 0,
    y: 0,
    z: 0,
    num: 3,
    len: 50,
    //右、左、上、下、前、后
	colors: [
        '#ff6b02', '#dd422f',
        '#ffffff', '#fdcd02',
        '#3d81f7', '#019d53'
    ]
}


class RubikCube{
    width: number;
    height: number;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    pointLight: THREE.PointLight;
    ambientLight: THREE.AmbientLight;
    cube: THREE.Mesh;
    scene: THREE.Scene;
    orbitControls: OrbitControls;
    directionalLight: THREE.DirectionalLight;
    initRender(){
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer = new THREE.WebGLRenderer({
            antialias : true//抗锯齿开启
        });
        this.renderer.setSize(this.width, this.height);//设置渲染器宽度和高度
        this.renderer.setClearColor(0xffffff, 1.0);//设置背景颜色
        this.renderer.setPixelRatio(window.devicePixelRatio);//设置设备像素比
        document.body.appendChild(this.renderer.domElement)
    }

    initCamera(){
        this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 1, 1000);
        this.camera.position.set(200, 400, 600)
        this.camera.up.set(0, 1, 0);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
    initLight(){
        this.pointLight = new THREE.PointLight(0xffffff, 1, 2000);
        this.pointLight.position.set(70, 112, 98);
        this.ambientLight = new THREE.AmbientLight(0x333333);
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
        this.directionalLight.position.set(50, 50, 50);
    }
    initObject(){
        const geometry = new THREE.BoxGeometry(100, 100, 100);
        const material = new THREE.MeshLambertMaterial({
            color: 0xff0000
        })

        this.cube = new THREE.Mesh(geometry, material);
        this.cube.position.set(0, 0, 0);
    }
    initScene(){
        this.scene = new THREE.Scene()
        this.scene.add(this.pointLight);
        this.scene.add(this.ambientLight);
        this.scene.add(this.directionalLight);
        this.scene.add(this.cube);
    }
    update(){
        this.renderer.clear()
        this.renderer.render(this.scene, this.camera);
        this.cube.rotation.x += 0.005;
        this.cube.rotation.y += 0.005;
        requestAnimationFrame(() => this.update())
    }
    constructor(){
        this.initRender();
        this.initCamera();
        this.initLight();
        this.initObject();
        this.initScene();
        this.update();
        this.orbitControls = new OrbitControls(this.camera);
        this.orbitControls.autoRotate = true;
    }
}


new RubikCube()