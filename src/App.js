import './App.css';

import {useEffect} from 'react';
import { io } from 'socket.io-client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { useDataFlow } from "./hooks/useDataFlow.js";
import { useChat } from "./hooks/useChat.js";
import { useCreateNewGame } from "./hooks/useCreateNewGame.js";
import { useRoundLoop } from "./hooks/useRoundLoop.js";

import JoinPage from './components/JoinPage';
import NewGamePage from './components/NewGamePage';
import Game from './components/Game/index.js';
import Playground from './components/PlaygroundTest';
import DataFlow from './components/DataFlowTest';
import Chat from './components/ChatTest';

const ENDPOINT = "http://localhost:8080";
const socket = io(ENDPOINT);

function App() {

  //Test connection to socket:
  useEffect(() => {
    socket.on('connectMessage', message => {
      console.log(message);
    });
  }, []);

  const { avatar, getAvatar, username, score, getScore } = useDataFlow(socket);
  const { joinRoom, sendMessage } = useChat(socket);
  const { createNewGame } = useCreateNewGame(socket);


  return (
    <Router>

      <Switch>

     {/* routes for testing */}
        <Route exact path ="/chat">
          <Chat
            joinRoom={joinRoom}
            sendMessage={sendMessage}
          />
        </Route>

        <Route exact path = "/dataflow">
            <DataFlow
              getAvatar={getAvatar}
              avatar={avatar}
              getScore={getScore}
              score={score}
              username={username}
            />
        </Route>

        <Route exact path="/playground">
            <Playground></Playground>
        </Route>

    {/* real routes  */}
        <Route exact path="/">
            <h1>welcome to the crewlywed game</h1>
        </Route>
    
        <Route exact path="/new">
          <NewGamePage
            createNewGame={createNewGame}
          />
        </Route>

        <Route exact path="/join">
          <JoinPage/>
        </Route>

        <Route path="/:id">
          <Game players={[
            {playerName:"Mac", avatar:'https://tcrn.ch/35VAVzn', host:true },
            {playerName:"Will", avatar:'https://tcrn.ch/35VAVzn', host:false } ]} />
        </Route>

      </Switch>
   

    </Router>
   
  );
}

export default App;
