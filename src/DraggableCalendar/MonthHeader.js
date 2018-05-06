import React, {PureComponent} from 'react';

import {
	View,
	Text,
	StyleSheet
} from 'react-native';

export class MonthHeader extends PureComponent {
	render() {
		const {identifier, monthHeaderTextStyle, renderMonthHeader} = this.props;
		const [year, month] = identifier.split('-');
		return (
			<View>
				{renderMonthHeader ?
					renderMonthHeader(identifier) :
					<Text style={[styles.monthHeaderText, monthHeaderTextStyle]}>
						{`${parseInt(year)}年${parseInt(month)}月`}
					</Text>
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	monthHeaderText: {
		marginLeft: 15,
		marginVertical: 15,
		fontSize: 18,
		color: '#333'
	}
});