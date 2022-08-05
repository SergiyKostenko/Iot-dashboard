import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import Routes from '../Routes';
import TopNav from '../topnav/TopNav';
import './layout.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ThemeAction from '../../redux/actions/ThemeAction';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from 'history';

const Layout = () => {
	const themeReducer = useSelector((state) => state.ThemeReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		const themeClass = localStorage.getItem('themeMode', 'theme-mode-light');

		const colorClass = localStorage.getItem('colorMode', 'theme-mode-light');

		dispatch(ThemeAction.setMode(themeClass));

		dispatch(ThemeAction.setColor(colorClass));
	}, [dispatch]);

	const browserHistory = createBrowserHistory({ basename: '' });
	var reactPlugin = new ReactPlugin();
	var appInsights = new ApplicationInsights({
		config: {
			instrumentationKey: '04d3342f-5ccd-4cc1-8360-43f9d9cbbc12',
			extensions: [reactPlugin],
			extensionConfig: {
				[reactPlugin.identifier]: { history: browserHistory },
			},
		},
	});
	appInsights.loadAppInsights();

	return (
		<BrowserRouter>
			<Route
				render={(props) => (
					<div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
						<Sidebar {...props} />
						<div className='layout__content'>
							<TopNav />
							<div className='layout__content-main'>
								<Routes />
							</div>
						</div>
					</div>
				)}
			/>
		</BrowserRouter>
	);
};

export default Layout;
