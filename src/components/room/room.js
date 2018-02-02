import SkyBox from '../skybox/SkyBox';
import InterestPoint from '../interestpoint/InterestPoint';

class Room {
  constructor(data, scene) {
    this.poi = [];
    this.initScene(data, scene);
  }

  initScene(data, scene) {
    this.skyBox = new SkyBox(scene, data.image);

    data.points.map((point) => {
      const {
        label,
        x,
        y,
        z
      } = point;
      return this.poi.push(new InterestPoint(label, x, y, z, scene));
    });
  }

  render() {
    this.poi.map(point => point.render());
  }
}

export default Room;
