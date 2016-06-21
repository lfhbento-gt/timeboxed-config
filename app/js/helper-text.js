import React, { PropTypes } from 'react';

const HelperText = (props) => {
  
  return (
        <div className='helper-text'>
            {props.children}
        </div>
  );
};

HelperText.propTypes = {
    
}

HelperText.defaultProps = {
    
}

export default HelperText
