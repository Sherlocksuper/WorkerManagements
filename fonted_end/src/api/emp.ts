import {Gender, Job} from "../constants";
import {request} from "../utils/request";
import {Emp} from "../constants/Emp";

export interface IEmp {
    ID: number;
    username: string;
    name: string;
    password: string;
    entryDate: string;
    gender: Gender;
    image: string;
    job: Job;
    deptId: number;
}

export const upgradeEmp = async (params: IEmp) => {
    return await request(Emp.upgradeEmp, params)
}

export const deleteEmp = async (params: { id: number }) => {
    const url = Emp.deleteEmp.path + `/${params.id}`
    const api = {...Emp.deleteEmp}
    api.path = url
    return await request(api, params)
}

export const getAllEmp = async () => {
    return await request(Emp.queryAllEmp)
}

export const getEmpById = async (params: { id: number }) => {
    const url = Emp.queryEmp.path + `/${params.id}`
    const api = {...Emp.queryEmp}
    api.path = url
    return await request(api, params)
}