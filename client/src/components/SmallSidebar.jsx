import Wrapper from "../assets/wrappers/SmallSidebar";
// import the DashboardContext to use the sahred values.
import { useDashboardContext } from "../pages/DashboardLayout";

const SmallSidebar = () => {
  const data = useDashboardContext();
  console.log(data);

  return <Wrapper>SmallSidebar</Wrapper>;
};

export default SmallSidebar;
