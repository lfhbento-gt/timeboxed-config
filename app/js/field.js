import React from 'react';
import classnames from 'classnames';

class Field extends React.Component {
    render() {
        return (
            <div className={classnames('field', 'field--' + this.props.fieldName)}>
                <label>{this.props.label}</label>
                {this.props.children}
            </div>
        );
    }
}

Field.propTypes = {
    fieldName: React.PropTypes.string.isRequired,
    label: React.PropTypes.string
}

export default Field
