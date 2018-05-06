import React, {PureComponent} from 'react';

import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback
} from 'react-native';

import {DAY_STATUS} from "./Helper";

export class Day extends PureComponent {

	constructor(props) {
		super(props);
		this._onPress = this._onPress.bind(this);
	}

	_genStyle() {
		const {
			data, dayTextStyle, selectedDayTextStyle,
			dayContainerStyle, singleDayContainerStyle,
			beginDayContainerStyle, middleDayContainerStyle, endDayContainerStyle
		} = this.props;
		const usedDayTextStyle = [styles.dayText, dayTextStyle];
		const usedDayContainerStyle = [styles.dayContainer, dayContainerStyle];
		if(data.status !== DAY_STATUS.NONE) {
			const containerStyleMap = {
				1: [styles.singleDayContainer, singleDayContainerStyle],
				2: [styles.beginDayContainer, beginDayContainerStyle],
				3: [styles.middleDayContainer, middleDayContainerStyle],
				4: [styles.endDayContainer, endDayContainerStyle]
			};
			usedDayTextStyle.push(styles.selectedDayText, selectedDayTextStyle);
			usedDayContainerStyle.push(...(containerStyleMap[data.status] || {}));
		}
		return {usedDayTextStyle, usedDayContainerStyle};
	}

	_onPress() {
		const {data = {}, onPress} = this.props;
		onPress && onPress(data.date, data.available);
	}

	render() {
		const {data, renderDay} = this.props;
		const {usedDayTextStyle, usedDayContainerStyle} = this._genStyle();
		return (
			<TouchableWithoutFeedback style={styles.fullContainer} onPress={this._onPress}>
				<View style={styles.fullContainer}>
					{renderDay ?
						renderDay(data) :
						<View style={usedDayContainerStyle}>
							{data.date && (
								<Text style={[...usedDayTextStyle, !data.available && {opacity: .6}]}>
									{data.date.getDate()}
								</Text>
							)}
						</View>
					}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	fullContainer: {
		flex: 1
	},
	dayContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 5,
		height: 40
	},
	singleDayContainer: {
		alignSelf: 'center',
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#4291EF'
	},
	beginDayContainer: {
		height: 40,
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		backgroundColor: '#4291EF'
	},
	middleDayContainer: {
		height: 40,
		backgroundColor: '#4291EF'
	},
	endDayContainer: {
		height: 40,
		borderTopRightRadius: 20,
		borderBottomRightRadius: 20,
		backgroundColor: '#4291EF'
	},
	dayText: {
		fontSize: 15,
		color: '#333'
	},
	selectedDayText: {
		color: '#FFF'
	}
});