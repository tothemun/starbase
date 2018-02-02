import * as THREE from 'three';

class TextLabel {
  constructor(label, scene) {
    this.scene = scene;
    this.element = document.createElement('div');
    this.element.className = 'text-label';
    this.element.style.position = 'absolute';
    this.element.style.width = 100;
    this.element.style.height = 100;
    this.element.innerHTML = label;
    this.element.style.top = -1000;
    this.element.style.left = -1000;

    this.boundObject = false;
    this.position = new THREE.Vector3(0, 0, 0);
  }

  setHTML(html) {
    this.element.innerHTML = html;
  }

  setBoundObject(object) {
    this.boundObject = object;
  }

  updatePosition() {
    if (this.boundObject) {
      this.position.copy(this.boundObject.position);
    }

    const coords2d = this.get2DCoords(this.position, this.scene.getObjectByName('camera'));

    this.element.style.left = `${coords2d.x}px`;
    this.element.style.top = `${coords2d.y}px`;
  }

  get2DCoords(position, camera) {
    const vector = position.project(camera);
    vector.x = ((vector.x + 1) / 2) * window.innerWidth;
    vector.y = (-(vector.y - 1) / 2) * window.innerHeight;

    return vector;
  }
}

export default TextLabel;
