const {Role, ROLES} = require("../app/models/Role.js");

const createRoles = async () => {
    try {
      // Count Documents
      const count = await Role.estimatedDocumentCount();
  
      // check for existing roles
      if (count > 0) return;


      const rolePromises = ROLES.map(roleName => {
            return new Role({ name: roleName }).save();
      });

      const values = await Promise.all(rolePromises);
      
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };

module.exports = { createRoles};