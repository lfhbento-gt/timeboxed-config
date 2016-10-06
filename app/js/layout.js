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
import Versioned, { shouldShow } from './versioned';
import ColorPresets from './color-presets';
import DonateButton from './donate';
import { getLocaleById, getText } from './lang';
import { verifyLocation, getPlatform, getCurrentVersion } from './util/util';

import 'bootstrap/scss/bootstrap-flex.scss';
import 'react-select/scss/default.scss';
import '../css/main.scss';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.currentVersion = getCurrentVersion();
        this.platform = getPlatform();

        this.defaultState = {
            leadingZero: true,
            bluetoothDisconnect: true,
            update: true,
            timezones: '#|0:00',
            slotA: '1',
            slotB: '2',
            slotC: '3',
            slotD: '4',
            sleepSlotA: '1',
            sleepSlotB: '2',
            sleepSlotC: '6',
            sleepSlotD: '7',
            locale: '0',
            dateFormat: '0',
            textAlign: '2',
            fontType: '0',
            enableAdvanced: false,
            weatherProvider: '0',
            useCelsius: false,
            overrideLocation: '',
            showSleep: false,
            weatherKey: '',
            forecastKey: '',
            speedUnit: '0',
            showDebug: false,
            quickview: true,
            dateSeparator: '1',
        };

        this.defaultColors = {
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
            sunriseColor: '#FFFFFF',
            sunsetColor: '#FFFFFF',
        };

        if (shouldShow(this.currentVersion, "3.7", null)) {
            this.defaultColors = Object.assign({}, this.defaultColors, {
                activeColor: '#FFFFFF',
                activeBehindColor: '#FFFFFF',
            });
        }
        if (shouldShow(this.currentVersion, "4.0", null)) {
            this.defaultState = Object.assign({}, this.defaultState, {
                showTap: false,
                tapTime: '7',
                tapSlotA: '11',
                tapSlotB: '12',
                tapSlotC: '8',
                tapSlotD: '13',
                weatherTime: '30',
                heartLow: '0',
                heartHigh: '0',
            });
            this.defaultColors = Object.assign({}, this.defaultColors, {
                heartColor: '#FFFFFF',
                heartColorOff: '#FFFFFF',
                compassColor: '#FFFFFF',
            });
        }

        this.ignoreKeys = [
            'showDebug',
        ];

        this.colorKeys = Object.keys(this.defaultColors);

        let newState = this.filterValidKeys(this.props.state, [...this.colorKeys, ...Object.keys(this.defaultState)]);

        this.moduleStateKeys = [
            'slotA',
            'slotB',
            'slotC',
            'slotD',
        ];
        this.moduleSleepStateKeys = [
            'sleepSlotA',
            'sleepSlotB',
            'sleepSlotC',
            'sleepSlotD',
        ];
        this.moduleTapStateKeys = [
            'tapSlotA',
            'tapSlotB',
            'tapSlotC',
            'tapSlotD',
        ];

        this.state = Object.assign({}, this.defaultState, this.defaultColors, newState);
        this.onPresetSelect = this.onPresetSelect.bind(this);
        this.verifyLocation = this.verifyLocation.bind(this);
        this._ = getText.bind(this, getLocaleById(this.state.locale));
        this.onSubmit = this.onSubmit.bind(this);
        this.toggleDebug = this.toggleDebug.bind(this);
        this.wipeConfigs = this.wipeConfigs.bind(this);
        
        this.modulesAll = [
            {value: '0', label: this._('None')},
            {value: '1', label: this._('Current Weather')},
            {value: '2', label: this._('Min/Max Temp')},
            {value: '3', label: this._('Steps')},
            {value: '4', label: this._('Distance')},
            {value: '5', label: this._('Calories')},
            {value: '6', label: this._('Sleep Time')},
            {value: '7', label: this._('Deep Sleep Time')},
            {value: '8', label: this._('Wind dir./speed')},
            {value: '11', label: this._('Sunrise')},
            {value: '12', label: this._('Sunset')},
        ];
        
        this.modulesAplite = [
            {value: '0', label: this._('None')},
            {value: '1', label: this._('Current Weather')},
            {value: '2', label: this._('Min/Max Temp')},
            {value: '8', label: this._('Wind dir./speed')},
            {value: '11', label: this._('Sunrise')},
            {value: '12', label: this._('Sunset')},
        ];

        this.timezones = [
            {value: '#|0:00', label: 'None'},
            {value: 'aoe|-12:00', label: '(GMT -12) Int. Date Line'},
            {value: 'sst|-11:00', label: '(GMT -11) SST: Samoa'},
            {value: 'hast|-10:00', label: '(GMT -10) HAST: Hawaii'},
            {value: 'hadt|-9:00', label: '(GMT -9) HADT: Hawaii (Daylight)'},
            {value: 'akst|-9:00', label: '(GMT -9) AKST: Alaska'},
            {value: 'akdt|-8:00', label: '(GMT -8) AKDT: Alaska (Daylight)'},
            {value: 'pst|-8:00', label: '(GMT -8) PST: Pacific Standard Time'},
            {value: 'pdt|-7:00', label: '(GMT -7) PDT: Pacific Daylight Time'},
            {value: 'mst|-7:00', label: '(GMT -7) MST: Mountain Standard Time'},
            {value: 'mdt|-6:00', label: '(GMT -6) MDT: Mountain Daylight Time'},
            {value: 'cst|-6:00', label: '(GMT -6) CST: Central Standard Time'},
            {value: 'cdt|-5:00', label: '(GMT -5) CDT: Central Daylight Time'},
            {value: 'est|-5:00', label: '(GMT -5) EST: Eastern Standard Time'},
            {value: 'pet|-5:00', label: '(GMT -5) PET: Peru'},
            {value: 'act|-5:00', label: '(GMT -5) ACT: Acre, Brazil'},
            {value: 'vet|-4:30', label: '(GMT -4:30) VET: Venezuela'},
            {value: 'edt|-4:00', label: '(GMT -4) EDT: Eastern Daylight Time'},
            {value: 'ast|-4:00', label: '(GMT -4) AST: Atlantic Standard Time'},
            {value: 'adt|-3:00', label: '(GMT -3) ADT: Atlantic Daylight Time'},
            {value: 'art|-3:00', label: '(GMT -3) ART: Argentina'},
            {value: 'brt|-3:00', label: '(GMT -3) BRT: Brazil'},
            {value: 'wgt|-3:00', label: '(GMT -3) WGT: West Greenland'},
            {value: 'wgst|-2:00', label: '(GMT -2) WGST: West Greenland Summer Time'},
            {value: 'brst|-2:00', label: '(GMT -2) BRST: Brazil Summer Time'},
            {value: 'egt|-1:00', label: '(GMT -1) EGT: East Greenland'},
            {value: 'azot|-1:00', label: '(GMT -1) AZOT: Azores'},
            {value: 'azost|0:00', label: '(GMT +0) AZOST: Azores Summer'},
            {value: 'egst|0:00', label: '(GMT +0) EGST: East Greenland Summer'},
            {value: 'gmt|0:00', label: 'GMT: Greenwich Mean Time'},
            {value: 'wet|0:00', label: '(GMT +0) WET: Western European Time'},
            {value: 'bst|1:00', label: '(GMT +1) BST: British Summer Time'},
            {value: 'cet|1:00', label: '(GMT +1) CET: Central European Time'},
            {value: 'ist|1:00', label: '(GMT +1) IST: Irish Standard Time'},
            {value: 'cest|2:00', label: '(GMT +2) CEST: Central European Summer Time'},
            {value: 'cat|2:00', label: '(GMT +2) CAT: Central Africa Time'},
            {value: 'eet|2:00', label: '(GMT +2) EET: Eastern European Time'},
            {value: 'sast|2:00', label: '(GMT +2) SAST: South Africa Standard Time'},
            {value: 'eat|3:00', label: '(GMT +3) EAT: East Africa Time'},
            {value: 'eest|3:00', label: '(GMT +3) EEST: Eastern European Summer Time'},
            {value: 'msk|3:00', label: '(GMT +3) MSK: Moscow Standard Time'},
            {value: 'irst|3:30', label: '(GMT +3:30) IRST: Iran Standard Time'},
            {value: 'gst|4:00', label: '(GMT +4) GST: Gulf Standard Time'},
            {value: 'mdk|4:00', label: '(GMT +4) MDK: Moscow Daylight Time'},
            {value: 'irdt|4:30', label: '(GMT +4:30) IRDT: Iran Daylight Time'},
            {value: 'mvt|5:00', label: '(GMT +5) MVT: Maldives Time'},
            {value: 'ist|5:30', label: '(GMT +5:30) IST: India Standard Time'},
            {value: 'bst|6:00', label: '(GMT +6) BST: Bangladesh Standard Time'},
            {value: 'mmt|6:30', label: '(GMT +6:30) MMT: Myanmar Time'},
            {value: 'wib|7:00', label: '(GMT +7) WIB: Western Indonesian Time'},
            {value: 'wita|8:00', label: '(GMT +8) WITA: Central Indonesian Time'},
            {value: 'awst|8:00', label: '(GMT +8) AWST: Australia Western Standard Time'},
            {value: 'cst|8:00', label: '(GMT +8) CST: China Standard Time'},
            {value: 'hkt|8:00', label: '(GMT +8) HKT: Hong Kong Time'},
            {value: 'pyt|8:30', label: '(GMT +8:30) PYT: Pyongyang Time'},
            {value: 'wit|9:00', label: '(GMT +9) WIT: Eastern Indonesian Time'},
            {value: 'awdt|9:00', label: '(GMT +9) AWDT: Australia Western Daylight Time'},
            {value: 'jst|9:00', label: '(GMT +9) JST: Japan Standard Time'},
            {value: 'kst|9:00', label: '(GMT +9) KST: Korea Standard Time'},
            {value: 'acst|9:30', label: '(GMT +9:30) ACST: Australia Central Standard Time'},
            {value: 'aest|10:00', label: '(GMT +10) AEST: Australia Eastern Standard Time'},
            {value: 'pgt|10:00', label: '(GMT +10) PGT: Papua New Guinea Time'},
            {value: 'acdt|10:30', label: '(GMT +10:30) ACDT: Australia Central Daylight Time'},
            {value: 'aedt|11:00', label: '(GMT +11) AEDT: Australia Eastern Daylight Time'},
            {value: 'fjt|12:00', label: '(GMT +12) FJT: Fiji Time'},
            {value: 'nzst|12:00', label: '(GMT +12) NZST: New Zealand Standard Time'},
            {value: 'fjst|13:00', label: '(GMT +13) FJST: Fiji Summer Time'},
            {value: 'nzdt|13:00', label: '(GMT +13) NZDT: New Zealand Daylight Time'},
            {value: 'wst|14:00', label: '(GMT +14) WST: Western Samoa Time'},
        ];

        this.locales = [
            {value: '0', label: this._('English')},
            {value: '1', label: this._('Portuguese')},
            {value: '2', label: this._('French')},
            {value: '3', label: this._('German')},
            {value: '4', label: this._('Spanish')},
            {value: '5', label: this._('Italian')},
            {value: '6', label: this._('Dutch')},
            {value: '7', label: this._('Danish')},
            {value: '8', label: this._('Turkish')},
            {value: '9', label: this._('Czech')},
            {value: '10', label: this._('Polish')},
            {value: '11', label: this._('Swedish')},
            {value: '12', label: this._('Finnish')},
            {value: '13', label: this._('Slovak')},
        ];

        this.fonts = [
            {value: '0', label: 'Blocko'},
            {value: '1', label: 'Bloco (big)'},
            {value: '2', label: 'Pebble fonts'},
            {value: '3', label: 'Archivo'},
            {value: '4', label: 'Din'},
            {value: '5', label: 'Prototype'},
            {value: '6', label: 'LECO'},
            {value: '7', label: 'Konstruct'},
        ];

        this.dateFormatOptions = [
            {value: '0', label: this._('Day of week, month, day')},
            {value: '1', label: this._('Day of week, day, month')},
            {value: '2', label: this._('Day of week, day')},
            {value: '3', label: this._('Day, month')},
            {value: '4', label: this._('Month, day')},
            {value: '5', label: this._('Day, month (number)')},
            {value: '6', label: this._('Month (number), day')},
            {value: '7', label: this._('Day of week, day, month (number)')},
            {value: '8', label: this._('Day of week, month (number), day')},
        ];

        this.weatherModules = ['1', '2', '8', '11', '12'];
        this.healthModules = ['3', '4', '5', '6', '7'];


        if (shouldShow(this.currentVersion, "3.7", null)) {
            this.modulesAll = this.modulesAll.concat([
                {value: '13', label: this._('Active time')},
            ]);
            this.healthModules.push('13');
        }
        if (shouldShow(this.currentVersion, "4.0", null)) {
            this.modulesAll = this.modulesAll.concat([
                {value: '14', label: this._('Heart rate')},
                {value: '15', label: this._('Compass')},
            ]);
            this.healthModules.push('14');
            this.dateFormatOptions.push({value: '9', label: this._('ISO-8601 (year, month, day)')})
        }

        this.modules = this.platform === 'aplite' ? this.modulesAplite : this.modulesAll;
    }

    filterValidKeys(data, keys, invert = false) {
        let newData = Object.assign({}, data);
        Object.keys(newData).map(key => {
            if ((!invert && keys.indexOf(key) === -1) || (invert && keys.indexOf(key) !== -1)) {
                delete newData[key];
            }
        });
        return newData;
    }

    wipeConfigs() {
        if (window.confirm('This will clean all the config data for Timeboxed saved on your phone. ' +
                'This also wipes any custom presets, manual location and API keys you might have entered. ' +
                'Do you want to proceed?')) {
            window.localStorage.clear();
            this.setState(Object.assign({}, this.defaultState, this.defaultColors));
        }
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

    toggleDebug() {
        let showDebug = this.state.showDebug;
        this.setState({showDebug: !showDebug});
    }

    onSubmit() {

        if ((this.weatherProviderSelected('1') && !this.state.weatherKey) ||
                (this.weatherProviderSelected('3') && !this.state.forecastKey)) {
            alert(this._('Please enter a valid API key for the selected provider'));
            return;
        }

        if (this.state.heartHigh && isNaN(this.state.heartHigh)) {
            alert(this._('Value for high heart rate limit should be a number'));
            return;
        }

        if (this.state.heartLow && isNaN(this.state.heartLow)) {
            alert(this._('Value for low heart rate limit should be a number'));
            return;
        }

        if (this.props.onSubmit) {
            this.props.onSubmit(Object.assign({}, this.filterValidKeys(this.state, this.ignoreKeys, true)));
        }
    }


    getCurrentColors() {
        return this.colorKeys.reduce((colors, colorKey) => Object.assign({}, colors, {[colorKey]: this.state[colorKey]}), {})
    }

    isWeatherEnabled() {
        return this.isEnabled(this.weatherModules);
    }

    isHealthEnabled() {
        return this.isEnabled(this.healthModules) || this.state.showSleep;
    }

    isEnabled(moduleIndexes) {
        return (
            this.moduleStateKeys.some(key => moduleIndexes.indexOf(this.state[key]) !== -1) ||
            (this.state.showSleep && this.moduleSleepStateKeys.some(key => moduleIndexes.indexOf(this.state[key]) !== -1)) ||
            (this.state.showTap && this.moduleTapStateKeys.some(key => moduleIndexes.indexOf(this.state[key]) !== -1))
        )
    }

    isEnabledTap(moduleIndexes) {
        return (
            (this.state.showTap && this.moduleTapStateKeys.some(key => moduleIndexes.indexOf(this.state[key]) !== -1))
        )
    }

    weatherProviderSelected(index) {
        return [index].indexOf(this.state.weatherProvider) !== -1;
    }

    componentWillUpdate(nextProps, nextState) {
        this._ = getText.bind(this, getLocaleById(this.state.locale));
    }

    verifyLocation(loc) {
        console.log(loc);
        verifyLocation(loc, this.state.weatherProvider, this.state.weatherKey);
    }

    getEnabledModules() {
        let state = this.state;
        let modules = {
            'Default': (
                <div>
                    <SideBySideFields>
                        <DropdownField fieldName='top-left' label={this._('Top Left')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='top'
                            selectedItem={state.slotA} onChange={this.onChangeDropdown.bind(this, 'slotA')}/>
                        <DropdownField fieldName='top-right' label={this._('Top Right')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='top'
                            selectedItem={state.slotB} onChange={this.onChangeDropdown.bind(this, 'slotB')}/>
                    </SideBySideFields>
                    <SideBySideFields>
                        <DropdownField fieldName='bottom-left' label={this._('Bottom Left')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='bottom'
                            selectedItem={state.slotC} onChange={this.onChangeDropdown.bind(this, 'slotC')}/>
                        <DropdownField fieldName='bottom-right' label={this._('Bottom Right')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='bottom'
                            selectedItem={state.slotD} onChange={this.onChangeDropdown.bind(this, 'slotD')}/>
                    </SideBySideFields>
                </div>
            ),
        };

        if (state.showSleep) {
            modules['Sleep'] = (
                <div>
                    <SideBySideFields>
                        <DropdownField fieldName='top-left-sleep' label={this._('Top Left')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='top'
                            selectedItem={state.sleepSlotA} onChange={this.onChangeDropdown.bind(this, 'sleepSlotA')}/>
                        <DropdownField fieldName='top-right-sleep' label={this._('Top Right')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='top'
                            selectedItem={state.sleepSlotB} onChange={this.onChangeDropdown.bind(this, 'sleepSlotB')}/>
                    </SideBySideFields>
                    <SideBySideFields>
                        <DropdownField fieldName='bottom-left-sleep' label={this._('Bottom Left')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='bottom'
                            selectedItem={state.sleepSlotC} onChange={this.onChangeDropdown.bind(this, 'sleepSlotC')}/>
                        <DropdownField fieldName='bottom-right-sleep' label={this._('Bottom Right')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='bottom'
                            selectedItem={state.sleepSlotD} onChange={this.onChangeDropdown.bind(this, 'sleepSlotD')}/>
                    </SideBySideFields>
                </div>
            );
        }
        
        if (state.showTap) {
            modules['Tap'] = (
                <div>
                    <SideBySideFields>
                        <DropdownField fieldName='top-left-tap' label={this._('Top Left')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='top'
                            selectedItem={state.tapSlotA} onChange={this.onChangeDropdown.bind(this, 'tapSlotA')}/>
                        <DropdownField fieldName='top-right-tap' label={this._('Top Right')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='top'
                            selectedItem={state.tapSlotB} onChange={this.onChangeDropdown.bind(this, 'tapSlotB')}/>
                    </SideBySideFields>
                    <SideBySideFields>
                        <DropdownField fieldName='bottom-left-tap' label={this._('Bottom Left')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='bottom'
                            selectedItem={state.tapSlotC} onChange={this.onChangeDropdown.bind(this, 'tapSlotC')}/>
                        <DropdownField fieldName='bottom-right-tap' label={this._('Bottom Right')} options={this.modules}
                            searchable={false} clearable={false} labelPosition='bottom'
                            selectedItem={state.tapSlotD} onChange={this.onChangeDropdown.bind(this, 'tapSlotD')}/>
                    </SideBySideFields>
                </div>
            );
        }

        return modules;
    }

    getEnabledModulesRound() {
        let state = this.state;
        let modules = {
            'Default': (
                <div>
                    <DropdownField fieldName='top-left' label={this._('Top 1')} options={this.modules}
                        searchable={false} clearable={false}
                        selectedItem={state.slotA} onChange={this.onChangeDropdown.bind(this, 'slotA')}/>
                    <DropdownField fieldName='top-right' label={this._('Top 2')} options={this.modules}
                        searchable={false} clearable={false}
                        selectedItem={state.slotB} onChange={this.onChangeDropdown.bind(this, 'slotB')}/>
                    <DropdownField fieldName='bottom-left' label={this._('Bottom 1')} options={this.modules}
                        searchable={false} clearable={false}
                        selectedItem={state.slotC} onChange={this.onChangeDropdown.bind(this, 'slotC')}/>
                    <DropdownField fieldName='bottom-right' label={this._('Bottom 2')} options={this.modules}
                        searchable={false} clearable={false}
                        selectedItem={state.slotD} onChange={this.onChangeDropdown.bind(this, 'slotD')}/>
                </div>
            ),
        };

        if (state.showSleep) {
            modules['Sleep'] = (
                <div>
                    <DropdownField fieldName='top-left-sleep' label={this._('Top 1')} options={this.modules}
                        searchable={false} clearable={false} 
                        selectedItem={state.sleepSlotA} onChange={this.onChangeDropdown.bind(this, 'sleepSlotA')}/>
                    <DropdownField fieldName='top-right-sleep' label={this._('Top 2')} options={this.modules}
                        searchable={false} clearable={false}
                        selectedItem={state.sleepSlotB} onChange={this.onChangeDropdown.bind(this, 'sleepSlotB')}/>
                    <DropdownField fieldName='bottom-left-sleep' label={this._('Bottom 1')} options={this.modules}
                        searchable={false} clearable={false}
                        selectedItem={state.sleepSlotC} onChange={this.onChangeDropdown.bind(this, 'sleepSlotC')}/>
                    <DropdownField fieldName='bottom-right-sleep' label={this._('Bottom 2')} options={this.modules}
                        searchable={false} clearable={false}
                        selectedItem={state.sleepSlotD} onChange={this.onChangeDropdown.bind(this, 'sleepSlotD')}/>
                </div>
            );
        }

        if (state.showTap) {
            modules['Tap'] = (
                <div>
                    <DropdownField fieldName='top-left-tap' label={this._('Top 1')} options={this.modules}
                        searchable={false} clearable={false} 
                        selectedItem={state.tapSlotA} onChange={this.onChangeDropdown.bind(this, 'tapSlotA')}/>
                    <DropdownField fieldName='top-right-tap' label={this._('Top 2')} options={this.modules}
                        searchable={false} clearable={false}
                        selectedItem={state.tapSlotB} onChange={this.onChangeDropdown.bind(this, 'tapSlotB')}/>
                    <DropdownField fieldName='bottom-left-tap' label={this._('Bottom 1')} options={this.modules}
                        searchable={false} clearable={false}
                        selectedItem={state.tapSlotC} onChange={this.onChangeDropdown.bind(this, 'tapSlotC')}/>
                    <DropdownField fieldName='bottom-right-tap' label={this._('Bottom 2')} options={this.modules}
                        searchable={false} clearable={false}
                        selectedItem={state.tapSlotD} onChange={this.onChangeDropdown.bind(this, 'tapSlotD')}/>
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
                <VersionIndicator onClick={this.toggleDebug}/>

                {state.showDebug ?
                    <OptionGroup title={this._('Debug')}>
                        <ul className='debug-list'>
                        {
                            Object.keys(window.localStorage).map(key => {
                                return (
                                    <li key={key}>{key}: {window.localStorage[key]}</li>
                                )
                            })
                        }
                        </ul>
                        <button className='btn btn-danger' onClick={this.wipeConfigs}>Reset configs</button>
                    </OptionGroup>
                : null}

                <OptionGroup title={this._('General')}>
                    {this.platform !== 'chalk' ?
                        <RadioButtonGroup fieldName='textAlign' label='Text Align' options={[
                            {value: '0', label: this._('Left')},
                            {value: '1', label: this._('Center')},
                            {value: '2', label: this._('Right')},
                        ]} selectedItem={state.textAlign} onChange={this.onChange.bind(this, 'textAlign')}/>
                    : null}
                    <DropdownField fieldName='fontType' label='Font' options={this.fonts} selectedItem={state.fontType} onChange={this.onChangeDropdown.bind(this, 'fontType')}/>
                    <ToggleField fieldName='leadingZero' label={this._('Hours with leading zero')} checked={state.leadingZero} onChange={this.onChange.bind(this, 'leadingZero')}/>
                    <ToggleField fieldName='bluetoothDisconnect' label={this._('Vibrate on Bluetooth disconnect')} checked={state.bluetoothDisconnect} onChange={this.onChange.bind(this, 'bluetoothDisconnect')}/>
                    <ToggleField fieldName='updates' label={this._('Check for updates')} checked={state.update} onChange={this.onChange.bind(this, 'update')} />

                    {this.platform !== 'chalk' && this.plaform !== 'aplite' ?
                        <div>
                            <ToggleField fieldName='quickview' label={this._('Enable Quickview mode')} checked={state.quickview} onChange={this.onChange.bind(this, 'quickview')} />
                            <HelperText>{this._('Hides additional timezone and battery level and adjusts the layout when a timeline event is on the screen.')}</HelperText>
                        </div>
                    : null}

                    <DropdownField fieldName='timezones' label={this._('Additional Timezone')} options={this.timezones} searchable={true} clearable={false} selectedItem={state.timezones}  onChange={this.onChangeDropdown.bind(this, 'timezones')}/>
                </OptionGroup>

                <OptionGroup title={this._('Modules')}>
                    <TabContainer tabs={this.platform === 'chalk' ? this.getEnabledModulesRound() : this.getEnabledModules()} />
                    {this.isEnabled(['15']) && !this.isEnabledTap(['15']) ?
                        <HelperText standalone={true}>{this._('<strong>Alert:</strong> Keeping the compass enabled all the time could drain battery faster. It\'s recommend setting it as a \'Tap\' module (enable tap mode below).')}</HelperText>
                    : null}
                    {this.platform !== 'aplite' ?
                        <div>
                            <ToggleField fieldName='showSleep' label={this._('Enable after wake up mode')} checked={state.showSleep} onChange={this.onChange.bind(this, 'showSleep')} />
                            <HelperText>{this._('If set, the watchface will show the modules under the \'Sleep\' tab from when you\'re asleep until half an hour after you wake up, switching back to the \'Default\' tab after that. This feature requires Pebble Health enabled.')}</HelperText>
                        </div>
                    : null}
                    <Versioned minVersion="4.0" version={this.currentVersion}>
                        <ToggleField fieldName='showTap' label={this._('Enable tap mode')} checked={state.showTap} onChange={this.onChange.bind(this, 'showTap')} />
                        <HelperText>{this._('<strong>Experimental feature:</strong> If set, the watchface will show the modules under the \'Tap\' tab for the amount of time selected below when you tap the watch screen, switching back to the previous view after that. Keep in mind that tap detection is a bit rudimentary because of pebble\'s accelerometer, so light taps might not work. Enabling this feature might drain the battery a bit faster than usual.')}</HelperText>
                        {this.state.showTap ?
                            <RadioButtonGroup fieldName='tapTime' label='Tap mode duration' options={[
                                {value: '5', label: this._('5s')},
                                {value: '7', label: this._('7s')},
                                {value: '10', label: this._('10s')},
                            ]} selectedItem={state.tapTime} onChange={this.onChange.bind(this, 'tapTime')}/>
                        : null}
                    </Versioned>
                </OptionGroup>

                <OptionGroup title={this._('Localization')}>
                    <DropdownField fieldName='locale' label={this._('Language')} options={this.locales} searchable={true} clearable={false} selectedItem={state.locale} onChange={this.onChangeDropdown.bind(this, 'locale')}/>
                    <DropdownField fieldName='dateFormat' label={this._('Date format')} options={this.dateFormatOptions} searchable={false} clearable={false} selectedItem={state.dateFormat} onChange={this.onChangeDropdown.bind(this, 'dateFormat')}/>
                    <Versioned maxVersion="3.8" version={this.currentVersion}>
                        <RadioButtonGroup fieldName='dateSeparator' label='Date separator' options={[
                            {value: '0', label: this._('(space)')},
                            {value: '1', label: this._('.')},
                            {value: '2', label: this._('/')},
                        ]} selectedItem={state.dateSeparator} onChange={this.onChange.bind(this, 'dateSeparator')}/>
                    </Versioned>
                    <Versioned maxVersion="4.0" version={this.currentVersion}>
                        <RadioButtonGroup fieldName='dateSeparator' label='Date separator' options={[
                            {value: '0', label: this._('(space)')},
                            {value: '1', label: this._('.')},
                            {value: '2', label: this._('/')},
                            {value: '3', label: this._('-')},
                        ]} selectedItem={state.dateSeparator} onChange={this.onChange.bind(this, 'dateSeparator')}/>
                    </Versioned>
                </OptionGroup>

                <OptionGroup title={this._('Colors')}>
                    <ColorPicker fieldName='backgroundColor' label={this._('Background color')} color={state.bgColor} onChange={this.onChange.bind(this, 'bgColor')} />
                    <ColorPicker fieldName='textColor' label={this._('Foreground color')} color={state.hoursColor} onChange={this.onChange.bind(this, 'hoursColor')} />
                    <ToggleField fieldName='enableAdvanced' label={this._('Advanced Colors')} checked={state.enableAdvanced} onChange={this.onChange.bind(this, 'enableAdvanced')} />
                    <HelperText>{this._('Enables specific color configuration for watchface items. If disabled, all text will have the same color as the selection for \'Foreground Color\' above. This also lets you save and load color presets.')}</HelperText>
                    {state.enableAdvanced ?
                        <div>
                            <ColorPicker fieldName='dateColor' label={this._('Date color')} color={state.dateColor} onChange={this.onChange.bind(this, 'dateColor')} />
                            <ColorPicker fieldName='altHoursColor' label={this._('Alternate time color')} color={state.altHoursColor} onChange={this.onChange.bind(this, 'altHoursColor')} />
                            <ColorPicker 
                                fieldName='batteryColor' label={this._('Battery/Low Battery color')} color={state.batteryColor} onChange={this.onChange.bind(this, 'batteryColor')} 
                                secondColor={state.batteryLowColor} onSecondColorChange={this.onChange.bind(this, 'batteryLowColor')} />
                            <ColorPicker fieldName='bluetoothColor' label={this._('Bluetooth disconnected')} color={state.bluetoothColor} onChange={this.onChange.bind(this, 'bluetoothColor')} />
                            <ColorPicker fieldName='updateColor' label={this._('Update notification')} color={state.updateColor} onChange={this.onChange.bind(this, 'updateColor')} />
                            {this.isEnabled(['1']) ?
                                <ColorPicker
                                    fieldName='weatherColor' label={this._('Weather icon/temperature')} color={state.weatherColor} onChange={this.onChange.bind(this, 'weatherColor')}
                                    secondColor={state.tempColor} onSecondColorChange={this.onChange.bind(this, 'tempColor')}/>
                            : null}
                            {this.isEnabled(['2']) ?
                                <ColorPicker
                                    fieldName='minMaxTemp' label={this._('Min/Max temperature')} color={state.minColor} onChange={this.onChange.bind(this, 'minColor')}
                                    secondColor={state.maxColor} onSecondColorChange={this.onChange.bind(this, 'maxColor')}/>
                            : null}
                            {this.isEnabled(['3']) ?
                                <ColorPicker
                                    fieldName='stepsColor' label={this._('Steps/falling behind')} color={state.stepsColor} onChange={this.onChange.bind(this, 'stepsColor')}
                                    secondColor={state.stepsBehindColor} onSecondColorChange={this.onChange.bind(this, 'stepsBehindColor')} />
                            : null}
                            {this.isEnabled(['4']) ?
                                <ColorPicker
                                    fieldName='distColor' label={this._('Distance/falling behind')} color={state.distColor} onChange={this.onChange.bind(this, 'distColor')}
                                    secondColor={state.distBehindColor} onSecondColorChange={this.onChange.bind(this, 'distBehindColor')} />
                            : null}
                            {this.isEnabled(['5']) ?
                                <ColorPicker
                                    fieldName='calColor' label={this._('Calories/falling behind')} color={state.calColor} onChange={this.onChange.bind(this, 'calColor')}
                                    secondColor={state.calBehindColor} onSecondColorChange={this.onChange.bind(this, 'calBehindColor')} />
                            : null}
                            {this.isEnabled(['6']) ?
                                <ColorPicker
                                    fieldName='sleepColor' label={this._('Sleep/falling behind')} color={state.sleepColor} onChange={this.onChange.bind(this, 'sleepColor')}
                                    secondColor={state.sleepBehindColor} onSecondColorChange={this.onChange.bind(this, 'sleepBehindColor')} />
                            : null}
                            {this.isEnabled(['7']) ?
                                <ColorPicker
                                    fieldName='deepColor' label={this._('Deep sleep/falling behind')} color={state.deepColor} onChange={this.onChange.bind(this, 'deepColor')}
                                    secondColor={state.deepBehindColor} onSecondColorChange={this.onChange.bind(this, 'deepBehindColor')} />
                            : null}
                            {this.isEnabled(['8']) ?
                                <ColorPicker
                                    fieldName='windSpeedColor' label={this._('Wind direction/speed')} color={state.windDirColor} onChange={this.onChange.bind(this, 'windDirColor')}
                                    secondColor={state.windSpeedColor} onSecondColorChange={this.onChange.bind(this, 'windSpeedColor')} />
                            : null}
                            {this.isEnabled(['11']) ?
                                <ColorPicker fieldName='sunriseColor' label={this._('Sunrise')} color={state.sunriseColor} onChange={this.onChange.bind(this, 'sunriseColor')} />
                            : null}
                            {this.isEnabled(['12']) ?
                                <ColorPicker fieldName='sunsetColor' label={this._('Sunset')} color={state.sunsetColor} onChange={this.onChange.bind(this, 'sunsetColor')} />
                            : null}
                            <Versioned minVersion="3.7" version={this.currentVersion}>
                                {this.isEnabled(['13']) ?
                                    <ColorPicker
                                        fieldName='activeColor' label={this._('Active time/falling behind')} color={state.activeColor} onChange={this.onChange.bind(this, 'activeColor')}
                                        secondColor={state.activeBehindColor} onSecondColorChange={this.onChange.bind(this, 'activeBehindColor')} />
                                : null}
                            </Versioned>
                            <Versioned minVersion="4.0" version={this.currentVersion}>
                                {this.isEnabled(['14']) ?
                                    <div>
                                        <ColorPicker
                                            fieldName='heartColor' label={this._('Heart rate/outside limits')} color={state.heartColor} onChange={this.onChange.bind(this, 'heartColor')}
                                            secondColor={state.heartColorOff} onSecondColorChange={this.onChange.bind(this, 'heartColorOff')} />
                                        <HelperText>{this._('Set upper and lower limits in the health section below.')}</HelperText>
                                    </div>
                                : null}
                                {this.isEnabled(['15']) ?
                                    <ColorPicker fieldName='compassColor' label={this._('Compass')} color={state.compassColor} onChange={this.onChange.bind(this, 'compassColor')} />
                                : null}
                            </Versioned>
                        </div>
                    : null}
                </OptionGroup>

                {state.enableAdvanced ?
                    <OptionGroup title={this._('Color Presets')}>
                        <ColorPresets colors={this.getCurrentColors()} onSelect={this.onPresetSelect}/>
                    </OptionGroup>
                : null}

                <Versioned minVersion="4.0" version={this.currentVersion}>
                    {this.isEnabled(['14']) ?
                        <OptionGroup title={this._('Health')}>
                            <TextField fieldName='heartLow'
                                label={this._('Lower heart rate limit')}
                                value={state.heartLow}
                                onChange={this.onChange.bind(this, 'heartLow')}/> 
                            <TextField fieldName='heartHigh'
                                label={this._('Upper heart rate limit')}
                                value={state.heartHigh}
                                onChange={this.onChange.bind(this, 'heartHigh')}/>
                            <HelperText>{this._('If any of the values are set and different than zero we\'ll show the heart rate in a different color when it\'s below the lower limit or above the upper limit.')}</HelperText>
                        </OptionGroup>
                    : null}
                </Versioned>

                {this.isWeatherEnabled() ?
                    <OptionGroup title={this._('Weather')}>
                        <DropdownField fieldName='provider' label={this._('Weather provider')} options={[
                            {value: '0', label: 'OpenWeatherMap'},
                            {value: '1', label: 'WeatherUnderground'},
                            {value: '2', label: 'Yahoo'},
                            {value: '3', label: 'Dark Sky/Forecast.io'},
                        ]} selectedItem={state.weatherProvider} onChange={this.onChangeDropdown.bind(this, 'weatherProvider')}/>

                        {this.weatherProviderSelected('1') ?
                            <div>
                                <TextField fieldName='weatherKey'
                                    label={this._('API Key')}
                                    value={state.weatherKey}
                                    onChange={this.onChange.bind(this, 'weatherKey')}/> 
                                <HelperText>{this._('<strong>Note:</strong> For WeatherUnderground, you need an API key. Go to <a href="http://www.wunderground.com/weather/api/?apiref=73d2b41a1a02e3bd">wunderground.com</a> to create a free account and get a key and insert it above.')}</HelperText>
                            </div>
                        : null}
                        {this.weatherProviderSelected('3') ?
                            <div>
                                <TextField fieldName='forecastKey'
                                    label={this._('API Key')}
                                    value={state.forecastKey}
                                    onChange={this.onChange.bind(this, 'forecastKey')}/> 
                                <HelperText>{this._('<strong>Note:</strong> For Dark Sky/Forecast.io, you need an API key. Go to <a href="https://darksky.net/dev/">darksky.net/dev/</a> to create a free account and get a key and insert it above.')}</HelperText>
                            </div>
                        : null}

                        {this.isEnabled(['1', '2']) ?
                            <ToggleField fieldName='useCelsius' label={this._('Use Celsius')} checked={state.useCelsius} onChange={this.onChange.bind(this, 'useCelsius')} />
                        : null}

                        <Versioned minVersion="4.0" version={this.currentVersion}>
                            {this.isEnabled(['1', '2', '8', '11', '12']) ?
                                <RadioButtonGroup fieldName='weatherTime' label={this._('Weather refresh interval')} options={[
                                    {value: '10', label: '10min'},
                                    {value: '15', label: '15min'},
                                    {value: '30', label: '30min'},
                                ]} selectedItem={state.weatherTime} onChange={this.onChange.bind(this, 'weatherTime')}/>
                            : null}
                        </Versioned>

                        {this.isEnabled(['8']) ?
                            <RadioButtonGroup fieldName='speedUnit' label={this._('Speed unit')} options={[
                                {value: '0', label: 'mph'},
                                {value: '1', label: 'km/h'},
                                {value: '2', label: 'knots'},
                            ]} selectedItem={state.speedUnit} onChange={this.onChange.bind(this, 'speedUnit')}/>
                        : null}

                        <TextField fieldName='overrideLocation' buttonLabel={this._('Verify')}
                            label={this._('Manual Location')} labelPosition='top'
                            value={state.overrideLocation}
                            onButtonClick={this.verifyLocation}
                            onChange={this.onChange.bind(this, 'overrideLocation')}/>
                        <HelperText>{this._('If you define a manual location, we won\'t try to use your current location for weather info. (max. length 64 characters). <strong>Note</strong>: If you\'re not sure the city you entered is working, use the \'Verify\' button to check if it\'s a valid location.')}</HelperText>
                    </OptionGroup>
                : null}

                <div className='block--footer'>
                    <HelperText standalone={true}>{this._('Remember to save to apply your settings.')}</HelperText>
                    <HelperText standalone={true}>{this._('Fonts: <a href="http://www.dafont.com/blocko.font">Blocko</a>, <a href="https://fontlibrary.org/en/font/osp-din">OSP-DIN</a>, <a href="https://www.google.com/fonts/specimen/Archivo+Narrow">Archivo Narrow</a> and <a href="http://www.dafont.com/prototype.font">Prototype</a>.<br />Weather font used: <a href="https://erikflowers.github.io/weather-icons/">Erik Flower\'s Weather Icons</a>.')}</HelperText>
                    <HelperText standalone={true}>{this._('If you like Timeboxed, please consider donating ;)')}</HelperText>
                    <DonateButton />

                    <div className='block--submit'>
                        <button onClick={this.onSubmit} className='btn btn-primary btn-lg btn-submit'>{this._('Save settings')}</button>
                    </div>
                </div>
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
