import React, {useEffect, useState} from 'react';
import {Table, Input, Button, Space, DatePicker, Form, Modal, Checkbox} from 'antd';
import {MinusCircleOutlined} from '@ant-design/icons';
import AddEmployeeModal from "./UpdateEmp";
import {deleteEmp, getAllEmp, IEmp} from "../../../api/emp";
import {getJobName} from "../../../constants";

const {RangePicker} = DatePicker;

const EmpManage: React.FC = () => {
    // 假设这是从后端获取的员工数据
    const [employees, setEmployees] = useState<IEmp[]>([]);
    const [selectedEmp, setSelectedEmp] = useState<IEmp[]>([])

    const updateData = () => {
        getAllEmp().then((res) => {
            res.data.forEach((item: IEmp, index: number) => {
                Object.setPrototypeOf(item, {key: item.ID})
            })
            setEmployees(res.data);
        });
    }

    useEffect(() => {
        updateData()
    }, []);

    // 搜索、新增、删除等函数的实现将依赖于具体的业务逻辑和后端API

    const handleSearch = (values: any) => {
        // 实现搜索逻辑
    };


    const handleDeleteSelected = () => {
        // 实现批量删除员工的逻辑
    };

    const columns = [
        {
            title: "选择",
            render: (_: unknown, record: IEmp) =>
                <Space>
                    <input type="checkbox" onChange={(event) => {
                        if (event.target.checked) {
                            setSelectedEmp([...selectedEmp, record])
                        } else {
                            setSelectedEmp(selectedEmp.filter(item => item.ID !== record.ID))
                        }
                    }}/>
                </Space>
        },
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
            render: (_: unknown, record: IEmp) => getJobName(record.job),
        },
        {
            title: '入职日期',
            dataIndex: 'CreatedAt',
            key: 'CreatedAt',
        },
        {
            title: '最后操作时间',
            dataIndex: 'UpdatedAt',
            key: 'UpdatedAt',
        },
        {
            title: '操作',
            key: 'operation',
            render: (_: unknown, record: IEmp) => (
                <Space>
                    <AddEmployeeModal mode={"edit"} initValue={record} updateData={updateData}/>
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

                <AddEmployeeModal mode={"add"} updateData={updateData}/>
                <Button type="dashed" icon={<MinusCircleOutlined/>} onClick={() => {
                    for (let i = 0; i < selectedEmp.length; i++) {
                        if (selectedEmp[i].ID) {
                            deleteEmp({id: selectedEmp[i].ID}).then((res) => {
                                if (res.code === 1) {
                                    setEmployees(employees.filter((item) => item.ID !== selectedEmp[i].ID))
                                }
                            })
                        }
                    }
                    updateData()
                }}>
                    批量删除
                </Button>
            </Form>
            <Table dataSource={employees} columns={columns} rowKey="key" style={{
                marginTop: '20px',
            }}/>
        </div>
    );
};

export default EmpManage;