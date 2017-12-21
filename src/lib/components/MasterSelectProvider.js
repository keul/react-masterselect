import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MasterSelectProvider extends Component {

  static propTypes = {
    rules: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        slaves: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            action: PropTypes.string.isRequired,
            vocabRules: PropTypes.object
          })
        )
      })
    )
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default MasterSelectProvider;
