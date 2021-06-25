import API from "../api/API";
import endPoints from "../api/endPoints.json";

class UserService {
  static createUser(user) {
    return API.post(endPoints.api.user.create, user);
  }
  static updateUser(user, id) {
    return API.put(endPoints.api.user.update + id, user);
  }
  static deleteUser(id) {
    return API.delete(endPoints.api.user.delete + id);
  }
  static getUser(id) {
    return API.get(endPoints.api.user.getSingle + id);
  }
  static getAllUsers() {
    return API.get(endPoints.api.user.getAll);
  }
  static loginUser(user) {
    return API.post(endPoints.api.user.login, user);
  }
}

export default UserService;
