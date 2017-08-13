import React from 'react'
import { Form, Button, Input, Upload, Icon, message, Table } from 'antd'
import { observer, inject } from 'mobx-react'
import { uploadUrl } from '../../api'
import { Link } from 'react-router'

const FormItem = Form.Item
const { Column } = Table

@Form.create()
@inject('categoryStore')
@observer
class CategoryList extends React.Component {
    componentDidMount() {
        this.props.categoryStore.fetchList()
    }
    render() {
        const { list, remove } = this.props.categoryStore

        return (
            <div className="Category">
                <Link to="/categories/add">
                    添加
                </Link>
                <Table
                    dataSource={list.slice()}
                    rowKey="id"
                >
                    <Column
                        title="名称"
                        dataIndex="name"
                    ></Column>
                    <Column
                        title="操作"
                        key="action"
                        render={entry => {
                            return (
                                <span>
                                    <Link to={`/categories/edit/${entry.id}`}>编辑</Link>
                                    <Link onClick={e => remove(entry)}>删除</Link>
                                </span>
                            )
                        }}
                    ></Column>
                </Table>
            </div>
        )
    }
    submit = e => {
        e.preventDefault();
        const bannerId = this.props.routeParams.id

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                if (bannerId) {
                    this.props.categoryStore.updateBanner(bannerId, values)
                        .then(() => {
                            message.success('修改成功')
                            this.props.router.replace('/banner')
                        })
                }
                else {
                    this.props.categoryStore.add(values)
                        .then(res => {
                            this.props.router.replace('/category')
                        })
                }
            }
        });
    }
    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    imageUrl2UploadStyle(imageUrl) {
        return {
            uid: imageUrl,
            url: imageUrl,
            response: {
                url: imageUrl,
            }
        }

    }
}

export default CategoryList
