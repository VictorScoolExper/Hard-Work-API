/* Green Works ERP by Victor Martinez */

import { getRole, getDepartment, getJobTitle } from "../../../utils/index.js";

export const convert_role_id_to_string = async (usersArr) => {
  const users = [];

  for(const user of usersArr) {
    user.role_id ? user.role = await getRole(user.role_id) : user.role = 'N/A';
    user.job_title_id ? user.job_title = await getJobTitle(user.job_title_id) : user.job_title = 'N/A';
    user.company_department_id ? user.department = await getDepartment(user.company_department_id) : user.department = 'N/A';

    delete user.role_id;
    delete user.job_title_id;
    delete user.company_department_id;

    users.push(user);
  };

  return users;
};
