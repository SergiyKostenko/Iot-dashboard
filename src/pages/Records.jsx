import React, { useEffect, useState } from 'react';
import Table from '../components/table/Table';

const customerTableHead = ['Date Time', 'Temperature', 'Humidity', 'AQI'];
const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
	<tr key={index}>
		<td>{item.rowKey}</td>
		<td>{item.temperature}</td>
		<td>{item.humidity}</td>
		<td>{item.aqi}</td>
	</tr>
);

const Records = () => {
	const [tableData, setTableData] = useState(null);

	useEffect(() => {
		let url =
			'https://myamazingiotbackend.azurewebsites.net/api/GetData?days=90&code=Isr_epWmKR9Ix0Byid9WoJ50UuaW3JY1uacQumYrW4iXAzFuA6cQ2g==&clientId=apim-ddkasdml23';
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setTableData(data);
				console.log(data);
			});
	}, []);

	return (
		<div>
			<h2 className='page-header'>Records</h2>
			<div className='row'>
				<div className='col-12'>
					<div className='card'>
						<div className='card__body'>
							<Table
								//limit='10'
								headData={customerTableHead}
								renderHead={(item, index) => renderHead(item, index)}
								bodyData={tableData}
								renderBody={(item, index) => renderBody(item, index)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Records;
