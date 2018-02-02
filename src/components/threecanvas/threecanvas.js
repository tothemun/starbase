import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import SkyBox from '../skybox/SkyBox';
import InterestPoint from '../interestpoint/InterestPoint';
import img from '../../static/images/360_img_01.jpg';

class ThreeCanvas {
  constructor(props) {
    this.poi = [];

    if (props.el) {
      this.el = props.el;
      if (this.el) {
        this.initScene();
        this.initListeners();
      }
    }
  }

  initListeners() {
    const self = this.el;
    window.addEventListener('resize', () => this.onResize(), false);
    self.addEventListener('click', event => this.onClick(event), false);
  }

  initScene() {
    const self = this.el;
    const cw = self.clientWidth;
    const ch = self.clientHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(cw, ch);
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setClearColor(0xdddddd, 1);
    self.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, cw / ch, 1, 1100);
    this.camera.position.set(0, 0, 1);

    this.skyBox = new SkyBox(this.scene, img);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enablePan = true;
    this.controls.enableZoom = false;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 1.5;
    this.controls.center.set(0, 0, 0);

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

  onClick(event) {
    const mousePosition = new THREE.Vector3(
      ((event.clientX / window.innerWidth) * 2) - 1,
      (-(event.clientY / window.innerHeight) * 2) + 1,
      0.5
    );

    const rayCaster = new THREE.Raycaster();
    rayCaster.setFromCamera(mousePosition, this.camera);
    const intersects = rayCaster.intersectObjects([this.scene.getObjectByName('skybox')], true);
    const { x, y, z } = intersects[0].point;
    this.poi.push(new InterestPoint(x, y, z, this.scene));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    this.poi.map(point => point.render());

    requestAnimationFrame(() => this.render());
  }
}

export default ThreeCanvas;
