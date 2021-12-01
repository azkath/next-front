import { useEffect, useState } from "react";
import { checkToken, getAccessToken, logoutPopUp, msalInstance, signOut } from "../services";
import { Layout, Menu, message, Result, Typography } from "antd";
import { useRouter } from "next/router";
import { Loading } from "../../components/Loading";

const { Header, Content } = Layout;
const { Text } = Typography
export default function Home(){
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getToken(){
      return await getAccessToken(msalInstance)
    }
    getToken().then(res => {
      checkToken({accessToken: res}, (_res) => {
        console.log(111, _res, res);
        if(_res.status.code === 200){
          setLoading(false)
        }else{
          // sessionStorage.clear()
          router.push('/login')
        }
      })
    })
  })

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

  return(
    loading ? <Loading /> :
    <Layout>
      <Header style={{ background: '#fff' }}>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <Text strong style={{ fontSize: 18 }} onClick={() => window.location.reload()}>Home</Text>
          </Menu.Item>
          <Menu.Item key="game">
            <Text strong style={{ fontSize: 18 }} onClick={() => router.push('/game')}>Game</Text>
          </Menu.Item>
          <Menu.Item key="logout" onClick={() => handleLogout()}>
            <Text strong style={{ fontSize: 18 }}>Logout</Text>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: 20, display: 'flex', justifyContent: "center"}}>
        <Result
          title="This Home Page"
          status="success"
        />
      </Content>
    </Layout>
  )
}