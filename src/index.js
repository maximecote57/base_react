console.log(' --- App Started --- ');

import React from 'react';
import ReactDOM from 'react-dom';

const title = 'My Minimal React Webpack Babelall';

ReactDOM.render(
<div>{title}</div>,
    document.getElementById('app')
);

module.hot.accept();