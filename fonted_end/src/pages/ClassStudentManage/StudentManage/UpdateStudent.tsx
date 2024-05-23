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

        const title = mode === "add" ? "新增订单" : "编辑订单";

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
                            label="订单名称"
                            rules={[{required: true, message: '请输入订单名称!'}]}
                            initialValue={initValue?.name}
                        >
                            <Input placeholder="请输入订单名称"/>
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="订单类别"
                            rules={[{required: true, message: '请选择订单类别!'}]}
                            initialValue={initValue?.gender}
                        >
                            <Select placeholder="请选择">
                                <Option value="1">零售</Option>
                                <Option value="2">批发</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="订单编号"
                            rules={[{required: true, message: '请输入订单编号!'}]}
                            initialValue={initValue?.phone}
                        >
                            <Input placeholder="请输入订单编号"/>
                        </Form.Item>
                        <Form.Item
                            name="value"
                            label="价格"
                            rules={[{required: true, message: '请输入价格!'}]}
                            initialValue={initValue?.education}
                        >
                            <Input placeholder="请输入价格"/>
                        </Form.Item>
                        <Form.Item
                            name="class"
                            label="所属仓库"
                            rules={[{required: true, message: '请选择所属仓库!'}]}
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