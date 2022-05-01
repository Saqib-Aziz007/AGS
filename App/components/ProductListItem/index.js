import React from 'react';
import {View, Image, Text, TouchableOpacity, Alert} from 'react-native';

import styles from './styles';

const ProductListItem = ({listItem, onLongPress, onPress, containerStyle}) => {
  const {_data} = listItem;
  // console.log(`---------${JSON.stringify(_data, null, 2)}---------`);
  return (
    <TouchableOpacity
      key={_data?.id?.split('Z')[0]}
      onPress={onPress}
      onLongPress={() =>
        Alert.alert('Alert!', 'Are you sure?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Delete', onPress: () => onLongPress(_data?.id)},
        ])
      }
      style={[styles.listItem, containerStyle]}>
      <Image source={{uri: _data?.productImage}} style={styles.image} />
      <View style={styles.mainView}>
        <View>
          <Text style={styles.titleText}>{_data?.name}</Text>
          <Text style={styles.subTitle}>{_data?.desc}</Text>
        </View>
        <View>
          <Text style={{...styles.subTitle, color: '#104F55'}}>
            Retail Price
          </Text>
          <Text style={styles.pkrText}>
            PKR:{' '}
            <Text
              style={{
                ...styles.titleText,
                color: 'black',
                fontSize: 16,
              }}>
              {_data?.retailPrice}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductListItem;
