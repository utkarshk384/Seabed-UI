import React from "react";
import "../styles/main.scss"
import type { AppProps } from "next/app";


const App: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => {

  return (
    <>
          <Component {...pageProps} /> 
    </>
  );
};
export default App;
