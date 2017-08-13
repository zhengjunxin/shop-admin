import './index.css'
import React from 'react'
import { Table, Icon } from 'antd'
import { Link } from 'react-router'
import { observer, inject } from 'mobx-react'

const { Column } = Table

@inject('goodStore')
@observer
class GoodList extends React.Component {
    componentDidMount() {
        this.props.goodStore.fetchList()
    }
    render() {
        const { list, remove, set } = this.props.goodStore

        return (
            <div className="Banner">
                <Link to="/addGood">
                    添加
                </Link>
                <Table
                    dataSource={list.slice()}
                    rowKey="id"
                    className="Banner__Table"
                >
                    <Column
                        title="ID"
                        dataIndex="id"
                        className="Banner__Column"
                    ></Column>
                    <Column
                        title="商品图片"
                        dataIndex="gallery"
                        className="Banner__Column"
                        render={gallery => (
                            gallery[0] && <img src={gallery[0]} alt="img" className="GoodList__img" />
                        )}
                    ></Column>
                    <Column
                        title="价格"
                        dataIndex="retail_price"
                        className="Banner__Column"
                        render={price => <span>{price}元</span>}
                    ></Column>
                    <Column
                        title="库存"
                        dataIndex="goods_number"
                        className="Banner__Column"
                    ></Column>
                    <Column
                        title="启用"
                        dataIndex="is_on_sale"
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
                        render={(good) => {
                            return (
                                <span>
                                    <Link to={`/banner/edit/${good.id}`}>编辑</Link>
                                    <Link onClick={e => set(good, 'is_on_sale', !good['is_on_sale'])}>
                                        {
                                            good.is_on_sale ? '下架' : '上架'
                                        }
                                    </Link>
                                    <Link onClick={e => remove(good)}>删除</Link>
                                </span>
                            )
                        }}
                    ></Column>
                </Table>
            </div>
        )
    }
}

export default GoodList
