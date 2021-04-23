import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Button } from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/core';

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'hug' | 'smile';
  nextScreen: string;
}

const emojis = {
  hug: '🤗',
  smiles: '😁'
}

export function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen,
  } = routes.params as Params;

  function handleSubmit() {
    navigation.navigate(nextScreen);
  }

  return (
    <SafeAreaView style={ styles.container }>
        <View style={ styles.content }>
            <Text style={ styles.emoji }>
              {emojis[icon]}
            </Text>
            <Text style={styles.title}>
              {title}
            </Text>

            <Text style={styles.subTitle}>
              {subtitle}
            </Text>

            <View style={styles.footer}>
              <Button title={buttonTitle} onPress={handleSubmit}/>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30
  },
  emoji: {
    fontSize: 78
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: colors.heading,
    fontFamily: fonts.text
  },
  title: {
    fontSize: 22,
    lineHeight: 38,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 15
  },
  footer: {
    width: '100%',
    paddingHorizontal: 75,
    marginTop: 20
  }
})
