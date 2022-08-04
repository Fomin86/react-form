import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Field.module.css';
import Button from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const Field = (props) => {    
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [activeLabel, setActiveLabel] = useState(false)
  
  const { name, id, children, type = 'text', handleChange, formErrors } = props;
  const togglePasswordVisibility = () => {
    setIsPasswordShow(!isPasswordShow);
    setActiveLabel(true);
  }

  const handleFocus = () => {
    setActiveLabel(true);
  }

  const handleBlur = (e) => {
    const isEmptyValue = (e.target.value === '');
    setActiveLabel(!isEmptyValue);    
  }
  
  return (
    <div className={styles.Fieldset} >
      <input
        name={name}
        type={isPasswordShow ? 'text' : type}
        id={id}
        placeholder={children}
        className={formErrors ? `${styles.Input} + ${styles.Error}` : styles.Input}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <label
        className={activeLabel ? `${styles.Label} + ${styles.LabelAnimation}` : styles.Label}
        htmlFor={id}
      />
      {(type === 'password') && (
        <Button
          className="Button_materialIcons material-icons" 
          onClick={togglePasswordVisibility}
        >
          {isPasswordShow ? 'visibility' : 'visibility_off'}
        </Button>
      )}
      {(formErrors) && (
        <ErrorMessage>{formErrors}</ErrorMessage>
      )}
    </div>
  );
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.node,  
  handleChange: PropTypes.func,
  formErrors: PropTypes.string,
};

Field.defaultProps = {
  children: '',
  handleChange: () => {},
};

export default Field;