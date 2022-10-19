import {useEffect, useState} from "react";
import {getAllStudents} from "./client";
import {Avatar, Badge, Breadcrumb, Button, Empty, Layout, Menu, Popover, Spin, Table, Tag} from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    LoadingOutlined,
    PieChartOutlined,
    PlusOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';



import StudentDrawerForm from "./StudentDrawerForm";
import './App.css';

const {Header, Content, Footer, Sider} = Layout;

const TheAvatar = ({name}) => {
    let trim = name.trim();
    if (trim.length == 0) {
        return <Avatar
            icon={<UserOutlined/>}
            style={{
                backgroundColor: '#87d068',
            }}/>
    }
    const split = trim.split(" ");
    if (split.length == 1) {
        return <Avatar style={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
        }}>
            {name.charAt(0)}
        </Avatar>
    }
    return <Avatar style={{
        color: '#f56a00',
        backgroundColor: '#fde3cf',
    }}>
        {`${name.charAt(0)}${name.charAt(name.length - 1)}`}
    </Avatar>;
};

const columns = [
    {
      title: '',
      dataIndex: 'avatar',
        key: 'avatar',
        render: (text, student) =>
            <TheAvatar name={student.name} />,
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
];

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined/>),
    getItem('Option 2', '2', <DesktopOutlined/>),
    getItem('User', 'sub1', <UserOutlined/>,
        [
            getItem('Tom', '3'),
            getItem('Bill', '4'),
            getItem('Alex', '5'),
        ]),
    getItem('Team', 'sub2', <TeamOutlined/>,
        [
            getItem('Team 1', '6'),
            getItem('Team 2', '8')
        ]),
    getItem('Files', '9', <FileOutlined/>),
];
const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
);



function App() {

    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(true);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchStudents = () =>
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
                setFetching(false);
            })

    useEffect(() => {
        console.log("component is mounted");
        fetchStudents()
    }, []);

    const renderStudents = () => {
        if (fetching) {
            return <Spin indicator={antIcon}/>
        }
        if (students.length <= 0) {
            return <Empty/>;
        }
        return <>
            <StudentDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchStudents={fetchStudents}
            />

            <Table
                dataSource={students}
                columns={columns}
                bordered
                title={() =>
                    <>
                        <Tag>Number of students</Tag>
                        <Badge count={students.length}
                               className="site-badge-count-4"
                        />
                        <br/><br/>
                        <Button
                            onClick={() => setShowDrawer(!showDrawer)}
                            type="primary" shape="round" icon={<PlusOutlined/>} size="middle">
                            Add New Student
                        </Button>
                    </>
                }
                pagination={{pageSize: 50}}
                scroll={{y: 400}}
                rowKey={(student) => student.id}
            />;
        </>;

    }

    return <Layout
        style={{
            minHeight: '100vh',
        }}
    >
        <Sider collapsible collapsed={collapsed}
               onCollapse={(value) => setCollapsed(value)}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
        </Sider>
        <Layout className="site-layout">
            <Header
                className="site-layout-background"
                style={{
                    padding: 0,
                }}
            />
            <Content
                style={{
                    margin: '0 16px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Teacher</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        minHeight: 360,
                    }}
                >
                    {renderStudents()}
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                By Tilmeez-Ur-Rehman Bhatti
            </Footer>
        </Layout>
    </Layout>;

    return <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo"/>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}/>
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    Bill is a cat.
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    </Layout>
}

export default App;
