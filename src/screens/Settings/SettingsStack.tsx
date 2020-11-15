/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React, {useEffect} from 'react';
import {Profile} from '../../core/profile';
import {ProfileScreen} from './ProfileScreen';
import {ChangeNameScreen} from './ChangeNameScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {appSelector} from '../../store/app';
import {EntityType} from '../../core/types';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

export type SettingsStackParamList = {
  ChangeNameScreen: {data: Profile};
};

export function SettingsStack(): React.ReactElement {
  const app = useSelector(appSelector);
  const screen = app.screen as EntityType;
  const navigation = useNavigation();

  useEffect(() => {
    if (screen) {
      const stackName = app.entitiesMap[screen].name;
      if (stackName === undefined) return;
      console.log('Navigate to', screen);
      navigation.navigate(stackName, {
        screen: `${screen}DetailsScreen`,
        params: {
          id: '0',
        },
      });
    }
  }, [screen]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={ProfileScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="ChangeNameScreen"
        component={ChangeNameScreen}
        options={{
          title: 'Changing name',
        }}
      />
    </Stack.Navigator>
  );
}
