import { FormGroup, FormLabel, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import EditIcon from "@material-ui/icons/Edit";
import {
  resellerActions,
  resellerTypes,
} from "../../../redux/k-beauty/resellers";
import * as S from "./styled";
import Moment from "react-moment";
import "moment-timezone";

const ResellerDetailPage = ({ edit = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentReseller: reseller, errors } = useSelector(
    (state) => state.kBeauty.resellers
  );
  const {
    register,
    handleSubmit,
    setValue /* errors: formErrors  */,
  } = useForm({
    defaultValues: {
      name: reseller?.name || "",
      description: reseller?.description || "",
      linkName: reseller?.link.linkName || "",
      url: reseller?.link.url || "",
    },
  });

  useEffect(() => {
    dispatch(resellerActions.getOneReseller(id));

    return () =>
      dispatch({ type: resellerTypes.GET_ONE_RESELLER_SUCCESS, payload: null });
  }, [dispatch, id]);

  useEffect(() => {
    if (reseller) {
      setValue("name", reseller.name);
      setValue("description", reseller.description);
      setValue("linkName", reseller.link.linkName);
      setValue("url", reseller.link.url);
    }
  }, [reseller, setValue, edit]);

  const handleUpdateReseller = (data) => {
    console.log("data: ", data);

    const payload = {
      name: data.name,
      description: data.description,
      link: {
        linkName: data.linkName,
        url: data.url,
      },
    };

    dispatch(resellerActions.updateReseller(id, payload, history));
  };

  return (
    <>
      {reseller && (
        <S.Container>
          <Typography variant="subtitle1" component="h2">
            <strong>Reseller</strong>
          </Typography>
          <h1 style={{ marginTop: 0 }}>
            {edit && "Edit: "}
            {reseller.name}
          </h1>
          <Typography variant="subtitle1" component="h2">
            <strong>ID: </strong>
            {reseller._id}
          </Typography>

          {edit && (
            <Paper style={{ padding: 20 }}>
              <form onSubmit={handleSubmit(handleUpdateReseller)}>
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

                <FormGroup>
                  <FormLabel>Link to website</FormLabel>
                  <Input
                    name="linkName"
                    register={register}
                    // error={formErrors.linkName?.message}
                    type="text"
                    label="Link Name"
                  />
                  <Input
                    name="url"
                    register={register}
                    // error={formErrors.url?.message}
                    type="text"
                    label="URL"
                    required
                  />
                </FormGroup>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    title="Cancel"
                    link={`/k-beauty/resellers/${reseller._id}`}
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
                  <Moment format="YYYY-MM-DD">{reseller.createdAt}</Moment>
                </p>
                <p>
                  <strong>Last updated: </strong>
                  <Moment format="YYYY-MM-DD HH:mm">
                    {reseller.updatedAt}
                  </Moment>
                  {" ("}
                  <Moment fromNow>{reseller.updatedAt}</Moment>
                  {")"}
                </p>

                <Button
                  title="Edit"
                  link={`/k-beauty/resellers/${reseller._id}/edit`}
                  startIcon={<EditIcon />}
                />
              </div>
              <p>
                <strong>Name: </strong>
                {reseller.name}
              </p>

              <strong>Description:</strong>
              <p style={{ marginTop: 5 }}>{reseller.description}</p>
              <p>
                <strong>Link Name: </strong>
                {reseller.link.linkName}
              </p>
              <p>
                <strong>Link Url: </strong>
                <a href={reseller.link.url} rel="noreferrer">
                  {reseller.link.url}
                </a>
              </p>
            </Paper>
          )}

          {errors.getOneReseller && <p>{errors.getOneReseller}</p>}
          {errors.updateReseller && <p>{errors.updateReseller}</p>}
        </S.Container>
      )}
    </>
  );
};

export default ResellerDetailPage;
