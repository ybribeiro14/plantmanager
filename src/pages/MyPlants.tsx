import React, { useEffect, useState } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  Alert
} from 'react-native';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { loadPlant, PlantProps, removePlant } from '../libs/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import waterdrop from '../assets/waterdrop.png';

import { Header } from '../components/Header';
import { FlatList } from 'react-native-gesture-handler';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 😢',
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setMyPlants((oldData) => (
              oldData.filter(item => item.id !== plant.id)
            ))
          } catch (error) {
            Alert.alert('Não foi possível remover');
          }
        }
      }
    ])
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      );

      setNextWatered(`Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime} hora(s).`);

      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  if(loading)
    return <Load />
  return (
   <View style={styles.container}>
     <Header />

     <View style={styles.spotligth}>
       <Image source={waterdrop} style={styles.spotligthImage}/>
       <Text style={styles.spotligthText}>{nextWatered}</Text>
     </View>

     <View style={styles.plants}>
       <Text style={styles.plantsTitle}>Próximas Regadas</Text>

      <FlatList
        data={myPlants}
        keyExtractor={(item)=> String(item.id)}
        renderItem={({ item }) => (
          <PlantCardSecondary data={item} handleRemove={() => {handleRemove(item)}}/>
        )}
        showsVerticalScrollIndicator={false}
      />
     </View>
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 10,
    backgroundColor: colors.background
  },
  spotligth: {
    backgroundColor: colors.blue_light,
    paddingHorizontal:20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spotligthImage : {
    width: 60,
    height: 60
  },
  spotligthText : {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    textAlign: 'justify'
  },
  plants : {
    flex: 1,
    width: '100%'
  },
  plantsTitle : {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  },
})