const Sanitize = require('.');
const logSanitizer = new Sanitize(['password', 'email']);
describe('Log Sanitizer Tests', () => {

  test('Check to see that it creates new object and sanitizes it', () => {
    const log = JSON.parse('{"password": "asdf1234"}');
    expect(logSanitizer.sanitize(log).password).toBe('*');
    expect(log.password).toBe("asdf1234");
  });

  test('If object is empty, should return untouched object', () => {
    const log = JSON.parse('{}');
    expect(logSanitizer.sanitize(log)).toBe(log);
  });

  test('If no fields passed during initialization, should return untouched object', () => {
    const emptySanitizer = new Sanitize([]);
    const log = JSON.parse('{"password": "asdf1234"}');
    expect(emptySanitizer.sanitize(log)).toBe(log);
  });

  test('For nested object, check that it sanitizes all levels', () => {
    const log = JSON.parse('{"password": "asdf1234", "test": {"password": "asdf1234"}}');
    expect(logSanitizer.sanitize(log).password).toBe('*');
    expect(logSanitizer.sanitize(log).test.password).toBe('*');
  });

  test('For urls, sanitize email if it is one of sanitize fields', () => {
    const log = JSON.parse('{"url": "email=test@email.com"}');
    expect(logSanitizer.sanitize(log).url).toBe('email=*');
  });

  test('If scanning fails, should catch error and return err obj', () => {

  });
});