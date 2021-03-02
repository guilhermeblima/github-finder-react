import axios from 'axios';
import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Search from './components/users/Search';
import User from './components/users/User';
import Users from './components/users/Users';

class App extends Component {
  state ={
    users: [],
    user: {},
    repos : [],
    loading: false,
    alert: null,
  };

  // async componentDidMount(){
   
  //   this.setState({loading: true});
  //   const res = await (await axios.get("https://api.github.com/users", {headers: {Authorization: process.env.REACT_APP_GITHUB_TOKEN}} ));

  //   this.setState({loading: false, users: res.data});
  // }


  //Find users
  searchUsers = async text => {
    this.setState({loading: true});
    const res = await (await axios.get(`https://api.github.com/search/users?q=${text}`, {headers: {Authorization: process.env.REACT_APP_GITHUB_TOKEN}} ));
    this.setState({loading: false, users: res.data.items});
  };

  //Get User details
  getUser = async (username) => {
    this.setState({loading: true});
    const res = await (await axios.get(`https://api.github.com/users/${username}`, {headers: {Authorization: process.env.REACT_APP_GITHUB_TOKEN}} ));
    this.setState({loading: false, user: res.data});
  }

  //Get User repos
  getRepos = async (username) => {
    this.setState({loading: true});
    const res = await (await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`, {headers: {Authorization: process.env.REACT_APP_GITHUB_TOKEN}} ));
    this.setState({loading: false, repos: res.data});
  }

  //Clear user from state
  clearUsers = () => this.setState({loading: false, users: []});

  //Set alert message for search
  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}});
    setTimeout(() => this.setState({alert: null}),3000);
  }

  render(){
    const {users, user, repos, loading} = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert}/>
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search 
                    searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers} 
                    showClearBtn={users.length > 0 ? true : false}
                    setAlert={this.setAlert}/>
                  <Users loading={loading} users={users}/>
                </Fragment>
              )}/>
              <Route exact path='/about' component={About}/>
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} getUserRepos={this.getRepos} user={user} repos={repos} loading={loading}/>
              )}/>
            </Switch>
            
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
