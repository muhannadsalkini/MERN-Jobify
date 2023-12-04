import { createContext, useState } from "react";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { useContext } from "react";
import { checkDefaultTheme } from "../App";

// Loader: A function to provide data to the route element before it renders.
export const loader = async () => {
  try {
    const { data } = await customFetch("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

// Context allows to share data between components without passing props through every level of the component tree.
const DashboardContext = createContext();

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDark, setIsDark] = useState(checkDefaultTheme());

  // placeholder functions
  const toggleDarkTheme = () => {
    setIsDark(!isDark);

    // classList is a property that represents the classes of an HTML element.
    // toggle("dark-theme", !isDark) is a method call on the classList. It toggles the "dark-theme" class based on the value of !isDark.
    document.body.classList.toggle("dark-theme", !isDark);

    // localStorage is a web storage mechanism that allows you to store key-value pairs in a user's browser for persistent data storage.
    // setItem("darkTheme", !isDark) is setting a key-value pair in localStorage.
    localStorage.setItem("darkTheme", !isDark);
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
              <Outlet context={{ user }} />
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

// Wrapper used to set a CSS styles, DashboardContext.Provider used to share the global values with other components.
