riot.tag('imagery', '',function (opts) {
  this.utcDate = getTimes().utcDate;
  this.utcTime = getTimes().utcTime;

  var img = imageUrl(colors.selected[0].imageString, colors.selected[0].view, this.utcDate, this.utcTime)
  cycleImages(img, colors.selected[0].imageString, this)

  this.tick = (function () {
    this.utcDate = getTimes().utcDate;
    this.utcTime = getTimes().utcTime;

    var img = imageUrl(colors.selected[0].imageString, colors.selected[0].view, this.utcDate, this.utcTime)

    cycleImages(img, colors.selected[0].imageString, this)
  }).bind(this);

  var timer = setInterval(this.tick, 60000);

  this.on('unmount', function () {
    clearInterval(timer);
  });
})


var imagery = riot.mount('imagery');

function imageUrl(image, view, date, time) {
  return "url(http://api.usno.navy.mil/imagery/" + image + ".png?view=" + view + "&date=" + date + "&time=" + time + ")";
}

(function (riot) {
  riot.tag('timetable', '<h2 class="pull-left">{localDate}</h2>' +
                        '<h2 class="pull-right">{localTime}</h2>', function(opts){
    this.localTime  = opts.localTime;
    this.localDate  = opts.localTime;

    this.tock = (function () {
      this.localTime  = getTimes().localTime;
      this.localDate  = getTimes().localDate;
      this.localColor = this.localTime.replace(/:/g, '');
      this.localTextColor = this.localDate.replace(/^20/i, '').replace(/\//g, '');

      this.update({
          localTime: this.localTime,
          localDate: this.localDate
      });

      document.body.style.backgroundColor = "#" + padLeft(this.localColor, 6)
      document.body.style.color = "#" + padLeft(this.localTextColor, 6)
    }).bind(this)

    var timer = setInterval(this.tock, 1000);

    this.on('unmount', function () {
      clearInterval(timer);
    });
  });

  riot.mount('timetable',{
    localTime: getTimes().localTime,
    localDate: getTimes().localDate
  });
})(riot)

function cycleImages(imageUrl, imageSubstring, imagery, justLoadIt) {
  if(justLoadIt === true) {
    document.getElementById("image").style.backgroundImage=imageUrl;
    return
  }

  if(~document.getElementById("image").style.backgroundImage.indexOf(imageSubstring)){
    document.getElementById("next-image").style.zIndex = "0";
    document.getElementById("next-image").style.backgroundImage=imageUrl;

    window.timeout = setTimeout(function() {
      document.getElementById("image").style.backgroundImage = "none";
      document.getElementById("next-image").style.zIndex = "1";
      document.getElementById("image").style.zIndex = "0";
    }, 15 * 1000)
  } else {
    document.getElementById("image").style.zIndex = "0";
    document.getElementById("image").style.backgroundImage=imageUrl;

    window.timeout = setTimeout(function() {
      document.getElementById("next-image").style.backgroundImage = "none";
      document.getElementById("image").style.zIndex = "1";
      document.getElementById("next-image").style.zIndex = "0";
    }, 15 * 1000)

  }
}

function getTimes(){
    var d   = new Date();
    var utc = new Date(d.getUTCFullYear()
                     , d.getUTCMonth()
                     , d.getUTCDate()
                     , d.getUTCHours()
                     , d.getUTCMinutes()
                     , d.getUTCSeconds());

    // Get time information                     // Get utc time information
    var dd = d.getDate();                       var ddUtc = utc.getDate();
    var mo = d.getMonth() + 1;                  var moUtc = utc.getMonth() + 1
    var yr = d.getFullYear();                   var yrUtc = utc.getFullYear();

    // Get time information                     // Get utc time information
    var hh = d.getHours();                      var hUtc  = utc.getHours();
    var mm = d.getMinutes();                    var mmUtc = utc.getMinutes();
    var s  = d.getSeconds();                    var sUtc  = utc.getSeconds();

    // Format local date and time information   // Format utc date and time information
    if (dd < 10) { dd = "0" + dd };             if (ddUtc < 10) { ddUtc = "0" + ddUtc };
    if (mo < 10) { mo = "0" + mo };             if (moUtc < 10) { moUtc = "0" + moUtc };
    if (mm < 10) { mm = "0" + mm };             if (mmUtc < 10) { mmUtc = "0" + mmUtc };
    if (s  < 10) { s  = "0" + s  };             if (sUtc  < 10) { sUtc  = "0" + sUtc  };
    if (hh < 10) { hh = "0" + hh };

    // Build date and time strings
    var localDate = yr + "/" + mo + "/" + dd;
    var localTime = hh + ":" + mm + ':' + s;
    var utcDate   = moUtc + "/" + ddUtc + "/" + yrUtc;
    var utcTime   = hUtc + ":" + mmUtc;

    return {
      localDate: localDate,
      localTime: localTime,
      utcDate:   utcDate,
      utcTime:   utcTime
    }
}

function padLeft(x, n){
    var str = "" + x
    var pad = new Array(n + 1).join("0") // "000000" for n = 6
    var ans = pad.substring(0, pad.length - str.length) + str
    return ans
}

function padRight(x, n){
    var str = "" + x
    var pad = new Array(n + 1).join("0") // "000000" for n = 6
    var ans = str + pad.substring(0, pad.length - str.length)
    return ans
}
