/* Zoom to REAL 100 % in InDesign
   For best results bound this script to a keyboard shortcut.
*/

// put your factor here
var myFactor = 133.7;

// preserve current selection
var oldsel = app.selection;
app.select(null);

// zoom to the spread first
// otherwise your new zoom level won't be centered
app.layoutWindows[0].zoom(ZoomOptions.FIT_SPREAD); // don't use FIT_PAGE
// now the real zoom
try{app.layoutWindows[0].zoomPercentage = myFactor;} catch (e) {};

app.select(oldsel);
