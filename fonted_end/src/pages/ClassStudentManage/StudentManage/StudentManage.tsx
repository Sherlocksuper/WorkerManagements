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
            title: '订单名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '所属仓库',
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
            title: '订单类别',
            dataIndex: 'gender',
            key: 'gender',
            render: (data: string, record: IStudent) => {
                return data === "0" ? "零售" : "批发"
            }
        },
        {
            title: '订单编号',
            dataIndex: 'phone',
            key: 'phone',
        },
        // {
        //     title: '最高学历',
        //     dataIndex: 'education',
        //     key: 'education',
        // },
        {
            title: '订单价格',
            dataIndex: 'recordTimes',
            key: 'recordTimes',
            render: (data: number, record: IStudent) => {
                return 100
            }
        },
        // {
        //     title: '违纪扣分',
        //     dataIndex: 'recordScore',
        //     key: 'recordScore',
        // },
        {
            title: '订单修改时间',
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
                <Form.Item label="订单" name="name">
                    <Input placeholder="请输入订单名称"/>
                </Form.Item>

                <Form.Item label="订单编号" name="phone">
                    <Input placeholder="订单编号"/>
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