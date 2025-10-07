import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface car {brand:string, model:string, price:number, year:number}

//1. Aufgabe

/*
function totalPrice(cars: car[]): number {
    let result: number = 0;
    for (let i = 0; i < cars.length; i++) {
        result += cars[i].price;
    }
    return result;
}
*/
let totalprice2 = (cars:car[]): number => {
    return cars.reduce((sum, car):number => sum + car.price, 0);
}

//2. Aufgabe

/*
function printCars(cars: car[]): void {
    for (let i = 0; i < cars.length; i++) {
      let c = cars[i];
      console.log(c.brand + " " + c.model + " " + c.price + "€ " + c.year);
    }
}
*/
let printCars2 = (cars:car[]): void => {
    cars.forEach((car) => {
        console.log(car.brand + " " + car.model + " " + car.price + "€ " + car.year);
    });
}

//3. Aufgabe
/*
function getExpensiveCars(cars:car[]): void {
    let input:number;

    rl.question("Geben Sie einen Preis ein: ", function(answer) {
        input = parseInt(answer);

        console.log(`Hier ist eine Liste von teureren Autos als ${input}:\n`);
        cars.forEach((car) => {
            if(input <= car.price){
                console.log(car.brand + " " + car.model + " " + car.price + "€ " + car.year);
            }
        })
        rl.close();
    });
}
*/

let getExpensiveCars2 = (cars:car[]): void => {
    let input:number;

    rl.question("Geben Sie einen Preis ein: ", function(answer) {
        input = parseInt(answer);

        console.log(`Hier ist eine Liste von teureren Autos als ${input}:\n`);
        cars.filter(car => car.price > input)
            .forEach(car => console.log(car.brand + " " + car.model + " " + car.price + "€ " + car.year));
        rl.close();
    });
}

//Testdaten
let cars: car[] = [
    { brand: "BMW", model: "M3", price: 75000, year: 2022 },
    { brand: "Audi", model: "A4", price: 42000, year: 2021 },
    { brand: "Mercedes-Benz", model: "C63 AMG", price: 89000, year: 2023 },
    { brand: "Volkswagen", model: "Golf GTI", price: 35000, year: 2020 },
    { brand: "Toyota", model: "Supra", price: 56000, year: 2022 },
    { brand: "Tesla", model: "Model 3", price: 48000, year: 2024 },
    { brand: "Ford", model: "Mustang", price: 52000, year: 2021 },
    { brand: "Porsche", model: "911 Carrera", price: 120000, year: 2023 },
    { brand: "Honda", model: "Civic Type R", price: 45000, year: 2022 },
    { brand: "Nissan", model: "GT-R", price: 115000, year: 2021 }
];

//console.log(totalPrice(cars));
//printCars(cars);
//getExpensiveCars(cars);

console.log(totalprice2(cars));
printCars2(cars);
getExpensiveCars2(cars);