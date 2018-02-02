import * as THREE from 'three';

class HTML3D {
  constructor(scene) {
    this.scene = scene;
    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.style.visibility = 'hidden';
    this.element.style.top = -1000;
    this.element.style.left = -1000;
    this.element.classList.add('html3D');

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

export default HTML3D;
