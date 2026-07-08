import cookie from "js-cookie";

function CheckRole() {
  try {
    let role = cookie.get("role");
    return role;
  } catch (e) {
    console.log(e);
  }
}

export default CheckRole;
