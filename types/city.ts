export interface Region {
    id: number;
    name: string;
    cities: City[];
}

export interface City {
    id: number;
    name: string;
    regionId: number;
    region?: Region;
}
