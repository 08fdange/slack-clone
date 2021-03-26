import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import firebase from 'firebase';
import db from '../firebase';

const styles = (theme) => ({
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
    autocomplete: {
        fullWidth: true,
        flex: 1,
        border: 'none',
        fontSize: '13px',
        background: '#1a1b1f',
        color: '#C6C8C9',
        paddingRight: '10px',
        focused: {
            outline: "none",
        },
    },
  });

class UsersModal extends React.Component {

    state = {
        user: []
    }

    handleChange = (event,value) => {
        this.setState({user: value})
    }

    handleSubmit = (event, state) => {
        let userId = state.user.uid;
        let channelId = this.props.match.params.channelId;
        let roomRef = db.collection('rooms').doc(channelId);
        if (this.props.type === "Add") {
            roomRef.update({
                users: firebase.firestore.FieldValue.arrayUnion(userId)
            });
        } else if (this.props.type === "Remove") {
            roomRef.update({
                users: firebase.firestore.FieldValue.arrayRemove(userId)
            });
        }
        
        this.props.handleClose();
    }

    render() {
        const { classes } = this.props;
        return( 
            <div className={classes.paper}>
                <div className='add-user'>
                <h2>{this.props.type} user</h2>
                <p style={{color: '#aeb2b5'}}>
                    {this.props.channelName}
                </p>
                <label><b>Name</b></label>
                <InputContainer>
                    <form>
                    {this.props.users ?
                        <Autocomplete
                            className={classes.autocomplete}
                            id='user-autocomplete'
                            options={this.props.users}
                            getOptionLabel={(option) => option.name}
                            onChange={this.handleChange}
                            renderInput={(params) => <TextField
                                name='name'
                                placeholder="Enter a name..."
                                {...params}
                            />}
                        /> : null }
                    </form>
                </InputContainer>
                <SubmitContainer>
                    <SubmitButton
                        type='submit'
                        onClick={(event, state) => this.handleSubmit(event, this.state)}
                    ><b>{this.props.type}</b>
                    </SubmitButton>
                </SubmitContainer> 
                </div> 
            </div>
        )
    }      
}

export default withRouter(withStyles(styles)(UsersModal));

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