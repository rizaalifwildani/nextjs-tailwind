import * as yup from "yup"

export const CompanySchema = yup.object().shape({
  name: yup.string().required("*Nama Company wajib diisi").nonNullable(),
  address: yup.string().optional().nullable(),
})

export type CompanyRequest = yup.InferType<typeof CompanySchema>
