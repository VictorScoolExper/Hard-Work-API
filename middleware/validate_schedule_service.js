// Helper function to check if a time is within a given range
function isTimeInRange(time, startTime, endTime) {
  return time >= startTime && time <= endTime;
}
// Helper function to check if a time is within a given range
function isStartTimeLessThanEndTime(startTime, endTime) {
  return startTime > endTime;
}
// Helper function to check if it is a json object
function isEmptyJson(jsonObj) {
  return Object.keys(jsonObj).length === 0;
}

const validateServiceScheduleParams = (req, res, next) => {
  const {
    client_id,
    address_id,
    start_time,
    end_time,
    date_scheduled,
    type,
    status,
    services,
    materials,
    employees,
    days_until_repeat,
  } = req.body;
  const errors = {};

  if (!client_id || typeof client_id !== "number" || isNaN(client_id)) {
    errors.client_id =
      "Client Id is required or must be with numerical values.";
  }

  if (!address_id || typeof address_id !== "number" || isNaN(address_id)) {
    errors.address_id =
      "Address Id is required or must be with numerical values.";
  }

  // Regular expression that ensures that time is in 24 hour format
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  // TODO: fix function
  if (!start_time || !timeRegex.test(start_time)) {
    errors.start_time = "Start time is required or invalid format";
  }
  if (!end_time || !timeRegex.test(end_time)) {
    errors.end_time = "Start time is required or invalid format";
  }

  if (isStartTimeLessThanEndTime(start_time, end_time)) {
    const message = "Start time must be less than end time.";

    errors.start_time
      ? (errors.start_time += ", " + message)
      : (errors.start_time = message);
  }

  if (!date_scheduled || date_scheduled instanceof Date) {
    errors.date_scheduled = "To do date is invalid";
  }

  const validStatus = ["pending", "in-progress", "done", "canceled"];
  // We check that status is valid
  if (!status || !validStatus.includes(status)) {
    errors.status = "Status is an invalid type or is empty";
  }

  const validTypes = ["single", "routine"];
  // We check that type is valid
  if (!type || !validTypes.includes(type)) {
    errors.type = "Type is an invalid type or is empty";
  }

  // Check to see if service is json and it has a valid objects
  if (!isEmptyJson(services)) {
    services.forEach((service, index) => {
      if (
        !service.service_id ||
        typeof service.service_id !== "number" ||
        isNaN(service.service_id) ||
        service.service_id < 0
      ) {
        errors[`service[${index}].service_id`] =
          "Service must be required and must be valid";
      }

      if (
        !service.quantity ||
        typeof service.quantity !== "number" ||
        isNaN(service.quantity) ||
        service.quantity < 0
      ) {
        errors[`service[${index}].quantity`] =
          "Service must be required and must be valid";
      }
    });
  }

  // TODO: transform to ternary expression
  if (materials) {
    if (!isEmptyJson(materials)) {
      materials.forEach((material, index) => {
        if (
          !material.material_id ||
          typeof material.material_id !== "number" ||
          material.material_id < 0
        ) {
          errors[`material[${index}].material_id`] = "Material Id is invalid";
        }
        if (
          !material.quantity ||
          typeof material.quantity !== "number" ||
          material.quantity < 0
        ) {
          errors[`material[${index}].quantity`] = "Quantity is invalid";
        }

        if (
          !material.subtotal ||
          typeof material.subtotal !== "number" ||
          material.subtotal < 0
        ) {
          errors[`material[${index}].subtotal`] = "Quantity is invalid";
        }
      });
    }
  }

  // TODO: transform to ternary expression
  if (employees) {
    if (!isEmptyJson(employees)) {
      employees.forEach((employee, index) => {
        if (
          !employee.employee_id ||
          typeof employee.employee_id !== "number" ||
          isNaN(employee.employee_id) ||
          employee.employee_id < 0
        ) {
          errors[`employee[${index}].employee_id`] =
            "employee Id is required and must be the correct value";
        }
      });
    }
  }

  // TODO: transform to ternary expression
  if(days_until_repeat){
    if (!days_until_repeat || typeof days_until_repeat !== "number" || isNaN(days_until_repeat)) {
      errors.days_until_repeat = "days until repeat is required or is invalid.";
    }
  }
  

  if (Object.keys(errors).length > 0) {
    // TODO: add status to json
    res.status(400).json({ errors });
  } else {
    next();
  }
};

module.exports = {
  validateServiceScheduleParams,
};
