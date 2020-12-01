import React, {useState} from 'react';
import { useParams } from 'react-router-dom';

import Question from '../../Question';
import Timer from '../../Timer';
import RoundScore from './RoundScore';
import "../../../styles/partials/_global.scss";
import InputAnswerPage from './Answer.js';
import ChooseAnswerPage from './Choose';
import RevealAnswerPage from './Reveal';
import AwaitResponsePage from './Await';


const ANSWER = "ANSWER";
const AWAIT = "AWAIT";
const CHOOSE = "CHOOSE";
const REVEAL = "REVEAL";
const ROUNDSCORE = "ROUNDSCORE";

const answerOptions = [
  {
    text:"skateboard away",
    id:1
  },
  {
    text:"sass the zombies away",
    id:2
  },
  {
    text:"form a tribe full of babes",
    id:3
  },
  {
    text:"I need to make something a total of seventy characters so I'm writing.",
    id:4
  },
  {
    text:"sass the zombies away",
    id:5
  },
  {
    text:"form a tribe full of babes",
    id:6
  },
  {
    text:"skateboard away",
    id:7
  },
  {
    text:"sass the zombies away",
    id:8
  }
]

const answerResults = [
  {
    playerName:"mac",
    avatarID:1,
    correct:true,
    answer:"form a tribe full of babes",
    choosers:[
      { 
        name: "will",
        avatarID: 2
      },
      { 
        name: "chantal",
        avatarID: 3
      }
    ]
  },
  {
    playerName:"will",
    avatarID:2,
    correct:false,
    answer:"skateboard away",
    choosers:[
      { 
        name: "will",
        avatarID: 2
      },
      { 
        name: "chantal",
        avatarID: 3
      }
    ]
  }
]

const responseTest = [
  {id: 1, avatar_id: 1, username:'mac', creator:true, answered:true},
  {id: 2, avatar_id: 2, username:'mac', creator:false, answered:false},
  {id: 3, avatar_id: 3, username:'mac', creator:false, answered:true},
  {id: 4, avatar_id: 4, username:'mac', creator:false, answered:false},
  {id: 5, avatar_id: 5, username:'mac', creator:false, answered:false},
  {id: 2, avatar_id: 2, username:'mac', creator:false, answered:false},
  {id: 3, avatar_id: 3, username:'mac', creator:false, answered:true},
  {id: 4, avatar_id: 4, username:'mac', creator:false, answered:false},
];

export default function RoundLoop (props) {

  return (
    <div className="roundLoop">
      {props.roundState !== ROUNDSCORE && <>
        <Question
          victimAvatar={`images/avatar${props.victimAvatarId}.png`}
          victimColorClass={props.victimColorClass}
          question={props.question}
          victimName={props.victimName}
          isVictim={props.isVictim}
        />
        
        {/* <Timer
          time={60} width={18}
          currentRoundNum={props.currentRoundNum}
          totalRounds={props.totalRounds}
        /> */}
      </>}
      {props.roundState === ROUNDSCORE && <>
        <RoundScore scoreData={props.roundScoreState}/>
      </>}

      {props.roundState === ANSWER && <InputAnswerPage submitUserAnswer={props.submitUserAnswer}/>}
      {props.roundState  === CHOOSE && 
      <ChooseAnswerPage 
        answerOptions={answerOptions} 
        victimName={props.victimName} 
        sendChoice={props.sendChoice} 
        isVictim={false}
        userID={props.userID}
      />}

      {props.roundState  === REVEAL && <RevealAnswerPage answerResults={props.revealState}/>}
      {props.roundState === AWAIT && <AwaitResponsePage players={responseTest}/>}

    </div>
  );
}