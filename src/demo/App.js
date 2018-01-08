import React, { Component } from 'react';
import MasterSelect from '../lib';

import 'react-select/scss/default.scss';

const options_ms1 = [
  {
    value: 'm1',
    label: 'Blue...'
  },
  {
    value: 'm2',
    label: 'Brown'
  }
];

const options_ms2 = [
  {
    value: 's1',
    label: 'Light blue'
  },
  {
    value: 's2',
    label: 'Yellow'
  },
  {
    value: 's3',
    label: 'Dark blue'
  }
];

const options_ms3 = [
  {
    value: 's1',
    label: 'White'
  },
  {
    value: 's2',
    label: 'Cornflower blue'
  },
  {
    value: 's3',
    label: 'Dodger blue'
  }
];

const options_ms4 = [
  {
    value: 'ms1',
    label: 'Light blue'
  },
  {
    value: 'ms2',
    label: 'Yellow...'
  },
  {
    value: 'ms3',
    label: 'Dark blue'
  }
];

const options_ms5 = [
  {
    value: 's1',
    label: 'Gold'
  },
  {
    value: 's2',
    label: 'Red'
  },
  {
    value: 's3',
    label: 'Green yellow'
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.msFields = {};
    this.state = {
      foo: null,
      master1: null,
      slave1: null
    };
  }

  render() {
    return (
      <article>
        <div className="grid-x grid-margin-x">
          <div className="small-12 cell">
            <h2 className="subheader">Useless usage</h2>
            <p>
              It can work as a normal react-select <code>Select</code> instance
              if you don't provide any special props.
            </p>
          </div>
          <div className="small-12 cell">
            <MasterSelect
              id="foo"
              options={options_ms1}
              value={this.state.foo}
              onChange={selected => {
                this.setState({ foo: selected ? selected.value : null });
              }}
            />
          </div>
        </div>
        <hr />
        <div className="grid-x grid-margin-x">
          <div className="small-12 cell">
            <h2 className="subheader">Simple usage</h2>
            <p>
              When selecting the <em>blue</em> value on the left only blue-like
              values on the right are show.
            </p>
          </div>
          <div className="medium-6 small-12 cell">
            <MasterSelect
              id="master1"
              options={options_ms1}
              value={this.state.master1}
              onChange={selected => {
                this.setState({ master1: selected ? selected.value : null });
              }}
              ref={select => {
                this.msFields.master1 = select;
              }}
              selects={this.msFields}
              slaves={[
                {
                  id: 'slave1',
                  action: 'optionsChange',
                  rules: {
                    m1: ['s1', 's3']
                  }
                },
                {
                  id: 'unknow_slave',
                  action: 'optionsChange',
                  rules: {
                    m1: ['foo', 'bar']
                  }
                }
              ]}
            />
          </div>
          <div className="medium-6 small-12 cell">
            <MasterSelect
              id="slave1"
              options={options_ms2}
              value={this.state.slave1}
              onChange={selected => {
                this.setState({ slave1: selected ? selected.value : null });
              }}
              ref={select => {
                this.msFields.slave1 = select;
              }}
              selects={this.msFields}
            />
          </div>
        </div>
        <div className="grid-x grid-margin-x">
          <div className="small-12 cell">
            <p>
              Same as above, but we are adding some new blue-like initially not
              present in the right-select options
            </p>
          </div>
          <div className="medium-6 small-12 cell">
            <MasterSelect
              id="master1_1"
              options={options_ms1}
              value={this.state.master1_1}
              onChange={selected => {
                this.setState({ master1_1: selected ? selected.value : null });
              }}
              ref={select => {
                this.msFields.master1_1 = select;
              }}
              selects={this.msFields}
              slaves={[
                {
                  id: 'slave1_1',
                  action: 'optionsChange',
                  rules: {
                    m1: [
                      's1',
                      's3',
                      { value: 'n1', label: 'Dodger blue (new color)' },
                      {
                        value: 'n2',
                        label: "Deep sky blue (that's disabled)",
                        disabled: true
                      }
                    ]
                  }
                }
              ]}
            />
          </div>
          <div className="medium-6 small-12 cell">
            <MasterSelect
              id="slave1_1"
              options={options_ms2}
              value={this.state.slave1_1}
              onChange={selected => {
                this.setState({ slave1_1: selected ? selected.value : null });
              }}
              ref={select => {
                this.msFields.slave1_1 = select;
              }}
              selects={this.msFields}
            />
          </div>
        </div>
        <hr />
        <div className="grid-x grid-margin-x">
          <div className="small-12 cell">
            <h2 className="subheader">One master, two slaves</h2>
            <p>
              When selecting the <em>blue</em> value on the left we are changing
              options on both selects on the right.
            </p>
          </div>
          <div className="medium-6 small-12 cell">
            <MasterSelect
              id="master2"
              options={options_ms1}
              value={this.state.master2}
              onChange={selected => {
                this.setState({ master2: selected ? selected.value : null });
              }}
              ref={select => {
                this.msFields.master2 = select;
              }}
              selects={this.msFields}
              slaves={[
                {
                  id: 'slave2',
                  action: 'optionsChange',
                  rules: {
                    m1: ['s1', 's3']
                  }
                },
                {
                  id: 'slave3',
                  action: 'optionsChange',
                  rules: {
                    m1: ['s2', 's3']
                  }
                }
              ]}
            />
          </div>
          <div className="medium-6 small-12 cell">
            <MasterSelect
              id="slave2"
              options={options_ms2}
              value={this.state.slave2}
              onChange={selected => {
                this.setState({ slave2: selected ? selected.value : null });
              }}
              ref={select => {
                this.msFields.slave2 = select;
              }}
              selects={this.msFields}
            />
            <MasterSelect
              id="slave3"
              options={options_ms3}
              value={this.state.slave3}
              onChange={selected => {
                this.setState({ slave3: selected ? selected.value : null });
              }}
              ref={select => {
                this.msFields.slave3 = select;
              }}
              selects={this.msFields}
            />
          </div>
        </div>
        <hr />
        <div className="grid-x grid-margin-x">
          <div className="small-12 cell">
            <h2 className="subheader">Both master and slave</h2>
            <p>
              When selecting the <em>blue</em> value on the left we are limiting
              options on the middle select to only blue-like values, but the
              middle select value <em>yellow</em> is also controlling the right
              select, limiting values to yellowish. So: the middle ones is both
              a master and a slave.
            </p>
          </div>
          <div className="medium-4 small-12 cell">
            <MasterSelect
              id="master3"
              options={options_ms1}
              value={this.state.master3}
              onChange={selected => {
                this.setState({ master3: selected ? selected.value : null });
              }}
              ref={select => {
                this.msFields.master3 = select;
              }}
              selects={this.msFields}
              slaves={[
                {
                  id: 'masterslave1',
                  action: 'optionsChange',
                  rules: {
                    m1: ['ms1', 'ms3']
                  }
                }
              ]}
            />
          </div>
          <div className="medium-4 small-12 cell">
            <MasterSelect
              id="masterslave1"
              options={options_ms4}
              value={this.state.masterslave1}
              onChange={selected => {
                this.setState({
                  masterslave1: selected ? selected.value : null
                });
              }}
              ref={select => {
                this.msFields.masterslave1 = select;
              }}
              selects={this.msFields}
              slaves={[
                {
                  id: 'slave4',
                  action: 'optionsChange',
                  rules: {
                    ms2: ['s1', 's3']
                  }
                }
              ]}
            />
          </div>
          <div className="medium-4 small-12 cell">
            <MasterSelect
              id="slave4"
              options={options_ms5}
              value={this.state.slave4}
              onChange={selected => {
                this.setState({ slave4: selected ? selected.value : null });
              }}
              ref={select => {
                this.msFields.slave4 = select;
              }}
              selects={this.msFields}
            />
          </div>
        </div>
        <hr />
      </article>
    );
  }
}

export default App;
