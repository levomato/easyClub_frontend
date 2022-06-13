import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/v1/";
const API_URL_GROUPS = "http://localhost:8080/api/v1/group/";
class GroupsService {

  getGroupsOfUser(userId) {
    return axios.get(API_URL_GROUPS + userId, { headers: authHeader() });
  }
}
export default new GroupsService();
