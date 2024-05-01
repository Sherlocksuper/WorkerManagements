import React, {useState} from 'react';
import {Modal, Form, Input, Select, Button} from 'antd';

const {Option} = Select;

interface IAddStudentModalProps {
    mode: "add" | "edit";
    initValue?: number
}

const AddStudentModal: React.FC<IAddStudentModalProps> = ({
                                                              mode,
                                                              initValue = 0
                                                          }) => {
    const [visible, setVisible] = useState(false);

    // 模态框的标题
    const title = mode === "add" ? "新增学员" : "编辑学员";

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
                        name="name"
                        label="姓名"
                        rules={[{required: true, message: '请输入姓名!'}]}
                    >
                        <Input placeholder="请输入姓名"/>
                    </Form.Item>
                    <Form.Item
                        name="studentId"
                        label="学号"
                        rules={[{required: true, message: '请输入学号!'}]}
                    >
                        <Input placeholder="请输入学号"/>
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
                        name="phone"
                        label="手机号"
                        rules={[{required: true, message: '请输入手机号!'}]}
                    >
                        <Input placeholder="请输入手机号"/>
                    </Form.Item>
                    <Form.Item
                        name="education"
                        label="最高学历"
                        rules={[{required: true, message: '请选择最高学历!'}]}
                    >
                        <Select placeholder="请选择">
                            <Option value="highschool">高中</Option>
                            <Option value="associate">大专</Option>
                            <Option value="bachelor">本科</Option>
                            {/* 根据实际情况添加更多学历选项 */}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="class"
                        label="所属班级"
                        rules={[{required: true, message: '请选择所属班级!'}]}
                    >
                        <Select placeholder="请选择">
                            <Option value="class1">班级1</Option>
                            <Option value="class2">班级2</Option>
                            {/* 根据实际情况添加更多班级选项 */}
                        </Select>
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

export default AddStudentModal;