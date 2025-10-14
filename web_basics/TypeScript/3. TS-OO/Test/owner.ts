export class Owner {
    constructor(private name:string, private surname:string, private age:number) {

    }

    getName():string { return this.name; }
    getSurname():string { return this.surname; }
    getAge():number { return this.age; }

    setName(name:string) { this.name = name; }
    setSurname(surname:string) { this.surname = surname; }
    setAge(age:number) { this.age = age; }
}