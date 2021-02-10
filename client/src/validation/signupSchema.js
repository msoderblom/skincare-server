import * as yup from "yup";

const signupSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required.")
    .trim()
    .min(3, "The username must be at least 3 characters.")
    .max(20, `The username can't be more than 20 character.`),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .matches(
      RegExp(/(?!^\d+$)^.+$/),
      "The password must not only consist of numbers."
    ),
});

export default signupSchema;

//Email regex
/* /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ */
