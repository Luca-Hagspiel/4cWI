"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = void 0;
var Engine = /** @class */ (function () {
    function Engine(sHersteller, iHorsepower, iKraftstoff, besitzer) {
        this.sHersteller = sHersteller;
        this.iHorsepower = iHorsepower;
        this.iKraftstoff = iKraftstoff;
        this.besitzer = besitzer;
    }
    Engine.prototype.getHersteller = function () { return this.sHersteller; };
    Engine.prototype.getHorsepower = function () { return this.iHorsepower; };
    Engine.prototype.getKraftstoff = function () { return this.iKraftstoff; };
    Engine.prototype.getBesitzer = function () { return this.besitzer; };
    Engine.prototype.setHersteller = function () { this.sHersteller = ""; };
    Engine.prototype.setHorsepower = function () { this.iHorsepower = 0; };
    Engine.prototype.setKraftstoff = function () { this.iKraftstoff = ""; };
    Engine.prototype.setBesitzer = function (besitzer) {
        this.besitzer.setVorname(besitzer.getVorname());
        this.besitzer.setNachname(besitzer.getNachname());
        this.besitzer.setAlter(besitzer.getAlter());
    };
    ;
    return Engine;
}());
exports.Engine = Engine;
