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
import React from "react";

interface DataType {
    key: string;
    departmentName: string;
    lastOperationTime: string;
}

const dataSource: DataType[] = [
    {
        key: '1',
        departmentName: '市场部',
        lastOperationTime: '2021-09-01',
    },
    {
        key: '2',
        departmentName: '研发部',
        lastOperationTime: '2021-09-01',
    },
    {
        key: '3',
        departmentName: '人事部',
        lastOperationTime: '2021-09-01',
    },
];

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
        render: (_: unknown, record: DataType) => (
            <Space>
                <Button type="primary">编辑</Button>
                <Button type="primary" danger>删除</Button>
            </Space>
        ),
    },
];

const DepartsManage: React.FC = () => {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            padding: "20px"
        }}>
            <div>
                <Button type="primary">新增部门</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} style={{
                width: '100%',
                height: '100%',
                overflow: 'auto',
            }}/>
        </div>
    )
}

export default DepartsManage