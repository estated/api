export default class Geo {


    public static create(lat: number, lon: number): Geo {
        
        return new Geo(lat, lon);
    }
    
    constructor(private readonly lat: Number, private readonly lon: Number) {}
}