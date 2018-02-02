import HTML3D from '../html3d/HTML3D';

class InfoWindow extends HTML3D {
  constructor(data, scene) {
    super(scene);
    this.setChild(this.createHTML(data));
  }

  createHTML(data) {
    const { body, headline, image } = data;

    const wrapper = document.createElement('div');
    wrapper.className = 'infoWrapper';

    const imageElement = document.createElement('img');
    imageElement.className = 'infoImage';
    imageElement.src = image;
    wrapper.appendChild(imageElement);

    const content = document.createElement('div');
    content.className = 'infoContent';
    wrapper.appendChild(content);

    const headerElement = document.createElement('h2');
    headerElement.innerHTML = headline;
    content.appendChild(headerElement);

    const bodyElement = document.createElement('p');
    bodyElement.innerHTML = body;
    content.appendChild(bodyElement);

    return wrapper;
  }
}

export default InfoWindow;
