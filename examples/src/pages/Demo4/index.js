import React, {PureComponent} from 'react';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import {DraggableCalendar} from '../../components/DraggableCalendar/index';

export class Demo4 extends PureComponent {

  constructor(props) {
    super(props);
  }

  onGetTime = () => {
    console.log('onGetTime: ', this._calendar.getSelection());
  };

  onSelectionChange = (newSelection) => {
    console.log('onSelectionChange', newSelection);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <DraggableCalendar
          ref={_ => this._calendar = _}
          onSelectionChange={this.onSelectionChange}
        />
        <TouchableOpacity onPress={this.onGetTime} style={{
          justifyContent: 'center', alignItems: 'center',
          left: 0, right: 0, bottom: 0, paddingVertical: 15,
          position: 'absolute', backgroundColor: '#4291EF'
        }}>
          <Text style={{color: '#FFF'}}>Get Time</Text>
        </TouchableOpacity>
      </View>
    );
  }
}