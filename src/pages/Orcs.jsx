import React, { useEffect, useState } from 'react';
import StatusCard from '../components/status-card/StatusCard';

const Orcs = () => {
	const [liveData, setliveData] = useState(null);

	useEffect(() => {
		let url = 'https://russianwarship.rip/api/v1/statistics/latest';
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setliveData(data.data);
				console.log(data);
			});
	}, []);
	return (
		<div>
			<h2 className='page-header'>Orcs</h2>
			<div className='row'>
				<div
					className='col-12 cards-flex'
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-around',
					}}>
					<div>
						Ors
						<StatusCard
							icon='bx bxs-skull'
							count={liveData === null ? '-' : liveData.stats.personnel_units}
						/>
					</div>
					<div>
						Tanks
						<StatusCard
							icon='bx bxs-truck'
							count={liveData === null ? '-' : liveData.stats.tanks}
						/>
					</div>
					<div>
						Planes
						<StatusCard
							icon='bx bxs-plane'
							count={liveData === null ? '-' : liveData.stats.planes}
						/>
					</div>
					<div>
						Helicopters
						<StatusCard
							icon='bx bxs-skull'
							count={liveData === null ? '-' : liveData.stats.helicopters}
						/>
					</div>
					<div>
						Drones
						<StatusCard
							icon='bx bxs-plane'
							count={liveData === null ? '-' : liveData.stats.uav_systems}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Orcs;
