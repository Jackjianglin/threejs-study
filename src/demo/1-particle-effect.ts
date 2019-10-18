
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'

// class ThreeDWorld {
//     /**
//      *  canvas 容器
//      */
//     container: HTMLElement;
//     /**
//      * 场景
//      */
//     scene: THREE.Scene;
//     /**
//      * 视口高度
//      */
//     HEIGHT: number;
//     /**
//      * 视口宽度
//      */
//     WIDTH: number;
//     /**
//      * 相机
//      */
//     camera: THREE.PerspectiveCamera;
//     /**
//      * 渲染器
//      */
//     renderer: THREE.WebGLRenderer;
//     /**
//      * 户外光源
//      * @description 户外光源可以用来模拟靠天越亮，靠地越暗的户外反光效果
//      */
//     hemisphereLight: THREE.HemisphereLight;
//     /**
//      * 环境光源
//      * @description 环境光源可作用于物体的任何一个角落，一般设置为近白色的极淡光，用来避免物体某角度下某部分出现完全漆黑的情况。
//      */
//     ambientLight: THREE.AmbientLight;
//     /**
//      * 平行光源
//      * @description 平行光源是我们使用的主光源，像太阳光平行照射在地面一样，用它来生成阴影效果。
//      */
//     directionalLight: THREE.DirectionalLight;
//     /**
//      * 轨道控制插件（鼠标拖拽视角、缩放等）
//      */
//     orbitControls: OrbitControls;
//     /**
//      * 粒子系统
//      */
//     particleSystem: THREE.Points;
//     /**
//      * 创建场景
//      */
//     createScene() {
//         this.HEIGHT = window.innerHeight;
//         this.WIDTH = window.innerWidth;
//         this.scene = new THREE.Scene();
//         /**
//          * 在场景中添加雾的效果，参数分别代表‘雾的颜色’、‘开始雾化的视线距离’、刚好雾化至看不见的视线距离’
//          */
//         this.scene.fog = new THREE.Fog(0x090918, 1, 600);

//         this.camera = new THREE.PerspectiveCamera(70, this.WIDTH / this.HEIGHT, 1, 10000);

//         this.camera.position.set(0, 0, 150);

//         this.renderer = new THREE.WebGLRenderer({
//             // 在css 中设置背景透明色
//             alpha: true,
//             // 抗锯齿
//             antialias: true
//         })

//         // 设置背景色通雾化颜色
//         this.renderer.setClearColor(this.scene.fog.color);

//         this.renderer.setSize(this.WIDTH, this.HEIGHT);
//         // 开启阴影效果
//         this.renderer.shadowMap.enabled = true;

//         this.container.appendChild(this.renderer.domElement);

//         window.addEventListener('resize', this.handleWindowResize.bind(this), false);
//     }

//     /**
//      * 创建灯光
//      */
//     createLights() {
//         // 天空色， 地上颜色， 光源强度
//         this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
//         this.ambientLight = new THREE.AmbientLight(0xdc8874, 0.2);

//         this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
//         this.directionalLight.position.set(50, 50, 50);

//         this.directionalLight.castShadow = true;
//          // 定义可见域的投射阴影
//         this.directionalLight.shadow.camera.left = -400;
//         this.directionalLight.shadow.camera.right = 400;
//         this.directionalLight.shadow.camera.top = 400;
//         this.directionalLight.shadow.camera.bottom = -400;
//         this.directionalLight.shadow.camera.near = 1;
//         this.directionalLight.shadow.camera.far = 1000;

//         // 阴影分辨率， 越大性能越差
//         this.directionalLight.shadow.mapSize.set(2048, 2048);

//         this.scene.add(this.hemisphereLight);
//         this.scene.add(this.ambientLight);
//         this.scene.add(this.directionalLight);
//     }
//     /**
//      * 重新调整窗口大小
//      */
//     handleWindowResize(){
//         this.WIDTH = window.innerWidth;
//         this.HEIGHT = window.innerHeight;
//         this.renderer.setSize(this.WIDTH, this.HEIGHT);
//         this.camera.aspect = this.WIDTH / this.HEIGHT;
//         this.camera.updateProjectionMatrix();
//     }
    
//     /**
//      * 添加物体
//      */
//     addObjs() {
//         const ball = new THREE.SphereGeometry(30, 30, 30);

//         const box = new THREE.BoxGeometry(20, 27, 15, 15, 15, 15);
//         this.addParticles(ball, box);
//     }
//     addParticles(geometry1: THREE.SphereGeometry, geometry2: THREE.BoxGeometry) {
//         const geometry1Buffer = new THREE.BufferGeometry().fromGeometry(geometry1);
//         const geometry2Buffer = new THREE.BufferGeometry().fromGeometry(geometry2);
//         let [moreG, lessG] = geometry1Buffer.attributes.position.array.length > geometry2Buffer.attributes.position.array.length 
//                                 ? [geometry1Buffer, geometry2Buffer]
//                                 : [geometry2Buffer, geometry1Buffer]
//         let morePos = moreG.attributes.position.array;
//         let lessPos = lessG.attributes.position.array
//         let moreLength = morePos.length;
//         let lessLength = lessPos.length;

