import React from 'react';

const Debug = () => {
	return (
		<div>
			<h2 className='page-header'>Debug</h2>

			<div className='notification-item'>
				<a href='/login'>Login with Github</a>
			</div>

			<div className='notification-item'>
				<a href='/loginms'>Login with MS</a>
			</div>

			<div className='notification-item'>
				<a href='/logout'>Log out</a>
			</div>
		</div>
	);
};

export default Debug;
