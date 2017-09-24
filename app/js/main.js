import { getReturnUrl } from './util/util';
if (!Object.assign) {
    Object.prototype.assign = objectAssign;
}

import Layout from './layout';
es6Promise.polyfill();

import React from 'react';
import ReactDOM from 'react-dom';
import es6Promise from 'es6-promise';
import objectAssign from 'object-assign';

try {
    const onSubmit = (data) => {
        storeData(data);
        document.location = getReturnUrl() + encodeURIComponent(JSON.stringify(formatDataToSend(data)));
    };

    const storeData = (data) => {
        Object.keys(data).map((key) => {
            localStorage[key] = data[key];
        });
    };

    const getStoredData = () => {
        return Object.keys(localStorage).reduce((data, key) => {
            if (key === 'presets') {
                return data;
            }

            let value = localStorage[key] || '';

            value = value === 'true' || value === 'false' ? JSON.parse(value) : value;
            value = typeof value === 'string' && value.indexOf('0x') !== -1 ? value.replace('0x', '#') : value;

            return Object.assign(data, { [key]: value });
        }, {});
    };

    const formatDataToSend = (data) => {
        let newData = Object.keys(data).reduce((items, key) => {
            items[key] = data[key];

            if (key.indexOf('Color') !== -1) {
                items[key] = items[key].replace('#', '0x');
            }

            return items;
        }, {});

        return newData;
    };

    ReactDOM.render(<Layout onSubmit={onSubmit} state={getStoredData()} />, document.getElementById('content'));
} catch (ex) {
    alert(ex.stack);
}
