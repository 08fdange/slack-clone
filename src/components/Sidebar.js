import React from 'react'
import styled from 'styled-components'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import AddIcon from '@material-ui/icons/Add'
import { sidebarItems } from '../data/SidebarData.js'
import db from '../firebase'
import { useHistory} from 'react-router-dom'

function Sidebar({rooms}) {

    const history = useHistory();

    const goToChannel = (id) => {
        if(id) {
            history.push(`/room/${id}`)
        }
    }

    const addChannel = () => {
        const promptName = prompt("Enter Channel Name");
        if (promptName) {
            db.collection('rooms').add({
                name: promptName
            })
        }

    }
    return (
        <Container> 
            <WorkSpaceContainer>
                <Name>
                    FrankDangeloDev
                </Name>
                <NewMessage>
                    <AddCircleOutlineIcon/>
                </NewMessage>
            </WorkSpaceContainer>
            <MainChannels>
                {
                    sidebarItems.map((item,key) => (
                        <MainChannelItem key={key}>
                            {item.icon}
                            {item.text}
                        </MainChannelItem>
                    ))
                }
            </MainChannels>
            <ChannelsContainer>
                <NewChannelContainer>
                    <div>
                        Channels
                    </div>
                    <AddIconStyled onClick={addChannel}/>
                </NewChannelContainer>
            </ChannelsContainer>
            <ChannelsList>
                {
                    rooms.map((item, key) => (
                        <Channel onClick={() => goToChannel(item.id)} key={key}>
                           # {item.name}
                        </Channel>    
                    ))
                }
            </ChannelsList>
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    background: rgb(20 18 22);
`
const WorkSpaceContainer = styled.div`
    color: white;
    height: 64px;
    display: flex;
    align-items: center;
    padding-left: 19px;
    padding-right: 19px;
    justify-content: space-between;
    border-bottom: 1px solid rgb(255 255 255 / 20%);
`
const Name = styled.div``

const NewMessage = styled.div`
    width: 36px;
    height: 36px;
    background: white;
    color: #151619;
    fill: #151619;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
`
const MainChannels = styled.div`

`
const MainChannelItem = styled.div`
    color: #aeb2b5;
    display: grid;
    grid-template-columns: 15% auto;
    height: 28px;
    align-items: center;
    padding-left: 19px;
    cursor: pointer;
    :hover {
        background: rgb(58 54 60);
    }
`
const ChannelsContainer = styled.div`
    color: #aeb2b5;
    margin-top: 10px;
`
const NewChannelContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    padding-left: 19px;
    padding-right: 12px;
`
const ChannelsList = styled.div`
    color: #aeb2b5;
`
const Channel = styled.div`
    height: 28px;
    display: flex;
    align-items: center;
    padding-left: 19px;
    cursor: pointer;
    :hover {
        background: rgb(58 54 60);
    }
`
const AddIconStyled = styled(AddIcon)`
    cursor: pointer;
    border-radius: 2px;
    :hover {
        background: #28292f;
    }
`