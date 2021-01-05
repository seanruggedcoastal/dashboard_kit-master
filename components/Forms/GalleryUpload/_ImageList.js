import React, { useMemo, useState, useEffect } from 'react'
import {connect, getIn} from 'formik'
import styled, { css } from 'styled-components'

import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc'

const Container = styled.div`
  font-size: 0px;
`

const ThumbHeight = 144;
const ImageThumb = styled.div`

  display: inline-block;
  width: ${ThumbHeight*1.6}px;
  height: ${ThumbHeight}px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  border: 1px solid ${p => p.theme.border || 'transparent'};
  background-image: url('${p => p.image || ''}');


  &>a{
    margin: 0; padding: 0;
    display: inline-block;
    background-color: red;
    color: white;
    text-decoration: none;
    position: absolute;
    text-align: center;
    top: 0;
    right: 0;
    width: 34px;
    font-size: 16px;
    line-height: 34px;
  }

  &>a:hover{
    font-size: 21px;
  }

  .drag-anchor{
    margin: 0; padding: 0;
    display: inline-block;
    position: absolute;
    background: rgba(255,255,255,0.9);
    opacity: ${p => p.image ? 0 : 1};
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    cursor: move;
    font-size: 12px;
    line-height: ${ThumbHeight}px;
    text-align: center;
    overflow: hidden;
    transition: all linear 200ms;
  }

  .drag-anchor:hover{
    opacity: 1;
  }

`

const SortableContainer = sortableContainer(({children}) => {
  return <Container>{children}</Container>;
});

const DragHandle = sortableHandle(({ image }) => (<div className="drag-anchor">
  {image ? 'drag to sort' : 'Loading..'}
</div>));

const SortableItem = sortableElement(({image, index, onRemove}) => {

  const [ thumb, setThumb ] = useState('')
  useEffect(() => {

    // console.log('SortableItem, useEffect')
    if(typeof image === 'string') return setThumb(image);

    const reader = new FileReader();
    reader.onload = () => { setThumb(reader.result) };
    reader.readAsDataURL(image);
  }, [ image ])

  return <ImageThumb image={thumb}>
    <DragHandle image={thumb} />
    <a href="javascript:;" data-index={index} onClick={onRemove}>&times;</a>
  </ImageThumb>
});


const I = props => {

  const { id, formik, disabled } = props;

  const onChange = (val) => {
    if(disabled) return;
    formik.handleChange({
      target: {
        id,
        value: val
      }
    })
  }

  const onRemove = (e) => {
    if(disabled) return;
    if(!getIn(formik.values,id)) return;
    if(!getIn(formik.values,id).length) return;

    const index = e.target.dataset.index * 1;
    const val = [ ...(getIn(formik.values,id) || []) ]
    val.splice(index, 1)
    onChange(val)
  }


  const onSort = ({ newIndex, oldIndex }) => {
    const val = [ ...(getIn(formik.values,id) || []) ]
    const data = val.splice(oldIndex, 1)
    val.splice(newIndex, 0, data[0])
    onChange(val)
  }

  // throw new Error('yeah')

  return <SortableContainer onSortEnd={onSort} useDragHandle axis="xy">
    {(getIn(formik.values,id)||[]).map((v,i) => (<SortableItem
      image={v}
      key={`${id}_${i}`}
      index={i}
      onRemove={onRemove}
    />))}
  </SortableContainer>

}

export default connect(I)
