import React from "react";
import { Typography } from "@mui/material";
import { getIn } from "formik";
import { FormikErrorInputProps } from "../../utils/types";

const FormikError: React.FC<FormikErrorInputProps> = ({
  name,
  Formik,
  page,
}) => {
  const error = getIn(Formik.errors, name);
  const isTouched = getIn(Formik.touched, name);

  if (!error || !isTouched) return null;

  return (
    <Typography
      className={`error ${page === "checkIn" ? "textShadow" : "formik_error"}`}
      variant="body2"
      sx={{ color: "#ff0000" }}
    >
      {error}
    </Typography>
  );
};

export default FormikError;
