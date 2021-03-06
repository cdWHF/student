import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { webApi } from '../../../utils';
import { message } from 'antd'

export default class PieEcharts extends React.Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        webApi.get('/getDataOfDisc?type=disc').then(data => {
            if (data.flag) {
                this.setState({ data: data.returnValue })
            } else {
                message.error('获取违纪信息失败')
            }
        })
    }
    render() {
        const option = {
            title: {
                text: '违纪程度与人数',
                textStyle: {
                    color: '#235894'
                },
                left: 'center'
            },
            tooltip: {},
            series: [{
                name: '数量',
                type: 'pie',
                selectedMode: 'single',
                selectedOffset: 30,
                clockwise: true,
                label: {
                    normal: {
                        textStyle: {
                            fontSize: 18,
                            color: '#235894'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: '#235894'
                        }
                    }
                },
                data: this.state.data
            }]
        }
        return (
            <ReactEcharts
                option={option}
                style={{ height: 300, width: '100%' }}
                className={'react_for_echarts'}
            />
        )
    }
}