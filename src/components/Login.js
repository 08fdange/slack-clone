import React from 'react';
import styled from 'styled-components';
import { auth, provider} from '../firebase';

function Login({setUser, users}) {

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(resp => {
            const newUser = {
                name: resp.user.displayName,
                avatar: resp.user.photoURL,
                uid: resp.user.uid,
            }
            setUser(newUser);
            console.log(JSON.stringify(newUser))
            localStorage.setItem('user', JSON.stringify(newUser));
            if (!(users.some(user => user.uid === newUser.uid))) {
                
            }
        })
    }

    return (
        <Container>
            <Content>
                <SlackImage src='https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png'/>
                <h1>Sign into Slack</h1>
                <SignInButton onClick={signIn}>
                    Sign In With Google
                </SignInButton>
            </Content>
        </Container>
    )
}

export default Login;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 100px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px rgb(0 0 0 / 24%);
`
const SlackImage = styled.img`
    height: 100px;
`
const SignInButton = styled.button`
    margin-top: 20px;
    background-color: #0a8d48;
    color: white;
    border: none;
    height: 40px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;
`
