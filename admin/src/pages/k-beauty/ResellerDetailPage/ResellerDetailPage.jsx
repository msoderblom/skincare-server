import { FormGroup, FormLabel } from "@material-ui/core";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { resellerActions } from "../../../redux/k-beauty/resellers";
import * as S from "./styled";

const ResellerDetailPage = ({ edit = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentReseller: reseller, errors } = useSelector(
    (state) => state.kBeauty.resellers
  );
  const { register, handleSubmit /* errors: formErrors  */ } = useForm({
    defaultValues: {
      name: reseller.name || "",
      description: reseller.description || "",
      linkName: reseller.link.linkName || "",
      url: reseller.link.url || "",
    },
  });

  useEffect(() => {
    dispatch(resellerActions.getOneReseller(id));
  }, [dispatch, id]);

  const handleUpdateReseller = (data) => {
    console.log("data: ", data);
  };

  return (
    <S.Container>
      <h1>
        {edit && "Edit: "}
        {reseller.name}
      </h1>
      <h2>ID: {reseller._id}</h2>

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
        <Button title="Save" type="submit" />
        <Button
          title="Cancel"
          link={`/k-beauty/resellers/${reseller._id}`}
          color="default"
        />
      </form>

      {errors.getOneReseller && <p>{errors.getOneReseller}</p>}
    </S.Container>
  );
};

export default ResellerDetailPage;
