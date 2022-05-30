// In the case we access protected resources, the HTTP request needs Authorization header.
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) {
    return { Authorization: "easyClub " + user.accessToken };
  } else {
    return {};
  }
}
