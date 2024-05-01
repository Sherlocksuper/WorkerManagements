import {Button, Input, Space, Table} from "antd";

//序号
// 班级名称
// 班级教室
// 开课时间
// 结课时间
// 班主任
// 操作

interface DataType {
    key: string;
    className: string;
    classRoom: string;
    startTime: string;
    endTime: string;
    headTeacher: string;
}

const dataSource: DataType[] = [
    {
        key: '1',
        className: '初一一班',
        classRoom: '101',
        startTime: '2021-09-01',
        endTime: '2022-06-30',
        headTeacher: '张三',
    },
    {
        key: '2',
        className: '初一二班',
        classRoom: '102',
        startTime: '2021-09-01',
        endTime: '2022-06-30',
        headTeacher: '李四',
    },
    {
        key: '3',
        className: '初一三班',
        classRoom: '103',
        startTime: '2021-09-01',
        endTime: '2022-06-30',
        headTeacher: '王五',
    },
];

const columns = [
    {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: '班级名称',
        dataIndex: 'className',
        key: 'className',
    },
    {
        title: '班级教室',
        dataIndex: 'classRoom',
        key: 'classRoom',
    },
    {
        title: '开课时间',
        dataIndex: 'startTime',
        key: 'startTime',
    },
    {
        title: '结课时间',
        dataIndex: 'endTime',
        key: 'endTime',
    },
    {
        title: '班主任',
        dataIndex: 'headTeacher',
        key: 'headTeacher',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (_: unknown, record: DataType) => (
            <Space size="middle">
                <Button>编辑</Button>
                <Button>删除</Button>
            </Space>
        ),
    },
]

const ClassManage = () => {
    return <div style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        padding: '20px',
    }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
        }}>
            <div>
                <Input placeholder="请输入班级名称" style={{width: '200px', marginRight: '20px'}}/>
                <Button type="primary" style={{marginBottom: '20px'}}>查询班级</Button>
            </div>

            <Button type="primary" style={{marginBottom: '20px'}}>新增班级</Button>
        </div>
        <Table dataSource={dataSource} columns={columns} style={{
            width: '100%',
            height: '100%',
            overflow: 'auto',
        }}/>
    </div>
}

export default ClassManage