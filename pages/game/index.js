import { useEffect, useState } from "react";
import { checkAuth, createGame, deleteGame, getAccessToken, getListGame, logoutPopUp, msalInstance, signOut, updateGame } from "../services";
import { Layout, Menu, message, Space, Typography, Table, Button, Modal, Form, Input } from "antd";
import { useRouter } from "next/router";
const { Text } = Typography
const { Header, Content } = Layout;

const fieldForm = ['name', 'genre']

const GameForm = ({ game, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if(game && game.textButton === 'Create'){
      game.name = null
      game.genre = null
    }
    game && form.setFieldsValue(game);
  });

  return (
    game &&
    <Modal
      visible={!!game}
      title={`${game.textButton} Game`}
      okText={game.textButton}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            values.id = game.id
            values.typeSubmit = game.textButton
            onSubmit(values);
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={game}
      >
        {
          fieldForm.map((item, index) => {
            return(
              <Form.Item
                key={index}
                name={item}
                label={item.charAt(0).toUpperCase() + item.slice(1)}
                rules={[
                  {
                    required: true,
                    message: `Please input the game's ${item}!`
                  }
                ]}
              >
                <Input />
              </Form.Item>
            )
          })
        }
      </Form>
    </Modal>
  );
};

export default function gamePage(){
  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState(null);
  const [game, setGame] = useState(null);
  const [listParams, setListParams] = useState({
    skip: 0,
    limit: 10,
    sort: 'createdAt DESC'
  });
  const router = useRouter();

  const getList = (token) => {
    getListGame(token, listParams, (res) => {
      setListData(res.body.rows)
    })
  }

  useEffect(() => {
    checkAuth(user => {
      if(user){
        getList(user.accessToken)
        setLoading(false)
      }
    })
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <Text>{text}</Text>
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
      render: text => <Text>{text}</Text>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="large">
          <Button
            type="primary"
            onClick={() => onOpenModal(record, 'Update')}
          >
            Update
          </Button>
          <Button
            type="danger"
            onClick={() => onDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleLogout = async () => {
    setLoading(true)
    const token = await getAccessToken(msalInstance)
    signOut({accessToken: token}, (res) => {
      console.log(666, res);
      message.success('Logout success')
      logoutPopUp().then(() => {
        sessionStorage.clear()
        router.push('/login')
      });
    });
  }

  const onSubmit = (values) => {
    checkAuth(user => {
      if(user){
        if(values.typeSubmit === 'Create'){
          createGame(user.accessToken, values, (res) => {
            if(res.status.code === 200){
              getList(user.accessToken)
            }
          })
        }else{
          updateGame(user.accessToken, values, (res) => {
            if(res.status.code === 200){
              getList(user.accessToken)
            }
          })
        }
        setGame(null);
      }
    })
  };

  const onDelete = (values) => {
    checkAuth(user => {
      if(user){
        deleteGame(user.accessToken, values, (res) => {{
          if(res.status.code === 200){
            getList(user.accessToken)
          }
        }})
        setGame(null);
      }
    })
  }

  const onOpenModal = (record, textButton) => setGame({...record, ...{textButton: textButton}});

  const onCancel = () => setGame(null);

  return(
    <Layout>
      <Header style={{ background: '#fff' }}>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <Text strong style={{ fontSize: 18 }} onClick={() => router.push('/home')}>Home</Text>
          </Menu.Item>
          <Menu.Item key="game">
            <Text strong style={{ fontSize: 18 }} onClick={() => router.push('/game')}>Game</Text>
          </Menu.Item>
          <Menu.Item key="logout" onClick={() => handleLogout()}>
            <Text strong style={{ fontSize: 18 }}>Logout</Text>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: 20 }}>
        <Button style={{ marginBottom: 20 }} type="primary" shape="round" block onClick={() => onOpenModal({}, 'Create')}>
          Create Game
        </Button>
        <Table loading={loading} rowKey={(item) => item.id} columns={columns} dataSource={listData} />
        <GameForm
          game={game}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </Content>
    </Layout>
  )
}