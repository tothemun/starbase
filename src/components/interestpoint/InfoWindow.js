class InfoWindow {
  constructor(data) {
    this.createHTML(data);
    document.getElementById('htmlWrapper').appendChild(this.element);
  }

  createHTML(data) {
    const { body, headline, image } = data;

    this.element = document.createElement('div');
    this.element.style.visibility = 'hidden';
    this.element.className = 'infoWrapper';

    const imageElement = document.createElement('img');
    imageElement.className = 'infoImage';
    imageElement.src = image;
    this.element.appendChild(imageElement);

    const closeElement = document.createElement('a');
    closeElement.href = '#';
    closeElement.onclick = () => this.hide();
    closeElement.innerHTML = 'X';
    this.element.appendChild(closeElement);

    const content = document.createElement('div');
    content.className = 'infoContent';
    this.element.appendChild(content);

    const headerElement = document.createElement('h2');
    headerElement.innerHTML = headline;
    content.appendChild(headerElement);

    const bodyElement = document.createElement('p');
    bodyElement.innerHTML = body;
    content.appendChild(bodyElement);
  }

  show() {
    this.element.style.visibility = 'visible';
    this.element.classList.add('animateIn');
  }

  hide() {
    this.element.style.visibility = 'hidden';
    this.element.classList.remove('animateIn');
  }
}

export default InfoWindow;
