import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Typography,
  List,
  ListItem,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { brandActions, brandTypes } from "../../../redux/k-beauty/brands";
import * as S from "./styled";
import Moment from "react-moment";
import "moment-timezone";
import { resellerActions } from "../../../redux/k-beauty/resellers";

const BrandDetailPage = ({ edit = false }) => {
  const { id } = useParams();
  const [selectedResellers, setSelectedResellers] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentBrand: brand, errors } = useSelector(
    (state) => state.kBeauty.brands
  );
  const { resellers } = useSelector((state) => state.kBeauty.resellers);
  const {
    register,
    handleSubmit,
    setValue /* errors: formErrors  */,
  } = useForm({
    defaultValues: {
      name: brand?.name || "",
      description: brand?.description || "",
    },
  });

  useEffect(() => {
    dispatch(brandActions.getOneBrand(id));

    return () =>
      dispatch({ type: brandTypes.GET_ONE_BRAND_SUCCESS, payload: null });
  }, [dispatch, id]);

  useEffect(() => {
    if (resellers.length === 0) {
      dispatch(resellerActions.getResellers());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (brand) {
      setValue("name", brand.name);
      setValue("description", brand.description);
      setSelectedResellers(brand.resellers);
    }
  }, [brand, setValue, edit]);

  const handleUpdateBrand = (data) => {
    console.log("data: ", data);
    console.log(selectedResellers);

    const payload = {
      name: data.name,
      description: data.description,
      resellers: selectedResellers,
    };

    dispatch(brandActions.updateBrand(id, payload, history));
  };

  const handleCheckboxChange = (id) => {
    if (selectedResellers.includes(id)) {
      const tempArr = selectedResellers.filter(
        (resellerID) => resellerID !== id
      );
      setSelectedResellers(tempArr);
    } else {
      const tempArr = [...selectedResellers];
      tempArr.push(id);
      setSelectedResellers(tempArr);
    }
  };

  const renderResellers = () => {
    const resellerList = brand.resellers.map((resellerID) => {
      const index = resellers.findIndex((seller) => seller._id === resellerID);
      const name = resellers[index].name;
      const url = `/k-beauty/resellers/${resellerID}`;

      return (
        <ListItem key={resellerID}>
          <Link to={url}>{name}</Link>
        </ListItem>
      );
    });

    return <List>{resellerList}</List>;
  };

  return (
    <>
      {brand && (
        <S.Container>
          <Typography variant="subtitle1" component="h2">
            <strong>Brand</strong>
          </Typography>
          <h1 style={{ marginTop: 0 }}>
            {edit && "Edit: "}
            {brand.name}
          </h1>
          <Typography variant="subtitle1" component="h2">
            <strong>ID: </strong>
            {brand._id}
          </Typography>

          {edit && (
            <Paper style={{ padding: 20 }}>
              <form onSubmit={handleSubmit(handleUpdateBrand)}>
                <Input
                  name="name"
                  register={register}
                  // error={formErrors.name?.message}
                  type="text"
                  label="Name"
                  required
                />
                <Input
                  name="description"
                  register={register}
                  // error={formErrors.description?.message}
                  type="text"
                  label="Description"
                  multiline
                  required
                />

                <FormControl component="fieldset">
                  <FormLabel component="legend">Resellers</FormLabel>
                  <FormGroup>
                    {resellers.length > 0 &&
                      resellers.map((reseller) => (
                        <FormControlLabel
                          key={reseller._id}
                          control={
                            <Checkbox
                              checked={selectedResellers.includes(reseller._id)}
                              onChange={() =>
                                handleCheckboxChange(reseller._id)
                              }
                              name={reseller.name}
                            />
                          }
                          label={reseller.name}
                        />
                      ))}
                  </FormGroup>
                </FormControl>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    title="Cancel"
                    link={`/k-beauty/brands/${brand._id}`}
                    color="default"
                  />
                  <Button
                    title="Save"
                    type="submit"
                    style={{ marginLeft: 10 }}
                  />
                </div>
              </form>
            </Paper>
          )}

          {!edit && (
            <Paper style={{ padding: 20 }}>
              <div>
                <p>
                  <strong>Created: </strong>{" "}
                  <Moment format="YYYY-MM-DD">{brand.createdAt}</Moment>
                </p>
                <p>
                  <strong>Last updated: </strong>
                  <Moment format="YYYY-MM-DD HH:mm">{brand.updatedAt}</Moment>
                  {" ("}
                  <Moment fromNow>{brand.updatedAt}</Moment>
                  {")"}
                </p>

                <Button
                  title="Edit"
                  link={`/k-beauty/brands/${brand._id}/edit`}
                  startIcon={<EditIcon />}
                />
              </div>
              <p>
                <strong>Name: </strong>
                {brand.name}
              </p>

              <strong>Description:</strong>
              <p style={{ marginTop: 5 }}>{brand.description}</p>

              <strong>Resellers: </strong>
              {brand.resellers.length > 0 && renderResellers()}
            </Paper>
          )}

          {errors.getOneReseller && <p>{errors.getOneReseller}</p>}
          {errors.updateReseller && <p>{errors.updateReseller}</p>}
        </S.Container>
      )}
    </>
  );
};

export default BrandDetailPage;
