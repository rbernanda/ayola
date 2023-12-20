import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useLoginForm} from '~/hooks';
import type {RootStackParamList} from '~/types';
import {Buttons, Sizing, Typography, Forms, Colors} from '~/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({navigation}: Props) => {
  const {
    errors,
    onChangePassword,
    onChangeUsername,
    onSubmit,
    values,
    disableSubmit,
  } = useLoginForm();

  return (
    <SafeAreaView>
      <View style={style.baseContainer}>
        <Text style={style.headerText}>Login</Text>
        <View style={style.inputContainer}>
          <Text style={style.inputLabel}>Username</Text>
          <TextInput
            onChangeText={onChangeUsername}
            value={values.username}
            style={style.inputField}
            placeholder="Username"
          />
          {errors.username && (
            <Text style={style.errorLabel}>{errors.username}</Text>
          )}
        </View>
        <View style={style.inputContainer}>
          <Text style={style.inputLabel}>Password</Text>
          <TextInput
            style={style.inputField}
            placeholder="Password"
            secureTextEntry
            value={values.password}
            onChangeText={onChangePassword}
          />
          {errors.password && (
            <Text style={style.errorLabel}>{errors.password}</Text>
          )}
        </View>
        <TouchableOpacity
          style={{...style.button, opacity: disableSubmit ? 0.5 : 1}}
          onPress={onSubmit}
          disabled={disableSubmit}>
          <Text style={style.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={style.secondaryButton}>
          <Text style={style.secondaryButtonText}>
            Does not have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.replace('Register')}>
            <Text style={style.secondaryButtonlink}>register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  baseContainer: {paddingHorizontal: Sizing.x10},
  headerText: {
    ...Typography.header.x60,
    marginBottom: Sizing.x30,
  },
  inputContainer: {marginBottom: Sizing.x20},
  inputLabel: {...Forms.inputLabel.primary},
  inputField: {...Forms.input.primary, marginBottom: Sizing.x3},
  button: {
    ...Buttons.bar.primary,
    marginBottom: Sizing.x10,
  },
  buttonText: {
    ...Buttons.barText.primary,
  },
  secondaryButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: Sizing.x2,
    ...Buttons.bar.secondary,
    marginBottom: Sizing.x10,
  },
  secondaryButtonText: {
    ...Buttons.barText.secondary,
  },
  secondaryButtonlink: {
    color: Colors.primary.s200,
    textDecorationLine: 'underline',
  },
  errorLabel: {
    color: Colors.danger.s400,
    fontSize: Sizing.x15,
  },
});

export default Login;
