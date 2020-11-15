/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Twitter from './src/app/module/twitter/components/index';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Twitter);
