import React, { useState, useEffect, useRef } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import AddChannelModal from './components/AddChannelModal';
import UsersModal from './components/UsersModal';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import DetailsBar from './components/DetailsBar';
import Login from './components/Login';
import styled from 'styled-components';
import firebase from 'firebase';
import db from './firebase';
import { auth } from './firebase';
import './App.css';

const App = () => {

  // useState
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [users, setUsers] = useState([]);
  const [detailsBar, setDetailsBar] = useState(false);
  const [userModalType, setUserModalType] = useState("Add");
  const [openChannelModal, setOpenChannelModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);


  // Modal 
  const ref = useRef();
  const handleOpenChannelModal = () => {
    setOpenChannelModal(true);
  }
  const handleOpenUserModal = () => {
    setOpenUserModal(true);
  }

  const handleClose = () => {
    setOpenChannelModal(false);
    setOpenUserModal(false);
  }

  // Sign Out
  const signOut = () => {
    auth.signOut().then(() => {
      localStorage.removeItem('user');
      setUser(null);
    })
  }

  // Create Slack Channels
  const createChannel = (channelInfo) => {
    let payload = {
      name: channelInfo.name,
      description: channelInfo.description,
      timestamp: firebase.firestore.Timestamp.now(),
      private: channelInfo.private
    }
    payload.users = [user.uid]

    if (payload.name !== "") {
      db.collection('rooms').add(payload);
      handleClose(); 
    }   
  }

  // Get Slack Channels
  const getChannels = () => {
    db.collection('rooms').onSnapshot((snapshot) => {
      setRooms(snapshot.docs.map((doc) => {
        return { id: doc.id, name: doc.data().name, private: doc.data().private, users: doc.data().users }
      }))
    })
  }

  // Details Bar 
  
  const handleDetails = () => {
    setDetailsBar(!detailsBar);
  }

  const handleUserModal = (action) => {
    switch(action) {
      case "add":
        setUserModalType("Add")
        break;
      case "remove":
        setUserModalType("Remove")
        break;
      default:
        setUserModalType("Add")
    }
  }

  // Handle Users on Channel

  const handleUser = () => {
    console.log(userModalType)
  }

  useEffect(() => {
    getChannels();
  }, []);

  useEffect(() => {
    db.collection('users').onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => {
        return { id: doc.id, name: doc.data().name, uid: doc.data().uid, avatar: doc.data().avatar, email: doc.data().email }
      }))
    })
  },[])

  return (
    <div className="App">
      <Router>
        {
          !user ?
          <Login setUser={setUser} users={users}/>
          :
          <Container>
            <Modal
              open={openChannelModal}
              onClose={handleClose}
            >
              <AddChannelModal
                ref={ref}
                createChannel={createChannel}
              /> 
            </Modal>
            <Modal
              open={openUserModal}
              onClose={handleClose}
            >
              <UsersModal 
                ref={ref}
                type={userModalType}
                handleUser={handleUser}
                users={users}
              />
            </Modal>
            <Header user={user} signOut={signOut}/>
              <Main>
              <Sidebar rooms={rooms} user={user} handleOpen={handleOpenChannelModal}/>
              <Switch>
                <Route path='/room/:channelId'>
                  <Chat user={user} handleDetails={handleDetails}/>
                  {detailsBar ? <DetailsBar 
                                  handleDetails={handleDetails} 
                                  handleUserModal={handleUserModal}
                                  handleOpen={handleOpenUserModal} 
                                  users={users}
                                /> : null} 
                </Route>
                <Route path='/'>
                  <SelectChannel>
                    <Content>
                      Select or Create Channel
                    </Content>
                  </SelectChannel>
                </Route>
              </Switch>
                 
            </Main>
          </Container>
        } 
      </Router>
    </div>
  )
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 38px minmax(0, 1fr);
`
const Main = styled.div`
  display: grid;
  grid-template-columns: 260px 2fr auto;
`
const SelectChannel = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #1a1b1f;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Content = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  background-color: rgb(20 18 22);
  padding: 50px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px rgb(FFFFFF / 24%);
  font-weight: 700;
`