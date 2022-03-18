const asyncWrapper = (callbackFunction) => {
  return async (req, res, next) => {
    try {
      await callbackFunction(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
