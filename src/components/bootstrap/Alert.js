import React, {Component} from 'react';

import PropTypes from 'prop-types';
class Alert extends Component {
   constructor(props){
       super(props)
   }
    render(){
        return (
            <div className={'alert ' + this.props.theme + ' alert-dismissible fade show'} role="alert">
                <strong>{this.props.title}</strong> {this.props.message}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}

Component.propTypes = {
    a: PropTypes.any,
    r: PropTypes.array,
    o: PropTypes.object
  };
export default Alert;