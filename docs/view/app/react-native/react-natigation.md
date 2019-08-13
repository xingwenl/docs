# react-natigation

## createBottomTabNavigator

创建底部按钮

## createStackNavigator

创建Nav


### 完整例子
```js

// 四个界面

import { createBottomTabNavigator, createAppContainer, createStackNavigator } from  "react-navigation";
import React, { PureComponent } from 'react'
import { Image, View, DeviceEventEmitter  } from "react-native";

import Home from './home/index'
import Focus from './focus/index'
import Account from './account/index'
import Discover from './discover/index'


const routeConfigMap = {
    Home: {
        screen: Home
    },
    Focus: {
        screen: Focus
    },
    Discover: {
        screen: Discover
    },
    Account: {
        screen: Account
    },
}
const TabNavigator = createBottomTabNavigator(routeConfigMap, {
    initialRouteName: 'Home', // 第一页
    tabBarOptions: {
        activeTintColor: '#333333', //活动选项卡的标签和图标颜色
        inactiveTintColor: '#b4b4b4',
        labelStyle: {
            fontSize: 11
        },
    },
    defaultNavigationOptions: ({ navigation }) => ({
        // 更改底部icon，可以用图片，
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state
            const i = focused ? 0 : 1
            return <Image style={{width: 22, height: 20}} resizeMode="contain" source={tabIconName[routeName][i]}/>
        },
        tabBarOnPress: ({navigation, defaultHandler}) => {
            // 监听tabbar 点击事件
            DeviceEventEmitter.emit('tabBarOnPress', navigation)
            defaultHandler()
       }
    })
})

// 创建导航
const Nav = createStackNavigator({
    Main: {
        screen: createAppContainer(TabNavigator)
    },
    // 这个可以放一下 公共的页面， 与 tab同级的 
    Public: {
        screen: Public
    }
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 0
        },
        headerBackTitle: null,
        headerTintColor: '#333333',
        headerLeftContainerStyle: {
            paddingLeft: realSize(9),
        }
    },
    navigationOptions: ({navigation}) => {
        // 隐藏 tabbar
        let tabBarVisible = true;
        if (navigation.state.index > 0) {
            tabBarVisible = false;
        }
        return {
            tabBarVisible,
        };
    },
    initialRouteName: 'Main',
})

const Modal = createStackNavigator({
    Nav: {
        screen: Nav,
    },
    Login: {
        screen: Login,
    }
},{
    initialRouteName: 'Nav',
    mode: 'modal',// 注意这里设置为 modal
    headerMode: 'none', // 注意这里 none 表示不显示导航头部
})

// createAppContainer 把modal转化为组件
const ModalContainer = createAppContainer(Modal)

// 这个可以随时用 ModalContainer
```

> [reactnavigation](https://reactnavigation.org)