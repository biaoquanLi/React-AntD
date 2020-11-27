import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../App'
import Admin from '../admin'
import Common from '../common'
import NoMatch from '../pages/nomatch'
import Buttons from '../pages/ui/buttons'
import Modals from '../pages/ui/modals'
import Loading from '../pages/ui/loading'
import MyTabs from '../pages/ui/tabs'
import Notice from '../pages/ui/notice'
import Gallery from '../pages/ui/gallery'
import Carousels from '../pages/ui/carousel'
import Login from '../pages/form/login'
import Register from '../pages/form/register'
import BasicTable from '../pages/table/basicTable'
import HighTable from '../pages/table/highTable'
import CityManage from '../pages/city/index'
import Order from '../pages/order/index'
import OrderDetail from '../pages/order/detail'
import User from '../pages/user/index'
import BikeMap from '../pages/bikeMap/index'
import Bar from '../pages/charts/bar'
import Pie from '../pages/charts/pie'
import Line from '../pages/charts/line'
// import Rich from '../pages/rich/index'
import Permission from '../pages/permission/index'

export default class IRouter extends React.Component {
	render() {
		return (
			<Router>
				<App>
                <Switch>
                <Route path="/common" render={()=>(
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetail}></Route>
                        </Common>
                    )}>
                    </Route>
					<Route
						path="/"
						render={() => (
							<Admin>
								<Switch>
									<Route
										path="/ui/buttons"
										component={Buttons}
									></Route>
									<Route
										path="/ui/modals"
										component={Modals}
									></Route>
									<Route
										path="/ui/messages"
										component={Modals}
									></Route>
									<Route
										path="/ui/loadings"
										component={Loading}
									></Route>
									<Route
										path="/ui/tabs"
										component={MyTabs}
									></Route>
									<Route
										path="/ui/notification"
										component={Notice}
									></Route>
									<Route
										path="/ui/gallery"
										component={Gallery}
									></Route>
									<Route
										path="/ui/carousel"
										component={Carousels}
									></Route>
                                    <Route path="/form/login"
                                     component={Login} 
                                     ></Route>
                                     <Route path="/form/reg" component={Register}></Route>
                                     <Route path="/table/basic" component={BasicTable}></Route>
                                     <Route path="/table/high" component={HighTable}></Route>
                                     <Route path="/city" component={CityManage}></Route>
                                     <Route path="/order" component={Order}></Route>
                                     <Route path="/user" component={User}></Route> 
                                     <Route path="/bikeMap" component={BikeMap}></Route>
                                     <Route path="/charts/bar" component={Bar}></Route>
                                     <Route path="/charts/pie" component={Pie}></Route>
                                     <Route path="/charts/line" component={Line}></Route>
                                     {/* <Route path="/rich" component={Rich}></Route> */}
                                     <Route path="/permission" component={Permission}></Route>
									<Route component={NoMatch}> </Route>
								</Switch>
							</Admin>
						)}
					></Route>
                    </Switch>
				</App>
			</Router>
		)
	}
}
