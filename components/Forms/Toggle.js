import React from 'react'
import {connect, getIn} from 'formik'
import styled from 'styled-components'

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-right: 1rem;

  label {
    margin-bottom: 0;
  }

  input {
    display: none;
    &:checked + .toggle-control{
      border-color: #4cd964;
      background-color: #4cd964;
      &:after{
        left: 2.2em;
      }
    }
  }

  .toggle-control{
    transition: .3s cubic-bezier(0.95, 0.05, 0.795, 0.035);
    width: 4em;
    height: 1.6rem;
    display: block;
    border: 2px solid ${props => props.theme.border};
    border-radius: 1rem;
    background-color: rgba(black,.06);
    position: relative;
    cursor: pointer;
    &:after{
      transition: .3s cubic-bezier(0.95, 0.05, 0.795, 0.035);
      content: "";
      width: 1.4rem;
      height: 1.3rem;
      display: block;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1),0 3px 2px rgba(0,0,0,0.1);
      position: absolute;
      top: 0;
      left: 0;
    }
  }


`

const LabelWrapper = styled.label`
  span {
    margin-bottom: 0.5rem;
    display: block;
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

const Toggle = (props) => {
  const [state, setState] = React.useState({
    value: true
  })

  const value = React.useMemo(() => getIn(props.formik.values, props.id) || null,[ getIn(props.formik.values, props.id) ])




  return (
    <ToggleWrapper>

      {!props.label && <Label htmlFor={props.id} error={props.error}><input
          id={props.id}
          type={'checkbox'}
          onBlur={props.formik.handleBlur}
          error={props.formik.touched[props.id] && props.formik.errors[props.id]}
          value={state.value}
          checked={value || state.value}
          onChange={async (e) => {
            await e.target.checked ? setState({value: true}) : setState({value: false})
            await props.formik.handleChange({
              target: {
                id: props.id,
                value: !state.value
              }
            })
          }}
          {...props}
        />
        <div className="toggle-control" /></Label>}

      {props.label ? <Label htmlFor={props.id} error={props.error}>
        <span>{props.label}</span>
        <input
          id={props.id}
          type={'checkbox'}
          onBlur={props.formik.handleBlur}
          error={props.formik.touched[props.id] && props.formik.errors[props.id]}
          value={state.value}
          checked={value || state.value}
          onChange={async (e) => {
            await e.target.checked ? setState({value: true}) : setState({value: false})
            await props.formik.handleChange({
              target: {
                id: props.id,
                value: !state.value
              }
            })
          }}
          {...props}
        />
        <div className="toggle-control" />
        
      </Label> : null}


      <InputFeedback error={props.formik.touched[props.id] && props.formik.errors[props.id]} />
    </ToggleWrapper>
  )
}


export default connect(Toggle)