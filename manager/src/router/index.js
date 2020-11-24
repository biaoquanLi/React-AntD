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
import Rich from '../pages/rich/index'

export default class IRouter extends React.Component {
	render() {
		return (
			<Router>
				<App>
					<Route
						path="/admin"
						render={() => (
							<Admin>
								<Switch>
									<Route
										path="/admin/ui/buttons"
										component={Buttons}
									></Route>
									<Route
										path="/admin/ui/modals"
										component={Modals}
									></Route>
									<Route
										path="/admin/ui/messages"
										component={Modals}
									></Route>
									<Route
										path="/admin/ui/loadings"
										component={Loading}
									></Route>
									<Route
										path="/admin/ui/tabs"
										component={MyTabs}
									></Route>
									<Route
										path="/admin/ui/notification"
										component={Notice}
									></Route>
									<Route
										path="/admin/ui/gallery"
										component={Gallery}
									></Route>
									<Route
										path="/admin/ui/carousel"
										component={Carousels}
									></Route>
                                    <Route path="/admin/form/login"
                                     component={Login} 
                                     ></Route>
                                     <Route path="/admin/form/reg" component={Register}></Route>
                                     <Route path="/admin/table/basic" component={BasicTable}></Route>
                                     <Route path="/admin/table/high" component={HighTable}></Route>
                                     <Route path="/admin/city" component={CityManage}></Route>
                                     <Route path="/admin/order" component={Order}></Route>
                                     <Route path="/admin/user" component={User}></Route> 
                                     <Route path="/admin/bikeMap" component={BikeMap}></Route>
                                     <Route path="/admin/charts/bar" component={Bar}></Route>
                                     <Route path="/admin/charts/pie" component={Pie}></Route>
                                     <Route path="/admin/charts/line" component={Line}></Route>
                                     <Route path="/admin/rich" component={Rich}></Route>
									<Route component={NoMatch}> </Route>
								</Switch>
							</Admin>
						)}
					></Route>
                    <Route path="/common" render={()=>(
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetail}></Route>
                        </Common>
                    )}>
                    </Route>
				</App>
			</Router>
		)
	}
}
