import { FormGroup, FormLabel, InputLabel } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { resellerActions } from "../../../redux/k-beauty/resellers";
import * as S from "./styled";

const CreateResellerPage = () => {
  const { register, handleSubmit, errors: formErrors } = useForm();
  const dispatch = useDispatch();
  const { createdReseller, errors } = useSelector(
    (state) => state.kBeauty.resellers
  );

  const handleCreateReseller = (data) => {
    console.log("In handleCreateReseller");
    console.log("data: ", data);
    const { name, description, linkName, url } = data;
    const payload = {
      name,
      description,
      link: {
        linkName,
        url,
      },
    };

    dispatch(resellerActions.createReseller(payload));
  };
  return (
    <S.Container>
      <p>CreateResellerPage</p>

      <form onSubmit={handleSubmit(handleCreateReseller)}>
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
        <Button title="Create Reseller" type="submit" />
      </form>
      {errors.createReseller && <span>{errors.createReseller}</span>}
    </S.Container>
  );
};

export default CreateResellerPage;
