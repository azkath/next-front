import { UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Button, Layout, Menu, message, Result, Typography } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { checkToken, getAccessToken, loginPopUp, signUp } from "../services";
import { Loading } from "../../components/Loading";

const { Header, Content } = Layout;
const { Text } = Typography

export default function LoginPage() {
  const { instance, accounts, inProgress } = useMsal();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    async function getToken(){
      return await getAccessToken(instance)
    }
    getToken().then(res => {
      if(res !== 'invalidToken'){
        checkToken({accessToken: res}, (_res) => {
          console.log(888, _res);
          if(_res.status.code === 200){
            router.push('/home')
          }else{
            // sessionStorage.clear()
            return setLoading(false)
          }
        })
      }else{
        // sessionStorage.clear()
        return setLoading(false)
      }
    }).catch(err => {
      return setLoading(false)
    })
    
  })

  const handleLogin = async () => {
    try {
      await loginPopUp().then(async () => {
        setLoading(true)
        const getToken = await getAccessToken(instance);
        if(getToken){
          message.success('Login Success')
          signUp({accessToken: getToken}, (res) => {
            if(res.status.code === 200){
              return router.push('/home')
            }else{
              // sessionStorage.clear()
              return setLoading(false)
            }
          })
        }
      }).catch(err => {
        // sessionStorage.clear()
        setLoading(false)
        return message.error('Login Failed');
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    loading ? <Loading /> :
    <UnauthenticatedTemplate>
      <Layout>
        <Header style={{ background: '#fff' }}>
          <Menu onClick={() => window.location.reload()} mode="horizontal">
            <Menu.Item key="home">
              <Text strong style={{ fontSize: 18 }}>Home</Text>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: 20, display: 'flex', justifyContent: "center"}}>
          <Result
            title="Login Here"
            extra={<Button type="primary" onClick={() => handleLogin()}>Login</Button>}
          />
        </Content>
      </Layout>
    </UnauthenticatedTemplate>
  )
}