import role from "../../models/auth/role.js";
import user from "../../models/auth/user.js";

async function getAllUser() {
    try {
      return await user
        .find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async function getUserById(id) {
    try {
      return await user
        .findById(id)
        .populate({ path: "roles", select: "id, name", model: role });
    } catch (error) {
      throw new Error(error);
    }
  }

  async function getUserFindOne(where={}) {
    try {
      return await user
        .findOne({...where})
        .populate({ path: "roles", select: "id, name", model: role });
    } catch (error) {
      throw new Error(error);
    }
  }

  async function createUser(newUser) {
    try {
      const find = await user.findOne({email: newUser.email });
      if (find){
        throw new Error('Email já cadastrada');
      }
      const newDoc = new user({ ...newUser });
      await newDoc.save();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async function updateUser(id, modUser) {
    try {
      const filter = { _id: id };
      const userFind = await user.findOneAndUpdate(filter, modUser, {
        new: true,
      });
      return userFind;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async function deleteUser(id) {
    try {
      return await user.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
  
  export {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserFindOne
  };