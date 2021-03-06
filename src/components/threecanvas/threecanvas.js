import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import Room from '../room/Room';
import room01 from '../../static/room_01.json';

class ThreeCanvas {
  constructor(props) {
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
    // self.addEventListener('click', event => this.onClick(event), false);
    this.isMouseDown = false;
    self.onmousedown = () => this.handleMouseDown();
    self.onmouseup = () => this.handleMouseUp();
    self.onmousemove = () => this.handleMouseMove();
  }

  handleMouseDown() {
    this.isMouseDown = true;
  }

  handleMouseUp() {
    this.isMouseDown = false;
  }

  handleMouseMove() {
    if (this.isMouseDown) {
      this.controls.autoRotate = false;
    }
  }

  initScene() {
    const self = this.el;
    console.log(self.clientWidth);
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
    this.camera.name = 'camera';
    this.scene.add(this.camera);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enablePan = true;
    this.controls.enableZoom = false;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.5;
    this.controls.target.set(0, 0, 0);

    this.room = new Room(room01, this.scene);
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
    console.log(intersects[0].point);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    this.room.render();
    this.controls.update();

    requestAnimationFrame(() => this.render());
  }
}

export default ThreeCanvas;
