import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
    paper: {
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%)`,
      position: 'absolute',
      width: 400,
      outline: 'none',
      color: '#fff',
      backgroundColor: '#1a1b1f',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: '7px',
      "&:focus": {
        outline: "none"
      }
    }
  }));

const UsersModal = React.forwardRef((ref,props) => {
    const classes = useStyles();

    const [state, setState] = useState({ name: "" })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return(
    <div className={classes.paper}>
        <h2>Add people</h2>
        <p style={{color: '#aeb2b5'}}>
            {props.channelName}
        </p>
        <label><b>Name</b></label>
        <InputContainer>
            <form>
                <Autocomplete
                    options={props.users}
                    name='user'
                    value={state.user}
                    placeholder='Enter a name...'
                    onChange={(event) => handleChange(event)}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <input
                        {...params}
                        type='text'
                    />}
                />
            </form>
        </InputContainer>
        <SubmitContainer>
            <SubmitButton
                type='submit'
                onClick={props.handleUser}
            ><b>Add</b></SubmitButton>
        </SubmitContainer>
    </div>
    )
})

export default UsersModal;

const InputContainer = styled.div`
    border: 1px solid #8D8D8E;
    border-radius: 4px;
    margin-top: 10px;
    margin-bottom: 15px;
    form {
        display: flex;
        height: 42px;
        align-items: center;
        padding-left: 10px;
        justify-content: space-between;

        input{
            flex: 1;
            border: none;
            font-size: 13px;
            background: #1a1b1f;
            color: #C6C8C9;
        }
        input:focus{
            outline: none;
        }
    }  
`
const SubmitContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`
const SubmitButton = styled.button`
    background-color: #282A2D;
    color: #aeb2b5;
    border-radius: 4px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    font-size: 15px;
    padding: 10px;
    :hover {
        background: #5b5f65;
        color: #fff;
    }
    :focus {
        outline: none;
    }
`