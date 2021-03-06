import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Link } from 'react-router-dom';
import { webApi } from '../../utils';
import { Card, Row, Col, message, Icon, Radio } from 'antd';
import PieEcharts from './components/pieCharts';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export default class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            date: [],
            type: 'day'
        }
    }

    componentDidMount() {
        this.getList(this.state.type)
    }
    getList(type) {
        webApi.get('/getDateForBorrow?type=borrow&status=未归还&datetype=' + type).then(data => {
            if (data.flag) {
                let arr = data.returnValue;
                let newArr = [];
                for (let i = 0; i < arr.length; i++) {
                    if (newArr.indexOf(arr[i]) == -1) {
                        newArr.push(arr[i])
                    }
                }
                newArr.sort();
                this.setState({ date: newArr });
                webApi.post('/getCountForBorrow?status=未归还&datetype=' + type, newArr).then(item => {
                    if (item.flag) {
                        this.setState({ data: item.returnValue })
                    } else {
                        message.error('获取借用物品数量失败')
                    }
                })
            } else {
                message.error('获取借用物品日期失败')
            }
        })
    }

    handleChange(e) {
        this.setState({ type: e.target.value });
        this.getList(e.target.value)
    }

    render() {
        const option = {
            title: {
                text: '物品借用走势曲线',
                textStyle: {
                    color: '#232545'
                },
                left: 'center'
            },
            tooltip: { trigger: 'axis' },
            xAxis: {
                type: 'category',
                data: this.state.date
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '物品借用日期和数量',
                type: 'line',
                data: this.state.data
            }]
        }
        return (
            <div>
                <Row gutter={16}>
                    <Col md={24}>
                        <Card style={{ height: '800px' }}>
                            <RadioGroup defaultValue='day' size='large' onChange={this.handleChange.bind(this)} value={this.state.type}>
                                <RadioButton value='day'>按天</RadioButton>
                                <RadioButton value='month'>按月</RadioButton>
                                <RadioButton value='year'>按年</RadioButton>
                            </RadioGroup>
                            <div>
                                <ReactEcharts
                                    option={option}
                                    style={{ height: 300, width: '100%' }}
                                    className={'react_for_echarts'}
                                />
                            </div>
                            <div style={{ textAlign: 'center',marginLeft:-800}}>
                                <Link to={{ pathname: '/backstage/borrow/list', state: '已归还' }} style={{ fontSize: 16 }}>查看已归还列表<Icon type="caret-right" /></Link>
                                <Link to={{ pathname: '/backstage/borrow/list', state: '未归还' }} style={{ fontSize: 16, marginLeft: 10 }}>查看未归还列表<Icon type="caret-right" /></Link>
                            </div>
                            <PieEcharts />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}