import React from 'react';
import FastClick from 'react-fastclick-alt';
import Field from './field';
import classnames from 'classnames';

class RadioButtonGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedItem: (typeof props.selectedItem !== 'undefined' ? props.selectedItem : props.options['0'].value)};
    }

    render() {
        return (
            <Field fieldName={this.props.fieldName} label={this.props.label} labelPosition={this.props.labelPosition}>
                <FastClick><div className='btn-group'>
                    {
                        this.props.options.map((item, index) => {
                            let classes = {
                                'btn btn-primary-outline': true,
                                'active': this.state.selectedItem === item.value
                            };
                            if (this.props.size) {
                                classes[this.props.size] = true;
                            }
                            return (
                                <button
                                    key={item.value}
                                    className={classnames(classes)}
                                    onClick={this.toggleButton.bind(this, item.value)}>
                                    {item.label}
                                </button>
                            );
                        })
                    }
                </div></FastClick>
            </Field>
        );
    }

    toggleButton(index) {
        this.setState({selectedItem: index});
        if (this.props.onChange) {
            this.props.onChange(index);
        }
    }
}

export default RadioButtonGroup
