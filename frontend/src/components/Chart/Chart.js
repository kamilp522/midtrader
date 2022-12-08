import React from "react";
import { useState, useEffect } from "react";

import * as colors from "../variables/colors";
import { optionsAdjustMinValue } from "../../helpers/optionsAdjustMinValue";

import timeseriesService from "../../services/timeseries";

import { setNotification } from "../../reducers/notificationReducer";

import {
	ChartContainer,
	ChartH3,
	ChartText,
	BarChart,
	LineChart,
	ChartButtonsWrapper,
	ChartTimeButton,
	Select,
} from "./ChartElements";
import { useDispatch } from "react-redux";

const Chart = ({
	title,
	interpretation,
	options,
	data,
	type,
	chartInterval,
	setChartInterval,
	currentSymbol,
	isRatio,
}) => {
	const [currentData, setCurrentData] = useState(data);

	const dispatch = useDispatch();

	const setMessageAndError = (message, error) => {
		dispatch(setNotification({ message, error }));
	};

	const getLastXMonths = (x) => {
		const copy = structuredClone(data);

		const labels = copy.labels.splice(Number(`-${x}`));
		const values = copy.datasets[0].data.splice(Number(`-${x}`));

		setCurrentData({
			labels: labels,
			datasets: [{ data: values, backgroundColor: colors.clr_violet_800 }],
		});
	};

	useEffect(() => {
		const changeInterval = async () => {
			if (!currentSymbol) return;

			let timeseries;

			try {
				timeseries = await timeseriesService.getTimeseriesData({
					symbol: currentSymbol,
					chartInterval,
				});
			} catch (exception) {
				const errorMessage = exception.response.data.error;
				setMessageAndError(`${errorMessage}`, true);
				setTypedSymbol("");
				return;
			}

			const timeseries_chart_data =
				timeseriesService.getTimeseriesChartParams(timeseries);

			setCurrentData({
				labels: timeseries_chart_data.labels,
				datasets: [
					{
						data: timeseries_chart_data.values,
						backgroundColor: colors.clr_very_dark_blue_500,
						borderColor: colors.clr_violet_400,
					},
				],
			});
		};
		changeInterval();
	}, [chartInterval]);

	return (
		<ChartContainer>
			{title && <ChartH3>{title}</ChartH3>}
			{interpretation && <ChartText>{interpretation}</ChartText>}
			<ChartButtonsWrapper>
				{type === "bar" && !isRatio && (
					<>
						<ChartTimeButton onClick={() => setCurrentData(data)}>
							24 months
						</ChartTimeButton>
						<ChartTimeButton onClick={() => getLastXMonths(12)}>
							12 months
						</ChartTimeButton>
						<ChartTimeButton onClick={() => getLastXMonths(6)}>
							6 months
						</ChartTimeButton>
					</>
				)}
				{chartInterval && (
					<Select
						name="interval"
						id="quote-chart-interval"
						defaultValue={chartInterval}
						onChange={({ target }) => {
							setChartInterval(target.value);
						}}
					>
						<option value="1min">1 min</option>
						<option value="5min">5 min</option>
						<option value="15min">15 min</option>
						<option value="30min">30 min</option>
						<option value="1h">1 h</option>
						<option value="2h">2 h</option>
						<option value="4h">4 h</option>
						<option value="1day">1 day</option>
						<option value="1week">1 week</option>
						<option value="1month">1 month</option>
					</Select>
				)}
			</ChartButtonsWrapper>
			{type === "bar" && (
				<BarChart
					className="indicator-chart"
					options={optionsAdjustMinValue(options, currentData)}
					data={currentData}
				/>
			)}
			{type === "line" && (
				<LineChart
					id="quote-chart"
					options={optionsAdjustMinValue(options, currentData)}
					data={currentData}
				/>
			)}
		</ChartContainer>
	);
};

export default Chart;
