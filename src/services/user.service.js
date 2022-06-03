import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/v1/test/";
const API_URL_USER = "http://localhost:8080/api/v1/user/change-user"
class UserService {

  changeUser(user, data) {
    data.id = user
    return axios.post(API_URL_USER, data, { headers: authHeader() })
  }

  getPublicContent() {
    return axios.get(API_URL + "all");
  }
  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}
export default new UserService();
