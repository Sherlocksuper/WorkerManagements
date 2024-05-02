import React, {useState} from 'react';
import {Modal, Form, Input, DatePicker, Select, Button} from 'antd';
import {IClass, updateClass} from "../../../api/class";
import {randomUUID} from "crypto";
import useMessage from "antd/lib/message/useMessage";
import dayjs from "dayjs";

const {Option} = Select;
const {RangePicker} = DatePicker;

interface IAddClassModalProps {
    mode: "add" | "edit";
    initValue?: IClass;
    updateData: () => void;
}

const AddClassModal: React.FC<IAddClassModalProps> = ({
                                                          mode,
                                                          initValue,
                                                          updateData
                                                      }) => {
    const [visible, setVisible] = useState(false);
    const [key, setKey] = useState<string>("");
    const [messageApi, contextHolder] = useMessage()

    // 模态框的标题
    const title = mode === "add" ? "新增班级" : "编辑班级";

    const createClass = (newClass: IClass) => {
        updateClass(newClass).then(response => {
            if (response.code === 1) {
                messageApi.success("添加成功")
                handleCancel();
                updateData()
            } else {
                messageApi.error("添加失败")
            }
        })
    }

    // 模态框的可见性切换
    const showModal = () => {
        setKey(Date.now().toString())
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>{title}</Button>
            {contextHolder}
            <Modal
                title={title}
                open={visible}
                onCancel={handleCancel}
                cancelButtonProps={{style: {display: 'none'}}}
                okButtonProps={{style: {display: 'none'}, htmlType: 'submit'}}
                key={key}
            >
                <Form
                    layout="vertical"
                    onFinish={(values) => {
                        console.log(values.startTime.toString())
                        createClass({
                            ...initValue,
                            ID: initValue?.ID,
                            name: values.name,
                            room: values.room,
                            startTime: values.startTime.format("YYYY-MM-DD"),
                            endTime: values.startTime.format("YYYY-MM-DD"),
                            headTeacher: values.headTeacher,
                        })
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
                        rules={[{required: true, message: '请选择开课时间!'}]}
                        initialValue={dayjs(initValue?.startTime)}
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item
                        label="结课时间"
                        name="endTime"
                        rules={[{required: true, message: '请选择结课时间!'}]}
                        initialValue={dayjs(initValue?.endTime)}
                    >
                        <DatePicker/>
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