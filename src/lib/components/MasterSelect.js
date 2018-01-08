import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import isEqual from 'lodash/isEqual';

class MasterSelect extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    selects: PropTypes.object,
    options: PropTypes.arrayOf(PropTypes.object),
    slaves: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        action: PropTypes.string.isRequired,
        rules: PropTypes.object
      })
    )
  };

  static defaultProps = {
    options: [],
    selects: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      options: [...props.options]
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this._updateOptionsFromSlave = this._updateOptionsFromSlave.bind(this);
    this._updateOptionsFromMaster = this._updateOptionsFromMaster.bind(this);
  }

  // Check if this select is a slave of other selects
  _updateOptionsFromSlave(safe = false) {
    const { selects, id, options } = this.props;
    if (!safe) {
      this.setState({ options: [...options] });
    }
    Object.keys(selects)
      .filter(key => selects[key] && selects[key].props.slaves)
      .map(key => {
        const masterSelect = selects[key];
        const slavesConf = masterSelect.props.slaves;
        // find a master config that refers this component
        slavesConf.filter(conf => conf.id === id).map(conf => {
          let newOptions = [];
          Object.keys(conf.rules)
            .filter(key => key === masterSelect.value)
            .map(key => {
              newOptions = conf.rules[key];
            });
          if (newOptions.length > 0) {
            let nextOptions = [];
            // 1. find options already in the original options set
            options.map(option => {
              if (newOptions.includes(option.value)) {
                nextOptions.push(option);
              }
            });
            // 2. add any new options we manually added
            nextOptions = nextOptions.concat(
              newOptions.filter(opt => typeof opt !== 'string')
            );
            if (!isEqual(nextOptions, this.state.options)) {
              this.setState({ options: nextOptions });
            }
          }
        });
      });
  }

  // Check if this select is a master on other slaves's selects
  _updateOptionsFromMaster(value) {
    const { selects, slaves = [] } = this.props;
    Object.keys(selects).map(selectKey => {
      const select = selects[selectKey];
      if (!select) {
        return;
      }
      slaves.filter(slave => slave.id === select.props.id).map(slaveConf => {
        Object.keys(slaveConf.rules).map(key => {
          if (value && value.value === key) {
            const newOptions = slaveConf.rules[key];
            if (newOptions) {
              const nextOptions = [];
              select.props.options.map(option => {
                if (newOptions.includes(option.value)) {
                  nextOptions.push(option);
                }
              });
              // select.setState({ options: nextOptions });
              select.setState(state => {
                if (select.handleChange) {
                  select.handleChange(
                    select.state.options.find(o => o.value === select.value) ||
                      null
                  );
                  // select.handleChange.call(select, select.props.value);
                }
                return { options: nextOptions };
              });
            }
          }
        });
      });
    });
  }

  // wrapper around react-select onOpen, to update also available options
  handleOpen() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
    this._updateOptionsFromSlave();
  }

  handleChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    this._updateOptionsFromMaster(value);
  }

  get value() {
    const { value } = this.props;
    const validValue = this.state.options.reduce((v, opt) => {
      if (v) {
        return v;
      }
      if (opt.value === value) {
        return value;
      }
      return null;
    }, null);
    return validValue;
  }

  componentDidUpdate() {
    this._updateOptionsFromSlave(true);
  }

  render() {
    const { options, selects, onOpen, onChange, value, ...other } = this.props;
    return (
      <Select
        onOpen={this.handleOpen}
        onChange={this.handleChange}
        options={this.state.options}
        value={this.value}
        {...other}
      />
    );
  }
}

export default MasterSelect;
