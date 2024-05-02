import React, {useEffect, useState} from 'react';
import {Table, Input, Button, Space, Select, Modal, Form} from 'antd';
import UpdateStudent from "./UpdateStudent";
import {getAllStudent, IStudent} from "../../../api/student";
import {IClass} from "../../../api/class";

const {Option} = Select;

const StudentManage: React.FC = () => {
    // 假设这是从后端获取的学员数据
    const [students, setStudents] = useState<IStudent[]>([]);

    useEffect(() => {
        // 在这里获取学员数据
        getAllStudent().then((res) => {
            res.data.forEach((item: IStudent, index: number) => {
                Object.setPrototypeOf(item, {key: item.ID})
            })
            setStudents(res.data);
        });
    }, []);

    // 搜索、新增、删除等函数的实现将依赖于具体的业务逻辑和后端API

    const handleSearch = (values: any) => {
        // 实现搜索逻辑
    };

    const showAddModal = () => {
        // 实现打开新增学员模态框的逻辑
    };

    const handleAddCancel = () => {
        // 实现取消新增学员的逻辑
    };

    const handleDeleteSelected = () => {
        // 实现批量删除学员的逻辑
    };

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '学号',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: '班级',
            dataIndex: 'class',
            key: 'class',
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
            dataIndex: 'degree',
            key: 'degree',
        },
        {
            title: '违纪次数',
            dataIndex: 'misconductCount',
            key: 'misconductCount',
        },
        {
            title: '违纪扣分',
            dataIndex: 'misconductPoints',
            key: 'misconductPoints',
        },
        {
            title: '最后操作时间',
            dataIndex: 'lastOpTime',
            key: 'lastOpTime',
        },
        {
            title: '操作',
            key: 'operation',
            render: (_: unknown, record: unknown) => (
                <Space>
                    <UpdateStudent mode="edit" initValue={0}/>
                    <Button danger>违纪</Button>
                    <Button danger>删除</Button>
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
            <Form layout="inline" onFinish={handleSearch}>
                <Form.Item label="学员姓名" name="name">
                    <Input placeholder="请输入学员姓名"/>
                </Form.Item>
                <Form.Item label="学号" name="studentId">
                    <Input placeholder="请输入学号"/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                </Form.Item>

                <UpdateStudent mode={"add"} initValue={0}/>
            </Form>
            <Table dataSource={students} columns={columns} rowKey="key" style={{
                marginTop: '20px',
            }}/>
            {/* 新增学员模态框 */}
            <Modal title="添加学员" open={false} onCancel={handleAddCancel} footer={null}>
                {/* 新增学员表单内容 */}
            </Modal>
        </div>
    );
};

export default StudentManage;