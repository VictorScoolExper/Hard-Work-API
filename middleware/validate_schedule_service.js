// Helper function to check if a time is within a given range
function isTimeInRange(time, startTime, endTime) {
  return time >= startTime && time <= endTime;
}
// Helper function to check if a time is within a given range
function isStartTimeLessThanEndTime(startTime, endTime) {
  return startTime < endTime;
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
    to_do_date,
    type,
    status,
    services,
    materials,
    employees,
    days_until_repeat,
  } = req.body;
  const errors = {};

  if (!client_id || typeof client_id !== "number") {
    errors.client_id =
      "Client Id is required or must be with numerical values.";
  }
  
  if (!address_id || typeof address_id !== "number") {
    errors.address_id =
      "Address Id is required or must be with numerical values.";
  }

  // Regular expression to validate time format (HH:MM)
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  // TODO: fix function
  if (!start_time || !timeRegex.test(currentTime)) {
    errors.start_time = "Start time is required or invalid format";
  }
  // const minStartTime = "00:00";
  // const minMaxTime = "23:59";
  // // Checks if start time is in range
  // if (!isTimeInRange(start_time, minStartTime, minMaxTime)) {
  //   errors.start_time += ", " + "Start time is not in range.";
  // }
  // if (isStartTimeLessThanEndTime(start_time, end_time)) {
  //   errors.start_time += ", " + "Start time must be less than end time.";
  // }
  // // Checks if end time is in range
  // if (!isTimeInRange(end_time, minStartTime, minMaxTime)) {
  //   errors.end_time = "End time is not in range.";
  // }

  // if (!to_do_date || to_do_date instanceof Date) {
  //   errors.to_do_date = "To do date is invalid";
  // }

  // const validStatus = ["pending", "in-progress", "done", "canceled"];
  // // We check that status is valid
  // if (!status || !validStatus.includes(status)) {
  //   errors.status = "Status is an invalid type or is empty";
  // }

  // const validTypes = ["single", "routine"];
  // // We check that type is valid
  // if (!type || !validTypes.includes(type)) {
  //   errors.type = "Type is an invalid type or is empty";
  // }

  // // Check to see if service is json and it has a valid objects
  // if (!isEmptyJson(services)) {
  //   services.forEach((service, index) => {
  //     if (!service.service_id || typeof service.service_id !== "number") {
  //       errors[`service[${index}].service_id`] =
  //         "Service must be required and must be valid";
  //     }

  //     if (!service.quantity || typeof service.quantity !== "number") {
  //       errors[`service[${index}].quantity`] =
  //         "Service must be required and must be valid";
  //     }
  //   });
  // }

  // if (!isEmptyJson(materials)) {
  //   materials.forEach((material, index) => {
  //     if (!material.material_id || typeof material.material_id !== "number") {
  //       errors[`material[${index}].material_id`] = "Material Id is invalid";
  //     }
  //     if (!material.qty || typeof material.qty !== "number") {
  //       errors[`material[${index}].qty`] = "Quantity is invalid";
  //     }

  //     if (!material.sub_total || typeof material.sub_total !== "number") {
  //       errors[`material[${index}].sub_total`] = "Quantity is invalid";
  //     }
  //   });
  // }

  // if (!isEmptyJson(employees)) {
  //   employees.forEach((employee, index) => {
  //     if (!employee.employee_id || typeof employee !== "number") {
  //       errors[`employee[${index}].employee_id`] =
  //         "employee Id is required and must be the correct value";
  //     }
  //   });
  // }

  // if (!days_until_repeat || typeof days_until_repeat !== "number") {
  //   errors.days_until_repeat = "days until repeat is required or is invalid.";
  // }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
};

module.exports = {
    validateServiceScheduleParams
}