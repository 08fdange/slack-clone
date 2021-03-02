import React, { useState } from 'react'
import styled from 'styled-components'
import SendIcon from '@material-ui/icons/Send';

function ChatInput({ sendMessage }) {
    
    const [input, setInput] = useState('');

    const handleChange = (event) => {
        setInput(event.target.value)
    } 

    const send = (event) => {
        event.preventDefault();
        if(!input) return;
        sendMessage(input);
        setInput("");
    }

    return (
        <Container>
            <InputContainer>
                <form>
                    <input 
                        onChange={handleChange}
                        value={input}
                        type='text' 
                        placeholder='Message here...'
                    />
                    <SendButton 
                        type='submit'
                        onClick={send}
                    >
                        <Send />
                    </SendButton>
                </form>
            </InputContainer>
        </Container>
    )
}

export default ChatInput

const Container = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 24px;
`
const InputContainer = styled.div`
    border: 1px solid #8D8D8E;
    border-radius: 4px;
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
const SendButton = styled.button`
    background: #007a5a;
    border-radius: 2px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    cursor: pointer;
    border: none;

    .MuiSvgIcon-root{
        width: 18px;
    }

    :hover {
        background: #148567;
    }
`
const Send = styled(SendIcon)`
    color: #D9D9D9;
`