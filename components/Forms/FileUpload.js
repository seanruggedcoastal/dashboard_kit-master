import React, { useMemo } from 'react'
import {connect, getIn} from 'formik'
import {useDropzone} from 'react-dropzone'
import styled from 'styled-components'



/* ******************************************** */
/* ******************************************** */

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

const Container = styled.div`
  &>p{
    font-size: 11px;
    padding: 8px;
    background: white;
    border: 1px solid ${p => p.theme.border || 'transparent'};

    &>span{
      display: block;
      font-size: 16px;
      margin-bottom: 8px;
    }
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

/* ******************************************** */
/* ******************************************** */

const FileUpload = props => {

  const { id, disabled, options,
    formik, label, error,
    ...rest } = props;
    
  const value = useMemo(() => getIn(formik.values, id) || null,[ getIn(formik.values, id) ])


  const onChange = (files) => {

    if(disabled) return;

    formik.handleChange({
      target: {
        id,
        value: (files && files[0]) || null
      }
    })
  }

  const onBlur = (files) => {
    if(disabled) return;
    formik.handleBlur({ target: { id } })
  }

  const {getRootProps, getInputProps} = useDropzone({
    onDropAccepted: onChange,
    onFileDialogCancel: onBlur,
    onDragLeave: onBlur,
    disabled: !!disabled,
    noDrop: true,
    multiple: false,
    ...rest
  })

  return (
    <InputWrapper>
    {label ? <Label htmlFor={id} error={formik.touched[id] && formik.errors[id]}>
      {label}
    </Label> : null}

    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      <p>{value ? <><span>{value.name || value}</span><br /></> : '' }Click to Select File</p>
    </Container>

    <InputFeedback error={formik.touched[id] && formik.errors[id]} />
  </InputWrapper>
  )


}

export default connect(FileUpload)
