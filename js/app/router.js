// Change the hash to #! instead of #
(function() {

var get = Ember.get, set = Ember.set;

Ember.Location.registerImplementation('hashbang', Ember.HashLocation.extend({ 

    getURL: function() {
        return get(this, 'location').hash.substr(2);
    },

    setURL: function(path) {
        get(this, 'location').hash = "!"+path;
        set(this, 'lastSetURL', "!"+path);
    },

    onUpdateURL: function(callback) {
        var self = this;
        var guid = Ember.guidFor(this);

        Ember.$(window).bind('hashchange.ember-location-'+guid, function() {
                Ember.run(function() {
                    var path = location.hash.substr(2);
                    if (get(self, 'lastSetURL') === path) { return; }

                    set(self, 'lastSetURL', null);

                    callback(location.hash.substr(2));
                });
        });
    },

    formatURL: function(url) {
        return '#!'+url;
    }

}));

})();

App.Router.reopen({
    location: 'hashbang'
})

App.Router.map(function() {
    this.resource("suggestions", { path: "/suggestions-de-la-semaine" });
    this.resource("appetizer", { path: "/entrees" });
    this.resource("cheese", { path: "/specialites-au-fromage" });
    this.resource("crepes", { path: "/crepes-et-galettes" });
    this.resource("ice-cream", { path: "/glaces-artisanales" });
    this.resource("drinks", { path: "/boissons" });
    this.resource("drink", { path: "/boissons/:drink_id" });
});




