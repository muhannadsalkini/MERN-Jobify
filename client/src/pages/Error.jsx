import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError(); // Find more about the error
  console.log(error);

  return (
    <>
      <h1>Error</h1>
      <Link to={"/"}>Back Home</Link>
    </>
  );
};

export default Error;
