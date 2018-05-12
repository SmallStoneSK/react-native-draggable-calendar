import {Home} from './src/pages/Home/index';
import {Demo1} from './src/pages/Demo1/index';
import {Demo2} from './src/pages/Demo2/index';
import {Demo3} from './src/pages/Demo3/index';
import {Demo4} from './src/pages/Demo4/index';
import {StackNavigator} from 'react-navigation';

const App = StackNavigator({
	Home: {
		screen: Home,
		navigationOptions: {
			headerTitle: '首页'
		}
	},
	Demo1: {
		screen: Demo1,
		navigationOptions: {
			headerTitle: 'Demo1'
		}
	},
	Demo2: {
		screen: Demo2,
		navigationOptions: {
			headerTitle: 'Demo2'
		}
	},
	Demo3: {
		screen: Demo3,
		navigationOptions: {
			headerTitle: 'Demo3'
		}
	},
  Demo4: {
    screen: Demo4,
    navigationOptions: {
      headerTitle: 'Demo3'
    }
  }
});

export default App;