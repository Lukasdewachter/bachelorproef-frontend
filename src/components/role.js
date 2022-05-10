import jwtDecode from "jwt-decode";
import authHeader from "./auth";
export default function Role() {
    var decoded = jwtDecode(authHeader());
    return decoded.role;
}