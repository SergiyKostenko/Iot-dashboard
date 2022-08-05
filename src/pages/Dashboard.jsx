import React, { useEffect, useState } from 'react';
import StatusCard from '../components/status-card/StatusCard';
import Chart from 'react-apexcharts';
import { useSelector, useDispatch } from 'react-redux';
import ThemeAction from '../redux/actions/ThemeAction';
import Dropdown from '../components/dropdown/Dropdown';
import { Link } from 'react-router-dom';

const Dashboard = () => {
	const chartTypeOptions = [
		{ label: 'line', value: 'line' },
		{ label: 'area', value: 'area' },
	];
	const themeReducer = useSelector((state) => state.ThemeReducer).mode;
	const dispatch = useDispatch();
	const [liveData, setliveData] = useState(null);

	const [chartConfig, setchartConfig] = useState({
		color: ['#6ab04c', '#2980b9'],
		chart: {
			background: 'transparent',
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'smooth',
		},
		xaxis: {
			categories: [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
			],
		},
		legend: {
			position: 'top',
		},
		grid: {
			show: false,
		},
	});

	const [chartSeries, setchartSeries] = useState([
		{
			name: '',
			data: [],
		},
		{
			name: '',
			data: [],
		},
	]);

	const [chartType, setchartType] = useState(chartTypeOptions[0].value);
	const prepareChartData = (data) => {
		if (data != null) {
			var categories = [];
			var temperature = [];
			var humidity = [];
			data.forEach((item) => {
				categories.push(item.rowKey);
				temperature.push(item.temperature);
				humidity.push(item.humidity);
			});
			console.log(data);
			setchartSeries([
				{
					name: 'Temperature',
					data: temperature,
				},
				{
					name: 'Humidity',
					data: humidity,
				},
			]);
			setchartConfig({
				color: ['#6ab04c', '#2980b9'],
				chart: {
					background: 'transparent',
				},
				dataLabels: {
					enabled: false,
				},
				stroke: {
					curve: 'smooth',
				},
				xaxis: {
					categories: categories,
				},
				legend: {
					position: 'top',
				},
				grid: {
					show: false,
				},
			});
		}
	};

	//redo without redux
	useEffect(() => {
		dispatch(ThemeAction.getTheme());
	});

	useEffect(() => {
		let url =
			'https://myamazingiotbackend.azurewebsites.net/api/GetData?days=150&code=Isr_epWmKR9Ix0Byid9WoJ50UuaW3JY1uacQumYrW4iXAzFuA6cQ2g==&clientId=apim-ddkasdml23';
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setliveData(data[data.length - 1]);
				prepareChartData(data);
			});
	}, []);

	const renderChartMenu = (item, index) => (
		<Link to='/' key={index}>
			<div
				className='notification-item'
				onClick={() => setchartType(item.value)}>
				<span>{item.label}</span>
			</div>
		</Link>
	);

	return (
		<div>
			<div className='row'>
				<Dropdown
					customToggle={() => (
						<h2>
							<div className='dropdown__chart'>
								Chart<i class='bx bx-bar-chart-alt'></i>
							</div>
						</h2>
					)}
					contentData={chartTypeOptions}
					renderItems={(item, index) => renderChartMenu(item, index)}
				/>

				<div className='col-12'>
					<div className='card full-height'>
						<Chart
							options={
								themeReducer === 'theme-mode-dark'
									? {
											...chartConfig,
											theme: { mode: 'dark' },
									  }
									: {
											...chartConfig,
											theme: { mode: 'light' },
									  }
							}
							series={chartSeries}
							type={chartType}
							height='350px%'
						/>
					</div>
				</div>

				<div
					className='col-12 cards-flex'
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-around',
					}}>
					<div>
						Temperature Inside
						<StatusCard
							icon='bx bxs-hot'
							count={liveData === null ? '-' : liveData.temperature}
							title='°C'
						/>
					</div>
					<div>
						Temperature outiside
						<StatusCard icon='bx bxs-hot' count='10.5' title='°C' />
					</div>
					<div>
						Humidity
						<StatusCard
							icon='bx bxs-droplet'
							count={liveData === null ? '-' : liveData.humidity}
							title='%'
						/>
					</div>
					<div>
						Pressure
						<StatusCard icon='bx bx-water' count='50' title='pH' />
					</div>
					<div>
						AQI
						<StatusCard icon='bx bxs-leaf' count='50' title='AQI' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
