import('./styles/main.scss');
import('mapbox-gl/dist/mapbox-gl.css');

import('./scripts').then(({ default: main }) => main());
