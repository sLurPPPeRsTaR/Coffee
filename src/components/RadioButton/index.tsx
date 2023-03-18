import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Spacer } from '@components';
import { capitalize } from '@utils/text';
import { MontserratSemiBold } from '@styles/fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { YELLOW } from '@styles/colors';

type Props = {
  options: Array<{ option: string; selected: boolean }>;
  optionKey: string;
  handleChooseOption: (optionKey: string, option: string) => void;
};

export default class RadioButton extends Component<Props> {
  render() {
    const options = this.props.options.map(val => ({
      key: val.option,
      selected: val.selected,
      text: capitalize(val.option),
    }));

    return (
      <View>
        {options.map(res => {
          return (
            <View key={res.key} style={styles.container}>
              <TouchableOpacity
                style={styles.radioCircle}
                onPress={() => {
                  this.props.handleChooseOption(this.props.optionKey, res.key);
                }}
              >
                {res.selected && <View style={styles.selectedRb} />}
              </TouchableOpacity>
              <Spacer width={10} />
              <Text style={styles.radioText}>{res.text}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  radioText: {
    fontFamily: MontserratSemiBold,
    fontSize: RFValue(14),
    color: '#000',
  },
  radioCircle: {
    height: 15,
    width: 15,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: YELLOW,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 7,
    height: 7,
    borderRadius: 50,
    backgroundColor: YELLOW,
  },
  result: {
    marginTop: 20,
    color: 'white',
    fontWeight: '600',
    backgroundColor: '#F3FBFE',
  },
});
