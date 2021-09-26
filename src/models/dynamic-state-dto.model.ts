import { Position } from './position.model';

export interface DynamicStateDto {
    player?: PlayerDto;
    players?: PlayerDto[];
    items?: ItemDto[];
    crawlers?: CrawlerDto[];
}

export interface ItemDto {
    pos: Position;
}

export interface PlayerDto {
    name: string;
    pos: Position;
}

export interface CrawlerDto {
    pos: Position
}
