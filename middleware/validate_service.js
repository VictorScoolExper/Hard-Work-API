const validateServiceParams = async (req, res, next) => {
  const { service_name, description, is_per_hour, price, duration_minutes } = req.body;
  const errors = {};

  if (!service_name || typeof service_name !== "string") {
    errors.service_name =
     "Service name is required or must be with alphabetical values.";
  }
  if (!description || typeof description !== "string") {
    errors.description = "Description is required or must only alphabetical";
  }
  if (!is_per_hour || typeof price !== "number") {
    errors.is_per_hour = "is per hour must be a number between 0 1";
  }
  if (!duration_minutes || typeof duration_minutes !== "number") {
    errors.duration_minutes = "duration minutes required and must be a number";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
};

module.exports = {
  validateServiceParams,
};
