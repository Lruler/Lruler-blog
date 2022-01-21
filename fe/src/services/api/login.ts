import Fetch from "../fetch";
import { input } from "../../pages/login/input";

const BASE = '/login'
export const Login = (userInput: input) => {
    const { userName, password } = userInput
    return Fetch(BASE, {
        method: "POST",
        data: {
            userName,
            password
        }
    })
    
}