import React from 'react';
import ReactDOM from 'react-dom';
import MasterSelect from './MasterSelect';

it('MasterSelect renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MasterSelect />, div);
});
