import * as THREE from "three";

export function createPerspectiveCamera(width, height) {
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
  camera.position.set(0, 0, 3.5);
  return camera;
}
