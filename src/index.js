import(/* webpackPrefetch: true */'./styles/main.scss');
import(/* webpackPrefetch: true */'mapbox-gl/dist/mapbox-gl.css');

import(/* webpackPreload: true */'./scripts')
  .then(({ default: main }) => main());
