import './index.css'
import React from 'react'
import { Form, Button, Input, Upload, Icon, message } from 'antd'
import { observer, inject } from 'mobx-react'
import { uploadUrl } from '../../api'

const FormItem = Form.Item

@Form.create()
@inject('bannerStore')
@observer
class BannerEdit extends React.Component {
    componentDidMount() {
        const bannerId = this.props.routeParams.id
        if (bannerId) {
            this.props.bannerStore.fetchBanner(bannerId)
                .then(() => {
                    const { banner } = this.props.bannerStore

                    this.props.form.setFieldsValue({
                        name: banner.name,
                        goodId: banner.link ? banner.link.slice(banner.link.lastIndexOf('/') + 1) : '',
                        position: banner.ad_position_id,
                    })
                })
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const isEdit = this.props.routeParams.id
        const defaultFileList = isEdit && this.props.bannerStore.banner ?
            [this.imageUrl2UploadStyle(this.props.bannerStore.banner.image_url)] : []

        return (
            <div className="BannerEdit">
                <Form
                    onSubmit={this.submit}
                >
                    <FormItem
                        label="标题"
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
                        label="商品ID"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 8 }}
                    >
                        {getFieldDecorator('goodId', {
                            rules: [{ required: true, message: 'Please input your note!' }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        label="权重(越高越靠前)"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 8 }}
                    >
                        {getFieldDecorator('position', {
                            rules: [{ required: true, message: 'Please input your note!' }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        label="横幅图片"
                    >
                        {getFieldDecorator('imageUrl', {
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

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                const imageUrl = values.imageUrl[0].response.url
                const props = Object.assign({}, values, {
                    imageUrl,
                })
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

export default BannerEdit
