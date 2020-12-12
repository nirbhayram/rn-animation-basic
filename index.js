/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Twitter from './src/app/module/twitter/components/index';
import InShort from './src/app/module/inshort/components';
import {WobbleExample, SnackbarAnimation} from './src/app/module/reanimated';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => SnackbarAnimation);
