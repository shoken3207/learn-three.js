import "./style.css";
import * as THREE from "three";
import { SphereGeometry } from "three";
import GLTFLoader from "three-gltf-loader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

let scene, camera, renderer, controls;
scene = new THREE.Scene();

renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(
  100,
  innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.set(0, 0, 500);

controls = new OrbitControls(camera, renderer.domElement);
const textureLoader = new THREE.TextureLoader();
//テキスチャを追加してみよう
const textures = [
  textureLoader.load("./images/2023_0729_18384400.jpg"),
  textureLoader.load("./images/2023_0729_18384700.jpg"),
  textureLoader.load("./images/2023_0729_18385800.jpg"),
  textureLoader.load("./images/2023_0729_18402400.jpg"),
  textureLoader.load("./images/2023_0729_18410200.jpg"),
];
let texture = textureLoader.load("./images/lemon-4446934_1280.jpg");
let texture2 = textureLoader.load("./textures/earth.jpg");
const video = document.createElement("video");
video.src = "./public/video/7687_640x360.mp4";
video.load();
// video.controls = true;
video.loop = true;
video.autoplay = true;

// VideoTextureの設定
const videoTexture = new THREE.VideoTexture(video);
const geometry = new THREE.PlaneGeometry(240, 180);
const geometry2 = new THREE.PlaneGeometry(240, 180);
const geometry3 = new THREE.PlaneGeometry(600, 400);
const displayGeometry = new THREE.BoxGeometry(610, 408, 5);
const displayMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });
const display = new THREE.Mesh(displayGeometry, displayMaterial);
const material = new THREE.MeshBasicMaterial({
  map: videoTexture,
});
const material2 = new THREE.MeshBasicMaterial({
  map: texture,
});
const material3 = new THREE.MeshBasicMaterial({
  map: texture2,
});
const plane = new THREE.Mesh(geometry, material);
const plane2 = new THREE.Mesh(geometry2, material2);
plane2.position.set(300, 0, 0);

const boxGeometry = new THREE.BoxGeometry(150, 150, 150);
const cube = new THREE.Mesh(boxGeometry, material2);
cube.position.set(0, 200, 0);

const sphereGeometry = new THREE.SphereGeometry(100, 64, 64);
const sphere = new THREE.Mesh(sphereGeometry, material3);
sphere.position.set(300, 200, 0);

let currentIndex = 0;
const material4 = new THREE.MeshBasicMaterial({ map: textures[currentIndex] });
const screen = new THREE.Mesh(geometry3, material4);
screen.position.z = 5.1;
display.add(screen);
display.position.set(0, 0, 0);
scene.add(display);
const changeSlide = () => {
  currentIndex = (currentIndex + 1) % textures.length;
  screen.material.map = textures[currentIndex];
};
setInterval(changeSlide, 600);

scene.add(plane);
scene.add(plane2);
scene.add(cube);
scene.add(sphere);
scene.fog = new THREE.Fog(0x000000, 50, 2000);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// 5. GLTFLoaderを作成する
// const loader = new GLTFLoader();

// const dracoLoader = new DRACOLoader(); // DRACOLoaderのインスタンスを作成
// dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/');
// loader.setDRACOLoader(dracoLoader); // GLTFLoaderにDRACOLoaderのインスタンスを提供

// // 6. 3Dモデルのロード＆描画
// loader.load(
//     "path/to/model.gltf",
//     function (gltf) {
//         scene.add(gltf.scene);
//     },
//     undefined,
//     function (error) {
//         console.error(error);
//     }
// );

window.addEventListener("resize", onWindowResize);

animate();

ブラウザのリサイズに対応させよう;
function onWindowResize() {
  //レンダラーのサイズを随時更新
  renderer.setSize(window.innerWidth, window.innerHeight);

  //カメラのアスペクト比を正す
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function animate() {
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}
