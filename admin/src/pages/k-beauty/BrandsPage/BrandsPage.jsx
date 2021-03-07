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
import { brandActions } from "../../../redux/k-beauty/brands";
import * as S from "./styled";
import Moment from "react-moment";
import "moment-timezone";
import ActionMenu from "../../../components/ActionMenu/ActionMenu";

const BrandsPage = () => {
  const dispatch = useDispatch();
  const { brands, errors, loading } = useSelector(
    (state) => state.kBeauty.brands
  );

  useEffect(() => {
    dispatch(brandActions.getBrands());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(brandActions.deleteBrand(id));
    // setNotify({ isOpen: true, message: "Deletes Successfully", type: "error" });
  };

  return (
    <S.Container>
      <p>BrandsPage</p>
      {loading && <CircularProgress />}

      <TableContainer component={Paper}>
        {brands && brands.length > 0 && !loading && (
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
                <TableCell align="left">Resellers</TableCell>
                <TableCell align="left">Created</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {brands.map((brand, index) => (
                <TableRow key={brand._id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {brand._id}
                  </TableCell>
                  <TableCell align="left">{brand.name}</TableCell>
                  <TableCell align="left">
                    {brand.description
                      ? brand.description.slice(0, 20) + "..."
                      : "-"}
                  </TableCell>
                  <TableCell align="left">{brand.resellers.length}</TableCell>

                  <TableCell align="left">
                    <Moment format="YYYY-MM-DD">{brand?.createdAt}</Moment>
                  </TableCell>
                  <TableCell align="left">
                    <ActionMenu
                      id={brand._id}
                      handleDelete={handleDelete}
                      confirmMessage={{
                        title: `Do you want to delete: ${brand.name}?`,
                      }}
                      editLink={`/k-beauty/brands/${brand._id}/edit`}
                      viewLink={`/k-beauty/brands/${brand._id}`}
                    />
                  </TableCell>
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

export default BrandsPage;
