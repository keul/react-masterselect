import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
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
    class App extends Component {
      constructor(props) {
        super(props);
        this.msFields = {};
        this.state = {
          master: null,
          slave: null
        };
      }

      render() {
        return (
          <section>
            <MasterSelect
              id="master"
              value={this.state.master}
              options={[
                { value: '1', label: 'Value 1' },
                { value: '2', label: 'Value 2' }
              ]}
              onChange={selected => {
                this.setState({ master: selected ? selected.value : null });
              }}
              ref={select => {
                this.msFields.master = select;
              }}
              selects={this.msFields}
              slaves={[
                {
                  id: 'slave',
                  action: 'optionsChange',
                  rules: {
                    '2': ['3']
                  }
                }
              ]}
            />
            <MasterSelect
              id="slave"
              value={this.state.slave}
              options={[
                { value: '3', label: 'Value 3' },
                { value: '4', label: 'Value 4' }
              ]}
              onChange={selected => {
                this.setState({ slave: selected ? selected.value : null });
              }}
              ref={select => {
                this.msFields.slave = select;
              }}
              selects={this.msFields}
            />
          </section>
        );
      }
    }

    const wrapper = mount(<App />);

    const master = wrapper.find(MasterSelect).first();
    const masterSelect = master.find(Select);
    masterSelect.find('input').simulate('change');

    expect(wrapper.find(Option).length).toBe(2);

    wrapper
      .find(Option)
      .at(1)
      .find('[role="option"]')
      .simulate('mousedown');
    expect(masterSelect.prop('options').length).toBe(2);
    expect(masterSelect.instance().props.value).toBe('2');

    const slave = wrapper.find(MasterSelect).at(1);
    const slaveSelect = slave.find(Select);

    slaveSelect.find('input').simulate('change');

    expect(slaveSelect.prop('options').length).toBe(1);
    expect(slaveSelect.prop('options')[0].value).toBe('3');

  });

  it('Simple master/slave behavior adding new props', () => {
    class App extends Component {
      constructor(props) {
        super(props);
        this.msFields = {};
        this.state = {
          master: null,
          slave: null
        };
      }

      render() {
        return (
          <section>
            <MasterSelect
              id="master"
              value={this.state.master}
              options={[
                { value: '1', label: 'Value 1' },
                { value: '2', label: 'Value 2' }
              ]}
              onChange={selected => {
                this.setState({ master: selected ? selected.value : null });
              }}
              ref={select => {
                this.msFields.master = select;
              }}
              selects={this.msFields}
              slaves={[
                {
                  id: 'slave',
                  action: 'optionsChange',
                  rules: {
                    '2': ['3', { value: '5', label: 'Value 5' }]
                  }
                }
              ]}
            />
            <MasterSelect
              id="slave"
              value={this.state.slave}
              options={[
                { value: '3', label: 'Value 3' },
                { value: '4', label: 'Value 4' }
              ]}
              onChange={selected => {
                this.setState({ slave: selected ? selected.value : null });
              }}
              ref={select => {
                this.msFields.slave = select;
              }}
              selects={this.msFields}
            />
          </section>
        );
      }
    }

    const wrapper = mount(<App />);

    const master = wrapper.find(MasterSelect).first();
    const masterSelect = master.find(Select);
    masterSelect.find('input').simulate('change');

    expect(wrapper.find(Option).length).toBe(2);

    wrapper
      .find(Option)
      .at(1)
      .find('[role="option"]')
      .simulate('mousedown');
    expect(masterSelect.prop('options').length).toBe(2);
    expect(masterSelect.instance().props.value).toBe('2');

    const slave = wrapper.find(MasterSelect).at(1);
    const slaveSelect = slave.find(Select);

    slaveSelect.find('input').simulate('change');

    expect(slaveSelect.prop('options').length).toBe(2);
    expect(slaveSelect.prop('options')[0].value).toBe('3');
    expect(slaveSelect.prop('options')[1].value).toBe('5');

  });
});

describe('Controls two selects', () => {
  it('Will change values on two selects in one shot', () => {
    class App extends Component {
      constructor(props) {
        super(props);
        this.msFields = {};
        this.state = {
          master: null,
          slave: null
        };
      }

      render() {
        return (
          <section>
            <MasterSelect
              id="master"
              value={this.state.master}
              options={[
                { value: '1', label: 'Value 1' },
                { value: '2', label: 'Value 2' }
              ]}
              onChange={selected => {
                this.setState({ master: selected ? selected.value : null });
              }}
              ref={select => {
                this.msFields.master = select;
              }}
              selects={this.msFields}
              slaves={[
                {
                  id: 'slave1',
                  action: 'optionsChange',
                  rules: {
                    '2': ['3']
                  }
                },
                {
                  id: 'slave2',
                  action: 'optionsChange',
                  rules: {
                    '2': ['5', { value: '9', label: 'Value 9' }]
                  }
                }
              ]}
            />
            <MasterSelect
              id="slave1"
              value={this.state.slave1}
              options={[
                { value: '3', label: 'Value 3' },
                { value: '4', label: 'Value 4' }
              ]}
              onChange={selected => {
                this.setState({ slave1: selected ? selected.value : null });
              }}
              ref={select => {
                this.msFields.slave1 = select;
              }}
              selects={this.msFields}
            />
            <MasterSelect
              id="slave2"
              value={this.state.slave2}
              options={[
                { value: '5', label: 'Value 5' },
                { value: '6', label: 'Value 6' }
              ]}
              onChange={selected => {
                this.setState({ slave2: selected ? selected.value : null });
              }}
              ref={select => {
                this.msFields.slave2 = select;
              }}
              selects={this.msFields}
            />
          </section>
        );
      }
    }

    const wrapper = mount(<App />);

    const master = wrapper.find(MasterSelect).first();
    const masterSelect = master.find(Select);
    masterSelect.find('input').simulate('change');

    wrapper
      .find(Option)
      .at(1)
      .find('[role="option"]')
      .simulate('mousedown');

    expect(masterSelect.prop('options').length).toBe(2);
    expect(masterSelect.instance().props.value).toBe('2');

    const slave1 = wrapper.find(MasterSelect).at(1);
    const slaveSelect1 = slave1.find(Select);

    slaveSelect1.find('input').simulate('change');

    expect(slaveSelect1.prop('options').length).toBe(1);
    expect(slaveSelect1.prop('options')[0].value).toBe('3');

    const slave2 = wrapper.find(MasterSelect).at(2);
    const slaveSelect2 = slave2.find(Select);

    slaveSelect2.find('input').simulate('change');

    expect(slaveSelect2.prop('options').length).toBe(2);
    expect(slaveSelect2.prop('options')[0].value).toBe('5');
    expect(slaveSelect2.prop('options')[1].value).toBe('9');
  });
});

