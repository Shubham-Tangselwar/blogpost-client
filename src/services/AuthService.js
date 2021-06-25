import API from "../api/API";
import endPoints from "../api/endPoints.json";

class AuthService {
  static passwordResetLink(data) {
    return API.post(endPoints.api.auth.resetLink, data);
  }

  static refreshToken() {
    return API.post(endPoints.api.auth.refreshToken, {});
  }
}

export default AuthService;
