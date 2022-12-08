import React from "react";

import * as colors from "../variables/colors";

import { setNotification } from "../../reducers/notificationReducer";

import ratioService from "../../services/ratio";

import { getLastXTradingDays } from "../../helpers/getLastXTradingDays";

import { Form, Input, FormButtonWrapper } from "../UI/Forms/FormElements";
import { Button } from "../UI/Button/Button";

const RatioForm = ({
	typedRatioLongSymbol,
	setTypedRatioLongSymbol,
	typedRatioShortSymbol,
	setTypedRatioShortSymbol,
	setCurrentRatioLongSymbol,
	setCurrentRatioShortSymbol,
	setChartData,
}) => {
	const clearInput = () => {
		setTypedRatioLongSymbol("");
		setTypedRatioShortSymbol("");
	};

	const setMessageAndError = (message, error) => {
		dispatch(setNotification({ message, error }));
	};

	const getRatio = async (event) => {
		event.preventDefault();
		const days = 250;

		setCurrentRatioLongSymbol(typedRatioLongSymbol);
		setCurrentRatioShortSymbol(typedRatioShortSymbol);
		setChartData({ labels: null, datasets: null });

		try {
			const ratio = await ratioService.getRatioData({
				typedRatioLongSymbol,
				typedRatioShortSymbol,
				days,
			});

			const ratio_chart_data = ratioService.getRatioChartParams(ratio);
			const lastXTradingDays = await getLastXTradingDays(days);

			setChartData({
				labels: lastXTradingDays.reverse(),
				datasets: [
					{
						data: ratio_chart_data,
						backgroundColor: colors.clr_violet_600,
						borderColor: colors.clr_violet_600,
						hoverBackgroundColor: colors.clr_red_900,
					},
				],
			});

			clearInput();
		} catch (exception) {
			const errorMessage = exception.response.data.error;
			setMessageAndError(`${errorMessage}`, true);
			clearInput();
		}
	};

	return (
		<Form onSubmit={getRatio}>
			<Input
				id="ratio-long-symbol"
				type="text"
				value={typedRatioLongSymbol.toLocaleUpperCase()}
				onChange={({ target }) => setTypedRatioLongSymbol(target.value)}
				placeholder="type long symbol"
			/>
			<Input
				id="ratio-short-symbol"
				type="text"
				value={typedRatioShortSymbol.toLocaleUpperCase()}
				onChange={({ target }) => setTypedRatioShortSymbol(target.value)}
				placeholder="type short symbol"
			/>

			<FormButtonWrapper>
				<Button id="ratio-button">Look up ratio</Button>
			</FormButtonWrapper>
		</Form>
	);
};

export default RatioForm;
