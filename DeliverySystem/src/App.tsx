import { Container, Grid2 } from "@mui/material";
import { Header } from "./components/Header/Header";
import { HomePage } from "./components/pages/HomePage/HomePage";
import { AuthForm } from "./components/AuthForm/AuthForm";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Track } from "./components/pages/HomePage/Track";
import { TrackPage } from "./components/pages/HomePage/TrackPage";
import {
  CREATE_ACCOUNT_FIELDS,
  SIGN_IN_FIELDS,
  INITIAL_VALUES_CREATE_ACCOUNT,
  INITIAL_VALUES_SIGN_IN,
} from "./Components/AuthForm/constants";
import {
  HOME_PAGE_URL,
  SIGN_IN_URL,
  CREATE_ACCOUNT_URL,
  CREATE_ACCOUNT_FORM_TITLE,
  SIGN_IN_FORM_TITLE,
} from "./constants";
import "./app.css";

import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./components/Chatbot/config.js";
import MessageParser from "./components/Chatbot/MessageParser.jsx";
import ActionProvider from "./components/Chatbot/ActionProvider.jsx";

function App() {
  const location = useLocation();
  const [signInAuth, setSignInAuth] = useState<boolean>(
    location.pathname === SIGN_IN_URL
  );
  return (
    <Container maxWidth="xl">
      <Header setSignInAuth={setSignInAuth} signInAuth={signInAuth} />
      <Grid2>
        {/* <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        /> */}

        <Routes>
          <Route path={HOME_PAGE_URL} element={<HomePage />} />
          <Route
            path={SIGN_IN_URL}
            element={
              <AuthForm
                title={SIGN_IN_FORM_TITLE}
                textFields={SIGN_IN_FIELDS}
                initialValues={INITIAL_VALUES_SIGN_IN}
                signInAuth={signInAuth}
              />
            }
          />
          <Route
            path={CREATE_ACCOUNT_URL}
            element={
              <AuthForm
                title={CREATE_ACCOUNT_FORM_TITLE}
                textFields={CREATE_ACCOUNT_FIELDS}
                initialValues={INITIAL_VALUES_CREATE_ACCOUNT}
                signInAuth={signInAuth}
              />
            }
          />
            
          <Route 
            path="/Track/:trackingNumber" 
            element={<Track />} 
            />
          <Route 
            path="/Track" 
            element={<TrackPage />} 
            />
        </Routes>
      </Grid2>
    </Container>
  );
}
export default App;
