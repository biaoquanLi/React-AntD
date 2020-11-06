import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../App'
import Admin from '../admin'
import NoMatch from '../pages/nomatch'
import Buttons from '../pages/ui/buttons'
import Modals from '../pages/ui/modals'
import Loading from '../pages/ui/loading'
import MyTabs from '../pages/ui/tabs'
import Notice from '../pages/ui/notice'
import Gallery from '../pages/ui/gallery'
import Carousels from '../pages/ui/carousel'
import Login from '../pages/form/login'

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
									<Route component={NoMatch}> </Route>
								</Switch>
							</Admin>
						)}
					></Route>
				</App>
			</Router>
		)
	}
}
