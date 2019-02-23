function Smartsheet(){
  var doc = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var ssThisName = SpreadsheetApp.getActiveSpreadsheet().getName(); 
  var ssNew = SpreadsheetApp.create("Smartsheet_" + ssThisName);
  var ssNewid = ssNew.getId();
  var ssNewURL = ssNew.getUrl();
  var spreadsheet = SpreadsheetApp.openById(ssNewid);
  var NewSheet = spreadsheet.getSheets()[0];
  var Avals = doc.getRange("H1:H").getValues();
  var last_row = Avals.filter(String).length;
  var ssNewi = 2
  var a = 2
  var TempID = 1
  SetHeadersSmartsheet(spreadsheet, NewSheet, ssNewid)
  for (var i = 2; i <= last_row; ++i){
    var HouseID = doc.getRange(i, 3).getValues().toString();
    var PrevHouseID;
    var PrevCatalogue;
    var PrevClient;
    var PrevAudios;
    var PrevSubtitles;
    var PrevConfirmed;
    var PrevRenewal;
    var PrevProvider;
    var CurrentDate = new Date(new Date().setHours(0,0,0,0));
    var Client = doc.getRange(i, 7).getValues();
    var Provider = doc.getRange(i, 9).getValues();
    var CatalogType = doc.getRange(i, 10).getValues();
    var StartDate = doc.getRange(i, 12).getValues();
    var Quality = doc.getRange(i, 14).getValues();
    var Audios = doc.getRange(i, 15).getValues();
    var Subtitles = doc.getRange(i, 16).getValues();
    var Confirmed = doc.getRange(i, 17).getValues();
    var Renewal = doc.getRange(i, 18).getValues();
    var pAction = NewUpdateCancelled_Change(pAction);
    var column = NewSheet.getRange("A2:A");
    column.setNumberFormat("@");
    NewSheet.activate();
    var assetType = doc.getRange(i, 20).getValues();
    if(Provider !=''){
      if(assetType == 'Movie'){
    		NewSheet.getRange(ssNewi, 1).setValue(HouseID.toString());
    		NewSheet.getRange(ssNewi+1, 1).setValue(HouseID.toString());
    		NewSheet.getRange(ssNewi, 4).setValue(CatalogType);
    		NewSheet.getRange(ssNewi+1, 4).setValue(CatalogType);
    		NewSheet.getRange(ssNewi, 5).setValue(Client);
    		NewSheet.getRange(ssNewi+1, 5).setValue(Client);
    		NewSheet.getRange(ssNewi, 7).setValue(Audios);
    		NewSheet.getRange(ssNewi+1, 7).setValue(Audios);
    		NewSheet.getRange(ssNewi, 8).setValue(Subtitles);
    		NewSheet.getRange(ssNewi+1, 8).setValue(Subtitles);
    		NewSheet.getRange(ssNewi, 2).setValue(Provider);
    		NewSheet.getRange(ssNewi+1, 2).setValue(Provider);
            NewSheet.getRange(ssNewi, 3).setValue("Movie");
            NewSheet.getRange(ssNewi, 6).setValue(" ");
            NewSheet.getRange(ssNewi, 9).setValue(CurrentDate);
            NewSheet.getRange(ssNewi, 10).setValue(StartDate);
            NewSheet.getRange(ssNewi, 11).setValue("");
            NewSheet.getRange(ssNewi+1, 3).setValue("Trailer");
            NewSheet.getRange(ssNewi+1, 6).setValue(" ");
            NewSheet.getRange(ssNewi+1, 9).setValue(CurrentDate);
            NewSheet.getRange(ssNewi+1, 10).setValue(StartDate);
            NewSheet.getRange(ssNewi+1, 11).setValue("");
        	NewSheet.getRange(ssNewi, 12).setValue(Confirmed);
        	NewSheet.getRange(ssNewi+1, 12).setValue(Confirmed);
        	NewSheet.getRange(ssNewi, 13).setValue(Renewal);
        	NewSheet.getRange(ssNewi+1, 13).setValue(Renewal);
        	ssNewi = ssNewi + 2;
        }else{
            NewSheet.getRange(ssNewi, 1).setValue(HouseID.toString());
            NewSheet.getRange(ssNewi, 4).setValue(CatalogType);
            NewSheet.getRange(ssNewi, 5).setValue(Client);
            NewSheet.getRange(ssNewi, 7).setValue(Audios);
            NewSheet.getRange(ssNewi, 8).setValue(Subtitles);
            NewSheet.getRange(ssNewi, 2).setValue(Provider);
            NewSheet.getRange(ssNewi, 3).setValue("Movie");
            NewSheet.getRange(ssNewi, 6).setValue(" ");
            NewSheet.getRange(ssNewi, 9).setValue(CurrentDate);
            NewSheet.getRange(ssNewi, 10).setValue(StartDate);
            NewSheet.getRange(ssNewi, 11).setValue("");
            NewSheet.getRange(ssNewi, 12).setValue(Confirmed);
            NewSheet.getRange(ssNewi, 13).setValue(Renewal);
            ssNewi = ssNewi + 1;		
        }
    }
    doc.activate();
  }
  var url = '<a href="' + ssNew.getUrl() + '" target="_blank">Click to Open</a>';
  var htmlOutput = HtmlService
    .createHtmlOutput(url)
    .setWidth(250) //optional
    .setHeight(50); //optional
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Spreadsheet created');
}

function SetHeadersSmartsheet(spreadsheet, NewSheet, ssNewid){
  var spreadsheet = SpreadsheetApp.openById(ssNewid);
  var NewSheet = spreadsheet.getSheets()[0];
  NewSheet.getRange(1, 1).setValue('House ID');
  NewSheet.getRange(1, 2).setValue('Provider');
  NewSheet.getRange(1, 3).setValue('Type');
  NewSheet.getRange(1, 4).setValue('Catalog');
  NewSheet.getRange(1, 5).setValue('Client');
  NewSheet.getRange(1, 6).setValue('Profile');
  NewSheet.getRange(1, 7).setValue('Audios');
  NewSheet.getRange(1, 8).setValue('Subtitles');
  NewSheet.getRange(1, 9).setValue('Date_added');
  NewSheet.getRange(1, 10).setValue('WindowStart');
  NewSheet.getRange(1, 11).setValue('Priority');
  NewSheet.getRange(1, 12).setValue('Confirmed');
  NewSheet.getRange(1, 13).setValue('Renewal');
    
}