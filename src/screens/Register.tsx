import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useRegistrationForm} from '~/hooks';
import {type RootStackParamList} from '~/types';
import {Forms, Sizing, Buttons, Typography, Colors} from '~/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const Register: React.FC<Props> = ({navigation}) => {
  const {
    values,
    errors,
    onChangeEmail,
    onChangePassword,
    onChangeUsername,
    onSubmit,
    disableSubmit,
  } = useRegistrationForm();

  const onRegister = () => {
    if (onSubmit()) {
      navigation.replace('OTP');
    }
  };

  return (
    <SafeAreaView>
      <View style={style.baseContainer}>
        <Text style={style.headerText}>Create Account</Text>
        <View style={style.inputContainer}>
          <Text style={style.inputLabel}>Username</Text>
          <TextInput
            onChangeText={onChangeUsername}
            style={style.inputField}
            placeholder="Username"
            value={values.username}
          />
          {errors.username && (
            <Text style={style.errorLabel}>{errors.username}</Text>
          )}
        </View>
        <View style={style.inputContainer}>
          <Text style={style.inputLabel}>Email</Text>
          <TextInput
            onChangeText={onChangeEmail}
            value={values.email}
            style={style.inputField}
            placeholder="Email"
            keyboardType="email-address"
          />
          {errors.email && <Text style={style.errorLabel}>{errors.email}</Text>}
        </View>
        <View style={style.inputContainer}>
          <Text style={style.inputLabel}>Password</Text>
          <TextInput
            onChangeText={onChangePassword}
            value={values.password}
            style={style.inputField}
            placeholder="Password"
            secureTextEntry
          />
          {errors.password && (
            <Text style={style.errorLabel}>{errors.password}</Text>
          )}
        </View>
        <TouchableOpacity
          style={{...style.button, opacity: disableSubmit ? 0.5 : 1}}
          onPress={onRegister}
          disabled={disableSubmit}>
          <Text style={style.buttonText}>Register</Text>
        </TouchableOpacity>
        <View style={style.secondaryButton}>
          <Text style={style.secondaryButtonText}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={style.secondaryButtonlink}>login</Text>
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

export default Register;
