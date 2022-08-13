import React from 'react';

import './style.css'

import { ShipHealth } from '../ship-health/ship-health.component';
import { ShipIcon } from '../ship-icon/ship-icon.component';
import { ShipInfo } from '../../types';


export const Ships = ({shipsList}) => {
    const ships: JSX.Element[] = [];
    shipsList.forEach((ship: ShipInfo) => {
        ships.push(<div className='ship-data'>
            <ShipIcon type={ship.type} />
            <ShipHealth size={ship.size} health={ship.health}/>
        </div>)
    })
    return (<div className="ship-list">{ships}</div>)
}