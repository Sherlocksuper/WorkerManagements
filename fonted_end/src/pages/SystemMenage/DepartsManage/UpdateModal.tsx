import React, {useState} from 'react';
import {Modal, Form, Input, Button} from 'antd';
import {IDepart, upgradeDepart} from "../../../api/depart";

interface IAddDepartmentModalProps {
    mode: "add" | "edit";
    initValue?: IDepart;
    updateData: Function
}

const AddDepartmentModal: React.FC<IAddDepartmentModalProps> = ({
                                                                    mode,
                                                                    initValue, updateData

                                                                }) => {
    const [visible, setVisible] = useState(false);

    // 模态框的标题
    const title = mode === "add" ? "新增客户" : "编辑客户";

    // 模态框的可见性切换
    const showModal = () => {
        setVisible(true);
    };

    const updateDepart = (newDepart: IDepart) => {
        upgradeDepart(newDepart).then((res) => {
            if (res.code === 1) {
                window.alert("更新成功！")
                setVisible(false);
                updateData()
            } else {
                window.alert("更新失败！")
            }
        })
    }

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = (values: any) => {
        updateDepart({
            ...initValue,
            name: values.name
        } as IDepart)
    };

    const departmentNameRules = [
        {required: true, message: '请输入供货商名称!'},
        {
            pattern: /^(.{2,10})$/,
            message: '供货商名称长度必须在2-10位之间!',
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
                >
                    <Form.Item
                        name="name"
                        label="供货商名称"
                        rules={departmentNameRules}
                        initialValue={initValue?.name}
                    >
                        <Input placeholder="请输入供货商，长度为2-10位"/>
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