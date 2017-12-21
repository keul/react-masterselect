import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import MasterSelect from './MasterSelect';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import Select, { Option } from 'react-select';

Enzyme.configure({ adapter: new Adapter() });

it('MasterSelect renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MasterSelect id="foo" />, div);
});

describe('Simple usecases', () => {
  it('Simple master/slave behavior', () => {
    const wrapper = mount(
      <section>
        <MasterSelect
          id="master"
          options={[
            { value: '1', label: 'Value 1' },
            { value: '2', label: 'Value 2' }
          ]}
          slaves={[
            {
              id: 'slave',
              action: 'optionsChange',
              rules: {
                '2': ['1']
              }
            }
          ]}
        />
        <MasterSelect
          id="slave"
          options={[{ '1': 'Value 1' }, { '2': 'Value 2' }]}
        />
      </section>
    );

    const select = wrapper
      .find(MasterSelect)
      .first()
      .find(Select);

    select.find('input').simulate('change');

    expect(wrapper.find(Option).length).toBe(2);

    wrapper.find(Option).at(0).find('[role="option"]').simulate('mouseDown');

    console.log(wrapper.html());

    // wrapper
    //   .find(MasterSelect)
    //   .first()
    //   .find('Select')
    //   .find('input')
    //   .simulate('focus');

    // ReactDOM.render(node, div);
  });
});
