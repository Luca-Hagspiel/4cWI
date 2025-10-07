interface Person { id: number; name: string; age: number; active: boolean }

let nums: number[] = [5, 2, 9, 1, 5, 6];
let people: Person[] = [
    { id: 1, name: "Anna", age: 28, active: true },
    { id: 2, name: "Ben",  age: 17, active: false },
    { id: 3, name: "Cara", age: 34, active: true },
    { id: 4, name: "Dan",  age: 21, active: false },
];

// 1) map
let doubled: number[] = nums.map((n: number): number => n * 2);
console.log("map - doubled:", doubled);

// 2) filter
let adults: Person[] = people.filter((p: Person): boolean => p.age >= 18);
console.log("filter - adults:", adults.map(p => p.name));

// 3) sort
let peopleByAge: Person[] = [...people].sort((a: Person, b: Person): number => a.age - b.age);
console.log("sort - people by age:", peopleByAge.map(p => `${p.name}(${p.age})`));

// 4) find
let firstTeen: Person | undefined = people.find((p: Person): boolean => p.age < 20);
console.log("find - first teen:", firstTeen);

// 5) reduce
let sum: number = nums.reduce((sum: number, cur: number): number => sum + cur, 0);
console.log("reduce - sum:", sum);

// 6) some
let hasMinor: boolean = people.some((p: Person): boolean => p.age < 18);
console.log("some - has minor:", hasMinor);

// 7) every
const allAdults: boolean = people.every((p: Person): boolean => p.age >= 18);
console.log("every - all adults:", allAdults);
