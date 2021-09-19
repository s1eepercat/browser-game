import { PositionDto } from "./position-dto.model";

export interface GameStateDto {
    players: PlayerDto[];
    food: PositionDto[];
    gridSize: number;
}

export interface PlayerDto {
    id: string;
    name: string;
    pos: PositionDto;
    vel: PositionDto;
}
