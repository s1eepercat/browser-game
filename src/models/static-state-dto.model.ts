export interface StaticStateDto {
    map: MapDto;
    gridSize: number;
}

interface MapDto {
    mapWidth: number;
    mapHeight: number;
}