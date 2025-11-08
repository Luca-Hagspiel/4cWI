import type { API } from "./API";
import type { Car } from "./types";

export class Store1 implements API {
    private cars: Car[] = [
        { make: "Toyota", model: "Camry", year: 2020 },
        { make: "Honda", model: "Accord", year: 2019 },
        { make: "Ford", model: "Mustang", year: 2021 },
    ];

    getAllCars(): Car[] {
        return this.cars;
    }

    findCars(searchText: string): Car[] {
        return this.cars.filter(c =>
            // @ts-ignore
            c.make.toLowerCase().includes(searchText.toLowerCase()) ||
            // @ts-ignore
            c.model.toLowerCase().includes(searchText.toLowerCase())
        );
    }
}
