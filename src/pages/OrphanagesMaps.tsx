import React, { useState} from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../services/api';

import happy from '../images/happy.png'

interface Orphanage{
  id: number;
  name: string;
  longitude: number;
  latitude: number;
}


export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])
  const navigation = useNavigation();

  // console.log(orphanages)

  useFocusEffect(()=>{
    api.get('orphanages').then(response =>{
      setOrphanages(response.data);
    })
  }, [] )

  function handleNavigateToOrphaDeta(id:number) {
    navigation.navigate('OrphanagesDetails', {id})
  }

  function handleNavigateToCreate() {
    navigation.navigate('SelectMapPosition')
    
  }

  return(
  <View style={styles.container}>
      <MapView
       provider = { PROVIDER_GOOGLE}
       style={styles.map} 
       initialRegion={{
        latitude: -23.5267829,
        longitude: -46.5451525,
        latitudeDelta:0.008,
        longitudeDelta:0.008,
      }}
      >
      {orphanages.map(orphanage =>{
        return(
              <Marker 
              key={orphanage.id}
              calloutAnchor = {{
                x: 2.60,
                y: .9,
              }}
                icon= {happy}
                coordinate={{
                  latitude: orphanage.latitude,
              longitude: orphanage.longitude,
                }}
              >
                <Callout tooltip onPress={()=> handleNavigateToOrphaDeta(orphanage.id)}>
                  <View style={styles.calloutContainer} >
                    <Text style={styles.calloutText} >
                      {orphanage.name}
                    </Text>
                  </View>
                </Callout>
              </Marker>
        );
      })}
      </MapView>

          <View style={styles.footer} >
              <Text style = {styles.footerText} >{orphanages.length} Orfanatos encontrados</Text>

              <RectButton style={styles.createOrphsButoon} onPress={handleNavigateToCreate} >
                <Feather name='plus' size={20} color='#fff' />
              </RectButton>

          </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  callout: {
    borderRadius:30
  },
  calloutContainer:{
    width:150,
    height:56,
    paddingHorizontal:16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    justifyContent:"center",
  },
  calloutText:{
    color:'#0089a5',
    fontSize:14,
    fontFamily:'Nunito_700Bold',
  },
  footer:{
    position: 'absolute',
    left: 20,
    right:20,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height:56,
    paddingLeft:24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center",

  },
  footerText:{
    fontFamily:'Nunito_700Bold',
    color:'#8fa7b3'
  },
  createOrphsButoon:{
    width:54,
    height:54,
    backgroundColor: "#15c3d6",
    borderRadius:20,

    justifyContent:'center',
    alignItems:'center',
  },

});

