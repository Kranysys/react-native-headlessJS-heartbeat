import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { setHeartBeat, store } from './store';

import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'

var initiated = 0;

const MyHeadlessTask = async () => {
  if(!initiated) {
    console.log('Initiated');
    //Beacons.startMonitoringForRegion('REGION1');
    initiated=1;
  }
  console.log('Receiving HeartBeat!');
  store.dispatch(setHeartBeat(true));
  setTimeout(() => {
    store.dispatch(setHeartBeat(false));
  }, 1000);
};

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
