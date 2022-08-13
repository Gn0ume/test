import React from 'react';

export const ShipHealth = ({size, health}) => {
    return (<div className="ship-health">{size} | {health}</div>)
}