import exp from "constants";
import {APIS} from "./url";


export const Student: APIS = {
    addStudent: {
        path: '/student',
        method: 'POST',
    },
    // 删除学员
    deleteStudent: {
        path: '/student',
        method: 'DELETE',
    },
    // 编辑学员
    editStudent: {
        path: '/student',
        method: 'PUT',
    },
    // 批量删除学员
    deleteSelectedStudent: {
        path: '/student',
        method: 'DELETE',
    },
}

