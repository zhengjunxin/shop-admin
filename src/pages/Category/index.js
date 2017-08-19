import './index.css'
import React from 'react'
import { Form, Button, Input, message, Row, Col, Menu, Upload, Icon, Select } from 'antd'
import { observer, inject } from 'mobx-react'
import { uploadUrl } from '../../api'

const FormItem = Form.Item
const { SubMenu, Item } = Menu
const { Option } = Select

@Form.create()
@inject('categoryStore')
@observer
class BannerEdit extends React.Component {
    componentDidMount() {
        this.fetchMainCategory()
    }
    fetchMainCategory() {
        this.props.categoryStore.fetchList({
            parent_id: '0',
        })
    }
    render() {
        const { form, categoryStore } = this.props
        const { getFieldDecorator } = form
        const defaultFileList = []
        const { list } = categoryStore

        return (
            <div className="Category">
                <Row>
                    <Col span={6}>
                        类别列表
                        <Menu
                            mode="inline"
                            openKeys={list.map(category => category.id)}
                        >
                            {
                                list.map(category => {
                                    return (
                                        <SubMenu
                                            title={category.name}
                                            key={category.id}>
                                            {
                                                category.subCategoryList.map(subCategory => <Item key={subCategory.id}>{subCategory.name}</Item>)
                                            }
                                        </SubMenu>
                                    )
                                })
                            }
                        </Menu>
                    </Col>
                    <Col span={18}>
                        类别详情
                        <Form
                            onSubmit={this.submit}
                        >
                            <FormItem
                                label="类别名称"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 8 }}
                            >
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Please input your note!' }],
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                            <FormItem
                                label="类别描述"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 8 }}
                            >
                                {getFieldDecorator('front_name', {
                                    rules: [{ required: true, message: 'Please input your note!' }],
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                            <FormItem
                                label="上级类别"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 8 }}
                            >
                                {getFieldDecorator('parent_id', {
                                    rules: [{ required: true, message: 'Please input your note!' }],
                                })(
                                    <Select
                                        placeholder="Select a option and change input text above"
                                    >
                                        <Option value="0">顶级栏目</Option>
                                        {
                                            list.map(category => {
                                                return <Option key={category.id} value={category.id}>{category.name}</Option>
                                            })
                                        }
                                    </Select>
                                    )}
                            </FormItem>
                            <FormItem
                                label="权重"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 8 }}
                            >
                                {getFieldDecorator('sort_order', {
                                    rules: [{ required: true, message: 'Please input your note!' }],
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                            <FormItem
                                label="icon图片"
                            >
                                {getFieldDecorator('icon_url', {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                    initialValue: defaultFileList,
                                })(
                                    <Upload
                                        className="BannerEdit__Upload"
                                        name="file" action={uploadUrl} listType="picture">
                                        <Button>
                                            <Icon type="upload" />
                                            选择文件
                                        </Button>
                                    </Upload>
                                    )}
                            </FormItem>
                            <FormItem
                                label="横幅图片"
                            >
                                {getFieldDecorator('wap_banner_url', {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                    initialValue: defaultFileList,
                                })(
                                    <Upload
                                        className="BannerEdit__Upload"
                                        name="file" action={uploadUrl} listType="picture">
                                        <Button>
                                            <Icon type="upload" />
                                            选择文件
                                        </Button>
                                    </Upload>
                                    )}
                            </FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                确定
                            </Button>
                            <Button
                                type="primary"
                            >
                                取消
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
    submit = e => {
        e.preventDefault();
        const bannerId = this.props.routeParams.id
        const mock = { "name": "a", "front_name": "b", "sort_order": "3", "wap_banner_url": "/images/logo-1502617561583.png" }

        // this.props.categoryStore.add(mock)

        // return
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                const wap_banner_url = values.wap_banner_url.map(upload => {
                    return upload.response.url
                })[0]
                const icon_url = values.icon_url.map(upload => {
                    return upload.response.url
                })[0]

                const props = Object.assign({}, values, {
                    wap_banner_url,
                    icon_url,
                })
                console.log(props, JSON.stringify(props))

                if (bannerId) {
                    this.props.categoryStore.updateBanner(bannerId, values)
                        .then(() => {
                            message.success('修改成功')
                            this.props.router.replace('/banner')
                        })
                }
                else {
                    this.props.categoryStore.add(props)
                    .then(() => {
                            this.props.form.resetFields()
                            message.success('添加成功')
                            this.fetchMainCategory()
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

export default BannerEdit
