import styled from 'styled-components'
import { Tabs } from 'react-tabs';

export const Container = styled(Tabs)`
  display: flex;
  width: 100%;
  background: ${props => props.theme.foreground};
  min-height: 40em;
`;

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  flex-direction: column;
  padding: 2rem;
`;


/////////////////////////////////////////////////////////////////
export const InvoiceHeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  text-align: right;
  border-bottom: 1px solid gray;
  margin-bottom: 2rem;
  padding-bottom: 10px;

  h3 {
    padding-bottom: 10px;
  }
`

export const InvoiceMetaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`

export const InvoiceMeta = styled.div`
  flex-basis: 30%;
  max-width: 30%;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  margin-bottom: 1rem;
  label {
    color: ${props => props.theme.normalText};
    margin-bottom: 8px;
  }

  @media(max-width: 675px) {
    margin-right: 0;
  }
`

export const InvoiceLineItemContainer = styled.div`
  table{
    width: 100%;
    border-collapse: collapse;
    color: ${props => props.theme.normalText};
  }
  td{
    padding: 5px 0 5px 15px;
    border: 1px solid ${props => props.theme.border}
  }
  .tabletitle{
    padding: 5px;
    background: ${props => props.theme.border};
  }
  .service{border: 1px solid ${props => props.theme.border};}
  .item{width: 50%;}
  .itemtext{font-size: .9em;}
`



