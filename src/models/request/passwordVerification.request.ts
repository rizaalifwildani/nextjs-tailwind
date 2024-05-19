import * as yup from "yup"

export const PasswordVerificationSchema = yup.object().shape({
  password: yup.string().required("*password wajib diisi"),
})

export type PasswordVerificationRequest = yup.InferType<
  typeof PasswordVerificationSchema
>
