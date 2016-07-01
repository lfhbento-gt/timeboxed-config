import React, { PropTypes, Component } from 'react';
import TextField from './text-field';
import { getText } from './lang';

class ColorPresets extends Component {
    constructor(props, context) {
        super(props, context);

        this.defaultPresets = {
            'Black and white': {
                bgColor: '#000000',
                hoursColor: '#FFFFFF',
                dateColor: '#FFFFFF',
                altHoursColor: '#FFFFFF',
                batteryColor: '#FFFFFF',
                batteryLowColor: '#FFFFFF',
                bluetoothColor: '#FFFFFF',
                updateColor: '#FFFFFF',
                weatherColor: '#FFFFFF',
                tempColor: '#FFFFFF',
                minColor: '#FFFFFF',
                maxColor: '#FFFFFF',
                stepsColor: '#FFFFFF',
                stepsBehindColor: '#FFFFFF',
                distColor: '#FFFFFF',
                distBehindColor: '#FFFFFF',
                calColor: '#FFFFFF',
                calBehindColor: '#FFFFFF',
                sleepColor: '#FFFFFF',
                sleepBehindColor: '#FFFFFF',
                deepColor: '#FFFFFF',
                deepBehindColor: '#FFFFFF',
                windDirColor: '#FFFFFF',
                windSpeedColor: '#FFFFFF',
            },
            'Colorful': {
                bgColor: '#000055',
                hoursColor: '#FFFFFF',
                dateColor: '#AAFFFF',
                altHoursColor: '#00FFFF',
                batteryColor: '#AAAAAA',
                batteryLowColor: '#FF5500',
                bluetoothColor: '#FF5500',
                updateColor: '#00FF00',
                weatherColor: '#FFFF00',
                tempColor: '#FFFF00',
                minColor: '#00FFFF',
                maxColor: '#FF5500',
                stepsColor: '#AAFFFF',
                stepsBehindColor: '#FFFF00',
                distColor: '#AAFFFF',
                distBehindColor: '#FFFF00',
                calColor: '#AAFFFF',
                calBehindColor: '#FFFF00',
                sleepColor: '#AAFFFF',
                sleepBehindColor: '#FFFF00',
                deepColor: '#AAFFFF',
                deepBehindColor: '#FFFF00',
                windDirColor: '#55FF00',
                windSpeedColor: '#55FF00',
            },
        }

        let presets = Object.assign({}, this.defaultPresets, this.getStoredPresets());

        this.state = {
            presets: presets,
        };

        this.onAddClick = this.onAddClick.bind(this);
        this.storePresets = this.storePresets.bind(this);
        this._ = getText.bind(this, context.locale);
    }
    
    getStoredPresets() {
        let presets = JSON.parse(window.localStorage['presets'] || '{}');
        let oldPresets = this.getOldPresets();
        return Object.assign({}, oldPresets, presets);
    }

    getOldPresets() {
        return Object.keys(localStorage).reduce((presets, key) => {
            if (key.indexOf('preset-') === 0) {
                let presetName = key.replace('preset-', '');
                let newPreset = JSON.parse(localStorage[key]);
                newPreset = Object.keys(newPreset).reduce((preset, key) => {
                    let value = newPreset[key];

                    value = value === 'true' || value === 'false' ? JSON.parse(value) : value;
                    value = typeof value === 'string' && value.indexOf('0x') !== -1 ? value.replace('0x', '#') : value;
                    
                    preset[key] = value;

                    return preset;
                }, {});
                presets[presetName] = newPreset;
            }
            return presets;
        }, {});
    }

    storePresets() {
        let newPresets = Object.assign({}, this.state.presets);
        Object.keys(this.defaultPresets).map(key => delete newPresets[key]);
        window.localStorage['presets'] = JSON.stringify(newPresets);
    }

    onClick(preset, e) {
        if (confirm(`Apply preset ${preset}?`)) {
            if (this.props.onSelect) {
                this.props.onSelect(this.state.presets[preset]);
            }
        }
        e.stopPropagation();
    }

    onAddClick(name) {
        if (Object.keys(this.defaultPresets).indexOf(name) !== -1) {
            alert(this._('You can\'t replace default ${name} preset. Choose a different name :)', {name}));
            return;
        }
        if (Object.keys(this.state.presets).indexOf(name) !== -1) {
            if (!confirm(this._('This will replace the ${name} preset. Continue?', {name}))) {
                return;
            }
        }
        let presets = Object.assign({}, this.state.presets, {[name]: this.props.colors});
        this.setState({presets: presets});
        window.setTimeout(this.storePresets, 0);
    }

    onRemoveClick(name, e) {
        if (confirm(this._('Remove the preset ${name}?', {name}))) {
            let presets = Object.assign({}, this.state.presets);
            delete presets[name];
            this.setState({presets: presets});
            window.setTimeout(this.storePresets, 0);
        }
        e.stopPropagation();
    }

    render() {
        return (
            <div>
                <div className='list-group'>
                    {Object.keys(this.state.presets).sort().map(key => {
                        return (
                            <li className='list-group-item' key={key} onClick={this.onClick.bind(this, key)}>
                                {key}
                                {Object.keys(this.defaultPresets).indexOf(key) === -1 ?
                                    <span className='pull-xs-right remove-preset' onClick={this.onRemoveClick.bind(this, key)}>&#x2573;</span>
                                : null}
                            </li>
                        )
                    })}
                </div>
                <TextField fieldName='presetName' buttonLabel={this._('Add New')}
                    value=''
                    onButtonClick={this.onAddClick}/>
            </div>
        );
    }
}

ColorPresets.propTypes = {
    
}

ColorPresets.defaultProps = {
    
}

ColorPresets.contextTypes = {
    locale: PropTypes.string
}

export default ColorPresets
