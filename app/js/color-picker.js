import React, { PropTypes, Component } from 'react';
import Field from './field';
import Swatches from './swatches';


class ColorPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: props.color,
            panelVisible: false,
        };
        this.onColorChange = this.onColorChange.bind(this);
        this.showPanel = this.showPanel.bind(this);
        this.togglePanel = this.togglePanel.bind(this);
        this.hidePanel = this.hidePanel.bind(this);

    }

    onColorChange(color) {
        this.setState({color: color});
        if (this.props.onColorChange) {
            this.props.onColorChange(color);
        }
        this.hidePanel();
    }

    showPanel() {
        this.setState({panelVisible: true});
    }

    hidePanel() {
        this.setState({panelVisible: false});
    }

    togglePanel() {
        this.setState({panelVisible: !this.state.panelVisible});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.panelVisible !== nextState.panelVisible || this.state.color !== nextState.color || this.state.sunny != nextState.sunny;
    }

    render() {
        return (
            <div className='color-picker'>
                <Field fieldName={this.props.fieldName} label={this.props.label} longLabel={true}>
                    <div className='swatch' onClick={this.togglePanel}>
                        <div className='swatch--color' style={{backgroundColor: this.state.color}}></div>
                    </div>
                </Field>
                {this.state.panelVisible ?
                    <div className='color-panel'>
                        <Swatches onColorChange={this.onColorChange} />
                        <div className='color-panel--shim' onClick={this.hidePanel}></div>
                    </div>
                : null}
            </div>
        );
    }
}

ColorPicker.propTypes = {
    
}

ColorPicker.defaultProps = {
    
}

export default ColorPicker
