import React from 'react'
import { withFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../Button'

const formikEnhancer = withFormik({
  validationSchema: (props) => {
    return Yup.object().shape(props.validation)
  },
  mapPropsToValues: ({ intialValues }) => ({
    ...intialValues,
  }),
  handleSubmit: (payload, { props, setSubmitting, resetForm }) => {
    props.submit(payload)
    setSubmitting(false);
    resetForm()
  },
  displayName: 'MyForm',
});

const Form = (props) => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
  } = props;
  return (
    <form onSubmit={handleSubmit}>

        {props.children}

      <Button type="submit" disabled={isSubmitting}>
        {props.buttonText || 'Submit'}
      </Button>
    </form>
  )
}


export default formikEnhancer(Form);