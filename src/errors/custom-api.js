/* Green Work ERP by Victor Martinez */

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

export default CustomAPIError;
