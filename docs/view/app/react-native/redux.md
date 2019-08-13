# redux 数据管理

## 为啥要使用

如果多个界面 需要的数据是一致的，而且执行的方法也是一致的，这个时候 用会比较方便，

## 目录结构

```
> src
    > redux
        > actions
            index.js
        > reducer
            index.js
        > state
            index.js
        store.js
    > views
        index.js
App.js
```


## src/redux/state/index.js

源数据， 能有reducer来改变，

```js
// user 可以分成文件 引入， 可以引入多个
export default {
    user: {
        login: false
    }
}
```

## src/redux/reducer/index.js

reducer 用来改变state的值，，只支持同步，不支持异步操作，

```js
import { combineReducers } from "redux";

// user 可以分成文件 引入， 可以引入多个
export default combineReducers({
    user: (state, action = {type: ''}) => {
        // 此时的state 是 state/index.js 里user对象
        // 返回最好是新对象
        switch (action.type) {
            case "set_login": return {...state, login: action.payload}
            default: return state
        }
    }
})
```

## src/redux/store.js

关联 state 和 reducers

```js
import { createStore } from 'redux'
import reducer from './reducer'
import state from './state'
const store = createStore(reducer, state)
export default store
```

## App.js

使用store, 给view 套个大盒子，，Provider , 把 store 放到props

```js
import React, { Component } from 'react'
import { Provider } from "react-redux";
import { View } from "react-native";
import store from './src/redux/store'
import AppContainer from "./src/views";

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
```

## src/views/index.js

使用redux带来的快乐，呵呵

```js
import React, { Component } from 'react'
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";

class AppContainer extends Component {
    render() {
        const { login } = this.props
        const text = login ? '已登陆' : '未登录'
        return (
            <View>
                <Text>{ text }</Text>
                <Button onPress={() => {
                    this.props.set_login(login ? true : false)
                }}></Button>
            </View>
        )
    }
}

/*
 * state 是src/redux/state/index.js 里的值 ，找到user里的login，然后赋值给一个新的参数，
 * 这个参数 就是对应到 AppContainer 这里的props，，变成 this.props.login
 * 
 */
const mapStateToProps = (state) => {
    return {
        login: state.user.login
    }
}

/*
 * set_login 就是对应到 AppContainer 这里的props，，变成 this.props.set_login
 * 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        /**
         * login 是参数，AppContainer 穿过来的 此方法可以异步操作， 可以把方法抽取出来，就变成 actions.js 了
         */
        set_login: (login) => {
            setTimeout(() => {
                dispatch({
                    type: 'set_login', // 对应到 src/redux/reducer/index.js 类型叫 set_login 的方法当中
                    payload: login, // 穿过去的值
                })
            }, 1000);
        },
    }
}
/*
 * connect 第一个参数 是赋值state
 * 第二个参数 是赋值 改变state的方法
 */
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)

```