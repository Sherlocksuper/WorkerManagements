import {Button, Form, Input, Space, Table} from "antd";
import AddModal from "./AddModal";
import {useEffect, useState} from "react";
import {deleteClass, getAllClass, IClass, IClassSearch} from "../../../api/class";
import useMessage from "antd/lib/message/useMessage";

const columns = [
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
            <div></div>
        )
    },
]

const ClassManage = () => {
    const [classData, setClassData] = useState<IClass[]>([])
    const [messageApi, contextHolder] = useMessage()

    const updateData = (searchData: IClassSearch) => {
        getAllClass(searchData).then(res => {
            res.data.forEach((item: IClass, index: number) => {
                Object.setPrototypeOf(item, {key: item.ID})
            })
            setClassData(res.data)
        })
    }

    useEffect(() => {
        updateData({})
    }, [])

    columns[columns.length - 1].render = (_: unknown, record: IClass) => (
        <Space size="middle">
            <AddModal mode={"edit"} initValue={record} updateData={() => {
                updateData({})
            }}/>
            <Button onClick={() => {
                onDelete(record.ID!)
            }}>删除</Button>
        </Space>
    )

    const onDelete = (id: number) => {
        if (!window.confirm("确定删除吗？")) return
        deleteClass({id: id}).then(res => {
            if (res.code == 1) {
                setClassData(classData.filter(item => item.ID !== id))
                messageApi.success("删除成功")
            } else {
                messageApi.error("删除失败")
            }
        })
    }

    return <div style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        padding: '20px',
    }}>
        {contextHolder}
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
        }}>
            <div>

                <Form onFinish={(values) => {
                    updateData(values)
                }}>
                    <Form.Item name="name">
                        <Input placeholder="请输入班级名称" style={{width: '200px', marginRight: '20px'}}/>
                    </Form.Item>
                    <Button type="primary" style={{marginBottom: '20px'}} htmlType="submit">查询班级</Button>
                </Form>

            </div>

            <AddModal mode={"add"} initValue={undefined} updateData={() => {
                updateData({})
            }}/>
        </div>
        <Table dataSource={classData} columns={columns} style={{
            width: '100%',
            height: '100%',
            overflow: 'auto',
        }}/>
    </div>
}

export default ClassManage