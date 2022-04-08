

/*
  Die Klasse "Monatsliste" stellt alle Eigenschaften
  und Methoden eines Eintrags (inkl. HTML) zur Verfügung.
 */
export default class Monatsliste {


    constructor(jahr, monat) {
        this._jahr = jahr;
        this._monat = monat;
        this._eintraege = [];
        this._bilanz = 0;
        this._html = this._html_generieren();
    }

    /*
      Getter-Methode für den Monat des Monatsliste.
     */
    monat() {
        return this._monat;
    }

    /*
      Getter-Methode für das Jahr des Monatsliste.
     */
    jahr() {
        return this._jahr;
    }

    /*
      Getter-Methode für das HTML der Monatsliste.
     */
    html() {
        return this._html;
    }

    /*
      Diese Methode fügt ein ihr übergebenes Eintrags-Objekt zur Sammlung der Einträge (this._eintraege)
      der Monatsliste hinzu und aktualsiert anschließend die Eigenschaften der Monatsliste mit Hilfe der
      Methode this._aktualisieren().
     */
    eintrag_hinzufuegen(eintrag) {
        this._eintraege.push(eintrag);
        this._aktualisieren();
    }

    /*
      Eintrags sortiert.
     */
    _eintraege_sortieren() {
        this._eintraege.sort((eintrag_a, eintrag_b) => {
            if (eintrag_a.datum() > eintrag_b.datum()) {
                return -1;
            } else if (eintrag_a.datum() < eintrag_b.datum()) {
                return 1;
            } else {
                if (eintrag_a.timestamp() > eintrag_b.timestamp()) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });
    }

    /*
      Diese  Methode bilanziert die Monatsliste
     */
    _bilanzieren() {
        let monatsbilanz = 0;
        this._eintraege.forEach(eintrag => {
            if (eintrag.typ() === "einnahme") {
                monatsbilanz += eintrag.betrag();
            } else {
                monatsbilanz -= eintrag.betrag();
            }
        });
        this._bilanz = monatsbilanz;
    }

    /*
      Diese Methode generiert das HTML der Monatsliste.
     */
    _html_generieren() {
        let monatsliste = document.createElement("article");
        monatsliste.setAttribute("class", "monatsliste");

        let ueberschrift = document.createElement("h2");

        let monat_jahr = document.createElement("span");
        monat_jahr.setAttribute("class", "monat-jahr");
        monat_jahr.textContent = `${new Date(this._jahr, this._monat - 1).toLocaleString("de-DE", {
            month: "long",
            year: "numeric"
        })}`;
        ueberschrift.insertAdjacentElement("afterbegin", monat_jahr);

        let monatsbilanz = document.createElement("span");
        if (this._bilanz >= 0) {
            monatsbilanz.setAttribute("class", "monatsbilanz positiv");
        } else {
            monatsbilanz.setAttribute("class", "monatsbilanz negativ");
        }
        monatsbilanz.textContent = `${(this._bilanz / 100).toFixed(2).replace(/\./, ",")} €`;
        ueberschrift.insertAdjacentElement("beforeend", monatsbilanz);

        monatsliste.insertAdjacentElement("afterbegin", ueberschrift);

        let eintragsliste = document.createElement("ul");
        this._eintraege.forEach(eintrag => {
            eintragsliste.insertAdjacentElement("beforeend", eintrag.html()); 
        });
        monatsliste.insertAdjacentElement("beforeend", eintragsliste);

        return monatsliste;
    }

    /*
    Aktuallisieren
     */
    _aktualisieren() {
        this._eintraege_sortieren();
        this._bilanzieren();
        this._html = this._html_generieren();
    }

    
}