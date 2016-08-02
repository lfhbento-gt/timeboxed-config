import React, { PropTypes } from 'react';
import { getText } from './lang';
import { getCurrentVersion, checkForUpdates } from './util/util';

class VersionIndicator extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            version: getCurrentVersion(),
            latest: getCurrentVersion(),
            hasUpdate: false,
        }
        this.onClick = this.onClick.bind(this);
    }

    componentWillMount() {
        checkForUpdates((hasUpdate, newVersion) => {
            if (hasUpdate) {
                this.setState({
                    hasUpdate,
                    latest: newVersion
                });
            }
        });
    }

    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        return (
            <span className='version' onClick={this.onClick}>{this.state.version ? `v${this.state.version}` : ' '}
            {this.state.hasUpdate ?
                <span className='update'>{getText(this.context.locale, '[v${version} available]', {version: this.state.latest})}</span>
            : null}
            </span>
        );
    }
};

VersionIndicator.propTypes = {
    
}

VersionIndicator.defaultProps = {
    
}

VersionIndicator.contextTypes = {
    locale: PropTypes.string
}

export default VersionIndicator
