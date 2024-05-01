import React, {useState} from 'react';
import {Modal, Form, Input, Button} from 'antd';

interface IAddDepartmentModalProps {
    mode: "add" | "edit";
    initValue?: unknown
}

const AddDepartmentModal: React.FC<IAddDepartmentModalProps> = ({
                                                                    mode,
                                                                    initValue = 0
                                                                }) => {
    const [visible, setVisible] = useState(false);

    // 模态框的标题
    const title = mode === "add" ? "新增部门" : "编辑部门";

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

    const departmentNameRules = [
        {required: true, message: '请输入部门名称!'},
        {
            pattern: /^(.{2,10})$/,
            message: '部门名称长度必须在2-10位之间!',
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
                        name="departmentName"
                        label="部门名称"
                        rules={departmentNameRules}
                    >
                        <Input placeholder="请输入部门名称，长度为2-10位"/>
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

export default AddDepartmentModal;