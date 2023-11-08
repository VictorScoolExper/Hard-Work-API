/* Green Works ERP by Victor Martinez */

import { getJobTitle } from "../../../utils/index.js";
import CompanyDepartment from "../../../models/company_department.js";
import CompanyRole from "../../../models/company_roles.js";

export const convert_role_id_to_string = async (usersArr) => {
  const users = [];

  for (const user of usersArr) {
    user.role_id
      ? (user.role = await CompanyRole.selectCompanyRoleName(user.role_id))
      : (user.role = "N/A");

    user.job_title_id
      ? (user.job_title = await getJobTitle(user.job_title_id))
      : (user.job_title = "N/A");

    user.company_department_id
      ? (user.department = await CompanyDepartment.selectDepartmentName(
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
