import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PersonAddDisabledOutlinedIcon from '@material-ui/icons/PersonAddDisabledOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import db from '../firebase'

const DetailsBar = ({ handleDetails, users, handleOpen}) => {
    let { channelId } = useParams();
    const [ channel, setChannel ] = useState();
    const [ channelUsers, setChannelUsers] = useState();
    const [membersDrawer, setMembersDrawer] = useState(false);

    const membersDrawerToggle = () => {
        setMembersDrawer(!membersDrawer)
    }

    const addUserModal = () => {
        handleOpen("add")
    }

    const removeUserModal = () => {
        handleOpen("remove")
    }

    useEffect(() => {
        const getChannel = () => {
            db.collection('rooms')
            .doc(channelId)
            .onSnapshot((snapshot)=>{
                setChannel(snapshot.data());
            })
        }

        getChannel();

    }, [channelId])

    useEffect(() => {
        const getChannelUsers = () => {
            let collection = [];
            if (channel && channel.users) {
                for(let i = 0; i < channel.users.length; i++) {
                    for(let j = 0; j < users.length; j++) {
                        if (users[j].uid === channel.users[i]) {
                            collection.push(users[j])
                        }  
                    }
                }
            }
            let sortedCollection = collection.sort((a,b) => {
                let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            })
            setChannelUsers(sortedCollection)
        }

        getChannelUsers();
    }, [channel, users])

    return(
        <Container>
            <Header>
                <HeaderText>
                    Details
                </HeaderText>
                <StyledCloseIcon onClick={handleDetails}/>
            </Header>
            <ActionContainer>
                <IconContainer>
                    <Circle onClick={addUserModal}>
                        <PersonAddOutlinedIcon/>
                    </Circle>
                    <ActionText>
                        Add
                    </ActionText>
                </IconContainer>
                <IconContainer>
                    <Circle onClick={removeUserModal}>
                        <PersonAddDisabledOutlinedIcon/>
                    </Circle>
                    <ActionText>
                        Delete
                    </ActionText>
                </IconContainer>
                <IconContainer>
                    <Circle>
                        <SearchOutlinedIcon/>
                    </Circle>
                    <ActionText>
                        Find 
                    </ActionText> 
                </IconContainer>
            </ActionContainer>
            <Body>
                <MembersContainer>
                    <Members onClick={membersDrawerToggle}>
                        <MembersText>
                            Members
                        </MembersText>
                        {
                            membersDrawer ? <ExpandMoreIcon/> : <ChevronRightIcon/>
                        }
                        
                    </Members>
                    {
                        membersDrawer && channelUsers ?
                        <MembersList>
                            {channelUsers.map((user, index) => {
                            return  <MemberListItem key={index}>
                                        <UserAvatar>
                                            <img src={user.avatar} alt={user.name} />
                                        </UserAvatar>
                                        <UserName>
                                            {user.name}
                                        </UserName>
                                    </MemberListItem>
                            })}
                        </MembersList> : null  
                    }
                </MembersContainer>
                
            </Body>
        </Container>
    )
}

export default DetailsBar;

const Container = styled.div`
    width: 230px;
    background: rgb(20 18 22);
    border-left: 1px solid rgba(121, 121, 121, .6);
`
const Header = styled.div`
    color: white;
    height: 64px;
    display: flex;
    align-items: center;
    padding-left: 19px;
    padding-right: 19px;
    justify-content: space-between;
    border-bottom: 1px solid rgba(121, 121, 121, .6);
`
const HeaderText = styled.div`
    font-weight: bold;
`
const StyledCloseIcon = styled(CloseOutlinedIcon)`
    margin-left: 10px;
    padding: 6px;
    cursor: pointer;
    border-radius: 3px;
    :hover {
        background: #28292f;
    }
`
const ActionContainer = styled.div`
    display: grid;
    height: 96px;
    grid-template-columns: 1fr 1fr 1fr;
    color: white;
    border-bottom: 1px solid rgba(121, 121, 121, .6);
`
const IconContainer = styled.div`
    display:grid;
    align-items: center;
    justify-content: center;
    grid-direction: row;
    align-content: center;
`
const Circle = styled.div`
    background-color: #3e3f42;
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`
const ActionText = styled.div`
    text-align: center;
`
const Body = styled.div`

`
const MembersContainer = styled.div`
    border-bottom: 1px solid rgba(121, 121, 121, .6);
`
const Members = styled.div`
    display: flex;
    height: 64px;
    color: white;
    align-items: center;
    justify-content: space-between;
    padding-left: 19px;
    padding-right:19px;
`
const MembersText = styled.div`

`
const MembersList = styled.div`
    diplay: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 14px;
`
const MemberListItem = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 19px;
    height: 28px;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
`
const UserAvatar = styled.div`
    width: 24px;
    height: 24px;
    margin-right: 8px;
    over-flow: hidden;

    img {
        width: 24px;
        border-radius: 3px;
    }
`
const UserName = styled.div`
    color: white;
`


