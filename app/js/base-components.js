import React from 'react';
import { getFirstKeyFromObject } from './util/util';

class SelectableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedItem: (typeof props.selectedItem !== 'undefined' ? props.selectedItem : getFirstKeyFromObject(props.options))};
    }
}

SelectableComponent.propTypes = {
    selectedItem: React.PropTypes.string,
    options: React.PropTypes.object.isRequired,
    fieldName: React.PropTypes.string.isRequired,
    label: React.PropTypes.string
}

export { SelectableComponent }
