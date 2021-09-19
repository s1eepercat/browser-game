export interface GameStateDto {
    players: PlayerDto[];
    map: MapDto;
    gridSize: number;
}

export interface PlayerDto {
    id: string;
    name: string;
    pos: PositionDto;
    vel: PositionDto;
}

export interface PositionDto {
    x: number;
    y: number;
}

interface MapDto {
    mapWidth: number;
    mapHeight: number;
}