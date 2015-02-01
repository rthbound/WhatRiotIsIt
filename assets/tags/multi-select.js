riot.tag('multi-select', selectTag.value, function(opts) {
  this.selections = opts.selections.sort(function(a,b) {return a.name > b.name});
  this.selected = [this.selections[0]];
  this.showing = false;
  self = this;

  this.remove = function(e) {
    this._swap(e.item, this.selected, this.selections);
    this.selections.sort(function(a,b) {return a.name > b.name});

  }.bind(this);

  // When we select an image, clear out current 'selected' &
  // begin loading the background image user wants to switch to
  this.select = function(e) {
    this.selected = [];
    this._swap(e.item, this.selections, this.selected);

    var img = imageUrl(this.selected[0].imageString, this.selected[0].view, getTimes().utcDate, getTimes().utcTime)
    window.clearTimeout(window.timeout)
    cycleImages(img, this.selected[0].imageString, imagery, true)

    // NOTE: it feels gross to do this image stuff here where we define our multi-select tag.
  }.bind(this);

  this.show = function(e) {
    this.showing = !this.showing;
  }.bind(this);

  this._swap = function(item, src, dest) {
    dest.push(item);
    //src.splice(src.indexOf(item), 1);
    this.showing = false;
  };

});

var colors = riot.mount('#colors', {
  selections: [{
    name: "Earth at Sunrise",
    imageString: "earth",
    view: "rise"
  }, {
    name: "Earth at Sunset",
    imageString: "earth",
    view: "set"
  }, {
    name: "Full view of earth",
    imageString: "earth",
    view: "full"
  }]
})[0];
