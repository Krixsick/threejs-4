import * as THREE from "three";
import "./style.css";
import { createPerspectiveCamera } from "./camera";
import { createAmberLights } from "./lights";
import { createBackground } from "./components/objects";
import { createDirectionalLight } from "./lights";
import gsap from "gsap";
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
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
let currentSection = 0;
let scrollY = 0;
// Create array of meshes for section-based animations
const sectionMeshes = meshes.objectsGroup.children; // [mesh1, mesh2, mesh3]

//Cursor
document.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / window.innerWidth;
  cursor.y = event.clientY / window.innerHeight;
});
// Scroll tracking with GSAP animations
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  const newSection = Math.round(scrollY / window.innerHeight);

  if (newSection != currentSection) {
    currentSection = newSection;
    console.log("changed to section:", currentSection);

    // Animate the current section's mesh (if it exists)
    if (sectionMeshes[currentSection]) {
      gsap.to(sectionMeshes[currentSection].rotation, {
        duration: 1.5,
        ease: "power2.inOut",
        x: "+=6", // Add 6 radians to current X rotation
        y: "+=3", // Add 3 radians to current Y rotation
      });
    }
  }
});

//Animation
const tick = () => {
  const elapsed_time = clock.getElapsedTime();

  // Rotate ONLY the objects, not the stars
  meshes.objectsGroup.children.forEach((child) => {
    child.rotation.x += 0.15 * (1 / 60); // Convert to per-frame instead of per-second
    child.rotation.y += 0.2 * (1 / 60); // to work better with GSAP
  });

  // Stars remain stationary (no rotation applied)

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
