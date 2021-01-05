import React, { useMemo } from 'react'
import {connect, getIn} from 'formik'
import styled from 'styled-components'
import Select from 'react-select'

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
    <label className="label" {...props}>
      {children}
    </label>
  );
};

const SelectField = (props) => {

  const selectOpt = useMemo(() => props.options.map(v => {
    if(v.value && v.label) return v;
    return { label: v, value: v }
  }),[ JSON.stringify(props.options) ])

  const selectValue = useMemo(
    () => {
      const val = getIn(props.formik.values, props.id)
      return selectOpt.find(v => v.value === val)
    },
    [ getIn(props.formik.values, props.id), JSON.stringify(selectOpt) ]
  )


  const onChange = (val) => {
    props.formik.handleChange({
      target: {
        id: props.id,
        value: val ? val.value : ''
      }
    })
  }

  const onBlur = () => {
    props.formik.handleBlur({
      target: { id: props.id }
    })
  }

  return (
    <InputWrapper>
      {props.label ? <Label htmlFor={props.id} error={props.error}>
        {props.label}
      </Label> : null}

      <Select
        styles={{
          control: styles => ({
            ...styles,
            borderColor: '#ebedf0',
            borderRadius: '2px',
            fontSize: '11px'
          }),
          option: styles => ({
            ...styles,
            fontSize: '11px'
          })
        }}
        id={props.id}
        value={selectValue}
        onChange={onChange}
        onBlur={onBlur}
        isDisabled={props.disabled}
        isClearable={true}
        isSearchable={true}
        options={selectOpt}
      />



      <InputFeedback error={props.formik.touched[props.id] && props.formik.errors[props.id]} />
    </InputWrapper>
  )
}


export default connect(SelectField)