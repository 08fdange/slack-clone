import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import ModalContent from './components/ModalContent';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import DetailsBar from './components/DetailsBar';
import Login from './components/Login';
import styled from 'styled-components';
import db from './firebase';
import { auth } from './firebase';
import './App.css';

const App = () => {

  // useState
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [detailsBar, setDetailsBar] = useState(false);
  const [open, setOpen] = useState(false);

  // Modal 
  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
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
      private: channelInfo.private
    }
    if (channelInfo.private) {
      payload.users = [user.uid]
    }
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

  useEffect(() => {
    getChannels();
  }, []);

  return (
    <div className="App">
      <Router>
        {
          !user ?
          <Login setUser={setUser}/>
          :
          <Container>
            <Modal
              open={open}
              onClose={handleClose}
            ><ModalContent
              createChannel={createChannel}
            />
            </Modal>
            <Header user={user} signOut={signOut}/>
              <Main>
              <Sidebar rooms={rooms} user={user} handleOpen={handleOpen}/>
              <Switch>
                <Route path='/room/:channelId'>
                  <Chat user={user} handleDetails={handleDetails}/>
                </Route>
                <Route path='/'>
                  <SelectChannel>
                    <Content>
                      Select or Create Channel
                    </Content>
                  </SelectChannel>
                </Route>
              </Switch>
              {detailsBar ? <DetailsBar handleDetails={handleDetails}/> : null}    
            </Main>
          </Container>
        } 
      </Router>
    </div>
  );
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