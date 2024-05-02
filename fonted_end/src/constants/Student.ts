import exp from "constants";
import {APIS} from "./url";


export const Student = {
    upgradeStudent: {
        path: '/student/upgrade',
        method: 'POST',
    },
    // 删除学员
    deleteStudent: {
        path: '/student/delete',
        method: 'GET',
    },
    //查询id
    queryStudent: {
        path: '/student/findbyid',
        method: 'GET',
    },

    // 查询全部
    queryAllStudent: {
        path: '/student/findall',
        method: 'GET',
    },
}

