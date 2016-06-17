import React from 'react';
import { SelectableComponent } from './base-components';
import Field from './field';

class DropdownField extends SelectableComponent {
    render() {
        return (
            <Field fieldName={this.props.fieldName} label={this.props.label}>
                <select className="form-control" name={this.props.fieldName} defaultValue={this.state.selectedItem}>
                    {
                        Object.keys(this.props.options).map((key) => {
                            return (
                                <option key={key} value={key}>{this.props.options[key]}</option>
                            );
                        })
                    }
                </select>
            </Field>
        )
    }
}

export default DropdownField;
