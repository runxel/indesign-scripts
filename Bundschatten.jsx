/* Bundschatten – inside margin shadow
   
   Original script by: Georg Seifert
   Modified by: Lucas Becker, 2019-02-20
   -------------------------------------
   DE: Das Skript platziert einen Grauverlauf in der Mitte von Doppelseiten.
       Der Effekt läßt sich über die Ebenenpalette deaktivieren bzw. entfernen.

   EN: The script places a greay gradient between two pages.
       This effect can be controlled via the layers panel.

*/

if ((app.documents.length > 0) && (app.activeDocument.pages.length > 2)){
	schatten();
}
else{
	alert("No documents are open. Please open a document, select an object, and try again.");
}
function schatten () {
	myDoc = app.activeDocument;
	
	for (i = myDoc.layers.length -1; i >= 0; i--) 
		if (myDoc.layers[i].name == "Schatten") 
			myDoc.layers[i].remove();
	
	myDoc.layers.add({name: "Schatten"});
	
	var width = myDoc.documentPreferences.pageWidth;
	var height = myDoc.documentPreferences.pageHeight;
	var shadow_width = 25.0; // =2.5 cm
	var myRectangleFrame;

	for (i = 1; i < myDoc.pages.length; i++){
		if ((i % 2) > 0 ) { // rechts
			myRectangleFrame = myDoc.pages.item(i).rectangles.add({geometricBounds:[0, width - shadow_width, height, width]});
			myRectangleFrame.transparencySettings.gradientFeatherSettings.angle = 180;
		}
		else {  // links
			myRectangleFrame = myDoc.pages.item(i).rectangles.add({geometricBounds:[0, width + shadow_width, height, width]});
		}
		myRectangleFrame.fillColor = "Black";
		myRectangleFrame.transparencySettings.gradientFeatherSettings.applied = true;
		myRectangleFrame.transparencySettings.gradientFeatherSettings.type = GradientType.linear;
		myRectangleFrame.transparencySettings.gradientFeatherSettings.opacityGradientStops[1].midpoint = 33; // location of midpoint

		myRectangleFrame.transparencySettings.blendingSettings.opacity= 30.0;
		myRectangleFrame.transparencySettings.blendingSettings.blendMode= BlendMode.multiply;
	}
	myDoc.layers[0].locked = true;
	myDoc.activeLayer = myDoc.layers[1];
}
