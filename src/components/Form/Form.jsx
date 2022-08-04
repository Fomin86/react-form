import React, { useEffect, useState } from 'react';
import styles from './Form.module.css';
import Field from '../Field/Field';
import Button from '../Button/Button';

const Form = () => {
  const initialValues = {
    login: '',
    password: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    setFormValues({ ...formValues, [name]: value });
    setIsSubmit(false)
    setFormErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit ) {
      console.log(JSON.stringify(formValues, null, 2));
    }
  }, [formErrors, isSubmit, formValues]);

  const validate = (values) => {
    const errors = {};
    if (!values.login) {
      errors.login = "Это поле не может быть пустым.";
    } else if(values.login.length <= 3) {
      errors.login = "Логин должен быть больше трех символов"
    }
    if (!values.password) {
      errors.password = "Это поле не может быть пустым.";
    } else if(values.password.length <= 3) {
      errors.password = "Пароль должен быть больше трех символов"
    }
    return errors;
  }

  return (
    <form className={styles.FormAuth} onSubmit={handleSubmit}>
      <Field 
        name="login" 
        type="text" 
        id="login" 
        value={formValues} 
        handleChange={handleChange} 
        formErrors={formErrors.login}
      >
        Логин
      </Field>
      <Field 
        name="password" 
        type="password" 
        id="password" 
        value={formValues} 
        handleChange={handleChange} 
        formErrors={formErrors.password}
      >
        Пароль
      </Field>
      <Button type="submit" className="Button_primary">Войти</Button>
    </form>
  );
}

export default Form;