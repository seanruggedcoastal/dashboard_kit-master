import React, { useMemo, useState, useEffect } from 'react'
import { connect, getIn } from 'formik'
import {useDropzone} from 'react-dropzone'
import styled, { css } from 'styled-components'


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


const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null;

const Label = ({ error, className, children, ...props }) => {
  return (
    <label {...props}>
      {children}
    </label>
  );
};

const Container = styled.div`

  .input-div{

    background-color: white;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: ${p => p.image ? `url(${p.image})` : '' };
    border: 1px solid ${p => p.theme.border || 'transparent'};
    border-radius: 2px;
    position: relative;
    min-height: 233px;

    p{
      position: absolute;
      top:50%;
      left:0;
      width: 100%;
      transform: translate(0, -50%);
      padding: 21px;
      font-size: 12px;
      text-align: center;
      background: rgba(255,255,255,0.8)
    }
  }

  a.input-remove{
    display: block;
    padding: 13px 8px;
    text-decoration: none;
    background-color: white;
    border: 1px solid ${p => p.theme.border || 'transparent'};
    border-top: none;
    text-align: center;
    color: ${p => p.haveValue ? p.theme.normalText || 'transparent' : p.theme.lightGray};
    font-size: 12px;
  }

  ${p => p.haveValue ? css`
    a.input-remove:hover{
      color: red;
    }

    a.input-remove:active{
      opacity: 0.5
    }
  ` : ''}


`
/* ******************************************** */
/* ******************************************** */

const ImageUpload = (props) => {

  const {
    formik,
    disabled,
    id, label
  } = props;

  const onChange = (file) => {
    if(disabled) return;
    formik.handleChange({
      target: {
        id,
        value: file[0]
      }
    })
  }

  const onBlur = () => {
    if(disabled) return;
    formik.handleBlur({
      target: { id }
    })
  }

  const removeImage = () => !disabled && onChange([null])

  const [backgroundImage, setBackgroundImage ] = useState('')
  useEffect(() => {

    const val = getIn(formik.values, id)
    if(!val) return setBackgroundImage('');
    if(typeof val === 'string') return setBackgroundImage(val);

    const reader = new FileReader();
    reader.onload = () => { setBackgroundImage(reader.result) };
    reader.readAsDataURL(val);

  },[ getIn(formik.values, id) ]);

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDropAccepted: onChange,
    onFileDialogCancel: onBlur,
    onDragLeave: onBlur,
    disabled: !!disabled,
    multiple: false
  })

  return (<InputWrapper>

    {label ? <Label htmlFor={id} error={getIn(formik.touched, id) && getIn(formik.errors,id)}>{label}</Label> : null}

    <Container image={backgroundImage} haveValue={getIn(formik.values,id)}>
      <div className="input-div" {...getRootProps()}>
        <input {...getInputProps()} />
        { disabled ? null : <p>Drag 'n' drop image here, or click to select image</p> }
      </div>
      <a
        className="input-remove"
        href="javscript:;"
        onClick={getIn(formik.values,id) ? removeImage : null}
      >&times;&nbsp;&nbsp;Remove Image</a>
    </Container>



    <InputFeedback error={formik.touched[id] && formik.errors[id]} />

  </InputWrapper>)

}

export default connect(ImageUpload)
