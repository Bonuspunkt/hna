var util = {

  inherits: function(constructor, superConstructor) {
    constructor.prototype = Object.create(superConstructor.prototype, {
      constructor: {
        value: constructor,
        writeable: true,
        configurable: true
      }
    });
  },

  autoEventedProperty: function(object, propertyName, initalValue) {

    Object.defineProperty(object, propertyName, {
      get: function() {
        return this['_' + propertyName];
      },
      set: function(value) {
        if (this['_' + propertyName] === value) { return; }
        this['_' + propertyName] = value;
        this.fireEvent(propertyName + 'Change', value);
      }
    });

    if (initalValue !== undefined) {
      object['_' + propertyName] = initalValue;
    }
  }
};

module.exports = util;