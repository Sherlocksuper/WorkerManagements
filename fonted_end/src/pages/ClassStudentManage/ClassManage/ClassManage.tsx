import {Button, Input, Space, Table} from "antd";
import AddModal from "./AddModal";
import {useEffect, useState} from "react";
import {getAllClass, IClass} from "../../../api/class";

const columns = [
    //key
    {
        title: '序号',
        dataIndex: 'ID',
        key: 'ID',
    },
    {
        title: '班级名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '班级教室',
        dataIndex: 'room',
        key: 'room',
    },
    {
        title: '开课时间',
        dataIndex: 'startTime',
        key: 'startTime',
    },
    {
        title: '结课时间',
        dataIndex: 'endTime',
        key: 'endTime',
    },
    {
        title: '班主任',
        dataIndex: 'headTeacher',
        key: 'headTeacher',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (_: unknown, record: IClass) => (
            <Space size="middle">
                <AddModal mode={"edit"} initValue={record}/>
                <Button>删除</Button>
            </Space>
        ),
    },
]

const ClassManage = () => {
    const [classData, setClassData] = useState<IClass[]>([])

    useEffect(() => {
        getAllClass().then(res => {
            res.data.forEach((item: IClass, index: number) => {
                Object.setPrototypeOf(item, {key: item.ID})
            })
            setClassData(res.data)
        })
    }, [])

    return <div style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        padding: '20px',
    }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
        }}>
            <div>
                <Input placeholder="请输入班级名称" style={{width: '200px', marginRight: '20px'}}/>
                <Button type="primary" style={{marginBottom: '20px'}}>查询班级</Button>
            </div>

            <AddModal mode={"add"} initValue={undefined}/>
        </div>
        <Table dataSource={classData} columns={columns} style={{
            width: '100%',
            height: '100%',
            overflow: 'auto',
        }}/>
    </div>
}

export default ClassManage