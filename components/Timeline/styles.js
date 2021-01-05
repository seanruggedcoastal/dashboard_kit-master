import styled from 'styled-components'

export const TimelineWrapper = styled.ul`
  list-style: none;
  line-height: 1.5;
`

export const TimelineItem = styled.li`
  position: relative;

  ${props => props.last ? 'padding: 0' : 'padding: 0 0 20px'};

  .tail {
    left: 4px;
    right: inherit;
    position: absolute;
    top: .75em;
    height: 100%;
    border-left: 2px solid #e8e8e8;
    ${props => props.last && `display: none`};
  }

  .head {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: ${props => props.theme.altColor};
    border-radius: 100px;
    border: 2px solid ${props => props.theme.altColor};
  }

  .content {
    font-size: 13px;
    padding: 0 0 10px 24px;
    margin: 0 0 0 18px;
    position: relative;
    top: -3px;
  }

`