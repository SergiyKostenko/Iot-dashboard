import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Records from '../pages/Records';
import Charts from '../pages/Charts';
import LiveCamera from '../pages/LiveCamera';
import Settings from '../pages/Settings';
import Debug from '../pages/Debug';
import Orcs from '../pages/Orcs';

const Routes = () => {
	return (
		<Switch>
			<Route path='/' exact component={Dashboard} />
			<Route path='/records' component={Records} />
			<Route path='/Orcs' component={Orcs} />
			<Route path='/charts' component={Charts} />
			<Route path='/livecam' component={LiveCamera} />
			<Route path='/debug' component={Debug} />
			<Route path='/settings' component={Settings} />
		</Switch>
	);
};

export default Routes;
