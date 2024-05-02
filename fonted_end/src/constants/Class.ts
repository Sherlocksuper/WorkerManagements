import exp from "constants";

export default 1

export const Class = {
    upgradeClass: {
        path: '/class/upgrade',
        method: 'POST',
    },
    // 删除班级
    deleteClass: {
        path: '/class/delete',
        method: 'GET',
    },
    //查询id
    queryClass: {
        path: '/class/findbyid',
        method: 'GET',
    },

    // 查询全部
    queryAllClass: {
        path: '/class/findall',
        method: 'GET',
    },
}