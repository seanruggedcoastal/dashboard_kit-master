import React from 'react'
import {connect} from 'formik'
import styled from 'styled-components'

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  margin-right: 1rem;

  label {
    margin-bottom: 0;
  }
`

const LabelWrapper = styled.label`
  span {
    margin-left: 0.5rem;
  }
`


const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null;

const Label = ({ error, className, children, ...props }) => {
  return (
    <LabelWrapper className="label" {...props}>
      {children}
    </LabelWrapper>
  );
};

const Checkbox = (props) => {
  return (
    <CheckboxWrapper>

      {!props.label && <input
        id={props.id}
        type={'checkbox'}
        onBlur={props.formik.handleBlur}
        error={props.formik.touched[props.id] && props.formik.errors[props.id]}
        {...props}
      />}

      {props.label ? <Label htmlFor={props.id} error={props.error}>
        <input
          id={props.id}
          type={'checkbox'}
          onBlur={props.formik.handleBlur}
          error={props.formik.touched[props.id] && props.formik.errors[props.id]}
          {...props}
        />
        <span>{props.label}</span>
      </Label> : null}


      <InputFeedback error={props.formik.touched[props.id] && props.formik.errors[props.id]} />
    </CheckboxWrapper>
  )
}


export default connect(Checkbox)