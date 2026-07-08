import Cookie from "js-cookie";
import { toast } from "react-toastify";

function Logout() {
  try {
    Cookie.remove("token");
    toast.success("Logout Successfully...", {
      onClose: () => {
        window.location.href = "/login";
      },
    });
  } catch (e) {
    console.log(e);
  }
}
function LogoutwithoutNotification() {
  try {
    Cookie.remove("token");
    window.location.href = "/login";
  } catch (e) {
    console.log(e);
  }
}

export default Logout;

export { LogoutwithoutNotification };
