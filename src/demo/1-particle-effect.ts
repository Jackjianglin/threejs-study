
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
class ThreeDWorld {
    /**
     *  canvas 容器
     */
    container: HTMLElement;
    /**
     * 场景
     */
    scene: THREE.Scene;
    /**
     * 视口高度
     */
    HEIGHT: number;
    /**
     * 视口宽度
     */
    WIDTH: number;
    /**
     * 相机
     */
    camera: THREE.PerspectiveCamera;
    /**
     * 渲染器
     */
    renderer: THREE.WebGLRenderer;
    /**
     * 户外光源
     * @description 户外光源可以用来模拟靠天越亮，靠地越暗的户外反光效果
     */
    hemisphereLight: THREE.HemisphereLight;
    /**
     * 环境光源
     * @description 环境光源可作用于物体的任何一个角落，一般设置为近白色的极淡光，用来避免物体某角度下某部分出现完全漆黑的情况。
     */
    ambientLight: THREE.AmbientLight;
    /**
     * 平行光源
     * @description 平行光源是我们使用的主光源，像太阳光平行照射在地面一样，用它来生成阴影效果。
     */
    directionalLight: THREE.DirectionalLight;
    /**
     * 轨道控制插件（鼠标拖拽视角、缩放等）
     */
    orbitControls: OrbitControls;
    /**
     * 创建场景
     */
    createScene() {
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;
        this.scene = new THREE.Scene();
        /**
         * 在场景中添加雾的效果，参数分别代表‘雾的颜色’、‘开始雾化的视线距离’、刚好雾化至看不见的视线距离’
         */
        this.scene.fog = new THREE.Fog(0x090918, 1, 600);

        this.camera = new THREE.PerspectiveCamera(70, this.WIDTH / this.HEIGHT, 1, 10000);

        this.camera.position.set(0, 0, 150);

        this.renderer = new THREE.WebGLRenderer({
            // 在css 中设置背景透明色
            alpha: true,
            // 抗锯齿
            antialias: true
        })

        // 设置背景色通雾化颜色
        this.renderer.setClearColor(this.scene.fog.color);

        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        // 开启阴影效果
        this.renderer.shadowMap.enabled = true;

        this.container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', this.handleWindowResize.bind(this), false);
    }

    /**
     * 创建灯光
     */
    createLights() {
        // 天空色， 地上颜色， 光源强度
        this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
        this.ambientLight = new THREE.AmbientLight(0xdc8874, 0.2);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
        this.directionalLight.position.set(50, 50, 50);

        this.directionalLight.castShadow = true;
         // 定义可见域的投射阴影
        this.directionalLight.shadow.camera.left = -400;
        this.directionalLight.shadow.camera.right = 400;
        this.directionalLight.shadow.camera.top = 400;
        this.directionalLight.shadow.camera.bottom = -400;
        this.directionalLight.shadow.camera.near = 1;
        this.directionalLight.shadow.camera.far = 1000;

        // 阴影分辨率， 越大性能越差
        this.directionalLight.shadow.mapSize.set(2048, 2048);

        this.scene.add(this.hemisphereLight);
        this.scene.add(this.ambientLight);
        this.scene.add(this.directionalLight);
    }
    /**
     * 重新调整窗口大小
     */
    handleWindowResize(){
        this.WIDTH = window.innerWidth;
        this.HEIGHT = window.innerHeight;
        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        this.camera.aspect = this.WIDTH / this.HEIGHT;
        this.camera.updateProjectionMatrix();
    }
    
    /**
     * 添加物体
     */
    addObjs() {
        const ball = new THREE.SphereGeometry(40, 30, 30);
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 2
        })
        const particleSystem = new THREE.Points(ball, material);
        this.scene.add(particleSystem);
    }
    update(){
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(()=>{
            this.update()
        })
    }
    constructor(canvasEl?: HTMLElement){
        this.container = canvasEl || document.body;
        this.createScene();
        this.createLights();
        this.addObjs();
        this.update()
        this.orbitControls = new OrbitControls(this.camera);
        this.orbitControls.autoRotate = true;
    }
}

new ThreeDWorld()