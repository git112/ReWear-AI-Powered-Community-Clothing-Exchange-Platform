/**
 * Utility function for sending structured API responses
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {boolean} success - Success status
 * @param {string} message - Response message
 * @param {*} data - Response data
 * @param {*} error - Error details (if any)
 */
const sendResponse = (res, statusCode, success, message, data = null, error = null) => {
  const response = {
    success,
    message,
    ...(data && { data }),
    ...(error && { error })
  };

  return res.status(statusCode).json(response);
};

/**
 * Success response helper
 */
const sendSuccess = (res, statusCode = 200, message = 'Success', data = null) => {
  return sendResponse(res, statusCode, true, message, data);
};

/**
 * Error response helper
 */
const sendError = (res, statusCode = 500, message = 'Internal Server Error', error = null) => {
  return sendResponse(res, statusCode, false, message, null, error);
};

module.exports = {
  sendResponse,
  sendSuccess,
  sendError
}; 