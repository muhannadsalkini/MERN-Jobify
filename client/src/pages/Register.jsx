// React link used for app pages. Its faster cus routing in the client
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <h1>Register</h1>
      <Link to="/login">LoginPage</Link>
    </>
  );
};

export default Register;
