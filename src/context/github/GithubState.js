import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    GET_USER,
    GET_REPOS,
    CLEAR_USERS,
    SET_LOADING
} from '../types';

let githubToken;

if(process.env.NODE_ENV !== 'production'){
    githubToken = process.env.REACT_APP_GITHUB_TOKEN;
}else{
    githubToken = process.env.GITHUB_TOKEN;
}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search users
    const searchUsers = async text => {
        setLoading();
        const res = await (await axios.get(`https://api.github.com/search/users?q=${text}`, {headers: {Authorization: githubToken}} ));
        
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });
      };

    // Get User
    const getUser = async (username) => {
        setLoading();
        const res = await (await axios.get(`https://api.github.com/users/${username}`, {headers: {Authorization: githubToken}} ));
       
        dispatch({
            type: GET_USER, 
            payload: res.data});
      }

    // Get Repos
    const getRepos = async (username) => {
        setLoading();
        const res = await (await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`, {headers: {Authorization: githubToken}} ));
        
        dispatch({
            type: GET_REPOS, 
            payload: res.data
        });
      }

    // Clear Users
    const clearUsers = () => {
        dispatch({type: CLEAR_USERS});
      };

    // Set Loading
    const setLoading = () => dispatch({type: SET_LOADING}); 

    return <GithubContext.Provider value={{
        users: state.users, 
        user: state.user, 
        repos: state.repos, 
        loading: state.loading,
        searchUsers, 
        clearUsers, 
        getUser, 
        getRepos
    }}>
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;