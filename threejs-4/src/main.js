import * as THREE from "three";
import "./style.css";
import { createPerspectiveCamera } from "./camera";
import { createAmberLights } from "./lights";
import { createBackground } from "./components/objects";
import { createDirectionalLight } from "./lights";
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const camera = createPerspectiveCamera(window.innerWidth, window.innerHeight);
cameraGroup.add(camera);
const clock = new THREE.Clock();
createDirectionalLight(scene);
const meshes = createBackground();
scene.add(meshes);

const cursor = {
  x: 0,
  y: 0,
};
//Cursor
document.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / window.innerWidth;
  cursor.y = event.clientY / window.innerHeight;
});

//Animation
const tick = () => {
  const elapsed_time = clock.getElapsedTime();
  meshes.children.forEach((child) => {
    child.rotation.x = elapsed_time * 0.15;
    child.rotation.y = elapsed_time * 0.2;
  });
  //Camera Scroll
  camera.position.y = (-window.scrollY / window.innerHeight) * 5;
  //Cursor Parallax
  const lerpFactor = 0.05;
  cameraGroup.position.x += (cursor.x - cameraGroup.position.x) * lerpFactor;
  cameraGroup.position.y += (cursor.y - cameraGroup.position.y) * lerpFactor;
  //Renderer
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
