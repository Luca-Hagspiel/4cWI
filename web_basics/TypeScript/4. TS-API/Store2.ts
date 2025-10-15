import type { API } from "./API";
import type { Car } from "./types";

export class Store2 implements API {
    private cars: Car[] = [
        { make: "BMW", model: "M3", year: 2022 },
        { make: "Mercedes", model: "C63", year: 2021 },
        { make: "Audi", model: "RS5", year: 2023 },
        { make: "Volkswagen", model: "Golf R", year: 2020 },
    ];

    getAllCars(): Car[] {
        return this.cars;
    }

    findCars(searchText: string): Car[] {
        return this.cars.filter(c =>
            c.make.toLowerCase().includes(searchText.toLowerCase()) ||
            c.model.toLowerCase().includes(searchText.toLowerCase())
        );
    }
}
