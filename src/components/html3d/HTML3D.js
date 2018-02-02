import * as THREE from 'three';

class HTML3D {
  constructor(scene) {
    this.scene = scene;
    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.style.visibility = 'hidden';

    this.boundObject = false;
    this.position = new THREE.Vector3(0, 0, 0);
  }

  setHTML(html) {
    this.element.innerHTML = html;
  }

  setChild(element) {
    this.element.appendChild(element);
  }

  setBoundObject(object) {
    this.boundObject = object;
  }

  hide() {
    this.element.style.visibility = 'hidden';
    this.element.classList.remove('animateIn');
  }

  show() {
    this.element.style.visibility = 'visible';
    this.element.classList.add('animateIn');
  }

  updatePosition() {
    if (this.boundObject) {
      this.position.copy(this.boundObject.position);
    }

    const coords2d = this.get2DCoords(this.position, this.scene.getObjectByName('camera'));

    this.element.style.transform = `translate(${coords2d.x}px, ${coords2d.y}px)`;
  }

  get2DCoords(position, camera) {
    const threeCanvas = document.getElementsByClassName('three-canvas')[0];
    const vector = position.project(camera);

    vector.x = ((vector.x + 1) / 2) * threeCanvas.clientWidth;
    vector.y = (-(vector.y - 1) / 2) * threeCanvas.clientHeight;

    return vector;
  }
}

export default HTML3D;
