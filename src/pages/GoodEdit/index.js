import './index.css'
import React from 'react'
import { Form, Button, Input, Upload, Icon, message, Select } from 'antd'
import { observer, inject } from 'mobx-react'
import { uploadUrl } from '../../api'
import { urls2UploadStyle } from '../../utils/helper'

const FormItem = Form.Item
const { Option } = Select


const name2key = name => `attribute-${name}`

@Form.create()
@inject('goodStore')
@observer
class GoodEdit extends React.Component {
    state = {
        attributeKey: '',
        attributes: [],
    }
    componentDidMount() {
        this.props.goodStore.fetchCategories()

        const goodId = this.props.routeParams.id
        if (goodId) {
            this.props.goodStore.fetch(goodId)
                .then(() => {
                    const good = this.props.goodStore.entry

                    this.props.form.setFieldsValue({
                        name: good.name,
                        category_id: good.category_id,
                        goods_brief: good.goods_brief,
                        retail_price: good.retail_price,
                        goods_number: good.goods_number,
                    })

                    this.setState({
                        attributes: good.attribute.map((attr, index) => attr.name),
                    }, () => {
                        good.attribute.forEach((attr, index) => {
                            this.props.form.setFieldsValue({
                                [name2key(attr.name)]: attr.value,
                            })
                        })
                    })
                })
        }
    }
    render() {
        const { form, routeParams, goodStore } = this.props
        const { getFieldDecorator } = form
        const { categories, entry: good } = goodStore

        const isEdit = routeParams.id

        const picList = isEdit && good && good.list_pic_url ? urls2UploadStyle([good.list_pic_url]) : []
        const galleryList = isEdit && good ? urls2UploadStyle(good.gallery) : []

        const { attributes, attributeKey } = this.state

        return (
            <div className="Good">
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
                        label="商品参数"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 8 }}
                    >
                        <Input value={attributeKey} onChange={this.setAttributeKey} />
                        <Button type="primary" onClick={this.addAttribute}>添加商品参数</Button>
                    </FormItem>
                    {
                        attributes.map((attributeName, index) => {
                            return (
                                <FormItem
                                    label={attributeName}
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 8 }}
                                    key={attributeName}
                                >
                                    {getFieldDecorator(name2key(attributeName), {
                                        rules: [{ required: true, message: 'Please input your note!' }],
                                    })(
                                        <Input style={{ width: '60%', marginRight: 8 }} />
                                        )}
                                    {
                                        attributes.length > 1 ? (
                                            <Icon
                                                className="dynamic-delete-button"
                                                type="minus-circle-o"
                                                disabled={attributes.length === 1}
                                                onClick={() => this.removeAttribute(attributeName)}
                                            />
                                        ) : null
                                    }
                                </FormItem>
                            )
                        })
                    }
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
        const { attributes } = this.state
        e.preventDefault();
        const id = this.props.routeParams.id

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                const gallery = values.gallery.map(upload => {
                    return upload.response.url
                })
                const list_pic_url = values.list_pic_url.map(pic => pic.response.url)[0]

                const attribute = attributes.map((name, index) => {
                    const prop = name2key(name)
                    const value = values[prop]
                    delete values[prop]
                    return {
                        name,
                        value,
                    }
                })

                const props = Object.assign({}, values, {
                    gallery,
                    list_pic_url,
                    attribute,
                })
                console.log(props, JSON.stringify(props))

                if (id) {
                    this.props.goodStore.update(id, props)
                        .then(() => {
                            message.success('修改成功')
                            this.props.router.replace('/goods/list')
                        })
                }
                else {
                    this.props.goodStore.add(props)
                        .then(res => {
                            message.success('添加成功')
                            this.props.router.replace('/goods/list')
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
    setAttributeKey = (e) => {
        const value = e.target.value
        this.setState({
            attributeKey: value,
        })
    }
    addAttribute = () => {
        const { attributeKey, attributes } = this.state
        if (!attributeKey.trim()) {
            message.warn('请填写商品参数名称')
            return
        }
        const nextAttribute = attributes.concat(attributeKey)
        this.setState({
            attributes: nextAttribute,
            attributeKey: '',
        })
    }
    removeAttribute = (attributeName) => {
        this.setState({
            attributes: this.state.attributes.filter(name => name !== attributeName),
        })
    }
}

export default GoodEdit
