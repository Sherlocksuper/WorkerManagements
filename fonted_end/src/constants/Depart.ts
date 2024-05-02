export const Depart = {
    upgradeDepart: {
        path: '/depart/update',
        method: 'POST',
    },
    // 删除部门
    deleteDepart: {
        path: '/depart/remove',
        method: 'GET',
    },
    //查询id
    queryDepart: {
        path: '/depart/findbyid',
        method: 'GET',
    },

    // 查询全部
    queryAllDepart: {
        path: '/depart/findall',
        method: 'GET',
    },
}