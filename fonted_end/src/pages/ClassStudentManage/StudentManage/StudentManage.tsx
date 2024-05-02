import React, {useEffect, useState} from 'react';
import {Table, Input, Button, Space, Form} from 'antd';
import UpdateStudent from "./UpdateStudent";
import {deleteStudent, getAllStudent, IStudent, IStudentSearch} from "../../../api/student";

const StudentManage: React.FC = () => {
    // 假设这是从后端获取的学员数据
    const [students, setStudents] = useState<IStudent[]>([]);
    const [selectedIds, setSelectedIds] = React.useState<number[]>([])

    const updateData = (searchData: IStudentSearch) => {
        getAllStudent(searchData).then((res) => {
            res.data.forEach((item: IStudent, index: number) => {
                Object.setPrototypeOf(item, {key: item.ID})
            })
            setStudents(res.data);
        });
    }

    useEffect(() => {
        updateData({})
    }, []);

    // 搜索、新增、删除等函数的实现将依赖于具体的业务逻辑和后端API
    const handleSearch = (values: any) => {
        updateData(values)
    };

    const columns = [
        {
            title: '选择',
            render: (_: unknown, record: IStudent) => (
                <Space>
                    <input type="checkbox" onChange={(event) => {
                        if (event.target.checked) {
                            setSelectedIds([...selectedIds, record.ID!])
                        } else {
                            setSelectedIds(selectedIds.filter(item => item !== record.ID))
                        }
                    }}/>
                </Space>
            ),
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '班级',
            dataIndex: 'class',
            key: 'class',
            render: (_: unknown, record: IStudent) => {
                if (record.class) {
                    return record.class.name
                } else {
                    return ""
                }
            }
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '最高学历',
            dataIndex: 'education',
            key: 'education',
        },
        {
            title: '违纪次数',
            dataIndex: 'recordTimes',
            key: 'recordTimes',
        },
        {
            title: '违纪扣分',
            dataIndex: 'recordScore',
            key: 'recordScore',
        },
        {
            title: '最后操作时间',
            dataIndex: 'UpdatedAt',
            key: '',
        },
        {
            title: '操作',
            key: 'operation',
            render: (_: unknown, record: IStudent) => (
                <Space>
                    <UpdateStudent mode="edit" initValue={record} updateData={() => {
                        updateData({})
                    }}/>
                    <Button danger>违纪</Button>
                    <Button danger
                            onClick={() => {
                                deleteStudent({id: record.ID!}).then((res) => {
                                    // eslint-disable-next-line eqeqeq
                                    if (res.code == 1) {
                                        setStudents(students.filter((item) => item.ID !== record.ID))
                                    }
                                })
                            }}
                    >删除</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="student-management" style={{
            padding: '20px',
            height: '100%',
            width: '100%',
        }}>
            <Form layout="inline" onFinish={(values) => handleSearch(values)}>
                <Form.Item label="学员姓名" name="name">
                    <Input placeholder="请输入学员姓名"/>
                </Form.Item>

                <Form.Item label="手机号" name="phone">
                    <Input placeholder="请输入手机号"/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                </Form.Item>
                <UpdateStudent mode={"add"} initValue={undefined} updateData={() => {
                    updateData({})
                }}/>
                <Button danger onClick={() => {
                    selectedIds.forEach((id) => {
                        deleteStudent({id}).then((res) => {
                            if (res.code == 1) {
                                setStudents(students.filter((item) => item.ID !== id))
                            }
                        })
                    })
                }}>批量删除</Button>
            </Form>
            <Table dataSource={students} columns={columns} rowKey="key" style={{
                marginTop: '20px',
            }}/>
        </div>
    );
};

export default StudentManage;