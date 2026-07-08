import cookie from "js-cookie";

function CheckToken() {
  try {
    let token = cookie.get("token");
    return token;
  } catch (e) {
    console.log(e);
  }
}

export default CheckToken;
