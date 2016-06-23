import React, { PropTypes, Component } from 'react';
import ColorPicker from './color-picker';
import DropdownField from './dropdown';
import RadioButtonGroup from './button-group';
import OptionGroup from './option-group';
import SideBySideFields from './side-by-side-fields';
import ToggleField from './toggle';
import TextField from './text-field';
import HelperText from './helper-text';
import TabContainer from './tabs';
import VersionIndicator from './version-indicator';
import Versioned from './versioned.js';
import ColorPresets from './color-presets';
import { getLocaleById, getText } from './lang';
import { verifyLocation } from './util/util';

import 'bootstrap/scss/bootstrap-flex.scss';
import 'react-select/scss/default.scss';
import '../css/main.scss';

class Layout extends Component {
    constructor(props) {
        super(props);
        let defaultState = {
            useLeadingZero: true,
            useBluetoothDisconnect: true,
            useUpdates: true,
            timezone: null,
            timezoneName: null,
            topLeftModule: '1',
            topRightModule: '2',
            bottomLeftModule: '3',
            bottomRightModule: '4',
            topLeftModuleSleep: '1',
            topRightModuleSleep: '2',
            bottomLeftModuleSleep: '6',
            bottomRightModuleSleep: '7',
            locale: '0',
            dateFormat: '0',
            textAlign: '2',
            font: '0',
            useAdvanced: false,
            weatherProvider: '0',
            useCelsius: false,
            manualLocation: '',
            useKm: false,
            useSleep: true,
            apiKey: '',
        };

        let defaultColors = {
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
        };

        this.colorKeys = Object.keys(defaultColors);

        this.moduleStateKeys = [
            'topLeftModule',
            'topRightModule',
            'bottomLeftModule',
            'bottomRightModule',
        ];
        this.moduleSleepStateKeys = [
            'topLeftModuleSleep',
            'topRightModuleSleep',
            'bottomLeftModuleSleep',
            'bottomRightModuleSleep',
        ];


        this.state = Object.assign({}, defaultState, defaultColors, this.props.state);
        this.onPresetSelect = this.onPresetSelect.bind(this);
        this.verifyLocation = this.verifyLocation.bind(this);
        this._ = getText.bind(this, getLocaleById(this.state.locale));
        
        this.modules = [
            {value: '0', label: this._('None')},
            {value: '1', label: this._('Current Weather')},
            {value: '2', label: this._('Min/Max Temp')},
            {value: '3', label: this._('Steps')},
            {value: '4', label: this._('Distance')},
            {value: '5', label: this._('Calories')},
            {value: '6', label: this._('Sleep Time')},
            {value: '7', label: this._('Deep Sleep Time')},
            {value: '8', label: this._('Wind dir./speed')},
        ];
        this.weatherModules = ['1', '2', '8'];
        this.healthModules = ['3', '4', '5', '6', '7'];
    }

    getChildContext() {
        return {locale: getLocaleById(this.state.locale)};
    }

    onChange(key, value) {
        console.log({[key]: value});
        this.setState({[key]: value});
    }

    onChangeDropdown(key, value) {
        let newValue = value ? value.value : null;
        this.onChange(key, newValue);
    }

    onPresetSelect(colors) {
        this.setState(colors);
    }

    getCurrentColors() {
        return this.colorKeys.reduce((colors, colorKey) => Object.assign({}, colors, {[colorKey]: this.state[colorKey]}), {})
    }

    isWeatherEnabled() {
        return this.isEnabled(this.weatherModules);
    }

    isHealthEnabled() {
        return this.isEnabled(this.healthModules) || this.state.useSleep;
    }

    isEnabled(moduleIndexes) {
        return (
            this.moduleStateKeys.some(key => moduleIndexes.indexOf(this.state[key]) !== -1) ||
            (this.state.useSleep && this.moduleSleepStateKeys.some(key => moduleIndexes.indexOf(this.state[key]) !== -1))
        )
    }

    needsApiKey() {
        return ['1'].indexOf(this.state.weatherProvider) !== -1;
    }

    componentWillUpdate(nextProps, nextState) {
        this._ = getText.bind(this, getLocaleById(this.state.locale));
    }

