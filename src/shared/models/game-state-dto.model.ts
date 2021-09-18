import { PositionDto } from "./position-dto.model";

export interface GameStateDto {
    player: PlayerDto,
    food: PositionDto[],
    gridSize: number
}

interface PlayerDto {
    pos: PositionDto,
    vel: PositionDto
}