describe('Controls cascade', () => {
  class App extends Component {
    constructor(props) {
      super(props);
      this.msFields = {};
      this.state = {
        master: null,
        masterslave: null,
        slave: null
      };
    }

    render() {
      return (
        <section>
          <MasterSelect
            id="master"
            value={this.state.master}
            options={[
              { value: '1', label: 'Value 1' },
              { value: '2', label: 'Value 2' }
            ]}
            onChange={selected => {
              this.setState({ master: selected ? selected.value : null });
            }}
            ref={select => {
              this.msFields.master = select;
            }}
            selects={this.msFields}
            slaves={[
              {
                id: 'masterslave',
                action: 'optionsChange',
                rules: {
                  '2': ['4']
                }
              }
            ]}
          />
          <MasterSelect
            id="masterslave"
            value={this.state.masterslave}
            options={[
              { value: '3', label: 'Value 3' },
              { value: '4', label: 'Value 4' }
            ]}
            onChange={selected => {
              this.setState({ masterslave: selected ? selected.value : null });
            }}
            ref={select => {
              this.msFields.masterslave = select;
            }}
            selects={this.msFields}
            slaves={[
              {
                id: 'slave',
                action: 'optionsChange',
                rules: {
                  '3': ['6', { value: '7', label: 'Value 7' }]
                }
              }
            ]}
          />
          <MasterSelect
            id="slave"
            value={this.state.slave}
            options={[
              { value: '5', label: 'Value 5' },
              { value: '6', label: 'Value 6' }
            ]}
            onChange={selected => {
              this.setState({ slave: selected ? selected.value : null });
            }}
            ref={select => {
              this.msFields.slave = select;
            }}
            selects={this.msFields}
          />
        </section>
      );
    }
  }

  it('A select that is a slave, can normally be a master', () => {
    const wrapper = mount(<App />);
    const masterSlave = wrapper.find(MasterSelect).at(1);
    const masterSlaveSelect = masterSlave.find(Select);
    masterSlaveSelect.find('input').simulate('change');

    wrapper
      .find(Option)
      .at(0)
      .find('[role="option"]')
      .simulate('mousedown');

    expect(masterSlaveSelect.prop('options').length).toBe(2);
    expect(masterSlaveSelect.instance().props.value).toBe('3');

    const slave = wrapper.find(MasterSelect).at(2);
    const slaveSelect = slave.find(Select);
    slaveSelect.find('input').simulate('change');

    expect(slaveSelect.prop('options').length).toBe(2);
    expect(slaveSelect.prop('options')[0].value).toBe('6');
    expect(slaveSelect.prop('options')[1].value).toBe('7');
  });

  it('A master select can trigger cascade changes to options if the slave is a master itself', () => {
    const wrapper = mount(<App />);
    let masterSlave = wrapper.find(MasterSelect).at(1);
    let masterSlaveSelect = masterSlave.find(Select);

    // Same case as above...
    masterSlaveSelect.find('input').simulate('change');
    wrapper
      .find(Option)
      .at(0)
      .find('[role="option"]')
      .simulate('mousedown');
    expect(masterSlaveSelect.instance().props.value).toBe('3');

    let slave = wrapper.find(MasterSelect).at(2);
    let slaveSelect = slave.find(Select);
    slaveSelect.find('input').simulate('change');
    slaveSelect.find('input').simulate('blur');

    expect(slaveSelect.prop('options').length).toBe(2);
    expect(slaveSelect.prop('options')[0].value).toBe('6');
    expect(slaveSelect.prop('options')[1].value).toBe('7');

    // If we change options on masterslave through a change in the master,
    // options in the slave should change too

    const master = wrapper.find(MasterSelect).at(0);
    const masterSelect = master.find(Select);

    masterSelect.find('input').simulate('change');
    wrapper
      .find(Option)
      .at(1)
      .find('[role="option"]')
      .simulate('mousedown');
    masterSelect.find('input').simulate('blur');

    expect(masterSelect.instance().props.value).toBe('2');
    masterSlave = wrapper.find(MasterSelect).at(1);
    masterSlaveSelect = masterSlave.find(Select);
    expect(masterSlaveSelect.instance().props.value).toBeNull();

    slave = wrapper.find(MasterSelect).at(2);
    slaveSelect = slave.find(Select);

    slaveSelect.find('input').simulate('change');
    // slaveSelect.find('input').simulate('blur');

    slave = wrapper.find(MasterSelect).at(2);
    slaveSelect = slave.find(Select);

    expect(slaveSelect.prop('options').length).toBe(2);
    expect(slaveSelect.prop('options')[0].value).toBe('5');
    expect(slaveSelect.prop('options')[1].value).toBe('6');
  });
});
