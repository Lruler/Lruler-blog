import { HTTPAPI, urlMap } from "../fetch";

const loginUrlMap = () => {
  urlMap.set("login", "/login");
};

export interface LoginAPI {
  login: HTTPAPI<loginRes, loginReq>;
}

export default loginUrlMap;

// import Fetch from "../fetch";
// import { input } from "../../pages/login/input";

// const BASE = '/login'
// export const Login = (userInput: input) => {
//     const { userName, password } = userInput
//     return Fetch(BASE, {
//         method: "POST",
//         data: {
//             userName,
//             password
//         }
//     })

// }
