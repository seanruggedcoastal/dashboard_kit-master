import React from 'react'
import {connect} from 'formik'


const LabelWrapper = ({ error, className, children, ...props }) => {
  return (
    <label className="label" {...props}>
      {children}
    </label>
  );
};

const Label = (props) => {
  <LabelWrapper htmlFor={props.id} error={props.error}>
      {props.label}
  </LabelWrapper>
}

export default connect(Label)