import React, { PropTypes } from 'react';
import classnames from 'classnames';

class Field extends React.Component {
    render() {
        return (
            <div className={classnames('field', 'field--' + this.props.fieldName)}>
                <label className='field--label'>{this.props.label}</label>
                <div className='field--content'><div className='field--content-inner'>{this.props.children}</div></div>
            </div>
        );
    }
}

Field.propTypes = {
    fieldName: PropTypes.string.isRequired,
    label: PropTypes.string
}

export default Field
