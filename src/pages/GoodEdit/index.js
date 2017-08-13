import './index.css'
import React from 'react'
import { Form, Button, Input, Upload, Icon, message, Select } from 'antd'
import { observer, inject } from 'mobx-react'
import { uploadUrl } from '../../api'

const FormItem = Form.Item
const { Option } = Select

@Form.create()
@inject('goodStore')
@observer
class GoodEdit extends React.Component {
    componentDidMount() {
        this.props.goodStore.fetchCategories()
        // const bannerId = this.props.routeParams.id
        // if (bannerId) {
        //     this.props.bannerStore.fetchBanner(bannerId)
        //         .then(() => {
        //             const { banner } = this.props.bannerStore

        //             this.props.form.setFieldsValue({
        //                 name: banner.name,
        //                 goodId: banner.link ? banner.link.slice(banner.link.lastIndexOf('/') + 1) : '',
        //                 position: banner.ad_position_id,
        //             })
        //         })
        // }
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const isEdit = this.props.routeParams.id
        const defaultFileList = isEdit && this.props.bannerStore.banner ?
            [this.imageUrl2UploadStyle(this.props.bannerStore.banner.image_url)] : []
        const { categories } = this.props.goodStore
        console.log('-reander', categories.slice())

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
                        label="商品图片"
                    >
                        {getFieldDecorator('gallery', {
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
            </div>
        )
    }
    submit = e => {
        e.preventDefault();
        const bannerId = this.props.routeParams.id
        const mock = {"name":"name","category_id":"598fb92feff92655654dd1cf","goods_brief":"breif","retail_price":"100","goods_number":"1","gallery":["/images/logo-1502592436971.png", "/images/logo-1502592440363.png"] }

        console.log(mock)
        this.props.goodStore.add(mock)
            .then(() => {
                this.props.router.push('/goods')
            })
        return

        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);

                const gallery = values.gallery.map(upload => {
                    return upload.response.url
                })
                const props = Object.assign({}, values, {
                    gallery,
                })
                console.log(props, JSON.stringify(props))
return
                if (bannerId) {
                    this.props.bannerStore.updateBanner(bannerId, props)
                        .then(() => {
                            message.success('修改成功')
                            this.props.router.replace('/banner')
                        })
                }
                else {
                    this.props.bannerStore.addBanner(props)
                        .then(res => {
                            message.success('首页广告增加成功')
                            this.props.router.replace('/banner')
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
