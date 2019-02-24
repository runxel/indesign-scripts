/* Durchscheinen – Shine Through 

   Original script by: Georg Seifert
   Ported and modified by: Lucas Becker, 2019-02-24
   -------------------------------------
   DE: Simuliert durchdruckende Seitenelemente.
       Der Effekt lässt sich über die Ebenenpalette deaktivieren bzw. entfernen.

   EN: A small script to simulate the show through of page elements. 
       This effect can be controlled via the layers panel.
*/

if ((app.documents.length > 0) && (app.activeDocument.pages.length > 1)){

	myDoc = app.activeDocument;
	var layername = "Durchscheinen";
	// you can of course always change the file path here
	var file_place = Folder.desktop + "/" + layername + ".pdf"

	main();
}
else {
	alert("No documents are open. Please open a document and try again.");
}

function main() {
	// make a new layer for this
	for (i = myDoc.layers.length -1; i >= 0; i--) 
		if (myDoc.layers[i].name == layername) 
			myDoc.layers[i].remove();
	
	myDoc.layers.add({name: layername})

	// save the active document (so we can export the pdf later)
	// if doc is not saved already at least once, InD will automatically
	// ask for a place to save
	myDoc.save();

	// export the necessary PDF
	export_with_options();

	// place the very PDF
	placePDF();

	// lock the layer
	myDoc.layers[0].locked = true;
	myDoc.activeLayer = myDoc.layers[1];
}


function placePDF() {
	// Places the area that represents the physical paper size of the original PDF document.
	app.pdfPlacePreferences.pdfCrop = PDFCrop.cropMedia;
	app.pdfPlacePreferences.transparentBackground = true;

	for (i = 1; i <= myDoc.pages.length; i++){
		myPage = myDoc.pages.item(i-1);

		if ((i % 2) > 0 ) { // right side
			app.pdfPlacePreferences.pageNumber = i + 1;
		}
		else {  // left side
			app.pdfPlacePreferences.pageNumber = i - 1;
		}

		// now place a page from the PDF
		var placed_PDF = myPage.place(File(file_place), [0,0])[0];

		// simulate the look of a shine through
		placed_PDF.transparencySettings.blendingSettings.opacity = 10.0;
		placed_PDF.transparencySettings.blendingSettings.blendMode = BlendMode.multiply;

		// make a transformation matrix so the placed PDF will be mirrored
		var tfx = app.transformationMatrices.add({horizontalScaleFactor:-1,verticalScaleFactor:1});
		placed_PDF.transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, tfx);
	}
}

function export_with_options() {
    // Sets PDF export options, then exports the active document as PDF.
    with(app.pdfExportPreferences){
    	// Basic PDF output options
    	pageRange = PageRange.allPages;
    	acrobatCompatibility = AcrobatCompatibility.acrobat5;
    	exportGuidesAndGrids = false;
    	exportLayers = false;
    	exportNonPrintingObjects = false;
    	exportReaderSpreads = false;
    	generateThumbnails = false;
    	try{
    		ignoreSpreadOverrides = false;
    	}
    	catch(e){}
    	includeBookmarks = false;
    	includeHyperlinks = false;
    	includeICCProfiles = false;
    	includeSlugWithPDF = false;
    	includeStructure = false;
    	interactiveElementsOption = InteractiveElementsOptions.doNotInclude;
    	// Setting subsetFontsBelow to zero disallows font subsetting;
    	// set subsetFontsBelow to some other value to use font subsetting.
    	subsetFontsBelow = 0;
    	// Bitmap compression/sampling/quality options.
    	colorBitmapCompression = BitmapCompression.zip;
    	colorBitmapQuality = CompressionQuality.eightBit;
    	colorBitmapSampling = Sampling.none;
    	// thresholdToCompressColor is not needed in this example.
    	// colorBitmapSamplingDPI is not needed when colorBitmapSampling is set to
        // none.
    	grayscaleBitmapCompression = BitmapCompression.zip;
    	grayscaleBitmapQuality = CompressionQuality.eightBit;
    	grayscaleBitmapSampling = Sampling.none;
    	// thresholdToCompressGray is not needed in this example.
    	// grayscaleBitmapSamplingDPI is not needed when grayscaleBitmapSampling is
        // set to none.
    	monochromeBitmapCompression = BitmapCompression.zip;
    	monochromeBitmapSampling = Sampling.none;
    	// thresholdToCompressMonochrome is not needed in this example.
    	// monochromeBitmapSamplingDPI is not needed when monochromeBitmapSampling
        // is set to none.
    	// Other compression options.
    	compressionType = PDFCompressionType.compressNone;
    	compressTextAndLineArt = true;
		cropImagesToFrames = true;
		optimizePDF = true;
    	// Printers marks and prepress options.
    	useDocumentBleedWithPDF = false;
    	bleedBottom = 0;
    	bleedTop = 0;
    	bleedInside = 0;
    	bleedOutside = 0;
    	bleedMarks = false;
    	colorBars = false;
    	colorTileSize = 128;
    	grayTileSize = 128;
    	cropMarks = false;
    	omitBitmaps = false;
    	omitEPS = false;
    	omitPDF = false;
    	pageInformationMarks = false;
    	pdfColorSpace = PDFColorSpace.unchangedColorSpace;
    	// Default mark type
    	pdfMarkType = 1147563124;
    	printerMarkWeight = PDFMarkWeight.p125pt;
    	registrationMarks = false;
    	try{
    		simulateOverprint = false;
    	}
    	catch(e){}
    	// Set viewPDF to true to open the PDF in Acrobat or Adobe Reader
    	viewPDF = false;
    }

    // Now export the document
	myDoc.exportFile(
		ExportFormat.pdfType,
		File(file_place), 
		false
	);
}