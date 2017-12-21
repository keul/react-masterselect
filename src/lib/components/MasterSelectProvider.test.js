import React from 'react';
import ReactDOM from 'react-dom';
import MasterSelectProvider from './MasterSelectProvider';

it('MasterSelectProvider renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MasterSelectProvider />, div);
});
