import React, {PureComponent} from 'react';

import {
	StyleSheet
} from 'react-native';

import {DraggableCalendar} from '../../components/DraggableCalendar/index';

export class Demo2 extends PureComponent {
	_genStyles() {
		return {
			style: styles.draggableContainer,
			monthHeaderTextStyle: styles.monthHeaderText,
			singleDayContainerStyle: styles.selectedDayContainer,
			beginDayContainerStyle: styles.selectedDayContainer,
			middleDayContainerStyle: styles.selectedDayContainer,
			endDayContainerStyle: styles.selectedDayContainer
		};
	}
	render() {
		return <DraggableCalendar {...this._genStyles()}/>;
	}
}

const styles = StyleSheet.create({
	draggableContainer: {
		backgroundColor: '#FFF'
	},
	monthHeaderText: {
		textAlign: 'center'
	},
	selectedDayContainer: {
		backgroundColor: '#50AD98'
	}
});