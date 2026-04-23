import type { InputHTMLAttributes, ReactNode } from "react";
import styles from './Input.module.css'


export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
}

export const Input = (props: InputProps) => {
  const {className, error, icon, ...otherProps} = props;

  const containerClasses = [
    styles.container,
    className
  ].join(' ');

  const inputClasses = [
    styles.input,
    icon ? styles.withIcon : '',
    error ? styles.error: ''
  ].join(' ');


  return (
    <div className={containerClasses}>
      {error && <span className={styles.errorMessage}>{error}</span>}
      <div className={styles.inputWrapper}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <input className={inputClasses} {...otherProps}></input>
      </div>
    </div>
  )
}