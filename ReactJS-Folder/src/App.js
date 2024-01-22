import React from "react";
import "./App.css";
import "./AdminApp.css";
import StudentApp from "./StudentApp";
import AdminApp from "./AdminApp";
 import { useSelector, useDispatch } from 'react-redux';
import { showAdminApp, hideAdminApp } from './redux/features/admin'
import { BrowserRouter as Router } from "react-router-dom";
function App() {

  const showAdmin = useSelector((state) => state.admin.showAdminApp);

  return (
    <>
      <Router>
        {showAdmin ? <AdminApp /> : <StudentApp />}
      </Router>
    </>
  );
}

export default App;