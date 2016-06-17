import React, { PropTypes, Component } from 'react';
import Field from './field';
import RadioButtonGroup from './button-group';
import { SwatchesPicker } from 'react-color';


class ColorPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: props.color,
            panelVisible: false,
            sunny: false,
        };
        this.onColorChange = this.onColorChange.bind(this);
        this.showPanel = this.showPanel.bind(this);
        this.togglePanel = this.togglePanel.bind(this);
        this.hidePanel = this.hidePanel.bind(this);
        this.onColorTypeChange = this.onColorTypeChange.bind(this);

        this.colors = [
            ['#55ffaa','#aaffff','#55ffff','#55aaff'],
            ['#aaffaa','#00ff55','#00ffaa','#55aaaa','#00ffff','#0055ff','#5555aa'],
            ['#55ff00','#55ff55','#00aa00','#00aa55','#00aaaa','#00aaff','#0000ff','#5555ff'],
            ['#aaff55','#00ff00','#55aa00','#55aa55','#005555','#0055aa','#0000aa','#5500ff','#aaaaff'],
            ['#aaff00','#aaaa55','#005500','#ffffff','#aaaaaa','#000055','#5500aa','#aa55ff'],
            ['#ffff55','#ffff00','#aaaa00','#555500','#000000','#555555','#550055','#aa00ff','#aa55aa'],
            ['#ffffaa','#ffaa55','#ffaa00','#aa5500','#aa5555','#550000','#aa00aa','#ff00ff'],
            ['#ffaaaa','#ff5500','#ff0000','#aa0000','#aa0055','#ff00aa','#ff55ff'],
            ['#ff5555','#ff0055','#ff55aa','#ffaaff']
        ];
        this.sunlightColorMap = {
            '#000000': '#000000', '#000055': '#001e41', '#0000aa': '#004387', '#0000ff': '#0068ca',
            '#005500': '#2b4a2c', '#005555': '#27514f', '#0055aa': '#16638d', '#0055ff': '#007dce',
            '#00aa00': '#5e9860', '#00aa55': '#5c9b72', '#00aaaa': '#57a5a2', '#00aaff': '#4cb4db',
            '#00ff00': '#8ee391', '#00ff55': '#8ee69e', '#00ffaa': '#8aebc0', '#00ffff': '#84f5f1',
            '#550000': '#4a161b', '#550055': '#482748', '#5500aa': '#40488a', '#5500ff': '#2f6bcc',
            '#555500': '#564e36', '#555555': '#545454', '#5555aa': '#4f6790', '#5555ff': '#4180d0',
            '#55aa00': '#759a64', '#55aa55': '#759d76', '#55aaaa': '#71a6a4', '#55aaff': '#69b5dd',
            '#55ff00': '#9ee594', '#55ff55': '#9de7a0', '#55ffaa': '#9becc2', '#55ffff': '#95f6f2',
            '#aa0000': '#99353f', '#aa0055': '#983e5a', '#aa00aa': '#955694', '#aa00ff': '#8f74d2',
            '#aa5500': '#9d5b4d', '#aa5555': '#9d6064', '#aa55aa': '#9a7099', '#aa55ff': '#9587d5',
            '#aaaa00': '#afa072', '#aaaa55': '#aea382', '#aaaaaa': '#ababab', '#ffffff': '#ffffff',
            '#aaaaff': '#a7bae2', '#aaff00': '#c9e89d', '#aaff55': '#c9eaa7', '#aaffaa': '#c7f0c8',
            '#aaffff': '#c3f9f7', '#ff0000': '#e35462', '#ff0055': '#e25874', '#ff00aa': '#e16aa3',
            '#ff00ff': '#de83dc', '#ff5500': '#e66e6b', '#ff5555': '#e6727c', '#ff55aa': '#e37fa7',
            '#ff55ff': '#e194df', '#ffaa00': '#f1aa86', '#ffaa55': '#f1ad93', '#ffaaaa': '#efb5b8',
            '#ffaaff': '#ecc3eb', '#ffff00': '#ffeeab', '#ffff55': '#fff1b5', '#ffffaa': '#fff6d3'
        };
    }

    onColorChange(color) {
        this.setState({color: color.hex});
        if (this.props.onColorChange) {
            this.props.onColorChange(color.hex);
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

    onColorTypeChange(colorType) {
        this.setState({sunny: parseInt(colorType, 10) === 1});
    }

    convertToSunny(colors) {
        return colors.map(list => list.map(item => this.sunlightColorMap[item]))
    }
    
    render() {
        return (
            <div className='color-picker'>
                <Field fieldName={this.props.fieldName} label={this.props.label}>
                    <div className='swatch' onClick={this.togglePanel}>
                        <div className='swatch--color' style={{backgroundColor: this.state.color}}></div>
                    </div>
                </Field>
                {this.state.panelVisible ?
                    <div className='color-panel'>
			<div className='color-panel--swatches'>
                            <RadioButtonGroup fieldName='font' label='' options={{
                                '0': 'Normal',
                                '1': 'Sunny',
                            }} selectedItem={this.state.sunny ? '1' : '0'} onChange={this.onColorTypeChange}/>
                            {
                                this.state.sunny ? <SwatchesPicker onChangeComplete={this.onColorChange} colors={this.convertToSunny(this.colors)} width={380} height={304}/>
                                : <SwatchesPicker onChangeComplete={this.onColorChange} colors={this.colors} width={380} height={304}/>
                            }
                        </div>
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
