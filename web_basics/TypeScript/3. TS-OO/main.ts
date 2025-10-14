import {Engine} from "./Engine";
import {Besitzer} from "./Besitzer";


let Besitzer1: Besitzer = new Besitzer("Max", "Mustermann", 45);
let Engine1: Engine = new Engine("VW", 150, "Benzin", Besitzer1);

console.log(Engine1.getHersteller());
console.log(Engine1.getHorsepower());
console.log(Engine1.getKraftstoffverbrauch());
console.log(Engine1.getBesitzer());