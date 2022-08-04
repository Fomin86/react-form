import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Button.module.css';

const Button = (props) => {
  const { type, className, children, onClick, ...attrs } = props;
    
  const Tag = attrs.href ? 'a' : 'button';
   
  const classes = className.split(' ').map(i => { 
    return styles[i];
  });

  return (
    <Tag
      type={type}
      className={classNames(styles.Button, classes)}
      onClick={onClick}
      {...attrs}
    >
      {children}
    </Tag>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  className: '',
  children: '',
  onClick: () => {},
};

export default Button;