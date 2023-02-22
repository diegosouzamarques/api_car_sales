import role from "../../models/auth/role.js";

async function getAllRole(where={}) {
    try {
      return await role
        .find({...where});
    } catch (error) {
      throw new Error(error);
    }
  }

  async function getRoleById(id) {
    try {
      return await role
        .findById(id)
    } catch (error) {
      throw new Error(error);
    }
  }

  async function getRoleFindOne(where={}) {
    try {
      return await role
        .findOne({...where})
    } catch (error) {
      throw new Error(error);
    }
  }

  async function createRole(newRole) {
    try {
      const find = await role.findOne({name: newRole.name });
      if (find){
        throw new Error('Role já cadastrada');
      }
      const newDoc = new role({ ...newRole });
      await newDoc.save();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async function updateRole(id, modRole) {
    try {
      const filter = { _id: id };
      const roleFind = await role.findOneAndUpdate(filter, modRole, {
        new: true,
      });
      return roleFind;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async function deleteRole(id) {
    try {
      return await role.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
  
  export {
    getAllRole,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
    getRoleFindOne
  };