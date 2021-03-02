import React from 'react'
import styled from 'styled-components'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function ChatMessage({user,data,text,name,image,timestamp,deleteMessage}) {

    const handleDelete = () => {
        deleteMessage(timestamp)
    }

    return (
        <Container>
            <Message>
                <UserAvatar>
                    <img src={image} alt={name} />
                </UserAvatar>
                <MessageContent>
                    <Name>
                        <b>{name}</b>
                        <span>{new Date(timestamp.toDate()).toUTCString()}</span>
                    </Name>
                    <Text>
                        {text}
                    </Text>
                </MessageContent>
            </Message>
            <DeleteButton onClick={handleDelete}>
                {
                    user.name === name ? <HighlightOffIcon /> : null
                }
            </DeleteButton>
        </Container>
    )
}

export default ChatMessage

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: center;
    :hover {
        background: rgb(58 54 60);
    }
`
const Message = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 20px;
`
const UserAvatar = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 3px;
    over-flow: hidden;
    margin-right: 8px;

    img {
        width: 100%;
    }
`
const MessageContent = styled.div`
    display: flex;
    flex-direction: column;
    color: #C6C8C9;
    font-size: 14px;
`
const Name = styled.span`
    font-weight: 900;
    line-height: 1.4;
    font-size: 15px;
    color: #C6C8C9;
    span {
        margin-left: 5px;
        font-weight: 400;
        color: #B3B3B3;
        font-size: 13px;
    }
`
const Text = styled.span`

`
const DeleteButton = styled.div`
    display: flex;
    align-items: center;
    color: white;
    margin-right: 19px;
    cursor: pointer;
`
