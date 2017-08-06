import './index.css'
import React, { Component } from 'react'
import { Layout, Menu } from 'antd'

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
