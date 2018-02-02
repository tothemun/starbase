import * as THREE from 'three';

class SkyBox {
  constructor(scene, img) {
    this.init(scene, img);
  }

  init(scene, img) {
    const geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(img)
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.name = 'skybox';

    scene.add(this.mesh);
  }

  setImage(newImage) {
    this.mesh.material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(newImage)
    });
  }
}

export default SkyBox;
