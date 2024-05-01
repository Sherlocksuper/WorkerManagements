import React, {useState} from 'react';
import {Modal, Form, Input, DatePicker, Select, Button, Upload} from 'antd';

const {Option} = Select;
const {RangePicker} = DatePicker;

interface IAddEmployeeModalProps {
    mode: "add" | "edit";
    initValue?: unknown
}

const AddEmployeeModal: React.FC<IAddEmployeeModalProps> = ({
                                                                mode,
                                                                initValue = 0
                                                            }) => {
    const [visible, setVisible] = useState(false);

    // 模态框的标题
    const title = mode === "add" ? "新增员工" : "编辑员工";

    // 模态框的可见性切换
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        // 在这里实现模态框确认提交的逻辑
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = (values: any) => {
        // 在这里实现表单提交的逻辑，比如向后端发送API请求
        console.log('Received values from form: ', values);
    };

    const usernameRules = [
        {required: true, message: '请输入用户名!'},
        {
            pattern: /^(?!.*\s).{2,20}$/,
            message: '用户名必须2-20字符，且不能包含空格!',
        },
        // 这里可以添加一个检查用户名是否重复的规则
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
                onOk={handleOk}
                onCancel={handleCancel}
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
                    >
                        <Input placeholder="请输入用户名，2-20字符，不可重复"/>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="员工姓名"
                        rules={nameRules}
                    >
                        <Input placeholder="请输入员工姓名，2-10个字"/>
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="性别"
                        rules={[{required: true, message: '请选择性别!'}]}
                    >
                        <Select placeholder="请选择">
                            <Option value="male">男</Option>
                            <Option value="female">女</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="position"
                        label="职位"
                        rules={[{required: true, message: '请选择职位!'}]}
                    >
                        <Select placeholder="请选择">
                            {/* 职位选项根据实际情况添加 */}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="joinDate"
                        label="入职日期"
                        rules={[{required: true, message: '请选择入职日期!'}]}
                    >
                        <RangePicker/>
                    </Form.Item>
                    <Form.Item
                        name="department"
                        label="归属部门"
                        rules={[{required: true, message: '请选择归属部门!'}]}
                    >
                        <Select placeholder="请选择">
                            {/* 部门选项根据实际情况添加 */}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="avatar"
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