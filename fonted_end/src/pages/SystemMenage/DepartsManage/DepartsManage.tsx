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
import {deleteDepart, getAllDepart, IDepart} from "../../../api/depart";

const DepartsManage: React.FC = () => {

    const [departs, setDeparts] = React.useState<IDepart[]>([])

    const columns = [

        {
            title: '序号',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: '部门名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '最后操作时间',
            dataIndex: 'UpdatedAt',
            key: 'UpdatedAt',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (_: unknown, record: IDepart) => (
                <Space>
                    <AddDepartmentModal mode="edit" initValue={record} updateData={updateData}/>
                    <Button type="primary" danger onClick={() => {
                        deleteDepart({id: record.ID}).then(res => {
                            if (res.code === 1) {
                                window.alert("删除成功！")
                                setDeparts(departs.filter(item => item.ID !== record.ID))
                            } else {
                                window.alert("删除失败！")
                            }
                        })
                    }}>删除</Button>
                </Space>
            ),
        },
    ];

    const updateData = () => {
        getAllDepart().then(res => {
            console.log(res.data)
            res.data.forEach((item: IDepart, index: number) => {
                Object.setPrototypeOf(item, {key: item.ID})
            })
            setDeparts(res.data)
        })
    }

    useEffect(() => {
        updateData()
    }, [])

    return (
        <div style={{
            width: "100%",
            height: "100%",
            padding: "20px"
        }}>
            <div>
                <AddDepartmentModal mode={"add"} initValue={undefined} updateData={updateData}/>
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