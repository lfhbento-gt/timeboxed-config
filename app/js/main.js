import React from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from './color-picker';
import DropdownField from './dropdown';
import RadioButtonGroup from './button-group';
import ToggleField from './toggle';

ReactDOM.render(
    <div>
        <RadioButtonGroup fieldName='font' label='Font' options={{
            '0': 'Blocko',
            '1': 'Bloco (big)',
            '2': 'Pebble fonts'
        }} selectedItem='2'/>
        <DropdownField fieldName='font' label='Font' options={{
            '0': 'Blocko',
            '1': 'Bloco (big)',
            '2': 'Pebble fonts',
            '3': 'Archivo',
            '4': 'Din',
            '5': 'Prototype'
        }} selectedItem='3'/>
        <ToggleField fieldName='health' label='Enable Health' />
        <ColorPicker fieldName='backgroundColor' label='Background' color='#999' />
        <ColorPicker fieldName='hoursColor' label='Hours' color='#999' />
        <ToggleField fieldName='sleep' label='Enable Sleep' />
    </div>,
    document.getElementById('content')
);
