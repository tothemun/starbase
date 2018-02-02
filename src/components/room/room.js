import * as THREE from 'three';
import SkyBox from '../skybox/SkyBox';
import InterestPoint from '../interestpoint/InterestPoint';

class Room {
  constructor(data, scene) {
    this.scene = scene;
    this.poi = [];
    this.initScene(data, scene);
    window.addEventListener('click', event => this.onClick(event), false);
  }

  initScene(data, scene) {
    this.skyBox = new SkyBox(scene, data.image);

    data.points.map((point) => {
      const {
        body,
        headline,
        image,
        label,
        x,
        y,
        z
      } = point;
      return this.poi.push(new InterestPoint(x, y, z, scene, {
        body,
        headline,
        image,
        label
      }));
    });
  }

  render() {
    this.poi.map(point => point.render());
  }

  onClick(event) {
    const rayCaster = new THREE.Raycaster();
    const mousePosition = new THREE.Vector3(
      ((event.clientX / window.innerWidth) * 2) - 1,
      (-(event.clientY / window.innerHeight) * 2) + 1,
      0.5
    );

    rayCaster.setFromCamera(mousePosition, this.scene.getObjectByName('camera'));

    this.poi.map((point) => {
      if (rayCaster.intersectObjects([point.mesh], true)[0]) {
        point.showInfoWindow();
        // Close all other windows
      }

      return null;
    });
  }
}

export default Room;
