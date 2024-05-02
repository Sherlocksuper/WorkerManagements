import {Gender, Job} from "../constants";
import {request} from "../utils/request";
import {Emp} from "../constants/Emp";
import {IDepart} from "./depart";

export interface IEmpSearch {
    name?: string;
    gender?: number
}

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
    dept: IDepart;
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

export const getAllEmp = async (searchData: IEmpSearch) => {
    return await request(Emp.queryAllEmp, searchData)
}

export const getEmpById = async (params: { id: number }) => {
    const url = Emp.queryEmp.path + `/${params.id}`
    const api = {...Emp.queryEmp}
    api.path = url
    return await request(api, params)
}