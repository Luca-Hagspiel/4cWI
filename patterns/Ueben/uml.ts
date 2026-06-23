interface HeatingStrategy {
    regulateTemperature(currentTemp: number): void;
}

class EcoModeStrategy implements HeatingStrategy {
    regulateTemperature(currentTemp: number): void {
        console.log("Eco Mode aktiv - Temp: " + currentTemp);
    }
}

class ComfortModeStrategy implements HeatingStrategy {
    regulateTemperature(currentTemp: number): void {
        console.log("Comfort Mode aktiv - Temp: " + currentTemp);
    }
}

class AwayModeStrategy implements HeatingStrategy {
    regulateTemperature(currentTemp: number): void {
        console.log("Away Mode aktiv - Temp: " + currentTemp);
    }
}

class SmartHomeController {
    constructor(private strategy: HeatingStrategy) {}

    setStrategy(strategy: HeatingStrategy): void {
        this.strategy = strategy;
    }

    controlHeating(currentTemp: number): void {
        this.strategy.regulateTemperature(currentTemp);
    }
}