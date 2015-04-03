var xhr = function(url,callback){
    var oReq = new XMLHttpRequest();
    oReq.onload = function(){
        var response = this.responseText;
        callback(response);
    };
    oReq.open("get", url, true);
    oReq.send();
};

String.prototype.subs = function(map){
    var str = this;

    var targets = Object.keys(map);
    var i;

    for (i = 0; i < targets.length; i++) {
        while (str.indexOf("%" + targets[i] + "%") !== -1) {
            str = str.split("%" + targets[i] + "%").join(map[targets[i]]);
        }
    }

    return str;
};

var avg = function(nums){
    var args = arguments;
    var sum = 0;
    var i;
    for (i = 0; i < args.length; i++) {
        sum += args[i];
    }
    return sum / args.length;
};

function displayWeather(data){
    console.log(data);
}

chrome.storage.sync.get("useFahrenheit", function (r) {
    if (r.useFahrenheit !== undefined) {
        useF = r.useFahrenheit;
        useImperial = useF;
    }

    if (localStorage.last_checked) {
        lastChecked = Number(localStorage.last_checked);
    }

    if (!lastChecked || (new Date().getTime() - lastChecked >= 900000 && navigator.onLine)) {
        xhr("https://nntp-guardo.rhcloud.com/wx/", function(data){
            displayWeather(data);
            
            localStorage.setItem("last_checked", new Date().getTime());
            localStorage.setItem("last_weather", JSON.stringify(data))
        });
    } else if (localStorage.last_weather) {
        displayWeather(JSON.parse(localStorage.getItem("last_weather")));
    }
});