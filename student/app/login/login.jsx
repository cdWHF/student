import React from 'react';
import { Icon, Button, Input, Form, Card, Checkbox, Row, Col, message, Layout } from 'antd';
import { Link } from 'react-router-dom'
const FormItem = Form.Item;
import { webApi } from '../utils'

const { Header } = Layout
class Login extends React.Component {
    constructor() {
        super()
    }
    handleSubmit() {
        this.props.form.validateFields((err, value) => {
            if (err) return;

            webApi.post('/userLogin', value).then(data => {
                if (data.flag) {
                    let item = data.returnValue[0];
                    let result = {
                        username: item.username,
                        isAdmin: item.isAdmin,
                        id: item.userId
                    }
                    let newData = JSON.stringify(result)
                    localStorage.setItem('temp', newData)
                    this.props.history.push('/front/news')
                } else {
                    message.error(data.returnValue)
                }
            })
        })
    }

    handleRegister() {
        this.props.history.push('/register')
    }
    render() {
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        const cardStyle = {
            width: '60%',
           // marginLeft: '20%',
            marginTop: '4%'
        }
        const addonBeforeUse = (
            <Icon type='user' title='用户名' />
        )
        const addonBeforeLock = (
            <Icon type='unlock' title='密码' />
        )
        return (
            <div style={{ background: '#ECECEC', height: 758 }}>
                    {/* <div  style={{float:'left',marginLeft:50}}>
                        <img src={require('../../image/5.jpg')} style={{ height: 100, width: 220 }} />
                    </div>    
                    <div style={{}}><span style={{fontSize:64,marginLeft:20}}>欢迎进入高校学生宿舍管理系统</span></div>               */}
                <div style={{ position: 'relative', top: 135, left: '30%', width: 500, height: 300, }}>
                    <Card title={
                        <div><img src={require('../../image/5.jpg')} style={{height:50,width:130}}/>
                      <span style={{fontSize:36}}>宿舍管理系统登录</span>  
                        </div>
                    } style={{ cardStyle }}>
                        <Form>
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true }]
                                })(<Input addonBefore={addonBeforeUse} placeholder='请输入用户名' />)}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true }]
                                })(<Input addonBefore={addonBeforeLock} type='password' placeholder='请输入密码' />)}
                            </FormItem>
                            {/* <div>
                                <Link to=''>忘记密码？</Link>
                            </div> */}
                            <div style={{ float: 'right' }}>
                                <Button type='primary' onClick={this.handleSubmit.bind(this)} style={{ marginRight: 10 }}>登录</Button>
                                <Button onClick={this.handleRegister.bind(this)}>注册</Button>
                            </div>
                        </Form>
                    </Card>
                </div>
            </div>
        )
    }
}
Login = Form.create()(Login)
export default Login