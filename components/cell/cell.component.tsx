import React from 'react';
import './style.css';

export const Cell = ({deckData, onFire}) => {
    const fire = () => {
        onFire(deckData)
    }
    const stateMap = {
        1: 'new',
        2: 'miss',
        3: 'hit',
    };
    const stateClass = stateMap[deckData.state];
    return (<div className={`cell ${stateClass}`} onClick={fire}>{deckData.shipIndex}</div>)
}