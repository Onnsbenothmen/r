import React from 'react';
import { AuthProvider } from './hooks/AuthContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SignUp from './components/Signup';
import FundsList from './components/FundsList';
import UserList from './components/UserList';
import UpdateUser from './components/updatUser';
import InstanceCreationForm from './Instance/InstanceCreationForm';
import InstanceList from './Instance/InstanceList';
import RolesList from './components/Role/roleList';
import DashboardPr from './components/president_dashboard';
import Profile from './components/Profil';
import 'antd/dist/reset.css';
import SignUpAdmin from './components/SignupAdmin';
import AdminPubliqueList from './components/listAdmin';
import UpdateAdmin from './components/UpdateAdmin';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/listFund" component={FundsList} />
          <Route path="/UserList" component={UserList} />
          <Route path="/update/:id" component={UpdateUser} />
          <Route path="/InstanceCreate" component={InstanceCreationForm}/>
          <Route path="/InstanceList" component={InstanceList}/>
          <Route path="/RolesList" component={RolesList}/>
          <Route path="/admin_dashboard" component={Dashboard} />
        <Route path="/president_dashboard" component={DashboardPr}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/SignupAdmin" component={SignUpAdmin}/>
        <Route path="/ListAdmin" component={AdminPubliqueList}/>
        <Route path="/UpdateAdmin" component={UpdateAdmin}/>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;