import * as THREE from 'three';
import TextLabel from './TextLabel';

class InterestPoint {
  constructor(label, x, y, z, scene) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.label = label;
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

    this.label = new TextLabel(this.label, this.scene);
    this.label.setBoundObject(this.mesh);
    document.getElementById('labelWrapper').appendChild(this.label.element);

    this.scene.add(this.mesh);
    this.mesh.position.set(this.x, this.y, this.z);
  }

  render() {
    const currentScale = this.mesh.scale.x;
    const camera = this.scene.getObjectByName('camera');
    const { projectionMatrix, matrixWorldInverse } = camera;
    const frustum = new THREE.Frustum();
    const matrix4 = new THREE.Matrix4();
    const multiMatrix = matrix4.multiplyMatrices(projectionMatrix, matrixWorldInverse);
    frustum.setFromMatrix(multiMatrix);

    if (currentScale >= this.maxSize || currentScale <= this.minSize) {
      this.scaleSpeed *= -1;
    }

    if (frustum.containsPoint(this.mesh.position)) {
      this.label.show();
    } else {
      this.label.hide();
    }

    this.renderLabel();


    const newScale = currentScale + this.scaleSpeed;

    this.mesh.scale.set(newScale, newScale, newScale);
  }

  renderLabel() {
    this.label.updatePosition();
  }
}

export default InterestPoint;
