import RadioButtonGroup from './button-group';
import DropdownField from './dropdown';
import ToggleField from './toggle';
import React from 'react';
import ReactDOM from 'react-dom';

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
    </div>,
    document.getElementById('content')
);
