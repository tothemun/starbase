// components js
import Button from './components/button/Button';
import ThreeCanvas from './components/threecanvas/ThreeCanvas';

// promise & fetch polyfills
require('es6-promise').polyfill();
require('whatwg-fetch');

// baseline app styles
require('./app/fonts/fonts.css');
require('./app/app.css');

// components styles
require.context('./components/', true, /\.css$/);

// button component
const buttons = document.getElementsByClassName('button');
for (let i = 0; i < buttons.length; i++) {
  new Button({ el: buttons[i] });
}

const threeCanvases = document.getElementsByClassName('three-canvas');
for (let i = 0; i < threeCanvases.length; i++) {
  new ThreeCanvas({ el: threeCanvases[i] });
}
