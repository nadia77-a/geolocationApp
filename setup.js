module.exports = function (Handlebars) {
    Handlebars.registerHelper('custom', function (context, options) {
      return 'custom helpers!'
    })
  }