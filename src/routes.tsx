import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import OrphanageDetails from './pages/OrphanageDetails';

import OrphanageData from './pages/createOrphanage/OrphanageData';

import SelectMapPosition from './pages/createOrphanage/SelectMapPosition';

import OrphanagesMap from './pages/OrphanagesMaps';
import Header from './components/Header';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false, cardStyle: { backgroundColor: '#f2f3f5'}}} >

        <Screen 
        name= 'OrphanagesMaps' 
        component={OrphanagesMap} 
        />

        <Screen 
        name= 'OrphanagesDetails' 
        component={OrphanageDetails} 
        options={{
          headerShown: true,
          header: ()=>{
            return <Header showCancel ={false} title="Orfanato" />
          }
        }}
        />

        <Screen 
        name= 'SelectMapPosition' 
        component={SelectMapPosition} 
        options={{
          headerShown: true,
          header: ()=>{
            return <Header showCancel ={true} title="Selecione no mapa" />
          }
        }}
        />

         <Screen 
        name= 'OrphanageData' 
        component={OrphanageData} 
        options={{
          headerShown: true,
          header: ()=>{
            return <Header showCancel ={true} title="Informe os dados" />
          }
        }}
        />
        
      </Navigator>
    </NavigationContainer>
  )  
}