import {Depart} from "../constants/Depart";
import {request} from "../utils/request";

export interface IDepart {
    ID: number;
    name: string;
}

export const upgradeDepart = async (params: IDepart) => {
    return request(Depart.upgradeDepart, params);
}


export const deleteDepart = async (params: { id: number }) => {
    const url = Depart.deleteDepart.path + `/${params.id}`
    const api = {...Depart.deleteDepart}
    api.path = url
    return await request(api, params)
}

export const getAllDepart = async () => {
    return await request(Depart.queryAllDepart)
}

export const getDepartById = async (params: { id: number }) => {
    const url = Depart.queryDepart.path + `/${params.id}`
    const api = {...Depart.queryDepart}
    api.path = url
    return await request(api, params)
}

