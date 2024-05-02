import exp from "constants";
import {Student} from "./Student";

export interface API {
    path: string;
    method: string;
}

export interface APIS {
    [key: string]: API;
}
