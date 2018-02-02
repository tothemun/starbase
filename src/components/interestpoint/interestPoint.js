import * as THREE from 'three';
import TextLabel from './TextLabel';
import InfoWindow from './InfoWindow';
import img from '../../static/images/starbase.png';

class InterestPoint {
  constructor(x, y, z, scene, data) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.scene = scene;

    this.minSize = 0.5;
    this.maxSize = 1.5;
    this.scaleSpeed = 0.01;

    this.init(data);
  }

  init(data) {
    const {
      body,
      headline,
      label,
      image
    } = data;

    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xFFC13B });
    this.mesh = new THREE.Mesh(geometry, material);

    this.label = new TextLabel(label, this.scene);
    this.label.setBoundObject(this.mesh);

    this.infoWindow = new InfoWindow({
      body,
      headline,
      image
    });

    this.scene.add(this.mesh);
    this.mesh.position.set(this.x, this.y, this.z);

    window.addEventListener('click', event => this.onClick(event), false);
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

    this.label.updatePosition();

    const newScale = currentScale + this.scaleSpeed;

    this.mesh.scale.set(newScale, newScale, newScale);
  }

  onClick(event) {
    const mousePosition = new THREE.Vector3(
      ((event.clientX / window.innerWidth) * 2) - 1,
      (-(event.clientY / window.innerHeight) * 2) + 1,
      0.5
    );

    const rayCaster = new THREE.Raycaster();
    rayCaster.setFromCamera(mousePosition, this.scene.getObjectByName('camera'));
    const intersects = rayCaster.intersectObjects([this.mesh], true);

    if (intersects[0]) {
      this.infoWindow.show();
    }
  }
}

export default InterestPoint;
