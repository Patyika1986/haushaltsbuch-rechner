

import Navigationsleiste from "./Navigationsleiste.js";
import Eingabeformular from "./Eingabeformular.js";
import Monatslistensammlung from "./Monatslistensammlung.js";
import Gesamtbilanz from "./Gesamtbilanz.js";
import Eintrag from "./Eintrag.js";

/*
    Die Klasse "Haushaltsbuch" stellt alle Eigenschaften
    und Methoden des Haushaltsbuchs zur Verfügung und ist das Herzstück
    der gesamten Anwendung. Das Haushaltsbuch enthält alle anderen Objekt
    und fügt diese zu einer funktionierenden Anwendung zusammen.
 */
export default class Haushaltsbuch {


    constructor() {
        this._eintraege = [];
        this._navigationsleiste = new Navigationsleiste();
        this._eingabeformular = new Eingabeformular();
        this._monatslistensammlung = new Monatslistensammlung();
        this._gesamtbilanz = new Gesamtbilanz();
        this._wiederherstellen();
    }

    /*
      Diese Methode instanziiert anhand der im Eingabeformular eingegebenen
      Eintragsdaten einen neuen Eintrag und fügt diesen zur Sammlun aller Einträge (this._eintraege) hinzu. 
      Anschließend wird auch noch die Monatslistensammlung und die Gesamtbilanz aktualisiert 
      und der neue Zustand des Haushaltsbuchs gespeichert.
     */
    eintrag_hinzufuegen(eintragsdaten) {
        let neuer_eintrag = new Eintrag(
            eintragsdaten.titel, 
            eintragsdaten.betrag, 
            eintragsdaten.typ, 
            eintragsdaten.datum
        );
        this._eintraege.push(neuer_eintrag);
        this._monatslistensammlung.aktualisieren(this._eintraege);
        this._gesamtbilanz.aktualisieren(this._eintraege);
        this._speichern();
    }

    /*
      Diese Methode entfernt einen Eintrag anhand seines Erstellungs-Timestamps 
     */
    eintrag_entfernen(timestamp) {
        let start_index;
        for (let i = 0; i < this._eintraege.length; i++) {
            if (this._eintraege[i].timestamp() === parseInt(timestamp)) {
                start_index = i;
                break;
            }
        }
        this._eintraege.splice(start_index, 1);
        this._monatslistensammlung.aktualisieren(this._eintraege);
        this._gesamtbilanz.aktualisieren(this._eintraege);
        this._speichern();
    }

    /*
      aktuellen Zustand des Haushaltsbuchs,
     */
    _speichern() {
        localStorage.setItem("eintraege", JSON.stringify(this._eintraege));
    }

    /*
      Diese private Methode stellt den letzten gespeicherten Zustand des Haushaltsbuchs
      anhand der im LocalStorage gespeicherten Sammlung aller Einträge wieder her.
      Dies geschieht bei Instanziierung des Haushaltsbuchs, also beim Öffnen der Anwendung
      oder beim erneuten Laden der Seite.
     */
    _wiederherstellen() {
        let gespeicherte_eintraege = localStorage.getItem("eintraege");
        if (gespeicherte_eintraege !== null) {
            JSON.parse(gespeicherte_eintraege).forEach(eintrag => {
                this.eintrag_hinzufuegen({
                    titel: eintrag._titel,
                    betrag: eintrag._betrag,
                    typ: eintrag._typ,
                    datum: new Date(eintrag._datum)
                });
            });
        }
    }

    /*
    Anwendung starten
     */
    start() {
        this._navigationsleiste.anzeigen();
        this._eingabeformular.anzeigen();
        this._monatslistensammlung.anzeigen();
        this._gesamtbilanz.anzeigen();
    }

    
}