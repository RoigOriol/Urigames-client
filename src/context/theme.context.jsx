import { createContext, useState } from "react";

const themeContext = createContext();

function ThemeWrapper(props) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleToggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const passedContext = {
    isDarkTheme,
    handleToggleTheme,
  };

  return (
    <themeContext.Provider value={passedContext}>
      {props.children}
    </themeContext.Provider>
  );
}

export { themeContext, ThemeWrapper };
