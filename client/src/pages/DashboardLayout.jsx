import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { useContext } from "react";

// Context API allows to share data between components without passing props through every level of the component tree.
const DashboardContext = createContext();

const DashboardLayout = () => {
  // For this page all is neede is 3 global values. One for user(comming from server), one for the dark mode and one for the sidebar (open or closed)

  // temp
  const user = { name: "Jhon" };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // placeholder functions
  const toggleDarkTheme = () => {
    console.log("toggle dark theme");
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    console.log("logout user");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDark,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

// Custom hook. To use the shared values we must export the context we created.
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;

// Wrapper used to set a CSS styles, DashboardContext.Provider used to share the global values with other componnets.
