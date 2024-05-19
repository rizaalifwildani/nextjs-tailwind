import * as yup from "yup"

export const PermissionSchema = yup.object().shape({
  name: yup.string().required("*Nama Permission wajib diisi").nonNullable(),
  displayName: yup
    .string()
    .required("*Nama Tampilan wajib diisi")
    .nonNullable(),
  description: yup.string().optional().nullable(),
})

export type PermissionRequest = yup.InferType<typeof PermissionSchema>
