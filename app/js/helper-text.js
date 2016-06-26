import React, { PropTypes } from 'react';
import classnames from 'classnames';

const HelperText = (props) => {
    let classes = classnames({
        'helper-text': true,
        'helper-text--field': !props.standalone,
        'helper-text--standalone': props.standalone,
    });
    return (
        <div className={classes} dangerouslySetInnerHTML={{__html: props.children}}>
        </div>
    );
};

HelperText.propTypes = {
    
}

HelperText.defaultProps = {
    
}

export default HelperText
