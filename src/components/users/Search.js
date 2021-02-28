import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Search extends Component {
    state ={
        text: '',
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
    }

    onSubmit = (e) =>{
        e.preventDefault();
        if(this.state.text !== ''){
            this.props.searchUsers(this.state.text);
            this.setState({text: ''});
        }else{
            this.props.setAlert('Please enter something.', 'light');
        }
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    render() {
        const {showClearBtn, clearUsers} = this.props;
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input 
                        type="text" 
                        name="text" 
                        placeholder="Search Users..." 
                        value={this.state.text}
                        onChange={this.onChange}/>
                    <input type="submit" value="Search" className="btn btn-dark btn-block"/>
                </form>
                {showClearBtn && (<button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>)}
                
                
            </div>
        )
    }
}

export default Search
