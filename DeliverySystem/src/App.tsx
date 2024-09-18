import { Container, Grid2, Paper } from '@mui/material';
import { Header } from './Components/Header/Header';
import { HomePage } from './Components/pages/HomePage/HomePage';
import { AuthForm } from './Components/AuthForm/AuthForm';
import { useState } from 'react';
import { Routes, Route, useLocation} from 'react-router-dom';
import { CREATE_ACCOUNT_FIELDS, SIGN_IN_FIELDS, INITIAL_VALUES_CREATE_ACCOUNT, INITIAL_VALUES_SIGN_IN } from './Components/AuthForm/constants';
import { HOME_PAGE_URL, SIGN_IN_URL, CREATE_ACCOUNT_URL, CREATE_ACCOUNT_FORM_TITLE, SIGN_IN_FORM_TITLE } from './constants';

function App() {
  const location = useLocation();
  const [signInAuth, setSignInAuth] = useState<boolean>(location.pathname === SIGN_IN_URL);
  return (
      <Container maxWidth='xl'>
        <Header setSignInAuth={setSignInAuth} />
        <Grid2>
          <Paper elevation={3}>
            <Routes>
              <Route path={HOME_PAGE_URL} element={<HomePage />} />
              <Route path={SIGN_IN_URL} element={
                <AuthForm title={SIGN_IN_FORM_TITLE} 
                textFields={SIGN_IN_FIELDS} 
                initialValues={INITIAL_VALUES_SIGN_IN} 
                signInAuth={signInAuth} 
              />} 
              />
              <Route path={CREATE_ACCOUNT_URL} element={
                <AuthForm title={CREATE_ACCOUNT_FORM_TITLE} 
                textFields={CREATE_ACCOUNT_FIELDS} 
                initialValues={INITIAL_VALUES_CREATE_ACCOUNT} 
                signInAuth={signInAuth} 
                />} 
                />
            </Routes>
          </Paper>
        </Grid2>
      </Container>
  )
}
export default App
