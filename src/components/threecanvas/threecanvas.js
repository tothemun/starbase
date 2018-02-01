import * as THREE from 'three';
import SkyBox from '../skybox/SkyBox';

const OrbitControls = require('three-orbit-controls')(THREE);

class ThreeCanvas {
  constructor(props) {
    if (props.el) {
      this.el = props.el;
      if (this.el) {
        this.initScene();
        this.init();
      }
    }
  }

  init() {
    const self = this.el;
    window.addEventListener('resize', () => this.onResize(), false);
  }

  initScene() {
    const self = this.el;
    const cw = self.clientWidth;
    const ch = self.clientHeight;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(cw, ch);
    self.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      cw / ch,
      1,
      1100
    );
    this.camera.target = new THREE.Vector3(0, 0, 0);

    this.renderer.setClearColor(0xdddddd, 1);
    this.skyBox = new SkyBox();
    this.scene.add(this.skyBox.mesh);

    this.controls = new OrbitControls(this.camera);
    this.controls.enablePan = true;
    this.controls.enableZoon = true;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.5;

    this.render();
  }

  onResize() {
    const self = this.el;
    const cw = self.clientWidth;
    const ch = self.clientHeight;

    this.camera.aspect = cw / ch;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(cw, ch);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());
  }
}

export default ThreeCanvas;
