import React from 'react';

const Debug = () => {
	return (
		<div>
			<h2 className='page-header'>Debug</h2>

			<div className='notification-item'>
				<a href='/.auth/login/github'>Login with Github</a>
			</div>

			<div className='notification-item'>
				<a href='/.auth/login/aad'>Login with MS</a>
			</div>

			<div className='notification-item'>
				<a href='/.auth/logout'>Log out</a>
			</div>
		</div>
	);
};

export default Debug;
