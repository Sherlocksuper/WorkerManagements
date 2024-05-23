import React, {useEffect, useState} from 'react';
import {Table, Input, Button, Space, DatePicker, Form, Modal, Checkbox, Select} from 'antd';
import {MinusCircleOutlined} from '@ant-design/icons';
import AddEmployeeModal from "./UpdateEmp";
import {deleteEmp, getAllEmp, IEmp, IEmpSearch} from "../../../api/emp";
import {getJobName} from "../../../constants";
import {Option} from "antd/es/mentions";
import updateEmp from "./UpdateEmp";

const {RangePicker} = DatePicker;

const EmpManage: React.FC = () => {
    // 假设这是从后端获取的员工数据
    const [employees, setEmployees] = useState<IEmp[]>([]);
    const [selectedEmp, setSelectedEmp] = useState<IEmp[]>([])

    const updateData = (searchData: IEmpSearch) => {
        getAllEmp(searchData).then((res) => {
            res.data.forEach((item: IEmp, index: number) => {
                Object.setPrototypeOf(item, {key: item.ID})
            })
            setEmployees(res.data);
        });
    }

    useEffect(() => {
        updateData({})
    }, []);

    // 搜索、新增、删除等函数的实现将依赖于具体的业务逻辑和后端API
    const handleSearch = (values: any) => {
        updateData({
            name: values.name,
            gender: Number(values.gender)
        })
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
            title: '客户姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '交易种类',
            dataIndex: 'gender',
            key: 'gender',
            render: (data: number) => {
                if (data === 1) {
                    return "零售"
                } else {
                    return "批发"
                }
            }
        },
        {
            title: '购买物品',
            dataIndex: 'position',
            key: 'position',
            render: (_: unknown, record: IEmp) => getJobName(record.job),
        },
        {
            title: '交易日期',
            dataIndex: 'CreatedAt',
            key: 'CreatedAt',
        },
        {
            title: '最近更新日期',
            dataIndex: 'UpdatedAt',
            key: 'UpdatedAt',
        },
        {
            title: '操作',
            key: 'operation',
            render: (_: unknown, record: IEmp) => (
                <Space>
                    <AddEmployeeModal mode={"edit"} initValue={record} updateData={updateData}/>
                    <Button danger onClick={() => {
                        deleteEmp({id: record.ID}).then((res) => {
                            if (res.code === 1) {
                                setEmployees(employees.filter((item) => item.ID !== record.ID))
                            }
                        })
                    }}>删除</Button>
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
                <Form.Item label="客户" name="name">
                    <Input placeholder="请输入客户姓名"/>
                </Form.Item>
                <Form.Item label="交易种类" name="gender">
                    <Select>
                        <Option value="1">零售</Option>
                        <Option value="2">批发</Option>
                    </Select>
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
                    updateData({})
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