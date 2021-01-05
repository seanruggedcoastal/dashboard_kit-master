import React, { useMemo, useState, useEffect } from 'react'
import {connect, getIn} from 'formik'
import {useDropzone} from 'react-dropzone'
import styled, { css } from 'styled-components'



import ImageList from './_ImageList'

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

  .input-drop{
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
      padding: 8px;
      font-size: 12px;
      color: ${p => p.theme.grey || ''};
      border-bottom: 1px solid ${p => p.theme.border || ''};
    }

    .image-list{
      padding:
    }
  }
  .input-click{
    display: block;
    padding: 13px 8px;
    background-color: white;
    border: 1px solid ${p => p.theme.border || 'transparent'};
    border-top: none;
    text-align: center;
    color: ${p => p.haveValue ? p.theme.normalText || 'transparent' : p.theme.lightGray};
    font-size: 12px;
  }

`

const GalleryUpload = (props) => {

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
        value: [
          ...(getIn(formik.values,id) || []),
          ...file
        ]
      }
    })
  }

  const onBlur = () => {
    if(disabled) return;
    formik.handleBlur({
      target: { id }
    })
  }

  const removeImage = (e) => {
    if(disabled) return;
    if(!getIn(formik.values,id)) return;
    if(!getIn(formik.values,id).length) return;

    const index = e.dataset.index * 1;
    const val = [ ...getIn(formik.values,id) ];
    val.splice(index,1)
    onChange(val)
  }

  const dropZoneProps = {
    accept: 'image/*',
    onDropAccepted: onChange,
    onFileDialogCancel: onBlur,
    onDragLeave: onBlur,
    disabled: !!disabled,
    multiple: true
  }

  const {getRootProps:dropRootProps, getInputProps:dropInputProps} = useDropzone({
    ...dropZoneProps,
    noClick: true
  })

  const {getRootProps:clickRootProps, getInputProps:clickInputProps} = useDropzone({
    ...dropZoneProps,
    noDrag: true
  })

  return (<InputWrapper>

    {label ? <Label htmlFor={id} error={formik.touched[id] && formik.errors[id]}>{label}</Label> : null}

    <Container haveValue={getIn(formik.values,id)}>
      <div className="input-drop" {...dropRootProps()}>
        <p>Drag 'n' drop images below to add</p>
        <input {...dropInputProps()} />
        <ImageList className="image-list" id={id} />
      </div>

      <div className="input-click" {...clickRootProps()}>
        <input {...clickInputProps()} />
        { disabled ? null : <p>Click to add images</p>}
      </div>

    </Container>



    <InputFeedback error={formik.touched[id] && formik.errors[id]} />

  </InputWrapper>)

}

export default connect(GalleryUpload)
