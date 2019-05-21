import React, { Component, Fragment } from 'react'
import classNames from 'classnames'

import './Input.scss'

class Input extends Component<Props> {

  render() {
    const {
      label,
      name,
      type,
      onChange,
      onClick,
      className,
      isValid,
      autoComplete,
      autoFocus,
      placeholder,
      value,
      onLabelClick,
      labelClassName,
      tooltip,
      unit,
      readOnly,
      errorMessage,
      madeDate,
      maxLength,
      isError,
    } = this.props

    return (
      <div className={classNames('Input', className)}>
        <div className={classNames('Input__inner', {
          'Input__inner--valid': isValid !== undefined && isValid !== null && isValid,
          'Input__inner--invalid': isValid !== undefined && isValid !== null && !isValid,
          'Input__inner--error': errorMessage,
        })}
        >
          {label && (
            <label
              onClick={onLabelClick}
              htmlFor={'input-' + name}
              className={classNames('Input__label', labelClassName)}
            >
              {label}
            </label>
          )}
          <input
            className="Input__input"
            onClick={onClick}
            placeholder={placeholder}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            id={'input-' + name}
            name={name}
            onChange={onChange}
            type={type}
            value={value}
            readOnly={readOnly}
            maxLength={maxLength}
          />
          {unit && <span className="Input__unit">{unit}</span>}
        </div>
        {errorMessage !== undefined && (
          <p className={classNames('Input__error', {'show':errorMessage})}>{errorMessage || ''}</p>
        )}

        {madeDate ? <p className={classNames('Input__error', {'text__error':isError})}>{madeDate}</p> :
          ''
        }
    </div>
    )
  }
}

export default Input
