import styled from "styled-components";

export const Container = styled.div``;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 20px;

  * {
    grid-column: span 2;
  }
`;
