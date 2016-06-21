import React from 'react';
import Select from 'react-select';
import Field from './field';

class DropdownField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: (typeof props.selectedItem !== 'undefined' ? props.selectedItem : (props.clearable ? null : props.options[0].value))
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
        this.setState({selectedItem: value ? value.value : null});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({selectedItem: nextProps.selectedItem});
    }

    render() {
        return (
            <Field fieldName={this.props.fieldName} label={this.props.label} labelPosition={this.props.labelPosition}>
                <Select
                    className='dropdown'
                    options={this.props.options}
                    name={this.props.name}
                    value={this.state.selectedItem}
                    onChange={this.onChange}
                    searchable={this.props.searchable}
                    clearable={this.props.clearable}
                    placeholder={this.props.searchable ? 'Type to search...' : 'Select...'}
                    multi={false}/>
            </Field>
        )
    }
}

DropdownField.defaultProps = {
    searchable: false,
    clearable: false,
}

export default DropdownField;
