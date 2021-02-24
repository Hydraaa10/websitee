import React from "react";
import FormField from "./FormField";

const BillingDetailsFields = () => {
  return (
    <>
      <FormField
        name="name"
        label="Fullname"
        type="text"
        placeholder="Fullname"
        required
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="E-mail"
        required
      />
      <FormField
        name="address"
        label="Address"
        type="text"
        placeholder="Address"
        required
      />
      <FormField
        name="city"
        label="City"
        type="text"
        placeholder="City"
        required
      />
      <FormField
        name="state"
        label="State"
        type="text"
        placeholder="State"
        required
      />
      <FormField
        name="zip"
        label="ZIP"
        type="text"
        placeholder="ZIP code"
        required
      />
    </>
  );
};
export default BillingDetailsFields;