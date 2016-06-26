import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import { getReturnUrl } from './util/util';


const onSubmit = (data) => {
    storeData(data);
    document.location = getReturnUrl() + encodeURIComponent(JSON.stringify(formatDataToSend(data)));
}

const storeData = (data) => {
    Object.keys(data).map(key => {
        localStorage[key] = data[key];
    });
    console.log(data);
}

const getStoredData = () => {
    return Object.keys(localStorage).reduce((data, key) => {
        if (key === 'presets') {
            return data;
        }

        let value = localStorage[key] || '';

        value = value === 'true' || value === 'false' ? JSON.parse(value) : value;
        value = value instanceof String && value.indexOf('0x') !== -1 ? value.replace('0x', '#') : value;

        return Object.assign(data, {[key]: value}); 
    }, {});
}

const formatDataToSend = (data) => {
    let newData = Object.keys(data).reduce((items, key) => {
        items[key] = data[key];
        
        if (key.indexOf('Color') !== -1) {
            items[key] = items[key].replace('#', '0x');
        }

        return items;
    }, {});

    console.log(newData);
    return newData;
}

ReactDOM.render(
    <Layout onSubmit={onSubmit} state={getStoredData()} />,
    document.getElementById('content')
);
