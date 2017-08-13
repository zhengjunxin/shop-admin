import './index.css'
import React from 'react'
import { Form, Button, Input, Upload, Icon, message, Select } from 'antd'
import { observer, inject } from 'mobx-react'
import { uploadUrl } from '../../api'
import {urls2UploadStyle} from '../../utils/helper'

const FormItem = Form.Item
const { Option } = Select

@Form.create()
@inject('goodStore')
@observer
class GoodEdit extends React.Component {
    componentDidMount() {
        this.props.goodStore.fetchCategories()

        const goodId = this.props.routeParams.id
        if (goodId) {
            this.props.goodStore.fetch(goodId)
                .then(() => {
                    const good = this.props.goodStore.entry
                    console.log('--good', good)
                    // {"name":"衣服","category_id":"598fb92feff92655654dd1cf","goods_brief":"cloth","retail_price":"100","goods_number":"1","list_pic_url":"/images/logo-1502608932488.png","gallery":["/images/avatar-1502608940995.jpeg","/images/avatar-1502608945850.jpeg"]}

                    this.props.form.setFieldsValue({
                        name: good.name,
                        category_id: good.category_id,
                        goods_brief: good.goods_brief,
                        retail_price: good.retail_price,
                        goods_number: good.goods_number,
                    })
                })
        }
    }
    render() {
        const { form, routeParams, goodStore } = this.props
        const { getFieldDecorator } = form
        const { categories, entry: good } = goodStore

        const isEdit = routeParams.id

        const picList = isEdit && good ? urls2UploadStyle([good.list_pic_url]) : []
        const galleryList = isEdit && good ? urls2UploadStyle(good.gallery) : []

        return (
            <div className="GoodEdit">
                <Form
                    onSubmit={this.submit}
                >
                    <FormItem
                        label="商品名称"
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
                        label="商品类别"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 8 }}
                    >
                        {getFieldDecorator('category_id', {
                            rules: [{ required: true, message: 'Please input your note!' }],
                        })(
                            <Select
                                placeholder="Select a option and change input text above"
                            >
                                {
                                    categories.map(category => {
                                        return <Option key={category.id} value={category.id}>{category.name}</Option>
                                    })
                                }
                            </Select>
                            )}
                    </FormItem>
                    <FormItem
                        label="商品简介"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 8 }}
                    >
                        {getFieldDecorator('goods_brief', {
                            rules: [{ required: true, message: 'Please input your note!' }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        label="商品价格"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 8 }}
                    >
                        {getFieldDecorator('retail_price', {
                            rules: [{ required: true, message: 'Please input your note!' }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        label="商品库存"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 8 }}
                    >
                        {getFieldDecorator('goods_number', {
                            rules: [{ required: true, message: 'Please input your note!' }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        label="商品主图"
                    >
                        {getFieldDecorator('list_pic_url', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                            initialValue: picList,
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
                        label="商品图片"
                    >
                        {getFieldDecorator('gallery', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                            initialValue: galleryList,
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
            </div>
        )
    }
    submit = e => {
        e.preventDefault();
        const id = this.props.routeParams.id

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                const gallery = values.gallery.map(upload => {
                    return upload.response.url
                })
                const list_pic_url = values.list_pic_url.map(pic => pic.response.url)[0]

                const props = Object.assign({}, values, {
                    gallery,
                    list_pic_url,
                })
                console.log(props, JSON.stringify(props))

                if (id) {
                    this.props.goodStore.update(id, props)
                        .then(() => {
                            message.success('修改成功')
                            this.props.router.replace('/goods')
                        })
                }
                else {
                    this.props.goodStore.add(props)
                        .then(res => {
                            message.success('添加成功')
                            this.props.router.replace('/goods')
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

export default GoodEdit
