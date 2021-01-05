import React from 'react'
import {connect, FieldArray} from 'formik'
import Checkbox from './Checkbox'
import styled from 'styled-components'

const GroupWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;

  label {
    color: ${props => props.theme.normalText};
    display: inline-block;
  }
`

const CheckboxGroupWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null;

const Label = ({ error, className, children, ...props }) => {
  return (
    <label style={{marginBottom: '1rem'}} {...props}>
      {children}
    </label>
  );
};

const Group = (props) => {
  return (
    <GroupWrapper>
    {props.label ? <Label htmlFor={props.id} error={props.error}>
      {props.label}
    </Label> : null}

    <FieldArray
      name={props.name}
      render={arrayHelpers => (
        <CheckboxGroupWrapper>
          {React.Children.map(props.children, (child, i) => {
            return React.cloneElement(child, {
              onChange: e => {
                if (e.target.checked) arrayHelpers.push(child.props.value)
                else {
                  const idx = props.formik.values[props.name].indexOf(props.formik.values[props.name][i])
                  const index = props.formik.values[props.name].findIndex(k => k[Object.keys(k)[0]] === child.props.label)
                  // props.formik.values[props.name].slice(index)
                  props.formik.values[props.name].splice(index, 1)


                  // arrayHelpers.remove(index)
                }
              }
            });
          })}
        </CheckboxGroupWrapper>
      )}
    />
    
    <InputFeedback error={props.formik.touched[props.id] && props.formik.errors[props.id]} />

</GroupWrapper>
  )
}

export default connect(Group)