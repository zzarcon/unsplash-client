import styled, {injectGlobal} from 'styled-components';

injectGlobal`
  body {
    font-family: Helvetica;
    background-color: #D8D1F5;
  }

  * {
    box-sizing: content-box;
  }
`;

export const AppWrapper = styled.div`

`;

export const PhotosWrapper = styled.div`

`;

export const PhotoWrapper = styled.div`

`;

export const OptionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  margin: 20px auto;
`;