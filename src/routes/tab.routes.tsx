import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import colors from '../styles/colors';
import {Welcome} from '../pages/Welcome';
import {Confirmation} from '../pages/Confirmation';
import {UserIdentification} from '../pages/UserIdentification';
import { PlantSelect } from '../pages/PlantSelect';
import { PlantSave } from '../pages/PlantSave';
import { MyPlants } from '../pages/MyPlants';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const AppTab = createBottomTabNavigator();

const AuthRoutes: React.FC = () => (
  <AppTab.Navigator
    tabBarOptions={{
      activeTintColor: colors.green,
      inactiveTintColor: colors.heading,
      labelPosition: 'beside-icon',
      style: {
        paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        height: 88
      }
    }}
  >
    <AppTab.Screen
      name="Nova Planta"
      component={PlantSelect}
      options={{
        tabBarIcon: (({ size, color}) => (
          <MaterialIcons
            name="add-circle-outline"
            size={size}
            color={color}
          />
        ))
      }}
    />

    <AppTab.Screen
      name="Minhas Plantas"
      component={MyPlants}
      options={{
        tabBarIcon: (({ size, color}) => (
          <MaterialIcons
            name="format-list-bulleted"
            size={size}
            color={color}
          />
        ))
      }}
    />

  </AppTab.Navigator>
)

export default AuthRoutes;