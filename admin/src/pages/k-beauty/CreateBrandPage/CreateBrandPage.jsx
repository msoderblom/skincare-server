import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { resellerActions } from "../../../redux/k-beauty/resellers";
import { brandActions } from "../../../redux/k-beauty/brands";
import * as S from "./styled";
import { useHistory } from "react-router";

const CreateBrandPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { errors } = useSelector((state) => state.kBeauty.brands);
  const { resellers } = useSelector((state) => state.kBeauty.resellers);

  const [selectedResellers, setSelectedResellers] = useState([]);

  useEffect(() => {
    if (resellers.length === 0) {
      dispatch(resellerActions.getResellers());
    }
    // eslint-disable-next-line
  }, []);

  const handleCreateBrand = (data) => {
    const { name, description } = data;
    const payload = {
      name,
      description,
      resellers: selectedResellers,
    };

    dispatch(brandActions.createBrand(payload, history));
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
  return (
    <S.Container>
      <h1>Create Brand</h1>
      <S.Form onSubmit={handleSubmit(handleCreateBrand)}>
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
                      onChange={() => handleCheckboxChange(reseller._id)}
                      name={reseller.name}
                    />
                  }
                  label={reseller.name}
                />
              ))}
          </FormGroup>
        </FormControl>
        <Button
          title="Create Brand"
          type="submit"
          style={{ gridColumn: "2 / 3" }}
        />
        {errors.createBrand && <span>{errors.createBrand}</span>}
      </S.Form>
    </S.Container>
  );
};

export default CreateBrandPage;
