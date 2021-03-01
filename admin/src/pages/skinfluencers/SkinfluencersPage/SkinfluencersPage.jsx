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
  MenuItem,
  Menu,
} from "@material-ui/core";
import { skinfluencerActions } from "../../../redux/skinfluencers";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";

const SkinfluencersPage = () => {
  const dispatch = useDispatch();
  const [actionMenusAreOpen, setActionMenusAreOpen] = useState([]);

  const { skinfluencers, getSkinfluencersError, loading } = useSelector(
    (state) => state.skinfluencers
  );

  useEffect(() => {
    dispatch(skinfluencerActions.getSkinfluencers());
  }, [dispatch]);

  useEffect(() => {
    if (skinfluencers && skinfluencers.length > 0) {
      const actionsArray = [];
      skinfluencers.forEach((skinfluencer) => {
        actionsArray.push({
          anchorEl: null,
          skinfluencerID: skinfluencer._id,
        });
      });
      setActionMenusAreOpen(actionsArray);
    }
  }, [skinfluencers]);

  const handleActionBtnClick = (event, index) => {
    const updatedArray = [...actionMenusAreOpen];
    updatedArray[index].anchorEl = event.currentTarget;

    setActionMenusAreOpen(updatedArray);
  };
  const handleClose = (index) => {
    const updatedArray = [...actionMenusAreOpen];
    updatedArray[index].anchorEl = null;

    setActionMenusAreOpen(updatedArray);
  };

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
                <TableCell align="left">Actions</TableCell>
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
                  <TableCell align="left">
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={(e) => handleActionBtnClick(e, index)}
                      title="Actions"
                    />

                    <Menu
                      id="simple-menu"
                      anchorEl={actionMenusAreOpen[index].anchorEl}
                      keepMounted
                      open={Boolean(actionMenusAreOpen[index].anchorEl)}
                      // onClose={handleClose}
                    >
                      <MenuItem onClick={() => handleClose(index)}>
                        View
                      </MenuItem>
                      <MenuItem onClick={() => handleClose(index)}>
                        <Link>Edit</Link>
                      </MenuItem>
                      <MenuItem onClick={() => handleClose(index)}>
                        Delete
                      </MenuItem>
                    </Menu>
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
