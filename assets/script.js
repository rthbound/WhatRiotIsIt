riot.tag('timer', '<p>Seconds Elapsed: { elapsed }</p><p>UTC Time: { utc_time }</p><p>Local Time: { local_time }', function (opts) {
    this.elapsed = opts.start || 0;
    this.local_time = getTimes().local_time;
    this.utc_time = getTimes().utc_time;

    this.tick = (function () {
        var times       = getTimes();

        this.update({
            elapsed: ++this.elapsed,
            utc_time: times.utc_time,
            local_time: times.local_time
        });
    }).bind(this);

    var timer = setInterval(this.tick, 1000);
});

//  Here we mount riot to a custom tag on the page
//  Options supplied here as key/value pairs
//   will be available in the tag function above as 'opts'
riot.mount('timer', {
    start: 0,
    local_time: getTimes().local_time,
    utc_time: getTimes().utc_time
});

//  Function for returning utc dates and times
function getTimes(){
    var d  = new Date();
    var utc = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(),  d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());

    // Get date information           // Get time information
    var ddUtc = utc.getDate();        var hUtc  = utc.getHours();
    var moUtc = utc.getMonth() + 1;   var mmUtc = utc.getMinutes();
    var yrUtc = utc.getFullYear();    var sUtc  = utc.getSeconds();

    // Get date information           // Get time information
    var dd = d.getDate();             var h  = d.getHours();
    var mo = d.getMonth() + 1;        var mm = d.getMinutes();
    var yr = d.getFullYear();         var s  = d.getSeconds();

    // Format date and time information
    if (dd < 10) { dd = "0" + dd };             if (mm < 10) { mm = "0" + mm };
    if (mo < 10) { mo = "0" + mo };             if (s  < 10) { s  = "0" + s  };
    if (ddUtc < 10) { ddUtc = "0" + ddUtc };    if (mmUtc < 10) { mmUtc = "0" + mmUtc };
    if (moUtc < 10) { moUtc = "0" + moUtc };    if (sUtc  < 10) { sUtc  = "0" + sUtc  };

    // Build date and time strings
    var date = mo + "/" + dd + "/" + yr;
    var local_time = h  + ":" + mm + ':' + s;
    var utcDate = moUtc + "/" + ddUtc + "/" + yrUtc;
    var utc_time = hUtc + ":" + mmUtc + ':' + sUtc;

    return {
      local_date: date,
      local_time: local_time,
      utc_date: utcDate,
      utc_time: utc_time
    }
}
