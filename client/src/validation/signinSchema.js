import * as yup from "yup";

const signinSchema = yup.object().shape({
  email: yup.string().email().required("Email is required."),
  password: yup.string().required("Password is required."),
});

export default signinSchema;

//Email regex
/* /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ */
