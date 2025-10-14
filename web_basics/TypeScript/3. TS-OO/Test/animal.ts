import {Owner} from './owner';

export class Animal {
    constructor(private sName:string, private iAge:number, private sRace:string, private owner:Owner){

    }


    getName():string { return this.sName; }
    getAge():number { return this.iAge; }
    getOwner():Owner {return this.owner}
    getRace():string { return this.sRace; }

    setName(name:string) { this.sName = name; }
    setAge (age:number) { this.iAge = age; }
    setOwner(owner:Owner) { this.owner = owner; }
    setRace(race:string) { this.sRace = race; }
}