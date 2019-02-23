function GetHouseId(){
  var doc = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var Avals = doc.getRange("H1:H").getValues();
  var last_row = Avals.filter(String).length;
  var providers = ProviderList()
  for (var i = 2; i <= last_row; ++i){
    var title = doc.getRange(i, 6).getValue();
    if (title != ''){
      var providerName = doc.getRange(i, 9).getValue();
      var type = doc.getRange(i, 20).getValue();
      var providerCode = GetProviderId(providerName, providers);
      doc.getRange(i, 3).setValue(AssignHouseId(title, providerCode, type));
    }
  }
}

function AssignHouseId(title, providerCode, type){
if (type == 'Movie'){
  var response = UrlFetchApp.fetch(url + "/movies?providerIds=" + providerCode +  "&title=" + title , getOptions);
  }else{
  var response = UrlFetchApp.fetch(url + "/episodes?title=" + title , getOptions);
  }
var asset = JSON.parse(response.getContentText());
  if (asset.length === 0){
  var houseId = "nodata"; 
  }else{
  var toolTitle = asset[0].originalTitle;
  if (toolTitle === title){
      var houseId = asset[0].houseId;
    }else{
      var houseID = "nomatch";
    }
  }
  return houseId;
}


function GetProviderId(providerName, providers){
  for each (var provider in providers){
    if (providerName == provider.name){
    Logger.log(provider)
    Logger.log(providerName)
    var providerCode = provider.code;
    Logger.log(providerCode);
    return providerCode;}
   }
}

function ProviderList(){
  var response = UrlFetchApp.fetch(url + "/providers", getOptions);
  var providers = JSON.parse(response.getContentText());
  return providers;
}
