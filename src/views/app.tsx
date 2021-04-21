import * as React from 'react';
import AppRouterView from "../router/index";
class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <AppRouterView />;
    }
}
export default App;
