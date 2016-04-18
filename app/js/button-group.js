import React from 'react';
import Field from './field';
import { SelectableComponent } from './base-components';
import classnames from 'classnames';

class RadioButtonGroup extends SelectableComponent {
    render() {
        return (
            <Field fieldName={this.props.fieldName} label={this.props.label}>
                <div className='btn-group btn-group-justified' data-toggle='buttons'>
                    {
                        $.map(this.props.options, function(value, key) {
                            return (
                                <label key={key} className={classnames({
                                    'btn btn-primary': true,
                                    'active': this.state.selectedItem === key
                                })}>
                                    <input type='radio' className={classnames('radio--' + this.props.fieldName)} onChange={this.toggleButton.bind(this)} name={this.props.fieldName} value={key} checked={this.props.selectedItem === key ? 'checked' : 'false'}/>{value}
                                </label>
                            );
                        }.bind(this))
                    }
                </div>
            </Field>
        );
    }

    toggleButton(e) {
        this.setState({selectedItem: e.target.value});
    }
}

export default RadioButtonGroup
