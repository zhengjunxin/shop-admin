import './index.css'
import React from 'react'
import { Form, Button, Input, Upload, Icon, message } from 'antd'
import { observer, inject } from 'mobx-react'
import { uploadUrl } from '../../api'

const FormItem = Form.Item

@Form.create()
@inject('categoryStore')
@observer
class BannerEdit extends React.Component {
    componentDidMount() {
        this.props.categoryStore.fetchList()
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
        const { list } = this.props.categoryStore

        return (
            <div className="Category">
                <ul>
                    {
                        list.map(category => {
                            return <li key={category.id}>{category.name}</li>
                        })
                    }
                </ul>
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

export default BannerEdit
