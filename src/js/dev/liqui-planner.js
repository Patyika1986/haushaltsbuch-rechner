/*
  Das Hauptmodul "main".
 */

import Haushaltsbuch from "./classes/Haushaltsbuch.js";

/*
 Start der Anwendung.
 */
let liqui_planner = new Haushaltsbuch();
liqui_planner.start();

export default liqui_planner;
