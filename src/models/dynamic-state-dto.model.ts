import { Position } from './position.model';

export interface DynamicStateDto {
    player: PlayerDto;
    players: PlayerDto[];
    items: ItemDto[];
}

export interface ItemDto {
    pos: Position;
}

export interface PlayerDto {
    id: string;
    name: string;
    pos: Position;
    vel: Position;
}
