import React from 'react'
import {connect} from 'formik'
import styled from 'styled-components'

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  label {
    color: ${props => props.theme.normalText};
    margin-bottom: 8px;
    margin-top: 1rem;
  }

  .input-feedback {
    color: ${props => props.theme.altColor};
  }
`

const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null;

const Label = ({ error, className, children, ...props }) => {
  return (
    <label {...props}>
      {children}
    </label>
  );
};

const TextInput = (props) => {
  return (
  <InputWrapper>
    {props.label ? <Label htmlFor={props.id} error={props.error}>
      {props.label}
    </Label> : null}


    <input
      id={props.id}
      type={props.type}
      value={props.formik.values[props.id]}
      onChange={props.formik.handleChange}
      onBlur={props.formik.handleBlur}
      error={props.formik.touched[props.id] && props.formik.errors[props.id]}
      {...props}
    />



    <InputFeedback error={props.formik.touched[props.id] && props.formik.errors[props.id]} />
  </InputWrapper>
  )
}


export default connect(TextInput)