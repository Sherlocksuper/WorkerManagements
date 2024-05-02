import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, Modal, Select, Upload} from 'antd';
import {Gender, getJobName} from "../../../constants";
import {IEmp, upgradeEmp} from "../../../api/emp";
import dayjs from "dayjs";
import {getAllDepart, IDepart} from "../../../api/depart";
import useMessage from "antd/lib/message/useMessage";

const {Option} = Select;

interface IAddEmployeeModalProps {
    mode: "add" | "edit";
    initValue?: IEmp;
    updateData: Function
}

const AddEmployeeModal: React.FC<IAddEmployeeModalProps> = ({
                                                                mode,
                                                                initValue,
                                                                updateData,
                                                            }) => {
    const [visible, setVisible] = useState(false);
    const [messageApi, messageLocation] = useMessage()
    const [departs, setDeparts] = useState([]);

    useEffect(() => {
        getAllDepart().then((res) => {
            res.data.forEach((item: IDepart, index: number) => {
                Object.setPrototypeOf(item, {key: item.ID})
            })
            setDeparts(res.data);
        });
    }, []);
    // 模态框的标题
    const title = mode === "add" ? "新增员工" : "编辑员工";

    const updateEmpo = (emp: IEmp) => {
        upgradeEmp(emp).then((res) => {
            if (res.code === 1) {
                messageApi.success("成功")
                handleCancel()
                updateData()
            } else {
                messageApi.error("失败")
            }
        })
    }

    // 模态框的可见性切换
    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = (values: any) => {
        console.log('Received values from form: ', values);
        updateEmpo({
            ...initValue,
            username: values.username,
            name: values.name,
            gender: Number(values.gender),
            job: Number(values.job),
            entryDate: values.entryDate,
            deptId: values.deptId,
            image: values.image ?? "123"
        } as IEmp)
    };

    const usernameRules = [
        {required: true, message: '请输入用户名!'},
        {
            pattern: /^(?!.*\s).{2,20}$/,
            message: '用户名必须2-20字符，且不能包含空格!',
        },
    ];

    const nameRules = [
        {required: true, message: '请输入员工姓名!'},
        {
            pattern: /^(?!.*\s).{2,10}$/,
            message: '员工姓名必须2-10个字，且不能包含空格!',
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                {title}
            </Button>
            <Modal
                title={title}
                open={visible}
                onCancel={handleCancel}
                cancelButtonProps={{style: {display: 'none'}}}
                okButtonProps={{style: {display: 'none'}, htmlType: 'submit'}}
            >
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    // 初始值可以在这里设置，如果需要的话
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={usernameRules}
                        initialValue={initValue?.username}
                    >
                        <Input placeholder="请输入用户名，2-20字符，不可重复"/>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="员工姓名"
                        rules={nameRules}
                        initialValue={initValue?.name}
                    >
                        <Input placeholder="请输入员工姓名，2-10个字"/>
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="性别"
                        rules={[{required: true, message: '请选择性别!'}]}
                        initialValue={initValue?.gender === Gender.FeMail ? "2" : "1"}
                    >
                        <Select placeholder="请选择" defaultValue={initValue?.gender === Gender.FeMail ? "2" : "1"}>
                            <Option value="1">男</Option>
                            <Option value="2">女</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="job"
                        label="职位"
                        rules={[{required: true, message: '请选择职位!'}]}
                        initialValue={initValue?.job ?? "1"}
                    >
                        <Select placeholder="请选择" defaultValue={initValue?.job ?? "1"}>
                            <Option value="1">班主任</Option>
                            <Option value="2">讲师</Option>
                            <Option value="3">院长</Option>
                            <Option value="4">研究员</Option>
                            <Option value="5">辅导员</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="entryDate"
                        label="入职日期"
                        rules={[{required: true, message: '请选择入职日期!'}]}
                        initialValue={dayjs(initValue?.entryDate)}
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item
                        name="deptId"
                        label="归属部门"
                        rules={[{required: true, message: '请选择归属部门!'}]}
                        initialValue={initValue?.dept.name}
                    >
                        <Select placeholder="请选择">
                            {
                                departs.map((depart: IDepart) =>
                                    <Option value={depart.ID}>{depart.name}</Option>
                                )
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="图像"
                        valuePropName="fileList"
                        getValueFromEvent={(event, prevFileList) => prevFileList}
                    >
                        <Upload>
                            <Button icon={<Upload/>}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                        <Button htmlType="button" onClick={handleCancel}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddEmployeeModal;