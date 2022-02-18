import React from 'react';
import ListTopic from '../topic/topic.component'
import Home from '../home/home.component';
import InDex from '../index';
import CreateTopic from '../create_topic/createTopic.component';
import Login from '../login/login.component';
import NotFound404 from '../notFound/notFound404.component';

const Routes = [
    {
        path: '/',
        exact: true,
        main: () => <Home />
    },
    {
        path: '/trang-chua',
        exact: true,
        main: () => <InDex />
    },
    {
        path: '/dang-nhap',
        exact: false,
        main: () => <Login />
    },
    {
        path: '/danh-sach-topic',
        exact: false,
        main: () => <ListTopic />
    },
    {
        path: '/tao-moi-topic',
        exact: false,
        main: () => <CreateTopic />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFound404 />
    }
]

export default Routes;
