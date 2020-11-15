/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Twitter from './src/app/twitter/components/index';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Twitter);
