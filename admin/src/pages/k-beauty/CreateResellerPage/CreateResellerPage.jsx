import { FormGroup, FormLabel } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { resellerActions } from "../../../redux/k-beauty/resellers";
import * as S from "./styled";

const CreateResellerPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.kBeauty.resellers);

  const handleCreateReseller = (data) => {
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
      <h1>Create Reseller</h1>

      <S.Form onSubmit={handleSubmit(handleCreateReseller)}>
        <Input
          name="name"
          register={register}
          type="text"
          label="Name"
          required
        />
        <Input
          name="description"
          register={register}
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
            type="text"
            label="Link Name"
          />
          <Input
            name="url"
            register={register}
            type="text"
            label="URL"
            required
            style={{ marginTop: 20 }}
          />
        </FormGroup>
        <Button
          title="Create Reseller"
          type="submit"
          style={{ gridColumn: "2 / 3" }}
        />
      </S.Form>
      {errors.createReseller && <span>{errors.createReseller}</span>}
    </S.Container>
  );
};

export default CreateResellerPage;
