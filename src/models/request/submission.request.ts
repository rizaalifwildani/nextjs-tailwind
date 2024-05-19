import * as yup from "yup"

export const SubmissionSchema = yup.object().shape({
  salesId: yup.string().required("*Sales ID wajib diisi").nonNullable(),
  companyId: yup.string().required("*Company ID wajib diisi").nonNullable(),
  productId: yup.string().optional().nullable(),
  customerName: yup
    .string()
    .required("*Nama Nasabah wajib diisi")
    .nonNullable(),
  ktp: yup
    .string()
    .required("*No.KTP wajib diisi")
    .length(16, "No.KTP tidak valid")
    .nonNullable(),
  placeOfBirth: yup
    .string()
    .required("*Tempat Lahir wajib diisi")
    .nonNullable(),
  birthDate: yup.string().required("*Tanggal Lahir wajib diisi").nonNullable(),
  phoneNumber: yup
    .string()
    .required("*No.HP wajib diisi")
    .length(12, "No.HP tidak valid")
    .min(9, "No.HP tidak valid")
    .nonNullable(),
  whatsAppNumber: yup
    .string()
    .required("*No.WhatsApp wajib diisi")
    .length(12, "No.WhatsApp tidak valid")
    .min(9, "No.WhatsApp tidak valid")
    .nonNullable(),
  email: yup.string().email("Email tidak valid").optional(),
  address: yup.string().required("*Alamat KTP wajib diisi").nonNullable(),
  residenceAddress: yup
    .string()
    .required("*Alamat Domisili wajib diisi")
    .nonNullable(),
  subdistrict: yup.string().optional().nullable(),
  city: yup.string().required("*Kota wajib diisi").nonNullable(),
  postalCode: yup.number().optional().typeError("Kode Pos tidak valid"),
  gender: yup.string().optional().nullable(),
  status: yup.string().optional().nullable(),
  work: yup.string().required("*Pekerjaan wajib diisi").nonNullable(),
  education: yup.string().optional().nullable(),
  biologicalMotherMaidenName: yup
    .string()
    .required("*Nama Gadis Ibu Kandung wajib diisi")
    .nonNullable(),
  emergencyContactName: yup
    .string()
    .required("*Nama Emergency Contact wajib diisi")
    .nonNullable(),
  emergencyContactPhone: yup
    .string()
    .required("*No.HP Emergency Contact wajib diisi")
    .length(12, "No.HP Emergency Contact tidak valid")
    .min(9, "No.HP Emergency Contact tidak valid")
    .nonNullable(),
  emergencyContactKtp: yup
    .string()
    .required("*No.KTP Emergency Contact wajib diisi")
    .length(16, "No.KTP Emergency Contact tidak valid")
    .nonNullable(),
  emergencyContactAddress: yup
    .string()
    .required("*Alamat Emergency Contact wajib diisi")
    .nonNullable(),
  dependentsTotal: yup.string().optional().nullable(),
  npwpNumber: yup.string().optional().nullable(),
  lengthOfWork: yup
    .string()
    .required("*Lama Bekerja wajib diisi")
    .nonNullable(),
  workAddress: yup.string().optional().nullable(),
  workSubdistrict: yup.string().optional().nullable(),
  workCity: yup.string().optional().nullable(),
  workPostalCode: yup.number().optional().nullable(),
  monthlyIncome: yup
    .number()
    .required("*Penghasilan Perbulan wajib diisi")
    .typeError("Penghasilan Perbulan tidak valid")
    .nonNullable(),
  annualIncome: yup
    .number()
    .required("*Penghasilan Perbulan wajib diisi")
    .typeError("Penghasilan Perbulan tidak valid")
    .nonNullable(),
  anotherIncome: yup.string().optional().nullable(),
  submissionAmount: yup
    .number()
    .required("*Nominal Pengajuan wajib diisi")
    .typeError("Nominal Pengajuan tidak valid")
    .nonNullable(),
  verificationReason: yup
    .string()
    .required("*Response Verifikasi wajib diisi")
    .nonNullable(),
})

export type SubmissionRequest = yup.InferType<typeof SubmissionSchema>
