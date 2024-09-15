import * as yup from "yup";
export const purchaseSchema = yup.object().shape({
    vendorId: yup.object().required("Choose Any Vendor"),
    signatureName: yup.string().when("sign_type", (sign_type) => {
      if (sign_type == "eSignature") {
        return yup.string().nullable().required("Enter Signature Name");
      } else {
        return yup.string().notRequired();
      }
    }),
    signatureData: yup.string().when("sign_type", (sign_type) => {
      if (sign_type == "eSignature") {
        return yup
          .string()
          .test(
            "is-eSignature",
            `Draw The Signature`,
            async (value) => value == "true"
          );
      } else {
        return yup.string().notRequired();
      }
    }),
    signatureId: yup.string().when("sign_type", (sign_type) => {
      if (sign_type == "manualSignature") {
        return yup.object().shape({
          value: yup.string().required("Choose Signature Name"),
        });
      } else {
        return yup.string().notRequired();
      }
    }),
  });