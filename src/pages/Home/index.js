import React, { Component } from 'react';
import './index.css'
import { Upload, message, Button, Icon, Layout, Menu } from 'antd'

const { Header, Sider, Content } = Layout
const { SubMenu, Item } = Menu


export default class Home extends Component {
	render() {
		return (
			<Layout className="Home">
				<Header className="Home__Header">头部</Header>
				<Layout>
					<Sider className="Home__Sider">
						<Menu
							mode="inline"
							defaultSelectedKeys={['banner']}
							defaultOpenKeys={['promotion']}
							style={{ height: '100%', borderRight: 0 }}
							onClick={this.onMenuItemClick}
						>
							<SubMenu key="promotion" title="商品推广">
								<Item key="banner">首页广告</Item>
							</SubMenu>
						</Menu>
					</Sider>
					<Content className="Home__Content">
						{
							this.props.children
						}
					</Content>
				</Layout>
			</Layout>
		)
	}
	onMenuItemClick = ({ item, key, keyPath }) => {
		this.props.router.push(`/${key}`)
	}
}

const props = {
	name: 'file',
	action: '/upload',
	headers: {
		authorization: 'authorization-text',
	},
	onChange(info) {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (info.file.status === 'done') {
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
};
