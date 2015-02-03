riot.tag('tabs',
  '<div id="summoner" class="chooser { atTop: atTop } { choosing: choosing }" onclick="{ toggleSummoner }">' +
    '...' +
  '</div>' +
  '<ul id="tabs" class="list--bare dockable { docked: docked }">' +
    '<li each="{ tab, i in tabs }" class="{ tab: true, is-active: parent.isActiveTab(tab.ref) }" onclick="{ parent.toggleTab }">' +
      '{tab.title}' +
    '</li>' +
  '</ul>' +
  '<div class="tabContent dockable { docked: !docked }">' +
    '<div each="{ tab, i in tabs }" class="{ tabContent__item: true, is-active: parent.isActiveTab(tab.ref) }">' +
      '{tab.title}' +
      '<div id="{tab.ref}-image" class=""></div>' +
      '<div id="{tab.ref}-next-image" class=""></div>' +
    '</div>' +
  '</div>',
  function(opts) {
    this.tabs      = opts.tabs;
    this.atTop     = opts.atTop;
    this.activeTab = opts.activeTab;
    this.docked    = opts.docked;

    this.utcDate = getTimes().utcDate;
    this.utcTime = getTimes().utcTime;

    this.currentTab = function() {
      var t = this;
      return t.tabs.filter(function(tab){ return tab.ref === t.activeTab })[0];
    }.bind(this)

    this.isActiveTab = function(tab) {
      return this.activeTab === tab;
    }.bind(this);

    this.toggleTab = function(e) {
      this.activeTab = e.item.tab.ref;
      this.toggleSummoner();
      return true;
    }.bind(this);

    this.toggleSummoner = function(e) {
      window.clearTimeout(window.timeout);
      this.choosing = !this.choosing;
      this.atTop = !this.atTop;
      this.docked = !this.docked;

      var img = imageUrl(this.currentTab().imageString, this.currentTab().view, this.utcDate, this.utcTime);
      cycleImages(img, this.currentTab().imageString, this.activeTab, true);

      this.update({ choosing: this.choosing, atTop: this.atTop, docked: this.docked });
    }.bind(this);

    this.tick = (function () {
      this.utcDate = getTimes().utcDate;
      this.utcTime = getTimes().utcTime;

      var img = imageUrl(this.currentTab().imageString, this.currentTab().view, this.utcDate, this.utcTime)
      cycleImages(img, this.currentTab().imageString, this.activeTab)
    }).bind(this);

    var timer = setInterval(this.tick, 60000);

    setTimeout(this.tick, 1235);


    this.on('unmount', function () {
      clearInterval(timer);
    });
  }
)

riot.mount('tabs', {
  tabs: [{
    title: "WhatEuropaIsIt",
    imageString: "europa",
    view: "full",
    ref: 'tab1',
  }, {
    title: "WhatIoIsIt",
    imageString: "io",
    view: "full",
    ref: 'tab2'
  }, {
    title: "WhatGanymedeIsIt",
    imageString: "ganymede",
    view: "full",
    ref: 'tab3'
  }, {
    title: "WhatJupiterIsIt",
    imageString: "jupiter",
    view: "full",
    ref: 'tab4'
  }, {
    title: "WhatMercuryIsIt",
    imageString: "mercury",
    view: "full",
    ref: 'tab5'
  }, {
    title: "WhatMarsIsIt",
    imageString: "mars",
    view: "full",
    ref: 'tab6'
  }, {
    title: "WhatVenusIsIt",
    imageString: "venus",
    view: "full",
    ref: 'tab7'
  }, {
    title: "WhatCallistoIsIt",
    imageString: "callisto",
    view: "full",
    ref: 'tab8'
  }, {
    title: "WhatMoonIsIt",
    imageString: "moon",
    view: "full",
    ref: 'tab9'
  }, {
    title: "WhatSunsetIsIt",
    imageString: "earth",
    view: "set",
    ref: 'tab10'
  }, {
    title: "WhatSunriseIsIt",
    imageString: "earth",
    view: "rise",
    ref: 'tab11'
  }, {
    title: "WhatEarthIsIt",
    imageString: "earth",
    view: "full",
    ref: 'tab12'
  }],
  activeTab: 'tab12',
  choosing: false,
  atTop: true,
  docked: true
});

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

function cycleImages(imageUrl, imageSubstring, tabRef, justLoadIt) {
  if(justLoadIt === true) {
    document.getElementById(tabRef + "-image").style.backgroundImage=imageUrl;
    document.getElementById(tabRef + "-image").style.zIndex = "1";
    document.getElementById(tabRef + "-next-image").style.zIndex = "0";
    document.getElementById(tabRef + "-next-image").style.backgroundImage = "none";
    return
  }

  if(~document.getElementById(tabRef + "-image").style.backgroundImage.indexOf(imageSubstring)){
    document.getElementById(tabRef + "-next-image").style.zIndex = "0";
    document.getElementById(tabRef + "-next-image").style.backgroundImage=imageUrl;

    window.timeout = setTimeout(function() {
      document.getElementById(tabRef + "-image").style.backgroundImage = "none";
      document.getElementById(tabRef + "-next-image").style.zIndex = "1";
      document.getElementById(tabRef + "-image").style.zIndex = "0";
    }, 30 * 1000)
  } else {
    document.getElementById(tabRef + "-image").style.zIndex = "0";
    document.getElementById(tabRef + "-image").style.backgroundImage=imageUrl;

    window.timeout = setTimeout(function() {
      document.getElementById(tabRef + "-next-image").style.backgroundImage = "none";
      document.getElementById(tabRef + "-image").style.zIndex = "1";
      document.getElementById(tabRef + "-next-image").style.zIndex = "0";
    }, 30 * 1000)

  }
}

function imageUrl(image, view, date, time) {
  return "url(http://api.usno.navy.mil/imagery/" + image + ".png?view=" + view + "&date=" + date + "&time=" + time + ")";
}

(function (riot) {
  riot.tag('timetable', '', function(opts){
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

function padLeft(x, n){
    var str = "" + x
    var pad = new Array(n + 1).join("0") // "000000" for n = 6
    var ans = pad.substring(0, pad.length - str.length) + str
    return ans
}

