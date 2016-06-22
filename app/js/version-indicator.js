import React, { PropTypes } from 'react';

const VersionIndicator = (props) => {
  return (
        <span className='version'>v{props.version}
        {props.latest !== props.version ?
            <span className='update'>[v{props.latest} available]</span>
        : null}
        </span>
  );
};

VersionIndicator.propTypes = {
    
}

VersionIndicator.defaultProps = {
    
}

export default VersionIndicator
