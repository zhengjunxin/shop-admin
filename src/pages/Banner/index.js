import './index.css'
import React from 'react'
import { Table, Icon } from 'antd'
import { Link } from 'react-router'
import { observer, inject } from 'mobx-react'

const { Column } = Table

@inject('bannerStore')
@observer
class Banner extends React.Component {
    componentDidMount() {
        this.props.bannerStore.fetchBanners()
    }
    render() {
        const banners = this.props.bannerStore.banners.slice()

        return (
            <div className="Banner">
                <Table
                    dataSource={banners}
                    rowKey="id"
                >
                    <Column
                        title="ID"
                        dataIndex="id"
                    ></Column>
                    <Column
                        title="横幅标题"
                        dataIndex="name"
                    ></Column>
                    <Column
                        title="权重(越高越靠前)"
                        dataIndex="ad_position_id"
                    ></Column>
                    <Column
                        title="图片"
                        dataIndex="image_url"
                        render={img => (
                            <img src={img} alt="img" className="Banner__img" />
                        )}
                    ></Column>
                    <Column
                        title="启用"
                        dataIndex="enabled"
                        render={enabled => {
                            return <Icon
                                className={`Banner__status ${enabled ? 'Banner__status--check' : 'Banner__status--close'}`}
                                type={enabled ? 'check' : 'close'}></Icon>
                        }}
                    ></Column>
                    <Column
                        title="操作"
                        key="action"
                        render={() => {
                            return (
                                <span>
                                    <Link to="/edit">编辑</Link>
                                    <Link to="/off">关闭</Link>
                                    <Link to="/delete">删除</Link>
                                </span>
                            )
                        }}
                    ></Column>
                </Table>
            </div>
        )
    }
}

export default Banner
