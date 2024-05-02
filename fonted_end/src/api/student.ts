import {Student} from "../constants/Student";
import {request} from "../utils/request";
import {IClass} from "./class";

export interface IStudent {
    ID?: number;
    name: string;
    classId: string;
    gender: string;
    phone: string;
    education: string;
    recordTimes: number;
    recordScore?: number;
    class?: IClass;
}

export const upgradeStudent = async (params: IStudent) => {
    return await request(Student.upgradeStudent, params)
}


export const deleteStudent = async (params: { id: number }) => {
    const url = Student.deleteStudent.path + `/${params.id}`
    const api = {...Student.deleteStudent}
    api.path = url
    return await request(api)
}

export const getAllStudent = async () => {
    return await request(Student.queryAllStudent)
}

export const getStudentById = async (params: { id: number }) => {
    const url = Student.queryStudent.path + `/${params.id}`
    const api = {...Student.queryStudent}
    api.path = url
    return await request(api, params)
}


