import {request} from "../utils/request";
import {Class} from "../constants/Class";

export interface IClassSearch {
    name?: string;
}

export interface IClass {
    ID?: number;
    name: string;
    room: string;
    startTime: string;
    endTime: string;
    headTeacher: string;
}

export const updateClass = async (params: IClass) => {
    return await request(Class.upgradeClass, params)
}


export const deleteClass = async (params: { id: number }) => {
    const url = Class.deleteClass.path + `/${params.id}`
    const api = {...Class.deleteClass}
    api.path = url
    return await request(api)
}

export const getAllClass = async (searchData: IClassSearch) => {
    return await request(Class.queryAllClass, searchData)
}

export const getClassById = async (params: { id: number }) => {
    const url = Class.queryClass.path + `/${params.id}`
    const api = {...Class.queryClass}
    api.path = url
    return await request(api, params)
}