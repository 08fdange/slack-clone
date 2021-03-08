import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
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
    },
    toggle: {
        color: '#fff',
        '&$checked': {
            color: '#fff',
        },
        '&$checked + $track': {
            backgroundColor: '#fff',
        },
    }
  }));

const ModalContent = ({ createChannel }) => {
    const classes = useStyles();

    const [state, setState] = useState({
        name: "",
        description: "",
        private: false
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSwitch = (event) => {
        const { name, checked} = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }

    const newChannel = () => {
        if(state.name !== "") {
            createChannel(state);
            setState({
                name: "",
                description: "",
                private: false
            })
        }
    }

    return(
    <div className={classes.paper}>
        <h2>Create Channel</h2>
        <p style={{color: '#aeb2b5'}}>
            Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.
        </p>
        <label><b>Name</b></label>
        <InputContainer>
            <form>
                <input
                    type='text'
                    name='name'
                    value={state.name}
                    placeholder='Channel here...'
                    onChange={(event) => handleChange(event)}
                />
            </form>
        </InputContainer>
        <label><b>Description (optional)</b></label>
        <InputContainer>
            <form>
                <input 
                    type='text'
                    name='description'
                    value={state.description}
                    onChange={(event) => handleChange(event)}
                />
            </form>
        </InputContainer>
        <label><b>Make private</b></label>
        <PrivateToggleContainer>
            <p style={{color: '#aeb2b5'}}>
                When a channel is set to private, it can only be viewed or joined by invitation.
            </p>
            <Switch 
                name='private'
                className={classes.toggle}
                color='primary'
                checked={state.private}
                onChange={(event) => handleSwitch(event)}
            />
        </PrivateToggleContainer>
        <SubmitContainer>
            <SubmitButton
                type='submit'
                onClick={newChannel}
            ><b>Create</b></SubmitButton>
        </SubmitContainer>
    </div>
    )
}

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
const PrivateToggleContainer = styled.div`
    display: flex;
    p {
        margin-right: 10px;
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

export default ModalContent;