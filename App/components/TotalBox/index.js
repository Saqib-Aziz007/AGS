import React from 'react';
import {View, Text} from 'react-native';

const AmountBox = ({text, amount}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        // height: 100,
        // width: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'purple',
        borderRadius: 16,
        marginVertical: 12,
        elevation: 10,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 8,
      }}>
      <Text style={{textAlign: 'center', color: 'purple'}}>{text}</Text>
      <Text style={{color: 'black', fontWeight: '500', fontSize: 20}}>
        {amount}
      </Text>
    </View>
  );
};

export default AmountBox;
