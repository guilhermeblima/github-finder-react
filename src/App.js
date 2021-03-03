import axios from 'axios';
import React, {useState, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Search from './components/users/Search';
import User from './components/users/User';
import Users from './components/users/Users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //Find users
  const searchUsers = async text => {
    setLoading(true);
    const res = await (await axios.get(`https://api.github.com/search/users?q=${text}`, {headers: {Authorization: process.env.REACT_APP_GITHUB_TOKEN}} ));
    
    setUsers(res.data.items);
    setLoading(false);
  };

  //Get User details
  const getUser = async (username) => {
    setLoading(true);
    const res = await (await axios.get(`https://api.github.com/users/${username}`, {headers: {Authorization: process.env.REACT_APP_GITHUB_TOKEN}} ));
   
    setUser(res.data);
    setLoading(false);
  }

  //Get User repos
  const getRepos = async (username) => {
    setLoading(true);
    const res = await (await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`, {headers: {Authorization: process.env.REACT_APP_GITHUB_TOKEN}} ));
    
    setRepos(res.data);
    setLoading(false);
  }

  //Clear user from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  //Set alert message for search
  const showAlert = (msg, type) => {
    setAlert({msg, type});
    setTimeout(() => setAlert(null),3000);
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search 
                  searchUsers={searchUsers} 
                  clearUsers={clearUsers} 
                  showClearBtn={users.length > 0 ? true : false}
                  setAlert={showAlert}/>
                <Users loading={loading} users={users}/>
              </Fragment>
            )}/>
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render={props => (
              <User {...props} getUser={getUser} getUserRepos={getRepos} user={user} repos={repos} loading={loading}/>
            )}/>
          </Switch>
          
        </div>
      </div>
    </Router>
  );
};

export default App;
