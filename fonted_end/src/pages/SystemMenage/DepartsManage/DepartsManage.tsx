//序号
//
//
// 部门名称
//
//
// 最后操作时间
//
//
// 操作

import {Button, Space, Table} from "antd";
import React, {useEffect} from "react";
import AddDepartmentModal from "./UpdateModal";
import {getAllDepart, IDepart} from "../../../api/depart";
import {getAllEmp} from "../../../api/emp";
import {IClass} from "../../../api/class";


const columns = [
    {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: '部门名称',
        dataIndex: 'departmentName',
        key: 'departmentName',
    },
    {
        title: '最后操作时间',
        dataIndex: 'lastOperationTime',
        key: 'lastOperationTime',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (_: unknown, record: IDepart) => (
            <Space>
                <AddDepartmentModal mode="edit" initValue={record}/>
                <Button type="primary" danger>删除</Button>
            </Space>
        ),
    },
];

const DepartsManage: React.FC = () => {

    const [departs, setDeparts] = React.useState<IDepart[]>([])

    useEffect(() => {
        // 这里调用后端API获取部门数据
        getAllDepart().then(res => {
            console.log(res.data)
            res.data.forEach((item: IDepart, index: number) => {
                Object.setPrototypeOf(item, {key: item.ID})
            })
            setDeparts(res.data)
        })
    }, [])


    return (
        <div style={{
            width: "100%",
            height: "100%",
            padding: "20px"
        }}>
            <div>
                <AddDepartmentModal mode={"add"} initValue={0}/>
            </div>
            <Table dataSource={departs} columns={columns} style={{
                width: '100%',
                height: '100%',
                overflow: 'auto',
                marginTop: '20px'
            }}/>
        </div>
    )
}

export default DepartsManage