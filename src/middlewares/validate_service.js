/* Green Work ERP by Victor Martinez */

const validateServiceParams = async (req, res, next) => {
  const { service_name, description, is_per_hour, price } = req.body;
  const errors = {};

  if (!service_name || typeof service_name !== "string") {
    errors.service_name =
     "Service name is required or must be with alphabetical values.";
  }
  if (!description || typeof description !== "string") {
    errors.description = "Description is required or must only alphabetical";
  }
  if (!is_per_hour || typeof is_per_hour !== "string") {
    errors.is_per_hour = "Is per hour must be true or false";
  }
  const convertedPrice = parseInt(price)
  if(!convertedPrice || typeof convertedPrice !== "number"){
    errors.price = "Price is required and must be a number"
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
};

export {
  validateServiceParams,
};
