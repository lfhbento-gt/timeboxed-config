import React, { PropTypes, Component } from 'react';
import TextField from './text-field';

class ColorPresets extends Component {
    constructor(props) {
        super(props);

        this.defaultPresets = {
            'Black and white': {
                bgColor: '#000000',
                fgColor: '#FFFFFF',
                dateColor: '#FFFFFF',
                altColor: '#FFFFFF',
                batteryColor: '#FFFFFF',
                batteryLowColor: '#FFFFFF',
                bluetoothDisconnected: '#FFFFFF',
                updateNotification: '#FFFFFF',
                weatherIcon: '#FFFFFF',
                curTemp: '#FFFFFF',
                minTemp: '#FFFFFF',
                maxTemp: '#FFFFFF',
                steps: '#FFFFFF',
                stepsBehind: '#FFFFFF',
                dist: '#FFFFFF',
                distBehind: '#FFFFFF',
                cal: '#FFFFFF',
                calBehind: '#FFFFFF',
                sleep: '#FFFFFF',
                sleepBehind: '#FFFFFF',
                deep: '#FFFFFF',
                deepBehind: '#FFFFFF',
                windDir: '#FFFFFF',
                windSpeed: '#FFFFFF',
            },
            'Colorful': {
                bgColor: '#000000',
                fgColor: '#FFFFFF',
                dateColor: '#FFFFFF',
                altColor: '#FFFFFF',
                batteryColor: '#FFFFFF',
                batteryLowColor: '#FFFFFF',
                bluetoothDisconnected: '#FFFFFF',
                updateNotification: '#FFFFFF',
                weatherIcon: '#FFFFFF',
                curTemp: '#FFFFFF',
                minTemp: '#FFFFFF',
                maxTemp: '#FFFFFF',
                steps: '#FFFFFF',
                stepsBehind: '#FFFFFF',
                dist: '#FFFFFF',
                distBehind: '#FFFFFF',
                cal: '#FFFFFF',
                calBehind: '#FFFFFF',
                sleep: '#FFFFFF',
                sleepBehind: '#FFFFFF',
                deep: '#FFFFFF',
                deepBehind: '#FFFFFF',
                windDir: '#FFFFFF',
                windSpeed: '#FFFFFF',
            },
        }

        let presets = Object.assign({}, this.defaultPresets, this.getStoredPresets());

        this.state = {
            presets: presets,
        };

        this.onAddClick = this.onAddClick.bind(this);
        this.storePresets = this.storePresets.bind(this);
    }
    
    getStoredPresets() {
        let presets = window.localStorage['presets'];
        return presets ? JSON.parse(presets) : {};
    }

    storePresets() {
        let newPresets = Object.assign({}, this.state.presets);
        Object.keys(this.defaultPresets).map(key => delete newPresets[key]);
        window.localStorage['presets'] = JSON.stringify(newPresets);
    }

    onClick(preset) {
        if (confirm(`Apply preset ${preset}?`)) {
            if (this.props.onSelect) {
                this.props.onSelect(this.state.presets[preset]);
            }
        }
    }

    onAddClick(name) {
        if (Object.keys(this.defaultPresets).indexOf(name) !== -1) {
            alert(`You can't replace default ${name} preset. Choose a different name :)`);
            return;
        }
        if (Object.keys(this.state.presets).indexOf(name) !== -1) {
            if (!confirm(`This will replace the ${name} preset. Continue?`)) {
                return;
            }
        }
        let presets = Object.assign({}, this.state.presets, {[name]: this.props.colors});
        this.setState({presets: presets});
        window.setTimeout(this.storePresets, 0);
    }

    onRemoveClick(name, e) {
        if (confirm(`Remove the preset ${name}?`)) {
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
                <TextField fieldName='presetName' buttonLabel='Add New'
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

export default ColorPresets