    verifyLocation(loc) {
        console.log(loc);
        verifyLocation(loc, this.state.weatherProvider, this.state.apiKey);
    }

    getEnabledModules() {
        let state = this.state;
        let modules = {
            'Default': (
                <div>
                    <SideBySideFields>
                        <DropdownField fieldName='top-left' label={this._('Top Left')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='top'
                            selectedItem={state.topLeftModule} onChange={this.onChangeDropdown.bind(this, 'topLeftModule')}/>
                        <DropdownField fieldName='top-right' label={this._('Top Right')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='top'
                            selectedItem={state.topRightModule} onChange={this.onChangeDropdown.bind(this, 'topRightModule')}/>
                    </SideBySideFields>
                    <SideBySideFields>
                        <DropdownField fieldName='bottom-left' label={this._('Bottom Left')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='bottom'
                            selectedItem={state.bottomLeftModule} onChange={this.onChangeDropdown.bind(this, 'bottomLeftModule')}/>
                        <DropdownField fieldName='bottom-right' label={this._('Bottom Right')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='bottom'
                            selectedItem={state.bottomRightModule} onChange={this.onChangeDropdown.bind(this, 'bottomRightModule')}/>
                    </SideBySideFields>
                </div>
            ),
        };

        if (state.useSleep) {
            modules['Sleep'] = (
                <div>
                    <SideBySideFields>
                        <DropdownField fieldName='top-left-sleep' label={this._('Top Left')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='top'
                            selectedItem={state.topLeftModuleSleep} onChange={this.onChangeDropdown.bind(this, 'topLeftModuleSleep')}/>
                        <DropdownField fieldName='top-right-sleep' label={this._('Top Right')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='top'
                            selectedItem={state.topRightModuleSleep} onChange={this.onChangeDropdown.bind(this, 'topRightModuleSleep')}/>
                    </SideBySideFields>
                    <SideBySideFields>
                        <DropdownField fieldName='bottom-left-sleep' label={this._('Bottom Left')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='bottom'
                            selectedItem={state.bottomLeftModuleSleep} onChange={this.onChangeDropdown.bind(this, 'bottomLeftModuleSleep')}/>
                        <DropdownField fieldName='bottom-right-sleep' label={this._('Bottom Right')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='bottom'
                            selectedItem={state.bottomRightModuleSleep} onChange={this.onChangeDropdown.bind(this, 'bottomRightModuleSleep')}/>
                    </SideBySideFields>
                </div>
            );
        }

        return modules;
    }

    render() {
        let state = this.state;
        return (
            <div>
                <h1 className='title'>Timeboxed</h1>
                <VersionIndicator />

                <OptionGroup title={this._('General')}>
                    <ToggleField fieldName='useLeadingZero' label={this._('Hours with leading zero')} checked={state.useLeadingZero} onChange={this.onChange.bind(this, 'useLeadingZero')}/>
                    <ToggleField fieldName='useBluetoothDisconnect' label={this._('Vibrate on Bluetooth disconnect')} checked={state.useBluetoothDisconnect} onChange={this.onChange.bind(this, 'useBluetoothDisconnect')}/>
                    <ToggleField fieldName='updates' label={this._('Check for updates')} checked={state.useUpdates} onChange={this.onChange.bind(this, 'useUpdates')} />

                    <DropdownField fieldName='timezones' label={this._('Additional Timezone')} options={[
                        {value: '0', label: 'America/Los_Angeles'},
                        {value: '1', label: 'America/Sao_Paulo'},
                        {value: '2', label: 'Europe/London'},
                    ]} searchable={true} clearable={true} selectedItem={state.timezone}/>
                </OptionGroup>

                <OptionGroup title={this._('Modules')}>
                    <TabContainer tabs={this.getEnabledModules()} />
                    <ToggleField fieldName='useSleep' label={this._('Enable after wake up mode')} checked={state.useSleep} onChange={this.onChange.bind(this, 'useSleep')} />
                    <HelperText>{this._('Wake up and see new things!')}</HelperText>
                </OptionGroup>

                <OptionGroup title={this._('Localization')}>
                    <DropdownField fieldName='locale' label={this._('Language')} options={[
                        {value: '0', label: 'English'},
                        {value: '1', label: 'Portuguese'},
                        {value: '2', label: 'Spanish'},
                    ]} searchable={true} clearable={false} selectedItem={state.locale} onChange={this.onChangeDropdown.bind(this, 'locale')}/>
                    <DropdownField fieldName='dateFormat' label={this._('Date format')} options={[
                        {value: '0', label: this._('Day of week/month/day')},
                        {value: '1', label: this._('Day of week/day/month')},
                    ]} searchable={false} clearable={false} selectedItem={state.dateFormat} onChange={this.onChangeDropdown.bind(this, 'dateFormat')}/>
                </OptionGroup>

                <OptionGroup title={this._('Appearance')}>
                    <RadioButtonGroup fieldName='textAlign' label='Text Align' options={[
                        {value: '0', label: this._('Left')},
                        {value: '1', label: this._('Center')},
                        {value: '2', label: this._('Right')},
                    ]} selectedItem={state.textAlign} onChange={this.onChange.bind(this, 'textAlign')}/>
                    <DropdownField fieldName='font' label='Font' options={[
                        {value: '0', label: 'Blocko'},
                        {value: '1', label: 'Bloco (big)'},
                        {value: '2', label: 'Pebble fonts'},
                        {value: '3', label: 'Archivo'},
                        {value: '4', label: 'Din'},
                        {value: '5', label: 'Prototype'}
                    ]} selectedItem={state.font} onChange={this.onChangeDropdown.bind(this, 'font')}/>
                </OptionGroup>

                <OptionGroup title={this._('Colors')}>
                    <ColorPicker fieldName='backgroundColor' label={this._('Background color')} color={state.bgColor} onChange={this.onChange.bind(this, 'bgColor')} />
                    <ColorPicker fieldName='textColor' label={this._('Foreground color')} color={state.fgColor} onChange={this.onChange.bind(this, 'fgColor')} />
                    <ToggleField fieldName='useAdvanced' label={this._('Advanced Colors')} checked={state.useAdvanced} onChange={this.onChange.bind(this, 'useAdvanced')} />
                    {state.useAdvanced ?
                        <div>
                            <ColorPicker fieldName='dateColor' label={this._('Date color')} color={state.dateColor} onChange={this.onChange.bind(this, 'dateColor')} />
                            <ColorPicker fieldName='altColor' label={this._('Alternate time color')} color={state.altColor} onChange={this.onChange.bind(this, 'altColor')} />
                            <ColorPicker 
                                fieldName='batteryColor' label={this._('Battery/Low Battery color')} color={state.batteryColor} onChange={this.onChange.bind(this, 'batteryColor')} 
                                secondColor={state.batteryLowColor} onSecondColorChange={this.onChange.bind(this, 'batteryLowColor')} />
                            <ColorPicker fieldName='bluetoothDisconnected' label={this._('Bluetooth disconnected')} color={state.bluetoothDisconnected} onChange={this.onChange.bind(this, 'bluetoothDisconnected')} />
                            <ColorPicker fieldName='updateNotification' label={this._('Update notification')} color={state.updateNotification} onChange={this.onChange.bind(this, 'updateNotification')} />
                            {this.isEnabled(['1']) ?
                                <ColorPicker
                                    fieldName='weatherIcon' label={this._('Weather icon/temperature')} color={state.weatherIcon} onChange={this.onChange.bind(this, 'weatherIcon')}
                                    secondColor={state.curTemp} onSecondColorChange={this.onChange.bind(this, 'curTemp')}/>
                            : null}
                            {this.isEnabled(['2']) ?
                                <ColorPicker
                                    fieldName='minMaxTemp' label={this._('Min/Max temperature')} color={state.minTemp} onChange={this.onChange.bind(this, 'minTemp')}
                                    secondColor={state.maxTemp} onSecondColorChange={this.onChange.bind(this, 'maxTemp')}/>
                            : null}
                            {this.isEnabled(['3']) ?
                                <ColorPicker
                                    fieldName='steps' label={this._('Steps/falling behind')} color={state.steps} onChange={this.onChange.bind(this, 'steps')}
                                    secondColor={state.stepsBehind} onSecondColorChange={this.onChange.bind(this, 'stepsBehind')} />
                            : null}
                            {this.isEnabled(['4']) ?
                                <ColorPicker
                                    fieldName='dist' label={this._('Distance/falling behind')} color={state.dist} onChange={this.onChange.bind(this, 'dist')}
                                    secondColor={state.distBehind} onSecondColorChange={this.onChange.bind(this, 'distBehind')} />
                            : null}
                            {this.isEnabled(['5']) ?
                                <ColorPicker
                                    fieldName='cal' label={this._('Calories/falling behind')} color={state.cal} onChange={this.onChange.bind(this, 'cal')}
                                    secondColor={state.calBehind} onSecondColorChange={this.onChange.bind(this, 'calBehind')} />
                            : null}
                            {this.isEnabled(['6']) ?
                                <ColorPicker
                                    fieldName='sleep' label={this._('Sleep/falling behind')} color={state.sleep} onChange={this.onChange.bind(this, 'sleep')}
                                    secondColor={state.sleepBehind} onSecondColorChange={this.onChange.bind(this, 'sleepBehind')} />
                            : null}
                            {this.isEnabled(['7']) ?
                                <ColorPicker
                                    fieldName='deep' label={this._('Deep sleep/falling behind')} color={state.deep} onChange={this.onChange.bind(this, 'deep')}
                                    secondColor={state.deepBehind} onSecondColorChange={this.onChange.bind(this, 'deepBehind')} />
                            : null}
                            {this.isEnabled(['8']) ?
                                <ColorPicker
                                    fieldName='windSpeed' label={this._('Wind direction/speed')} color={state.windDir} onChange={this.onChange.bind(this, 'windDir')}
                                    secondColor={state.windSpeed} onSecondColorChange={this.onChange.bind(this, 'windSpeed')} />
                            : null}
                        </div>
                    : null}
                </OptionGroup>

                <OptionGroup title={this._('Color Presets')}>
                    <ColorPresets colors={this.getCurrentColors()} onSelect={this.onPresetSelect}/>
                </OptionGroup>

                {this.isWeatherEnabled() ?
                    <OptionGroup title={this._('Weather')}>
                        <RadioButtonGroup fieldName='provider' label={this._('Weather provider')} labelPosition='top' options={[
                            {value: '0', label: 'OpenWeather'},
                            {value: '1', label: 'WUnderground'},
                            {value: '2', label: 'Yahoo'},
                        ]} selectedItem={state.weatherProvider} onChange={this.onChange.bind(this, 'weatherProvider')}/>

                        {this.needsApiKey() ?
                            <div>
                                <TextField fieldName='apiKey'
                                    label={this._('API Key')}
                                    value={state.apiKey}
                                    onChange={this.onChange.bind(this, 'apiKey')}/> 
                                <HelperText>{this._('Get your api key!')}</HelperText>
                            </div>
                        : null}

                        {this.isEnabled(['1', '2']) ?
                            <ToggleField fieldName='useCelsius' label={this._('Use Celsius')} checked={state.useCelsius} onChange={this.onChange.bind(this, 'useCelsius')} />
                        : null}
                        <TextField fieldName='manualLocation' buttonLabel={this._('Verify')}
                            label={this._('Manual Location')} labelPosition='top'
                            value={state.manualLocation}
                            onButtonClick={this.verifyLocation}
                            onChange={this.onChange.bind(this, 'manualLocation')}/>
                        <HelperText>{this._('Verify this thing just in case')}</HelperText>
                    </OptionGroup>
                : null}

                {this.isHealthEnabled() ?
                    <OptionGroup title='Health'>
                        <ToggleField fieldName='useKm' label={this._('Use Kilometers')} checked={state.useKm} onChange={this.onChange.bind(this, 'useKm')}/>
                    </OptionGroup>
                : null}
            </div>
        );
    }
}

Layout.propTypes = {
    
}

Layout.defaultProps = {
    
}

Layout.childContextTypes = {
    locale: PropTypes.string
}

export default Layout
