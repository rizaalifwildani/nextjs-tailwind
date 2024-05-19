import * as yup from "yup"

export const LoginSchema = yup.object().shape({
  phoneNumber: yup.string().required("*No.HP wajib diisi"),
  password: yup.string().required("*Password wajib diisi"),
})

export type LoginRequest = yup.InferType<typeof LoginSchema>
