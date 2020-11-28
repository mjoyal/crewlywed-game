import React from 'react';

import NameCard from '../../NameCard';

export default function AwaitResponsePage (props) {

  return (
    <div>
      <h2 style={{textAlign:"center", fontWeight:"normal", margin:'1rem 0'}}>
        answers submitted:
      </h2>
      {props.players.map((player, index) => <NameCard 
        avatarID={player.avatarID}
        username={player.username}
        active={player.answered} //update later
        host={player.creator}
        key={index}
      />)}

    </div>
  )
}