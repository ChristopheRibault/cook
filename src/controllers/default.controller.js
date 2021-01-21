export default class DefaultController {
  static healthCheck() {
    return Promise.resolve({ hello: 'world' });
  }

  static handle404() {
    return Promise.reject(new Error('Not Found'));
  }
}
