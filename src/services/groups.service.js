import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/v1/";
const API_URL_GROUPS = API_URL + "group/";
class GroupsService {

  getGroupsOfUser(userId) {
    return axios.get(API_URL_GROUPS + userId, { headers: authHeader() });
  }

  getAllGroups() {
    return axios.get(API_URL_GROUPS, {headers: authHeader()});
  }

  deleteGroup(groupId) {
    return axios.delete(API_URL_GROUPS + groupId, {headers: authHeader()});
  }

  removeUser(userId, groupId) {
    return axios.put(API_URL_GROUPS + "removeUser/" + userId + "/" + groupId, null, {headers: authHeader()});
  }

  sendUserMessage(toUserId, fromUserId, message){
    return axios.post(API_URL_GROUPS + "sendUserMail/" + fromUserId + "/" + toUserId, message, {
      headers: {
        "Authorization" : authHeader().Authorization,
        "Content-Type" : 'text/plain'
      }
    });
  }

  sendGroupMessage(groupId, fromUserId, message){
    console.log(message);
    return axios.post(API_URL_GROUPS + "sendGroupMail/" + fromUserId + "/" + groupId, message, {
      headers: {
        "Authorization" : authHeader().Authorization,
        "Content-Type" : 'text/plain'
      }
    });
  }
}
export default new GroupsService();
