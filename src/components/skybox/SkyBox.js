import * as THREE from 'three';
import img from '../../static/images/360_img_01.jpg';

class SkyBox {
  constructor(props) {
    this.init();
  }

  init() {
    this.geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    // invert the geometry on the x-axis so that all of the faces point inward
    this.geometry.scale(-1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(img)
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
}

export default SkyBox;
