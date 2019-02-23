
function GetHouseId(){
  var doc = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var Avals = doc.getRange("H1:H").getValues();
  var last_row = Avals.filter(String).length;
  var providers = ProviderList()
  for (var i = 2; i <= last_row; ++i){
    var title = doc.getRange(i, 6).getValue();
    if (title != ''){
      var providerName = doc.getRange(i, 9).getValue();
      var providerCode = GetProviderId(providerName, providers);
      doc.getRange(i, 3).setValue(AssignHouseId(title, providerCode));
    }
  }
}

function AssignHouseId(title, providerCode){
  var response = UrlFetchApp.fetch(url + "/movies?providerIds=" + providerCode +  "&title=" + title , getOptions);
  var movie = JSON.parse(response.getContentText());
  if (movie.length === 0){
  var houseId = "nodata"; 
  }else{
  var houseId = movie[0].houseId;
  }
  return houseId;
}

function GetProviderId(providerName, providers){
  for (var provider in providers){
    if (providerName == provider.name){
    console.log(provider)
    console.log(providerName)
    var providerCode = provider.code;
    Logger.log(providerCode);
    return providerCode;}
   }
}

function ProviderList(){
  var response = UrlFetchApp.fetch(url + "/providers", getOptions);
  var providers = JSON.parse(response.getContentText());
  Logger.log(providers);
  return providers;
}