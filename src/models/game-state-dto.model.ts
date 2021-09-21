export interface GameStateDto {
    player: PlayerDto;
    players: PlayerDto[];
    map: MapDto;
    items: ItemDto[];
    gridSize: number;
}

export interface PlayerDto {
    id: string;
    name: string;
    pos: PositionDto;
    vel: PositionDto;
}

export interface ItemDto {
    pos: PositionDto;
}

export interface PositionDto {
    x: number;
    y: number;
}

interface MapDto {
    mapWidth: number;
    mapHeight: number;
}