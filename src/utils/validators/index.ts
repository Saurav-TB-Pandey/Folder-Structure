import * as Yup from "yup";
import { emailAddress, name } from "../validationSchema";

export const checkInFormValidator = Yup.object().shape({
  name,
  emailAddress,
});
