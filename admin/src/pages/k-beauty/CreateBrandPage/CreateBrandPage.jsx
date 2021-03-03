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

const CreateBrandPage = () => {
  const { register, handleSubmit /* errors: formErrors */ } = useForm();
  const dispatch = useDispatch();
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
    console.log("In handleCreateReseller");
    console.log("data: ", data);
    const { name, description } = data;

    console.log("resellers: ", selectedResellers);
    const payload = {
      name,
      description,
      resellers: selectedResellers,
    };

    dispatch(brandActions.createBrand(payload));
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
      <p>CreateBrandPage</p>
      <form onSubmit={handleSubmit(handleCreateBrand)}>
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
                      onChange={() => handleCheckboxChange(reseller._id)}
                      name={reseller.name}
                    />
                  }
                  label={reseller.name}
                />
              ))}
          </FormGroup>
        </FormControl>
        <Button title="Create Brand" type="submit" />
        {errors.createBrand && <span>{errors.createBrand}</span>}
      </form>
    </S.Container>
  );
};

export default CreateBrandPage;
