/* Apply Paragraph Style On Every Footnote
   ---------------------------------------
   It's ridiculous hard to select every footnote in InDesign and apply a paragraph stlye to them.
   Yes, you could use in theory the "footnote options" command, but that doesn't work with imported Word docs.
   This little script will apply the style of the currently selected footnote (so do this right once) to all other footnotes.
*/
document.stories.everyItem().footnotes.everyItem().texts.everyItem().applyParagraphStyle(app.selection[0].appliedParagraphStyle, true);
