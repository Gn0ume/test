export type ShipInfo = {
    id: number,
    size: number,
    health: number,
    type: string
}

export type State = {
    grid: any[][],
    ships: ShipInfo[],
}