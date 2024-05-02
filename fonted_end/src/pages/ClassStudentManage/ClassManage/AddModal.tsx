import React, {useState} from 'react';
import {Modal, Form, Input, DatePicker, Select, Button} from 'antd';
import {IClass, updateClass} from "../../../api/class";
import {randomUUID} from "crypto";

const {Option} = Select;
const {RangePicker} = DatePicker;

interface IAddClassModalProps {
    mode: "add" | "edit";
    initValue?: IClass
}

const AddClassModal: React.FC<IAddClassModalProps> = ({
                                                          mode,
                                                          initValue
                                                      }) => {

    const [visible, setVisible] = useState(false);
    const [key, setKey] = useState<string>("");

    // 模态框的标题
    const title = mode === "add" ? "新增班级" : "编辑班级";

    const createClass = () => {
        updateClass({
            ID: 0,
            name: '2024第01期10班',
            room: '教室A',
            startTime: '2024-01-01',
            endTime: '2024-06-01',
            headTeacher: '老师A'
        }).then(response => {
            console.log(response.code)
        })
    }

    // 模态框的可见性切换
    const showModal = () => {
        setKey(Date.now().toString())
        setVisible(true);
    };

    const handleOk = () => {
        // 在这里实现模态框确认提交的逻辑
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>{title}</Button>

            <Modal
                title={title}
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelButtonProps={{style: {display: 'none'}}}
                okButtonProps={{style: {display: 'none'}, htmlType: 'submit'}}
                key={key}
            >
                <Form
                    layout="vertical"
                    // 在这里添加表单的onFinish处理函数
                    onFinish={(values) => {
                        console.log(values);
                    }}
                >
                    <Form.Item
                        label="班级名称"
                        name="name"
                        initialValue={initValue?.name}
                        rules={[{required: true, message: '请输入班级名称!'}]}
                    >
                        <Input placeholder="请输入班级名称，如：2024第01期10班"/>
                    </Form.Item>
                    <Form.Item
                        label="班级教室"
                        name="room"
                        initialValue={initValue?.room}
                        rules={[{required: true, message: '请填写班级教室!'}]}
                    >
                        <Input placeholder="请填写班级教室"/>
                    </Form.Item>
                    <Form.Item
                        label="开课时间"
                        name="startTime"
                        initialValue={initValue?.startTime}
                        rules={[{required: true, message: '请选择开课时间!'}]}
                    >
                        <RangePicker/>
                    </Form.Item>
                    <Form.Item
                        label="结课时间"
                        name="endTime"
                        initialValue={initValue?.endTime}
                        rules={[{required: true, message: '请选择结课时间!'}]}
                    >
                        <RangePicker/>
                    </Form.Item>
                    <Form.Item
                        label="班主任"
                        name="headTeacher"
                        initialValue={initValue?.headTeacher}
                        rules={[{required: true, message: '请选择班主任!'}]}
                    >
                        <Select placeholder="请选择">
                            <Option value="teacher1">老师A</Option>
                            <Option value="teacher2">老师B</Option>
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

export default AddClassModal;