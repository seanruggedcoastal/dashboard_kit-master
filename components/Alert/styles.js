import styled from 'styled-components'

export const AlertWrapper = styled.div`
  display: flex;
  border: 1px solid #b7eb8f;
  background-color: #f6ffed;
  padding: 7px 14px 7px 14px;
  border-radius: 4px;
  margin-bottom: 4px;

  ${(props) => {
    switch(props.type) {
      case "success":
        return `border: 1px solid #b7eb8f; background-color: #f6ffed;`
      case "warning":
      case "notify":
        return `border: 1px solid #ffe58f; background-color: #fffbe6;`
      case "error":
      case "alert":
        return `border: 1px solid #ffa39e; background-color: #fff1f0;`
      case "info":
      default:
        return `border: 1px solid #91d5ff; background-color: #e6f7ff;`
    }
  }}

  span {
    color: ${props => props.theme.black};
  }

  h3 {
    color: ${props => props.theme.black};
  }

  svg {
    width: 17px;
    height: 17px;

    path {
      fill: ${props => props.theme.black};
    }
  }
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
`

export const ContentWrapper = styled.div`
  flex: 1;
`

export const CloseWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;

  i,span {
    cursor: pointer;
  }
`