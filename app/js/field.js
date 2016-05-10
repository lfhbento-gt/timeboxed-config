import React from 'react';
import classnames from 'classnames';

class Field extends React.Component {
    render() {
        return (
            <div className={classnames('field', 'field--' + this.props.fieldName)}>
                <label className='field--label'>{this.props.label}</label>
                <div className='field--content'>{this.props.children}</div>
            </div>
        );
    }
}

Field.propTypes = {
    fieldName: React.PropTypes.string.isRequired,
    label: React.PropTypes.string
}

export default Field