//         let position = new Float32Array(moreLength);
//         position.set(lessPos);
//         for (let i = lessLength, j = 0; i < moreLength ; i++ , j++) {
//             j %= lessLength;
//             position[i] = lessPos[j];
//             position[i + 1] = lessPos[j + 1];
//             position[i + 2] = lessPos[j + 2];
//         }

//         let sizes = new Float32Array(moreLength);
//         for (let index = 0; index < moreLength; index++) {
//             sizes[index] = 4;
//         }

//         moreG.addAttribute('size', new THREE.BufferAttribute(sizes, 1))
//         moreG.addAttribute('position2', new THREE.BufferAttribute(position, 3))

//         let uniforms = {
//             color: {
//                 type: 'v3',
//                 value: new THREE.Color(0xffffff)
//             },
//             texture: {
//                 value: this.getTexture()
//             },
//             val: {
//                 value: 1.0
//             }
//         }
//         const shaderMaterial = new THREE.ShaderMaterial({
//             uniforms,
//             vertexShader: `
//                 attribute float size;
//                 attribute vec3 position2;
//                 uniform float val;
//                 void main(){
//                     vec3 vPos;
//                     vPos.x = position2.x * val + position2.x * (1. - val);
//                     vPos.y = position2.y * val + position2.y * (1. - val);
//                     vPos.z = position2.z * val + position2.z * (1. - val);
//                     vec4 mvPosition = modelViewMatrix * vec4( vPos, 1.0 );
//                     gl_PointSize = size;
//                     gl_Position = projectionMatrix * mvPosition; 
//                 }
//             `,
//             fragmentShader: `
//                 uniform vec3 color;
//                 uniform sampler2D texture;
//                 void main(){
//                     gl_FragColor = vec4(color, 1.0);
//                     gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );
//                 }
//             `,
//             blending: THREE.AdditiveBlending,
//             depthTest: false,
//             transparent: true
//         })

                
        
//         const particleSystem = new THREE.Points(moreG, shaderMaterial);
//         let pos = {
//             val: 1
//         }
//         let tween = new TWEEN.Tween(pos).to({
//             val: 0
//         }, 1500).easing(TWEEN.Easing.Quadratic.InOut).delay(1000).onUpdate(callback);
//         let tweenBack = new TWEEN.Tween(pos).to({
//             val: 1
//         }, 1500).easing(TWEEN.Easing.Quadratic.InOut).delay(1000).onUpdate(callback);
//         tween.chain(tweenBack)
//         tween.start();

//         function callback(){
//             particleSystem.material.uniforms.val.value = this.val
//         }
//         this.scene.add(particleSystem);
//         this.particleSystem = particleSystem;
//     }
//     getTexture(canvasSize = 64) {
//         let canvas = document.createElement('canvas');
//         canvas.width = canvasSize;
//         canvas.height = canvasSize;
//         canvas.style.background = "transparent";
//         let context = canvas.getContext('2d');
//         let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.width / 8, canvas.width / 2, canvas.height / 2, canvas.width / 2);
//         gradient.addColorStop(0, '#fff');
//         gradient.addColorStop(1, 'transparent');
//         context.fillStyle = gradient;
//         context.beginPath();
//         context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2, true);
//         context.fill();
//         let texture = new THREE.Texture(canvas);
//         texture.needsUpdate = true;
//         return texture;
//     }
//     update(){
//         TWEEN.update();
//         let time = Date.now() * 0.005;

//         if (this.particleSystem) {
//             let  bufferObj  = <THREE.BufferGeometry> this.particleSystem.geometry;
//             // 粒子系统缓缓旋转
//             this.particleSystem.rotation.y = 0.01 * time;
//             let sizes = bufferObj.attributes.size.array;
//             let len = sizes.length;
//             for (let i = 0; i < len; i++) {
//                 sizes[i] = 1.5 * (2.0 + Math.sin(0.02 * i + time));
//             }
//             // 需指定属性需要被更新
//             bufferObj.attributes.size.needsUpdate = true;
//         }
    
//         this.renderer.render(this.scene, this.camera);

//         requestAnimationFrame(()=>{
//             this.update()
//         })
//     }
//     constructor(canvasEl?: HTMLElement){
//         this.container = canvasEl || document.body;
//         this.createScene();
//         this.createLights();
//         this.addObjs();
//         this.update()
//         this.orbitControls = new OrbitControls(this.camera);
//         this.orbitControls.autoRotate = true;
//     }
// }

// new ThreeDWorld()