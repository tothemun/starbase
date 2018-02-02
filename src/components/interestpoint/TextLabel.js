import * as THREE from 'three';
import HTML3D from '../html3d/HTML3D';

class TextLabel extends HTML3D {
  constructor(label, scene) {
    super(scene);
    this.element.className = 'textLabel';
    this.element.innerHTML = label;
  }
}

export default TextLabel;
