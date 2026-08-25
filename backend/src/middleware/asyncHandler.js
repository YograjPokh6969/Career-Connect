// Express does not catch errors from async functions automatically.
// This helper sends those errors to the error middleware.
function asyncHandler(controller) {
  return function (req, res, next) {
    Promise.resolve(controller(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
