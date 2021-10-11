import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserPanel from './pages/UserPanel';
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AppBar from "./components/AppBar";
import Navigation from "./components/Navigation";
import styled from "styled-components";
import AuthContext from "./services/authContext";
import AuthProvider from "./services/authContext";

const AppWrapper = styled.div`
    display: flex;
    flex-flow: column;
    height: 100vh
`

function App() {
  return (
    <AuthProvider>
      <AppWrapper className="App">
        <Router>
          <AppBar />
          <Navigation>
            <Route exact path='/' component={Home} />
            <ProtectedRoute exact path='/user-panel' component={UserPanel} />
          </Navigation>
        </Router>
      </AppWrapper>
    </AuthProvider>
  );
}

export default App;
