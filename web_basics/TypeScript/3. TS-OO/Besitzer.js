"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Besitzer = void 0;
var Besitzer = /** @class */ (function () {
    function Besitzer(sVorname, sNachname, iAlter) {
        this.sVorname = "";
        this.sNachname = "";
        this.iAlter = 0;
        this.sVorname = sVorname;
        this.sNachname = sNachname;
        this.iAlter = iAlter;
    }
    Besitzer.prototype.getVorname = function () { return this.sVorname; };
    Besitzer.prototype.getNachname = function () { return this.sNachname; };
    Besitzer.prototype.getAlter = function () { return this.iAlter; };
    Besitzer.prototype.setVorname = function (sVorname) { this.sVorname = sVorname; };
    Besitzer.prototype.setNachname = function (sNachname) { this.sNachname = sNachname; };
    Besitzer.prototype.setAlter = function (iAlter) { this.iAlter = iAlter; };
    return Besitzer;
}());
exports.Besitzer = Besitzer;
