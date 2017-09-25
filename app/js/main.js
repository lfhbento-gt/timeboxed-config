import { getConfigs, getCurrentVersion, getReturnUrl } from './util/util';
import { shouldShow } from './versioned';
import LZString from './util/lz-string';
import Layout from './layout';
import React from 'react';
import ReactDOM from 'react-dom';
import es6Promise from 'es6-promise';

es6Promise.polyfill();

try {
    const onSubmit = (data) => {
        if (shouldShow(getCurrentVersion(), null, '4.4')) {
            storeData(data);
        }
        document.location = getReturnUrl() + LZString.compressToBase64(JSON.stringify(formatDataToSend(data)));
    };

    const storeData = (data) => {
        Object.keys(data).map((key) => {
            localStorage[key] = data[key];
        });
    };

    const getStoredData = (source) => {
        return Object.keys(source).reduce((data, key) => {
            let value = source[key] || '';

            value = value === 'true' || value === 'false' ? JSON.parse(value) : value;
            value = typeof value === 'string' && value.indexOf('0x') !== -1 ? value.replace('0x', '#') : value;

            return Object.assign(data, { [key]: value });
        }, {});
    };

    const getStoredDataFromLocalStorage = () => getStoredData(localStorage);

    const getStoredDataFromParams = () => {
        let config = getConfigs();
        config = config ? JSON.parse(config) : {};
        return getStoredData(config);
    };

    const getConfigState = () => {
        let configs = getStoredDataFromParams();
        if (Object.keys(configs).length === 0) {
            configs = getStoredDataFromLocalStorage();
        }

        return configs;
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

    ReactDOM.render(<Layout onSubmit={onSubmit} state={getConfigState()} />, document.getElementById('content'));
} catch (ex) {
    alert(ex.stack);
}
