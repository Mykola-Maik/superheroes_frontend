import * as yup from "yup";

export const validationSchema = () => {
  return yup.object({
    nickname: yup
      .string()
      .required("This field is required")
      .trim()
      .min(2, "Invalid nickname name minimum 2 chars")
      .max(50, "Invalid nickname name maximum 50 chars"),

    real_name: yup
      .string()
      .required("This field is required")
      .min(2, "Invalid real name minimum 2 chars")
      .max(50, "Invalid real name maximum 50 chars"),

    origin_description: yup
      .string()
      .required("This field is required")
      .trim()
      .min(2, "Invalid superhero description minimum 2 chars")
      .max(500, "Invalid superhero description maximum 500 chars"),

    catch_phrase: yup
      .string()
      .required("This field is required")
      .trim()
      .min(2, "Invalid catch phrase minimum 2 chars")
      .max(200, "Invalid catch phrase maximum 200 chars"),

    superpowers: yup
      .string()
      .required("This field is required")
      .min(2, "Invalid superpower minimum 2 chars")
      .max(50, "Invalid superpower maximum 50 chars"),

    images: yup
      .array()
      .required("This field is required")
      .of(
        yup
          .string()
          .required("Image url is required")
          .min(2, "Invalid image url minimum 2 chars")
          .max(500, "Invalid image url maximum 500 chars")
      )
      .min(1, "At least one image is required"),
  });
};