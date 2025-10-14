export class Besitzer {
    private sVorname:string = "";
    private sNachname:string = "";
    private iAlter:number = 0;

    constructor(sVorname:string, sNachname:string, iAlter:number){
        this.sVorname = sVorname;
        this.sNachname = sNachname;
        this.iAlter = iAlter;
    }

    getVorname():string{ return this.sVorname; }
    getNachname():string{ return this.sNachname; }
    getAlter():number{ return this.iAlter; }

    setVorname(sVorname:string):void { this.sVorname = sVorname; }
    setNachname(sNachname:string):void { this.sNachname = sNachname; }
    setAlter(iAlter:number):void { this.iAlter = iAlter; }
}