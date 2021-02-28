import {
  FormControl,
  FormGroup,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import * as S from "./styled";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SocialLinkInput = ({
  socialLink,
  index,
  socialLinks,
  setSocialLinks,
}) => {
  const classes = useStyles();

  const handleSocialLinkUpdate = (event, name) => {
    console.log(name);
    const updatedLinks = [...socialLinks];
    updatedLinks[index][name] = event.target.value;

    setSocialLinks(updatedLinks);
  };

  const handleRemoveSocialLink = () => {
    const newLinks = socialLinks.splice(index, 1);
    setSocialLinks(newLinks);
  };

  return (
    <S.Container>
      <p>SocialLinkInput</p>
      <FormGroup>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Platform
          </InputLabel>
          <Select
            required
            labelId="platform-label"
            id="platform-select"
            value={socialLink.platform}
            onChange={(e) => handleSocialLinkUpdate(e, "platform")}
            label="Platform"
          >
            <MenuItem value="instagram">Instagram</MenuItem>
            <MenuItem value="twitter">Twitter</MenuItem>
            <MenuItem value="facebook">Facebook</MenuItem>
            <MenuItem value="youtube">Youtube</MenuItem>
            <MenuItem value="tiktok">Tiktok</MenuItem>
            <MenuItem value="website">Website</MenuItem>
            <MenuItem value="blog">Blog</MenuItem>
          </Select>
        </FormControl>
        <Input
          value={socialLink.linkName}
          name="linkName"
          handleChange={(e) => handleSocialLinkUpdate(e, "linkName")}
          // error={errors.title?.message}
          type="text"
          label="Link Name"
          // required
        />
        <Input
          name="url"
          required
          value={socialLink.url}
          handleChange={(e) => handleSocialLinkUpdate(e, "url")}
          // error={errors.title?.message}
          type="text"
          label="URL"
          // required
        />
      </FormGroup>

      <Button title="X" onClick={handleRemoveSocialLink} color="secondary" />
    </S.Container>
  );
};

export default SocialLinkInput;
