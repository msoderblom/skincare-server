import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resellerActions } from "../../../redux/k-beauty/resellers";
import * as S from "./styled";
import Moment from "react-moment";
import "moment-timezone";

const ResellersPage = () => {
  const dispatch = useDispatch();
  const { resellers, errors, loading } = useSelector(
    (state) => state.kBeauty.resellers
  );

  useEffect(() => {
    dispatch(resellerActions.getResellers());
  }, [dispatch]);

  return (
    <S.Container>
      <p>ResellerPage</p>
      {loading && <CircularProgress />}

      <TableContainer component={Paper}>
        {resellers && resellers.length > 0 && !loading && (
          <Table
            stickyHeader
            aria-label="simple table"
            style={{ width: "100%" }}
          >
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Link</TableCell>
                <TableCell align="left">Created</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {resellers.map((reseller, index) => (
                <TableRow key={reseller._id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {reseller._id}
                  </TableCell>
                  <TableCell align="left">{reseller.name}</TableCell>
                  <TableCell align="left">
                    {reseller.description
                      ? reseller.description.slice(0, 20) + "..."
                      : "-"}
                  </TableCell>
                  <TableCell align="left">
                    <a href={reseller.link.url}>
                      {reseller.link.linkName || reseller.link.url}
                    </a>
                  </TableCell>

                  <TableCell align="left">
                    <Moment format="YYYY-MM-DD">{reseller?.createdAt}</Moment>
                  </TableCell>
                  <TableCell align="left"> </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {errors.getResellers && <span>{errors.getResellers}</span>}
    </S.Container>
  );
};

export default ResellersPage;
