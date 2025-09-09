import * as THREE from "three";

export function createAmberLights(scene) {
  const ambient = new THREE.AmbientLight("white", 2);
  scene.add(ambient);
}

export function createDirectionalLight(scene) {
  const newDirectionalLight = new THREE.DirectionalLight("#ffffff", 3);
  newDirectionalLight.position.set(1, 1, 0);
  scene.add(newDirectionalLight);
}
