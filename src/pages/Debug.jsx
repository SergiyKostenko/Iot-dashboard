import React, { useEffect, useState } from 'react';

const Debug = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		fetch('/.auth/me')
			.then((response) => response.json())
			.then((data) => {
				setUser(data.clientPrincipal);
				console.log(data.clientPrincipal);
			});
	}, []);

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
			<div>
				<div>User principal: {user === null ? '-' : user.userDetails}</div>
				<br />

				<div>
					User roles:{' '}
					<ul style={{ 'list-style-type': 'disc' }}>
						{user === null
							? '-'
							: user.userRoles.map((role) => <li>{role}</li>)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Debug;
