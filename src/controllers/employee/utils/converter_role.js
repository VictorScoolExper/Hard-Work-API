/* Green Works ERP by Victor Martinez */

import { getRole, getJobTitle } from "../../../utils/index.js";
import Company_Department from "../../../models/company_department.js";

export const convert_role_id_to_string = async (usersArr) => {
  const users = [];

  for (const user of usersArr) {
    user.role_id
      ? (user.role = await getRole(user.role_id))
      : (user.role = "N/A");

    user.job_title_id
      ? (user.job_title = await getJobTitle(user.job_title_id))
      : (user.job_title = "N/A");

    user.company_department_id
      ? (user.department = await Company_Department.selectDepartmentName(
          user.company_department_id
        ))
      : (user.department = "N/A");

    delete user.role_id;
    delete user.job_title_id;
    delete user.company_department_id;

    users.push(user);
  }

  return users;
};
