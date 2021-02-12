import * as yup from "yup";

const createThreadSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required.")
    .trim()
    .min(2, "The title must be at least 2 characters.")
    .max(100, `The title can't be more than 100 characters.`),
  body: yup
    .string()
    .required("Body is required")
    .min(20, "The body must be at least 20 characters."),
});

export default createThreadSchema;
