import * as yup from "yup"

export const RoleSchema = yup.object().shape({
  name: yup.string().required("*Nama Role wajib diisi").nonNullable(),
  displayName: yup
    .string()
    .required("*Nama Tampilan wajib diisi")
    .nonNullable(),
  description: yup.string().optional().nullable(),
})

export type RoleRequest = yup.InferType<typeof RoleSchema>
