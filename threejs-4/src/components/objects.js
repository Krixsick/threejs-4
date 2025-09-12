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

  // Create separate groups
  const objectsGroup = new THREE.Group();
  const starsGroup = new THREE.Group();

  // Meshes - Add to objectsGroup
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

  objectsGroup.add(mesh1, mesh2, mesh3);

  // Stars - Add to starsGroup
  const star_proximity = 10;
  const stars_parameters = {
    amount: 4000,
    size: 0.01,
  };
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(stars_parameters.amount * 3);

  for (let count = 0; count < stars_parameters.amount; count++) {
    const index = count * 3;
    positions[index] = (Math.random() * 2 - 1) * star_proximity; // X
    positions[index + 1] = (Math.random() * 2 - 1) * star_proximity; // Y
    positions[index + 2] = (Math.random() * 2 - 1) * star_proximity; // Z
  }

  const positionsAttribute = new THREE.BufferAttribute(positions, 3);
  geometry.setAttribute("position", positionsAttribute);
  const star_material = new THREE.PointsMaterial({
    size: stars_parameters.size,
    color: "white",
    sizeAttenuation: true,
  });
  const stars = new THREE.Points(geometry, star_material);
  starsGroup.add(stars);

  // Add both groups to main group
  background_group.add(objectsGroup, starsGroup);
  background_group.objectsGroup = objectsGroup;
  background_group.starsGroup = starsGroup;
  return background_group;
}
