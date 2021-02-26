import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./styled";
import {
  CircularProgress,
  TableContainer,
  Table,
  TableBody,
  Paper,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { skinfluencerActions } from "../../../redux/skinfluencers";
import Button from "../../../components/Button";

const SkinfluencersPage = () => {
  const dispatch = useDispatch();

  const { skinfluencers, getSkinfluencersError, loading } = useSelector(
    (state) => state.skinfluencers
  );

  useEffect(() => {
    dispatch(skinfluencerActions.getSkinfluencers());
  }, [dispatch]);

  return (
    <S.Container>
      <p>SkinfluencersPage</p>
      <Button title="New Skinfluencer" link="/skinfluencers/create" />
      {loading && <CircularProgress />}
      <TableContainer component={Paper}>
        {skinfluencers && skinfluencers.length > 0 && !loading && (
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
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Social Links</TableCell>
                <TableCell align="left">Created</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {skinfluencers.map((skinfluencer, index) => (
                <TableRow key={skinfluencer._id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {skinfluencer._id}
                  </TableCell>
                  <TableCell align="left">{skinfluencer.name}</TableCell>
                  <TableCell align="left">{skinfluencer.title}</TableCell>
                  <TableCell align="left">
                    {skinfluencer.socialLinks.length + " st"}
                  </TableCell>
                  <TableCell align="left">
                    {skinfluencer.createdAt || "unknown"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </S.Container>
  );
};

export default SkinfluencersPage;
