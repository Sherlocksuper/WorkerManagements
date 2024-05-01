import React from 'react';
import {Table, Input, Button, Space, DatePicker, Form, Modal} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';

const {RangePicker} = DatePicker;

const EmpManage: React.FC = () => {
    // 假设这是从后端获取的员工数据
    const employees = [
        {
            key: '1',
            name: '赵敏',
            gender: '女',
            position: '班主任',
            joinDate: '2008-12-18',
            lastOpTime: '2022-07-22 12:05:20',
        },
        // ...其他员工数据
    ];

    // 搜索、新增、删除等函数的实现将依赖于具体的业务逻辑和后端API

    const handleSearch = (values: any) => {
        // 实现搜索逻辑
    };

    const showAddModal = () => {
        // 实现打开新增员工模态框的逻辑
    };

    const handleAddCancel = () => {
        // 实现取消新增员工的逻辑
    };

    const handleDeleteSelected = () => {
        // 实现批量删除员工的逻辑
    };

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: '职位',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: '入职日期',
            dataIndex: 'joinDate',
            key: 'joinDate',
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
                    <Button danger>删除</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="employee-management" style={{
            width: '100%',
            height: '100%',
            padding: '20px',
        }}>
            <Form layout="inline" onFinish={handleSearch}>
                <Form.Item label="姓名" name="name">
                    <Input placeholder="请输入员工姓名"/>
                </Form.Item>
                <Form.Item label="性别" name="gender">
                    <Input placeholder="请选择"/>
                </Form.Item>
                <Form.Item label="入职时间" name="joinDate">
                    <RangePicker/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                </Form.Item>
                <Button type="dashed" icon={<PlusOutlined/>} onClick={showAddModal}>
                    新增员工
                </Button>
                <Button type="dashed" icon={<MinusCircleOutlined/>} onClick={handleDeleteSelected}>
                    批量删除
                </Button>
            </Form>
            <Table dataSource={employees} columns={columns} rowKey="key" style={{
                marginTop: '20px',
            }}/>
            {/* 新增员工模态框 */}
            <Modal title="新增员工" open={false} onCancel={handleAddCancel} footer={null}>
                {/* 新增员工表单内容 */}
            </Modal>
        </div>
    );
};

export default EmpManage;