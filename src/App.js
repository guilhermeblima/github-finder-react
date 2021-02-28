import axios from 'axios';
import React, {Component} from 'react';
import './App.css';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';

class App extends Component {
  state ={
    users: [],
    loading: false,
    alert: null,
  };

  // async componentDidMount(){
   
  //   this.setState({loading: true});
  //   const res = await (await axios.get("https://api.github.com/users", {headers: {Authorization: process.env.REACT_APP_GITHUB_TOKEN}} ));

  //   this.setState({loading: false, users: res.data});
  // }

  searchUsers = async text => {
    this.setState({loading: true});
    const res = await (await axios.get(`https://api.github.com/search/users?q=${text}`, {headers: {Authorization: process.env.REACT_APP_GITHUB_TOKEN}} ));
    this.setState({loading: false, users: res.data.items});
  };

  clearUsers = () => this.setState({loading: false, users: []});

  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}});
    setTimeout(() => this.setState({alert: null}),3000);
  }

  render(){
    const {users, loading} = this.state;
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Search 
            searchUsers={this.searchUsers} 
            clearUsers={this.clearUsers} 
            showClearBtn={users.length > 0 ? true : false}
            setAlert={this.setAlert}/>
          <Users loading={loading} users={users}/>
        </div>
      </div>
    );
  }
}

export default App;
