import React, { useState } from 'react'
import PropTypes from 'prop-types';

const Search = ({searchUsers, setAlert, clearUsers, showClearBtn}) => {

    const [text, setText] = useState('');

    const onSubmit = (e) =>{
        e.preventDefault();
        if(text !== ''){
            searchUsers(text);
            setText('');
        }else{
            setAlert('Please enter something.', 'light');
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
            {showClearBtn && (<button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>)}
            
            
        </div>
    )
}
Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
}

export default Search
