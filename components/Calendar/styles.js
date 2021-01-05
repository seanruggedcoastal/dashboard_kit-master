import styled from 'styled-components'


export const CalendarWrapper = styled.div`
  margin-bottom: 1rem;
`

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1.5em 0;
  border-bottom: 1px solid ${props => props.theme.border};

  button {
  }
`

export const DaysWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.border};
  border-left: 1px solid ${props => props.theme.border};
  border-right: 1px solid ${props => props.theme.border};
  background: ${props => props.theme.foreground};
  padding-top: 1rem;
  padding-bottom: 1rem;
  color: ${props => props.theme.normalText};

  div {
    flex-grow: 1;
    flex-basis: 0;
    max-width: 100%;
    justify-content: center;
    text-align: center;
  }
`

export const DateWrapper = styled.div`
  border-left: 1px solid ${props => props.theme.border};
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.border};
`

export const Cell = styled.div`
  position: relative;
  flex-grow: 0;
  flex-basis: calc(100% / 7);
  width: calc(100% / 7);
  overflow: hidden;
  border-right: 1px solid ${props => props.theme.border};
  background: ${props => props.today ? props.theme.blue : props.theme.foreground};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8em;
  span {
    position: absolute;
    right: 8px;
    top: 8px;
    color: ${props => props.today ? props.theme.white : props.theme.normalText};
  }

  @media(max-width: 675px) {
    height: 4rem;
  }

`

export const EventWrapper = styled.div`
  background: #f6ffed;
  width: 82%;
  display: block;
  margin: 0 auto;
  border-radius: 2px;
  color: #38B249;
  border-left: 4px solid #38B249;
  padding: 1rem;
  font-size: 14px;

  @media(max-width: 675px) {
    padding: 2px;
    font-size: 11px;
  }

`