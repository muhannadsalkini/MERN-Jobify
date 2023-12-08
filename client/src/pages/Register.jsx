/* eslint-disable react-refresh/only-export-components */
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, redirect, Link } from "react-router-dom";
import FormRow from "../components/FormRow";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { SubmitBtn } from "../components";

// action function
export const action = async ({ request }) => {
  // Provide the interface form react router
  const formData = await request.formData();

  // Get the form data
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.errors[0] || "An error occurred");
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" />
        <FormRow type="text" name="lastName" labelText="last name" />
        <FormRow type="text" name="location" />
        <FormRow type="email" name="email" />

        <FormRow type="password" name="password" />

        <SubmitBtn />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
