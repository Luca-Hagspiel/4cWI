import type {Besitzer} from "./Besitzer";

export class Engine {
    private sHersteller:string;
    private iHorsepower:number;
    private iKraftstoff:string;
    private besitzer:Besitzer;

    constructor(sHersteller:string, iHorsepower:number, iKraftstoff:string, besitzer:Besitzer){
        this.sHersteller = sHersteller;
        this.iHorsepower = iHorsepower;
        this.iKraftstoff = iKraftstoff;
        this.besitzer = besitzer;
    }

    getHersteller():string{ return this.sHersteller; }
    getHorsepower():number{ return this.iHorsepower; }
    getKraftstoff():string{ return this.iKraftstoff; }
    getBesitzer():Besitzer{ return this.besitzer; }

    setHersteller():void { this.sHersteller = "" }
    setHorsepower():void { this.iHorsepower = 0 }
    setKraftstoff():void { this.iKraftstoff = "" }
    setBesitzer(besitzer:Besitzer):void {
        this.besitzer.setVorname(besitzer.getVorname());
        this.besitzer.setNachname(besitzer.getNachname());
        this.besitzer.setAlter(besitzer.getAlter());
    };
}