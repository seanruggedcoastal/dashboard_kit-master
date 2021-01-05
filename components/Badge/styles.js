import styled from 'styled-components'

export const BadgeWrapper = styled.div`
  display: inline-block;
  margin-right: 16px;
  position: relative;
  line-height: 1;

  a {
    display: inline-block;
    border-radius: 6px;
    background: #eee;
    ${(props) => {
      if(props.type === "small") {
        return `
          width: 20px;
          height: 20px;
        `
      } else {
        return `
          width: 42px;
          height: 42px;
        `
      }
    }}
  }
  

`

export const CountWrapper = styled.span`
  text-align: center;
  top: -10px;
  height: 20px;
  border-radius: 10px;
  min-width: 20px;
  line-height: 20px;
  color: white;

  position: absolute;
  right: ${props => (props.border && props.type === "small") ? '8px' : (props.type !== "small" && !props.border) ? '0px' : '-13px'};
  transform-origin: 100%;
  transform: translateX(50%);
  z-index: 1;
  background: ${props => props.theme.blue};

  ${(props) => {
    if(props.type === "small") {
      return `
        padding: 0 4px;
        font-size: 12px;
      `
    } else {
      return `
        padding: 0 8px;
      `
    }
  }}
`

export const SvgWrapper = styled.div`
  border: 1px solid ${props => props.theme.border};
  padding: 4px 6px 4px 6px;
  border-radius: 2px;
`