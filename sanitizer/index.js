const clonedeep = require('lodash.clonedeep');

class Sanitizer {
  constructor(fields = []) {
    this.fields = fields;
    this.sanitizeRegex = new RegExp(`^(${fields.join('|')})$`, 'i');
    this.emailRegex = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/ig;
  }

  sanitize(obj) {
    if (this.fields.length === 0 || Object.keys(obj).length === 0) {
      return obj;
    }
    return this.scan(clonedeep(obj));
  }

  scan(obj) {
    try {
      if (typeof obj === 'object') {
        Object.keys(obj).forEach(key => {
          if (typeof obj[key] === 'object') {
            this.scan(obj[key]);
          } else {
            obj[key] = this.sanitizeRegex.test(key) ? '*' : obj[key];
            if (key === 'url' && this.fields.includes('email')) {
              obj[key] = decodeURIComponent(obj[key]).replace(this.emailRegex, '*');
            }
          }
        });
      }
      return obj;
    } catch (e) {
      //
    }
  }
}

module.exports = Sanitizer;