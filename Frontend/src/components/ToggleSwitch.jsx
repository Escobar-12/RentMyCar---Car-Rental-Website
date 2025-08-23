import React from 'react';

const ToggleSwitch = ({ checked, onChange, disabled }) => {
  return (
    <label className="switch">
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange} disabled={disabled} 
      />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleSwitch;
