import { Toolbar as MUiToolbar } from "@material-ui/core";
import styled from "styled-components";

export const Container = styled.div``;
export const AdminContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const Toolbar = styled(MUiToolbar)`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  justify-content: space-between;
`;
