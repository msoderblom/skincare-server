import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import ActionMenu from "../../../../components/ActionMenu";
// import * as S from "./styled";

const SkinfluencerRow = ({ skinfluencer, index, handleDelete }) => {
  return (
    <>
      <TableRow>
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
          <ActionMenu
            id={skinfluencer._id}
            handleDelete={handleDelete}
            confirmMessage={{
              title: `Do you want to delete: ${skinfluencer.name}?`,
              subTitle: `You can't revert this action.`,
            }}
            editLink={`/skinfluencers/${skinfluencer._id}/edit`}
            viewLink={`/skinfluencers/${skinfluencer._id}`}
          />
        </TableCell>
      </TableRow>
    </>
  );
};

export default SkinfluencerRow;
