import React, { useEffect, useState } from "react";
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
// import { Link } from "react-router-dom";
import SkinfluencerRow from "../components/SkinfluencerRow";
import Notification from "../../../components/Notification";

const SkinfluencersPage = () => {
  const dispatch = useDispatch();

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const { skinfluencers, getSkinfluencersError, loading } = useSelector(
    (state) => state.skinfluencers
  );

  useEffect(() => {
    dispatch(skinfluencerActions.getSkinfluencers());
  }, [dispatch]);

  const handleDelete = (id) => {
    console.log("inside handle delete");

    setNotify({ isOpen: true, message: "Deletes Successfully", type: "error" });
  };

  return (
    <>
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
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {skinfluencers.map((skinfluencer, index) => (
                  <SkinfluencerRow
                    skinfluencer={skinfluencer}
                    index={index}
                    handleDelete={handleDelete}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        {getSkinfluencersError && <span>{getSkinfluencersError}</span>}
      </S.Container>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default SkinfluencersPage;
