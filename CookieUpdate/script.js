//#region - PARAMETER -
var cookieKey = "Collection";
var paramterKey = "Index";
var dataKeyArray = ["1", "2", "3", "4"];
var targetWebsiteURL = "https://kypost.github.io/SmartCity_Pointcard/Collection/";
var usedDebug = false;
//#endregion

//#region - Get Data From Cookie -
var data = GetCookie(cookieKey);
if (usedDebug) {
    document.write("Cookie Data<br>");
    DebugData(data);
}
//#endregion

//#region - Get Input From URL Parameter -
var parameterValue = GetURLParameter(paramterKey);
if (usedDebug) {
    document.write(paramterKey + " => " + parameterValue + "<br><br>");
}
//#endregion

//#region - Update Data -
for (var i = 0; i < dataKeyArray.length; i++){
    if (parameterValue == dataKeyArray[i]) {
        if (!data.collections[i]) {
            data.newCollectedIndex = i;
            data.collections[i] = true;
        }            
        break;
    }
}
if (usedDebug) {
    document.write("Updated Data<br>");
    DebugData(data);
}
//#endregion

//#region - Save Data To Cookie -
var dataString = JSON.stringify(data);
if (usedDebug) {
    document.write("NewCookie => " + dataString);
}
SetCookie(cookieKey, dataString);
//#endregion

//#region - Replace Load To Target Website -
if (targetWebsiteURL != "") {
    window.location.replace(targetWebsiteURL);
}
//#endregion

function newData(count) {
    var data = { collections: new Array(count).fill(false), newCollectedIndex: -1,}
    return data;
}

function GetCookie(key) {
    var data = newData(dataKeyArray.length);
    var decodedCookie = decodeURIComponent(document.cookie);
    console.log(decodedCookie);
    var cookies = decodedCookie.split('; ');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split("=");
        if (cookie[0] == key && cookie[1] != null) {
            var cookieData = JSON.parse(cookie[1]);
            for (var i = 0; i < data.collections.length; i++) {
                data.collections[i] = cookieData.collections[i];
            }
        }
    }
    return data;
}

function GetURLParameter(key) {
    var url = document.URL;
    var index = url.indexOf("?");
    if (index != -1) {
        var decodedParameter = url.split("?")[1];
        var parameters = decodedParameter.split("&");
        for (var i = 0; i < parameters.length; i++) {
            var parameter = parameters[i].split("=");
            if (parameter[0] = key) {
                return parameter[1];
            }
        }
    }
    return "Null";
}

function SetCookie(key, value) {
    var cookie = key + "=" + value;
    var date = new Date();
    date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = cookie + "; " + expires + "; path=/";
}

function DebugData(data) {
    for (var i = 0; i < data.collections.length; i++) {
        document.write("Collection" + i.toString().padStart(2, "0")
            + " = " + data.collections[i] + ";<br>");
    }
    document.write("newCollectedIndex = " + data.newCollectedIndex + "; <br>");
    document.write("<br>");
}