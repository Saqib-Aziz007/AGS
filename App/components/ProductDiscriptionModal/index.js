import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const ProductDescriptionModal = ({modalVisible, setModalVisible, listItem}) => {
  const {_data} = listItem;
  // console.log(listItem + '----------');
  // const _data = {};
  return (
    <Modal visible={modalVisible} transparent={true}>
      <View style={styles.modalOuterView}>
        <Icon
          style={{position: 'absolute', top: 30, left: 30}}
          name="chevron-left"
          color="black"
          size={20}
          onPress={() => setModalVisible(false)}
        />
        <View style={styles.modalInnerView}>
          <ScrollView
            style={{width: '90%'}}
            contentContainerStyle={{
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#104F55',
                fontWeight: '400',
                fontSize: 24,
                alignSelf: 'center',
              }}>
              {_data?.name}
            </Text>
            {/* </View> */}
            <Image
              source={{uri: _data?.productImage}}
              style={{
                height: 180,
                width: 180,
                borderRadius: 90,
                backgroundColor: 'lightgrey',
                alignSelf: 'center',
                marginTop: 50,
                marginBottom: 50,
                borderColor: '#104F55',
                borderWidth: 1.5,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#104F55',
                  fontWeight: '400',
                  marginBottom: 12,
                }}>
                Retail Price
              </Text>
              <Text style={{fontWeight: '300', color: '#104F55', fontSize: 10}}>
                {'PKR '}
                <Text
                  style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
                  {_data?.retailPrice}
                </Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#104F55',
                  fontWeight: '400',
                  marginBottom: 12,
                }}>
                Invoice Price
              </Text>
              <Text style={{fontWeight: '300', fontSize: 10, color: '#104F55'}}>
                {'PKR '}
                <Text
                  style={{fontWeight: 'bold', fontSize: 16, color: 'black'}}>
                  {_data?.inVoicePrice}
                </Text>
              </Text>
            </View>
            <View
              style={{
                // flexDirection: 'row',
                justifyContent: 'space-between',
                // alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  marginBottom: 8,
                  color: '#104F55',
                }}>
                Description
              </Text>
              {/* <View style={{...styles.modalSeparator, marginTop: 4}} /> */}
              <Text style={{fontSize: 14, color: 'darkgray'}}>
                {_data?.desc}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ProductDescriptionModal;
