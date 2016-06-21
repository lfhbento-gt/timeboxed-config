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
            bgColor: '#000000',
            fgColor: '#FFFFFF',
            useAdvanced: false,
            weatherProvider: '0',
            useCelsius: false,
            manualLocation: '',
            useKm: false,
            useSleep: true,
        };

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

        this.modules = [
            {value: '0', label: 'None'},
            {value: '1', label: 'Current Weather'},
            {value: '2', label: 'Min/Max Temp'},
            {value: '3', label: 'Steps'},
            {value: '4', label: 'Distance'},
            {value: '5', label: 'Calories'},
            {value: '6', label: 'Sleep Time'},
            {value: '7', label: 'Deep Sleep Time'},
        ];
        this.weatherModules = ['1', '2'];
        this.healthModules = ['3', '4', '5', '6', '7'];

        this.state = Object.assign({}, defaultState, this.props.state);
    }

    onChange(key, value) {
        this.setState({[key]: value});
    }

    onChangeDropdown(key, value) {
        let newValue = value ? value.value : null;
        this.onChange(key, newValue);
    }

    isWeatherEnabled() {
        return this.isEnabled(this.weatherModules);
    }

    isHealthEnabled() {
        return this.isEnabled(this.healthModules);
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

    getEnabledModules() {
        let state = this.state;
        let modules = {
            'Default': (
                <div>
                    <SideBySideFields>
                        <DropdownField fieldName='top-left' label='Top Left' options={this.modules}
                            searchable={false} clearable={false} labelPosition='top'
                            selectedItem={state.topLeftModule} onChange={this.onChangeDropdown.bind(this, 'topLeftModule')}/>
                        <DropdownField fieldName='top-right' label='Top Right' options={this.modules}
                            searchable={false} clearable={false} labelPosition='top'
                            selectedItem={state.topRightModule} onChange={this.onChangeDropdown.bind(this, 'topRightModule')}/>
                    </SideBySideFields>
                    <SideBySideFields>
                        <DropdownField fieldName='bottom-left' label='Bottom Left' options={this.modules}
                            searchable={false} clearable={false} labelPosition='bottom'
                            selectedItem={state.bottomLeftModule} onChange={this.onChangeDropdown.bind(this, 'bottomLeftModule')}/>
                        <DropdownField fieldName='bottom-right' label='Bottom Right' options={this.modules}
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
                        <DropdownField fieldName='top-left-sleep' label='Top Left' options={this.modules}
                            searchable={false} clearable={false} labelPosition='top'
                            selectedItem={state.topLeftModuleSleep} onChange={this.onChangeDropdown.bind(this, 'topLeftModuleSleep')}/>
                        <DropdownField fieldName='top-right-sleep' label='Top Right' options={this.modules}
                            searchable={false} clearable={false} labelPosition='top'
                            selectedItem={state.topRightModuleSleep} onChange={this.onChangeDropdown.bind(this, 'topRightModuleSleep')}/>
                    </SideBySideFields>
                    <SideBySideFields>
                        <DropdownField fieldName='bottom-left-sleep' label='Bottom Left' options={this.modules}
                            searchable={false} clearable={false} labelPosition='bottom'
                            selectedItem={state.bottomLeftModuleSleep} onChange={this.onChangeDropdown.bind(this, 'bottomLeftModuleSleep')}/>
                        <DropdownField fieldName='bottom-right-sleep' label='Bottom Right' options={this.modules}
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
                <span className='version'>v3.0 <span className='update'>[v3.1 available]</span></span>
                <OptionGroup title='General'>
                    <ToggleField fieldName='useLeadingZero' label='Hours with leading zero' checked={state.useLeadingZero} onChange={this.onChange.bind(this, 'useLeadingZero')}/>
                    <ToggleField fieldName='useBluetoothDisconnect' label='Vibrate on Bluetooth disconnect' checked={state.useBluetoothDisconnect} onChange={this.onChange.bind(this, 'useBluetoothDisconnect')}/>
                    <ToggleField fieldName='updates' label='Check for updates' checked={state.useUpdates} onChange={this.onChange.bind(this, 'useUpdates')} />
                    <DropdownField fieldName='timezones' label='Additional Timezone' options={[
                        {value: '0', label: 'America/Los_Angeles'},
                        {value: '1', label: 'America/Sao_Paulo'},
                        {value: '2', label: 'Europe/London'},
                    ]} searchable={true} clearable={true} selectedItem={state.timezone}/>
                </OptionGroup>

                <OptionGroup title='Modules'>
                    <TabContainer tabs={this.getEnabledModules()} />
                    <ToggleField fieldName='useSleep' label='Enable after wake up view' checked={state.useSleep} onChange={this.onChange.bind(this, 'useSleep')} />
                    <HelperText>Wake up and see new things!</HelperText>
                </OptionGroup>

                <OptionGroup title='Localization'>
                    <DropdownField fieldName='locale' label='Language' options={[
                        {value: '0', label: 'English'},
                        {value: '1', label: 'Portuguese'},
                        {value: '2', label: 'Spanish'},
                    ]} searchable={true} clearable={false} selectedItem={state.locale} onChange={this.onChangeDropdown.bind(this, 'locale')}/>
                    <DropdownField fieldName='dateFormat' label='Date format' options={[
                        {value: '0', label: 'Day of week/month/day'},
                        {value: '1', label: 'Day of week/day/month'},
                    ]} searchable={false} clearable={false} selectedItem={state.dateFormat} onChange={this.onChangeDropdown.bind(this, 'dateFormat')}/>
                </OptionGroup>

                <OptionGroup title='Appearance'>
                    <RadioButtonGroup fieldName='textAlign' label='Text Align' options={[
                        {value: '0', label: 'Left'},
                        {value: '1', label: 'Center'},
                        {value: '2', label: 'Right'},
                    ]} selectedItem={state.textAlign} onChange={this.onChange.bind(this, 'textAlign')}/>
                    <DropdownField fieldName='font' label='Font' options={[
                        {value: '0', label: 'Blocko'},
                        {value: '1', label: 'Bloco (big)'},
                        {value: '2', label: 'Pebble fonts'},
                        {value: '3', label: 'Archivo'},
                        {value: '4', label: 'Din'},
                        {value: '5', label: 'Prototype'}
                    ]} selectedItem={state.font} onChange={this.onChangeDropdown.bind(this, 'font')}/>
                    <ColorPicker fieldName='backgroundColor' label='Background color' color={state.bgColor} onChange={this.onChange.bind(this, 'bgColor')} />
                    <ColorPicker fieldName='textColor' label='Foreground color' color={state.fgColor} onChange={this.onChange.bind(this, 'fgColor')} />
                    <ToggleField fieldName='useAdvanced' label='Advanced Colors' checked={state.useAdvanced} onChange={this.onChange.bind(this, 'useAdvanced')} />
                </OptionGroup>

                {this.isWeatherEnabled() ?
                    <OptionGroup title='Weather'>
                        <RadioButtonGroup fieldName='provider' label='Weather provider' labelPosition='top' options={[
                            {value: '0', label: 'OpenWeather'},
                            {value: '1', label: 'WUnderground'},
                            {value: '2', label: 'Yahoo'},
                        ]} selectedItem={state.weatherProvider} onChange={this.onChange.bind(this, 'weatherProvider')}/>

                        {this.needsApiKey() ?
                            <div>
                                <TextField fieldName='apiKey'
                                    label='API Key'
                                    value={state.apiKey}
                                    onChange={this.onChange.bind(this, 'apiKey')}/> 
                                <HelperText>Get your api key!</HelperText>
                            </div>
                        : null}

                        <ToggleField fieldName='useCelsius' label='Use Celsius' checked={state.useCelsius} onChange={this.onChange.bind(this, 'useCelsius')} />
                        <TextField fieldName='manualLocation' buttonLabel='Verify'
                            label='Manual Location' labelPosition='top'
                            value={state.manualLocation}
                            onChange={this.onChange.bind(this, 'manualLocation')}/>
                        <HelperText>Verify this thing just in case</HelperText>
                    </OptionGroup>
                : null}

                {this.isHealthEnabled() ?
                    <OptionGroup title='Health'>
                        <ToggleField fieldName='useKm' label='Use Kilometers' checked={state.useKm} onChange={this.onChange.bind(this, 'useKm')}/>
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

export default Layout
