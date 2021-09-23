import React, {Component} from 'react';


class Alert extends Component {
   
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
export default Alert;