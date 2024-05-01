import React, {useState} from 'react';
import {Table, Input, Button, Space, Select, DatePicker, Modal, Form} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';

const {Option} = Select;

const StudentManage: React.FC = () => {
    // 假设这是从后端获取的学员数据
    const [students, setStudents] = useState([
        {
            key: '1',
            name: '张三',
            studentId: 'A220505001',
            class: '2024第01期10班',
            gender: '男',
            phone: '1880909xxxx',
            degree: '本科',
            misconductCount: 1,
            misconductPoints: 5,
            lastOpTime: '2022-08-01 12:00:00',
        },
        // ...其他学员数据
    ]);

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
                    <Button type="primary">编辑</Button>
                    <Button danger>违纪</Button>
                    <Button danger>删除</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="student-management" style={{
            padding: '20px',
        }}>
            <Form layout="inline" onFinish={handleSearch}>
                <Form.Item label="学员姓名" name="name">
                    <Input placeholder="请输入学员姓名"/>
                </Form.Item>
                <Form.Item label="学号" name="studentId">
                    <Input placeholder="请输入学号"/>
                </Form.Item>

                <Form.Item label="所属班级" name="class">
                    <Select placeholder="请选择">
                        <Option value="2024第01期10班">2024第01期10班</Option>
                        {/* 其他班级选项 */}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                </Form.Item>

                <Button type="dashed" icon={<PlusOutlined/>} onClick={showAddModal}>
                    添加学员
                </Button>
                <Button type="primary" icon={<MinusCircleOutlined/>} onClick={handleDeleteSelected}>
                    批量删除
                </Button>
            </Form>
            <Table dataSource={students} columns={columns} rowKey="key" style={{
                marginTop: '20px',
            }}/>
            {/* 新增学员模态框 */}
            <Modal title="添加学员" visible={false} onCancel={handleAddCancel} footer={null}>
                {/* 新增学员表单内容 */}
            </Modal>
        </div>
    );
};

export default StudentManage;