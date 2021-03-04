import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = ({setAlert}) => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const [text, setText] = useState('');

    const onSubmit = (e) =>{
        e.preventDefault();
        if(text !== ''){
            githubContext.searchUsers(text);
            setText('');
        }else{
            alertContext.showAlert({msg: 'Please enter something.', type: 'light'});
        }
    }

    const onChange = e => setText(e.target.value);

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input 
                    type="text" 
                    name="text" 
                    placeholder="Search Users..." 
                    value={text}
                    onChange={onChange}/>
                <input type="submit" value="Search" className="btn btn-dark btn-block"/>
            </form>
            {githubContext.users.length > 0 && (<button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>)}
            
            
        </div>
    )
}

export default Search
