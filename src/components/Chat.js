import React from 'react'
import styled from 'styled-components'

function Chat() {
    return (
        <Container>
           <Header>
                <Channel>
                    <ChannelName>
                        #FrankDAngeloDev
                    </ChannelName>
                </Channel>
                <ChannelDetails>

                </ChannelDetails>
           </Header>
           <MessageContainer>

           </MessageContainer>
           <ChatInput>

           </ChatInput>
        </Container>
    )
}

export default Chat

const Container = styled.div`
    display: grid;
    grid-template-rows: 64px auto min-content;
`
const Header = styled.div`
    background: green;
`
const MessageContainer = styled.div`
    background: gray;
`
const ChatInput = styled.div`

`
const Channel = styled.div`

`
const ChannelName = styled.div`

`
const ChannelDetails = styled.div`

`