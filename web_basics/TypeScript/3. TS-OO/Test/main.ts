import {Owner} from "./owner";
import {Animal} from "./animal";

let owner:Owner = new Owner("Damian", "Crxwny", 18);
let animal:Animal = new Animal("Nejo", 9, "Hund", owner);

console.log(owner);

console.log(animal.getName());

let owner1:Owner = new Owner("Luca", "Manasek", 23)
animal.setOwner(owner1);

console.log(animal.getOwner());