(function (riot) {
  riot.tag('imagery', '',function (opts) {
    this.utcDate = getTimes().utcDate;
    this.utcTime = getTimes().utcTime;

    var img = "url(http://api.usno.navy.mil/imagery/earth.png?view=full&date=" + this.utcDate + "&time=" + this.utcTime + ")";

    cycleImages(img)

    this.tick = (function () {
      this.utcDate = getTimes().utcDate;
      this.utcTime = getTimes().utcTime;
      var img = "url(http://api.usno.navy.mil/imagery/earth.png?view=full&date=" + this.utcDate + "&time=" + this.utcTime + ")";

      cycleImages(img)
    }).bind(this);

    var timer = setInterval(this.tick, 60000);
  })

  riot.mount('imagery');
})(riot);

//  Here we mount riot to a custom tag on the page
//  Options supplied here as key/value pairs
//   will be available in the tag function above as 'opts'

//  Function for returning utc dates and times

// Begin refactoring variables e.g. imageString such that they are arguments
// var imageString = "url(http://api.usno.navy.mil/imagery/earth.png?view=full&date=" + utcDate + "&time=" + utcTime + ")";
function cycleImages(imageString) {
  // Set a background image if there is none set
  if(~document.getElementById("image").style.backgroundImage.indexOf("earth")){
    document.getElementById("next-image").style.zIndex = "0"
    document.getElementById("next-image").style.backgroundImage=imageString

    setTimeout(function() {
      document.getElementById("image").style.backgroundImage = "none";
      document.getElementById("next-image").style.zIndex = "1"
      document.getElementById("image").style.zIndex = "0"
    }, 15 * 1000)
  } else {
    document.getElementById("image").style.zIndex = "0"
    document.getElementById("image").style.backgroundImage=imageString

    setTimeout(function() {
      document.getElementById("next-image").style.backgroundImage = "none";
      document.getElementById("image").style.zIndex = "1"
      document.getElementById("next-image").style.zIndex = "0"
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
    var h  = d.getHours();                      var hUtc  = utc.getHours();
    var mm = d.getMinutes();                    var mmUtc = utc.getMinutes();
    var s  = d.getSeconds();                    var sUtc  = utc.getSeconds();

    // Format local date and time information   // Format utc date and time information
    if (dd < 10) { dd = "0" + dd };             if (ddUtc < 10) { ddUtc = "0" + ddUtc };
    if (mo < 10) { mo = "0" + mo };             if (moUtc < 10) { moUtc = "0" + moUtc };
    if (mm < 10) { mm = "0" + mm };             if (mmUtc < 10) { mmUtc = "0" + mmUtc };
    if (s  < 10) { s  = "0" + s  };             if (sUtc  < 10) { sUtc  = "0" + sUtc  };
    if (h  < 10) { h =  "0" + h  };

    document.body.style.backgroundColor = "#" + h + mm + s;

    // Build date and time strings
    var localDate = mo + "/" + dd + "/" + yr;
    var localTime = h + ":" + mm + ':' + s;
    var utcDate   = moUtc + "/" + ddUtc + "/" + yrUtc;
    var utcTime   = hUtc + ":" + mmUtc;

    return {
      localDate: localDate,
      localTime: localTime,
      utcDate:   utcDate,
      utcTime:   utcTime
    }
}
