import React, {PureComponent} from 'react';

import {
	StyleSheet
} from 'react-native';

import {DraggableCalendar} from '../../components/DraggableCalendar/index';

export class Demo3 extends PureComponent {
	_genStyles() {
		return {
			style: styles.draggableContainer,
			headerTextStyle: styles.dayText,
			monthHeaderTextStyle: styles.dayText,
			dayTextStyle: styles.dayText,
			selectedDayTextStyle: styles.selectedDayText,
			singleDayContainerStyle: styles.selectedDayContainer,
			beginDayContainerStyle: styles.selectedDayContainer,
			middleDayContainerStyle: styles.selectedDayContainer,
			endDayContainerStyle: styles.selectedDayContainer
		};
	}
	render() {
		return (
			<DraggableCalendar {...this._genStyles()}/>
		);
	}
}

const styles = StyleSheet.create({
	draggableContainer: {
		backgroundColor: '#4291EF'
	},
	dayText: {
		color: '#FFF'
	},
	selectedDayText: {
		color: '#4291EF'
	},
	selectedDayContainer: {
		backgroundColor: '#FFF'
	}
});