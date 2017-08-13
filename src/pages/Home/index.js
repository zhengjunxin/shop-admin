import './index.css'
import React, { Component } from 'react'
import { Layout, Menu } from 'antd'

const { Header, Sider, Content } = Layout
const { SubMenu, Item } = Menu

export default class Home extends Component {
	render() {
		const { routes } = this.props
		const main = routes[1] ? routes[1].path.split('/')[0] : 'goods'
		const sub = routes[1] ? routes[1].path : 'goods/list'
console.log('-main', main, sub)

		return (
			<Layout className="Home">
				<Header className="Home__Header">头部</Header>
				<Layout>
					<Sider className="Home__Sider">
						<Menu
							mode="inline"
							defaultOpenKeys={[main]}
							defaultSelectedKeys={[sub]}
							style={{ height: '100%', borderRight: 0 }}
							onClick={this.onMenuItemClick}
						>
							<SubMenu key="goods" title="商品管理">
								<Item key="goods/list">商品列表</Item>
								<Item key="goods/add">添加商品</Item>
							</SubMenu>
							<SubMenu key="banners" title="商品推广">
								<Item key="banners/list">首页广告</Item>
							</SubMenu>
							<SubMenu key="categories" title="类别管理">
								<Item key="categories/list">商品类别</Item>
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
		console.log('-', item, key, keyPath)

		this.props.router.push(`/${key}`)
	}
}
