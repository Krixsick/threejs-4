import * as THREE from "three";
import gradientImage from "../assets/3.jpg";
export function createBackground() {
  const background_group = new THREE.Group();
  const textureLoader = new THREE.TextureLoader();
  const gradientTexture = textureLoader.load(gradientImage);

  gradientTexture.magFilter = THREE.NearestFilter;
  // Material
  const material = new THREE.MeshToonMaterial({
    color: "#ffeded",
    gradientMap: gradientTexture,
  });

  // Meshes
  const objectsDistance = 5;
  const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
  );
  mesh1.position.y = -objectsDistance * 0;
  mesh1.position.x = 1.75;
  const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);
  mesh2.position.x = -1.55;
  mesh2.position.y = -objectsDistance * 1;
  const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
  );
  mesh3.position.x = 1.75;
  mesh3.position.y = -objectsDistance * 2;

  background_group.add(mesh1, mesh2, mesh3);

  return background_group;
}
