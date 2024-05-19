import * as yup from "yup"

export const UserSchema = yup.object().shape({
  name: yup.string().required("*Nama User wajib diisi").nonNullable(),
  phoneNumber: yup.string().required("*No.HP wajib diisi").nonNullable(),
  role: yup.string().required("*Role wajib diisi").nonNullable(),
  password: yup.string().optional().nullable(),
  companyId: yup.string().optional().nullable(),
  address: yup.string().optional().nullable(),
})

export type UserRequest = yup.InferType<typeof UserSchema>
