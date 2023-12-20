import React from 'react';
import {Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAuthStore} from '~/store';
import type {RootStackParamList} from '~/types';
import {Buttons, Sizing, Typography} from '~/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = () => {
  const {logout, user} = useAuthStore();

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.headerText}>Welcome, {user?.username}</Text>
      <TouchableOpacity style={style.button} onPress={logout}>
        <Text style={style.buttonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Sizing.x10,
  },
  button: {
    ...Buttons.bar.danger,
    paddingHorizontal: Sizing.x10,
    width: Sizing.screen.width * 0.95,
  },
  buttonText: {
    ...Buttons.barText.primary,
    textAlign: 'center',
  },
  headerText: {
    ...Typography.header.x70,
    marginBottom: Sizing.x10,
  },
});

export default HomeScreen;
