App.AppetizerRoute = Ember.Route.extend({
    model: function() {
        return App.Menus.findAll('appetizer');
    }
});

App.DrinksRoute = Ember.Route.extend({
    model: function() {
        return App.Menus.findAll('drinks');
    }
});

App.Menus = Ember.Object.extend();

App.Menus.reopenClass({

  findAll: function(subreddit){
      var links = [];
      $.getJSON('json/menus.json').then(function(response) {

        response.forEach(function(child) {
          
          if(child.category == subreddit){
            links.pushObject(App.Menus.create(child));
          }
        });
      });
      return links;
  }

});