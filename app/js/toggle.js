import React from 'react';
import Field from './field';
import classnames from 'classnames';
import bootstrapToggle from 'bootstrap-toggle';

class ToggleField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {checked: !!props.checked};
    }

    render() {
        return (
            <Field label={this.props.label} fieldName={this.props.fieldName}>
                <label className='checkbox-inline'>
                    <input type='checkbox' className={classnames('toggle--' + this.props.fieldName)} value='on' onChange={this.toggleCheckbox.bind(this)} name={this.props.fieldName} checked={this.state.checked} data-toggle='toggle'/>
                </label>
            </Field>
        )
    }

    toggleCheckbox(e) {
        this.setState({checked: !!e.target.checked});
    }
}

ToggleField.propTypes = {
    checked: React.PropTypes.bool,
    fieldName: React.PropTypes.string.isRequired,
    label: React.PropTypes.string
}

ToggleField.defaultProps = {
    checked: false
}

export default ToggleField
