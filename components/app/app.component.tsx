import React, { useEffect, useState } from 'react';

import { Cell } from '../cell/cell.component';
import { Ships } from '../ships/ships.component';

import { ShipInfo, State } from '../../types';

import './style.css';

export const App = () => {
    const [state, setState] = useState<State>({
        ships: [],
        grid: [],
    });

    const gameData = {
        "shipTypes": {
            "carrier": { "size": 5, "count": 1 },
            "battleship": { "size": 4, "count": 1 },
            "cruiser": { "size": 3, "count": 1 },
            "destroyer": { "size": 2, "count": 1 },
            "submarine": { "size": 3, "count": 1 }
        },
        "layout": [
            { "ship": "carrier", "positions": [[2, 9], [3, 9], [4, 9], [5, 9], [6, 9]] },
            { "ship": "battleship", "positions": [[5, 2], [5, 3], [5, 4], [5, 5]] },
            { "ship": "cruiser", "positions": [[8, 1], [8, 2], [8, 3]] },
            { "ship": "submarine", "positions": [[3, 0], [3, 1], [3, 2]] },
            { "ship": "destroyer", "positions": [[0, 0], [1, 0]] }
        ]
    }

    const convertLayoutToGrid = (layout) => {
        const grid = [...Array(10)].map((e, y) => [...Array(10)].map((e,x) => ({
            coordinates: {x,y},
            state: 1,
            shipIndex: undefined,
        })));
        const ships: ShipInfo[] = [];
        layout.forEach((ship, index) => {
            const points = ship.positions;
            points.forEach(point => {
                const [y, x] = point;
                grid[x][y].shipIndex = index;
            });
            ships.push({
                id: index,
                size: ship.positions.length,
                health: ship.positions.length,
                type: ship.ship
            });
        })
        return {grid, ships};
    }

    useEffect(() => {
        const {grid, ships} = convertLayoutToGrid(gameData.layout);
        setState({grid, ships});
    }, [])

    const onFire = (deck) => {
        const {x, y} = deck.coordinates;
        const stateClone = {...state};
        const cellInfo = stateClone.grid[y][x];
        if (cellInfo.shipIndex !== undefined) {
            // hit
            if(cellInfo.state === 1) {
                stateClone.ships[cellInfo.shipIndex].health--;
            }
            cellInfo.state = 3;
        } else {
            // miss
            cellInfo.state = 2;
        }
        setState(stateClone);
    }

    const cells = () => {
        const result: JSX.Element[] = [];
        state.grid.forEach((row, rowInedx) => {
            row.forEach((cell, columnIndex) => {
                result.push(<Cell key={`cell[${rowInedx},${columnIndex}]`} deckData={cell} onFire={onFire}/>)
            })
        });

        return result;
    }

    return (
        <div className="game-container">
            <div className="game-data">
                <div className="score">score</div>
                <div className="ships">
                    <Ships shipsList={state.ships}/>
                </div>
            </div>
            <div className="game-field">
                {cells()}
            </div>
        </div>
    )
}