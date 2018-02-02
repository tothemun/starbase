import * as THREE from 'three';

class InterestPoint {
  constructor(x, y, z, scene) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.scene = scene;

    this.minSize = 0.5;
    this.maxSize = 1.5;
    this.scaleSpeed = 0.01;

    this.init();
  }

  init() {
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xFFC13B });
    this.mesh = new THREE.Mesh(geometry, material);

    this.scene.add(this.mesh);
    this.mesh.position.set(this.x, this.y, this.z);
  }

  render() {
    const currentScale = this.mesh.scale.x;

    if (currentScale >= this.maxSize || currentScale <= this.minSize) {
      this.scaleSpeed *= -1;
    }

    const newScale = currentScale + this.scaleSpeed;

    this.mesh.scale.set(newScale, newScale, newScale);
  }
}

export default InterestPoint;
