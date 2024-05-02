import React, {useEffect, useState} from 'react';
import {Modal, Form, Input, Select, Button} from 'antd';
import {IStudent, upgradeStudent} from "../../../api/student";
import useMessage from "antd/lib/message/useMessage";
import {getAllClass, IClass, updateClass} from "../../../api/class";

const {Option} = Select;

interface IAddStudentModalProps {
    mode: "add" | "edit";
    initValue?: IStudent;
    updateData: () => void
}

const AddStudentModal: React.FC<IAddStudentModalProps> = ({
                                                              mode,
                                                              initValue,
                                                              updateData
                                                          }) => {

        const [visible, setVisible] = useState(false);
        const [messageApi, messageHolder] = useMessage();
        const [classes, setClasses] = useState<IClass[]>([]);

        useEffect(() => {
            getAllClass({}).then((res) => {
                setClasses(res.data)
            })
        }, [])

        const title = mode === "add" ? "新增学员" : "编辑学员";

        const updateStudent = (params: IStudent) => {
            // 在这里实现学员信息更新的逻辑
            upgradeStudent(params).then((res) => {
                if (res.code === 1) {
                    messageApi.success("更新成功");
                    setVisible(false)
                    updateData()
                } else {
                    messageApi.error("更新失败");
                }
            });
        }

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


        return (
            <div>
                <Button type="primary" onClick={showModal}>
                    {title}
                </Button>
                {messageHolder}
                <Modal
                    title={title}
                    open={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    cancelButtonProps={{style: {display: 'none'}}}
                    okButtonProps={{style: {display: 'none'}, htmlType: 'submit'}}
                >
                    <Form
                        layout="vertical"
                        onFinish={(values) => {
                            updateStudent({
                                ...initValue,
                                name: values.name,
                                gender: values.gender,
                                phone: values.phone,
                                classId: values.class,
                                education: values.education,
                            } as IStudent)
                        }}
                    >
                        <Form.Item
                            name="name"
                            label="姓名"
                            rules={[{required: true, message: '请输入姓名!'}]}
                            initialValue={initValue?.name}
                        >
                            <Input placeholder="请输入姓名"/>
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="性别"
                            rules={[{required: true, message: '请选择性别!'}]}
                            initialValue={initValue?.gender}
                        >
                            <Select placeholder="请选择">
                                <Option value="1">男</Option>
                                <Option value="2">女</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="手机号"
                            rules={[{required: true, message: '请输入手机号!'}]}
                            initialValue={initValue?.phone}
                        >
                            <Input placeholder="请输入手机号"/>
                        </Form.Item>
                        <Form.Item
                            name="education"
                            label="最高学历"
                            rules={[{required: true, message: '请选择最高学历!'}]}
                            initialValue={initValue?.education}
                        >
                            <Select placeholder="请选择">
                                <Option value="highschool">高中</Option>
                                <Option value="associate">大专</Option>
                                <Option value="bachelor">本科</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="class"
                            label="所属班级"
                            rules={[{required: true, message: '请选择所属班级!'}]}
                            initialValue={initValue?.class}
                        >
                            <Select placeholder="请选择">
                                {
                                    classes.map((item: IClass) => <Option value={item.ID!}>{item.name}</Option>
                                    )
                                }
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
    }
;

export default AddStudentModal;