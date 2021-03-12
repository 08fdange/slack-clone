import React, { useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import db from '../firebase'
import { useParams } from 'react-router-dom'
import firebase from 'firebase'

function Chat({ user, handleDetails }) {

    let { channelId } = useParams();
    const [ channel, setChannel ] = useState();
    const [ messages, setMessages ] = useState([]);
    const messagesEndRef = useRef(null);

    const sendMessage = (text) => {
        if(channelId) {
            let payload = {
                text: text,
                timestamp: firebase.firestore.Timestamp.now(),
                user: user.name,
                userID: user.uid,
                userImage: user.avatar
            }
            db.collection('rooms').doc(channelId).collection('messages').add(payload);
        }
    }

    const deleteMessage = (timestamp) => {
        db.collection('rooms').doc(channelId).collection('messages').where('timestamp', "==", timestamp).get()
        .then(querySnapshot => { querySnapshot.docs[0].ref.delete(); })
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    
    useEffect(() => {

        const getMessages = () => {
            db.collection('rooms')
            .doc(channelId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot)=>{
                let messages = snapshot.docs.map((doc)=>doc.data());
                setMessages(messages);
            })
        }

        const getChannel = () => {
            db.collection('rooms')
            .doc(channelId)
            .onSnapshot((snapshot)=>{
                setChannel(snapshot.data());
            })
        }

        getChannel();
        getMessages();
    }, [channelId])

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <Container>
            <Header>
                <Channel>
                    <ChannelName>
                        # {channel && channel.name}
                    </ChannelName>
                    <ChannelInfo>
                        {channel && channel.description}
                    </ChannelInfo>
                </Channel>
                <ChannelDetails>
                    <Info onClick={handleDetails}/>
                </ChannelDetails>
            </Header>
            <MessageContainer>
                {
                    messages.length > 0 &&
                    messages.map((data, index)=>(
                        <ChatMessage
                            deleteMessage={deleteMessage}
                            user={user}
                            data={data}
                            text={data.text}
                            name={data.user}
                            userID={data.userID}
                            image={data.userImage}
                            timestamp={data.timestamp}
                            key={index} 
                        />
                    ))
                }
                <div 
                    style={{float: 'left', clear: 'both'}}
                    ref={messagesEndRef}>
                </div>
            </MessageContainer>
            <ChatInput sendMessage={sendMessage} />
        </Container>
    )
}

export default Chat

const Container = styled.div`
    background: #1a1b1f;
    display: grid;
    grid-template-rows: 64px auto min-content;
    min-height: 0;
`
const Header = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    height: 64px;
    align-items: center;
    border-bottom: 1px solid rgba(121, 121, 121, .6);
    justify-content: space-between;
`
const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: .7em;
    }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
    ::-webkit-scrollbar-thumb {
        background-color: #C6C8C9;
        border-radius: 10px;
    }

`
const Channel = styled.div`

`
const ChannelName = styled.div`
    font-weight: 700;
    color: #FFFFFF;
`
const ChannelInfo = styled.div`
    font-weight: 400;
    color: #FFFFFF;
    font-size: 13px;
    margin-top: 8px;
`
const Info = styled(InfoOutlinedIcon)`
    margin-left: 10px;
    padding: 6px;
    cursor: pointer;
    border-radius: 3px;
    :hover {
        background: #28292f;
    }
`
const ChannelDetails = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #C6C8C9;
`