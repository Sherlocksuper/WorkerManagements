import React from 'react';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {useLocation, useNavigate, useNavigation} from "react-router";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'sub1',
        label: '班级学员管理',
        type: 'group',
        children: [
            {
                key: '/classManage',
                label: '班级管理',
            },
            {
                key: '/studentManage',
                label: '学员管理',
            },
        ],
    },
    {
        key: 'sub2',
        label: '系统信息管理',
        type: 'group',
        children: [
            {
                key: '/departsManage',
                label: '部门管理',
            },
            {
                key: '/empManage',
                label: '员工管理',
            },
        ],
    },
    {
        key: 'sub3',
        label: '数据统计管理',
        type: 'group',
        children: [
            {
                key: '/empStatistics',
                label: '员工信息统计',
            },
        ],
    },
];

const MyMenu: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const onClick: MenuProps['onClick'] = (e) => {
        console.log("key:" + e.key)
        console.log(location.pathname)
        navigate(e.key, {replace: true});
    };


    return (
        <Menu
            onClick={onClick}
            style={{width: 256, height: '100vh'}}
            defaultSelectedKeys={['/classManage']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
            selectedKeys={[location.pathname]}
        />
    );
};

export default MyMenu;