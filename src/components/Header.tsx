import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  showCancel: boolean;
}


export default function Header(props: HeaderProps) {

  const navigation = useNavigation();

  return(
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}> 
        <Feather name='arrow-left' size={24} color='#15b6de' />
      </BorderlessButton>

      <Text style={styles.title} >
        {props.title}
      </Text>

      {  props.showCancel ? (
        <BorderlessButton onPress={()=>{navigation.navigate('OrphanagesMaps')}} > 
        <Feather name='x' size={24} color='#ff669d' />
      </BorderlessButton>
      ) : (
        <View />
      ) }

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    padding:24,
    backgroundColor:'#f9fafc',
    borderBottomWidth:1,
    borderColor:'#dde3f9',
    paddingTop:35,

    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  title:{
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    color:'#8fa7b3'
  }
})