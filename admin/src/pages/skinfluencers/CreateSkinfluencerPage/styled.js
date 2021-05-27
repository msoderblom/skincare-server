import styled from "styled-components";
import Button from "../../../components/Button";

export const Container = styled.div``;
export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 20px; ;
`;

export const SubmitBtn = styled(Button)`
  grid-column: 2 / 3;
`;
