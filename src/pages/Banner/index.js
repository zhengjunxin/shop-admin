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
        const { banners, deleteBanner, toggleBannerStatus } = this.props.bannerStore

        return (
            <div className="Banner">
                <Link to="/banner/create">
                    添加
                </Link>
                <Table
                    dataSource={banners.slice()}
                    rowKey="id"
                    className="Banner__Table"
                >
                    <Column
                        title="ID"
                        dataIndex="id"
                        className="Banner__Column"
                    ></Column>
                    <Column
                        title="横幅标题"
                        dataIndex="name"
                        className="Banner__Column"
                    ></Column>
                    <Column
                        title="权重(越高越靠前)"
                        dataIndex="ad_position_id"
                        className="Banner__Column"
                    ></Column>
                    <Column
                        title="图片"
                        dataIndex="image_url"
                        className="Banner__Column"
                        render={img => (
                            <img src={img} alt="img" className="Banner__img" />
                        )}
                    ></Column>
                    <Column
                        title="启用"
                        dataIndex="enabled"
                        className="Banner__Column"
                        render={enabled => {
                            return <Icon
                                className={`Banner__status ${enabled ? 'Banner__status--check' : 'Banner__status--close'}`}
                                type={enabled ? 'check' : 'close'}></Icon>
                        }}
                    ></Column>
                    <Column
                        title="操作"
                        key="action"
                        className="Banner__Column"
                        render={(banner) => {
                            return (
                                <span>
                                    <Link to={`/banner/edit/${banner.id}`}>编辑</Link>
                                    <Link onClick={e => toggleBannerStatus(banner)}>
                                        {
                                            banner.enabled ? '关闭' : '启用'
                                        }
                                    </Link>
                                    <Link onClick={e => deleteBanner(banner)}>删除</Link>
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
