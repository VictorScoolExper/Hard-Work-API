/* Green Work ERP by Victor Martinez */

import { connection } from '../utils/index.js';
import User from './user.js';

// TODO: utilize class or delete constructor
class Vendor extends User {
  constructor(vendor) {
    super(vendor);
    this.company_id = vendor.company_id;
    this.email = vendor.email;
  }

  static insertVendor(vendor) {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_insert_vendor(?,?,?,?,?,?,?,?,?,?,?)",
        [
          vendor.name.toLowerCase(),
          vendor.last_name.toLowerCase(),
          vendor.company_id,
          vendor.cell_number,
          vendor.email.toLowerCase(),
          vendor.street.toLowerCase(),
          vendor.city.toLowerCase(),
          vendor.state.toLowerCase(),
          vendor.zip_code || "",
          vendor.country.toLowerCase(),
          vendor.include_address
        ],
        (error, result) => {
          error ? reject(error) : resolve(result[0]);
        }
      );
    });
  }

  static getAllVendors() {
    return new Promise((resolve, reject) => {
      connection.query("CALL sp_get_all_vendor();", (error, result) => {
        error ? reject(error) : resolve(result[0]);
      });
    });
  }

  static getSingleVendor(vendorId) {
    return new Promise((resolve, reject) => {
      connection.query("CALL sp_get_single_vendor(?);", [vendorId], (error, result) => {
        error ? reject(error) : resolve(result[0]);
      });
    });
  }

  static getAddressVendor(vendorId) {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_get_vendor_addresses(?);",
        [vendorId],
        (error, result) => {
          error ? reject(error) : resolve(result[0]);
        }
      );
    });
  }

  static updateVendor(vendor) {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_update_vendor(?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          vendor.vendor_id,
          vendor.name.toLowerCase(),
          vendor.last_name.toLowerCase(),
          vendor.company_id,
          vendor.cell_number,
          vendor.email.toLowerCase(),
          vendor.address_id,
          vendor.street.toLowerCase(),
          vendor.city.toLowerCase(),
          vendor.state.toLowerCase(),
          vendor.zip_code,
          // "usa" is used because the system is used in the united states and always will be usa
          "usa",
          vendor.include_address
        ],
        (error, result) => {
          error ? reject(error) : resolve(result);
        }
      );
    });
  }

  static deleteAddressVendor(vendorId, addressId) {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_delete_vendor_address(?,?)", [vendorId, addressId],
        (error, result) => {
          error ? reject(error) : resolve(result);
        }
      );
    });
  }
  
  static modifyAddressVendor(vendorId, address) {
    return new Promise((resolve, reject) => {
        connection.query(
          "CALL sp_update_address(?,?,?,?,?,?,?)", [
            vendorId, 
            address.address_id,
            address.street,
            address.city,
            address.state,
            address.zip_code,
            address.country
        ],
          (error, result) => {
            error ? reject(error) : resolve(result);
          }
        );
      });
  }
}

export default Vendor;
