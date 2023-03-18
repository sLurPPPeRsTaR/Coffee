import { WHITE, YELLOW, RED, BLUE } from '@styles/colors';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { Poppins, PoppinsBold, PoppinsSemiBold } from '@styles/fonts';

interface IModal {
  header: string;
  content: string;
  onOk: () => void;
  onCancel: () => void;
}

import { RFValue } from 'react-native-responsive-fontsize';

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = Dimensions.get('window').height / 2.7;

const ModalContent: React.FC<IModal> = ({ onOk, onCancel, header, content }) => {
  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.viewText}>
          <Text style={[styles.text, { fontSize: RFValue(20), fontFamily: PoppinsBold }]}>
            {header}
          </Text>
          <View
            style={{
              borderWidth: 2,
              borderColor: YELLOW,
              borderStyle: 'solid',
              marginHorizontal: 30,
              marginVertical: 10,
            }}
          ></View>
          <Text style={styles.text}>{content}</Text>
        </View>
        <View style={styles.viewButton}>
          <TouchableOpacity style={[styles.button, { backgroundColor: BLUE }]} onPress={onCancel}>
            <Text style={styles.textButton}>Tidak</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: RED }]} onPress={onOk}>
            <Text style={styles.textButton}>Iya</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000070',
  },
  modal: {
    height: HEIGHT_MODAL,
    width: WIDTH - 60,
    padding: 10,
    backgroundColor: WHITE,
    borderColor: RED,
    borderWidth: 5,
    borderRadius: 10,
  },
  viewText: {
    flex: 1,
  },
  text: {
    margin: 5,
    fontSize: RFValue(16),
    fontFamily: Poppins,
    textAlign: 'center',
  },
  viewButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textButton: {
    fontFamily: PoppinsSemiBold,
    fontSize: RFValue(18),
  },
});

export default ModalContent;
