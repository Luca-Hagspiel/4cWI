import { Store1 } from "./Store1";
import { Store2 } from "./Store2";
import type { API } from "./API";

let api: API = new Store2();

console.log(api.getAllCars());
console.log(api.findCars("ford"));
