import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';

import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
  title: string,
  active?: boolean
}

export function EnviromentButton({title, active = false, ...rest}: EnviromentButtonProps) {
  return (
    <RectButton style={[styles.container, active && styles.containerActive]} {...rest}>
      <Text style={[styles.title, active && styles.titleActive]}>{title}</Text>
    </RectButton>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    width: 76,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 5
  },
  containerActive: {
    backgroundColor: colors.green_light
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.text
  },
  titleActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark
  }
})
