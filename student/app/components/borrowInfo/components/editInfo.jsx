import React from 'react';
import { Card, Form, Input, Row, Col, message, Modal, Button, Popconfirm } from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export default class EditInfo extends React.Component {
    constructor() {
        super();
        this.state = { show: false }
    }
    showModal() {
        this.setState({ show: true })
    }
    handleOk() {
        this.setState({ show: false })
    }
    handleCancel() {
        this.setState({ show: false })
    }
    //删除点击了确定
    handleDel() {

    }
    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        return (
            <div>
                <Button type='primary' size='small' onClick={this.showModal.bind(this)}>编辑</Button>
                <Popconfirm title='确认删除？' onConfirm={this.handleDel.bind(this)} okText='确定' cancelText='取消'>
                    <Button type='danger' size='small' style={{ marginLeft: 10 }}>删除</Button>
                </Popconfirm>
                <Modal
                    title='编辑借用信息'
                    visible={this.state.show}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    okText='确定'
                    cancelText='取消'
                >
                    <Form>
                        <Row>
                            <Col>
                                <FormItem label='借用人' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='学院班级' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='借用时间' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='归还时间' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='用途' {...formItemLayout}>
                                    <TextArea rows='5' />
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}