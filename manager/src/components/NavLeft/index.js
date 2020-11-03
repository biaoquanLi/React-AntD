import React from 'react'
import { Menu } from 'antd';
import {NavLink} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import './index.less'
const { SubMenu } = Menu;

export default class NavLeft extends React.Component {
    componentWillMount(){
        const menuTreeNode = this.renderMenu(menuList)
        console.log(menuTreeNode)
        this.setState({menuTreeNode})
    }
    renderMenu = (data) => {
        return data.map(item => {
            if(item.children){
               return (
                <SubMenu key={item.key}  title={item.title}>
                    {this.renderMenu(item.children)}
                 </SubMenu>
               )
            }
            return <Menu.Item key={item.key}>
                <NavLink to={item.key}>
                {item.title}
                </NavLink></Menu.Item>
        })
        
    }
    render() {
        return (
            <div >
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>Imooc Ms</h1>
                </div>
                <Menu   mode="vertical" theme="dark">
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}