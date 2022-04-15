import {Formik} from 'formik';
import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  PermissionsAndroid,
  TextInput,
  Button,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Yup from 'yup';

import styles from './styles';

const validate = Yup.object().shape({
  productName: Yup.string().required('Required'),
  retailPrice: Yup.string().required('Required'),
  inVoicePrice: Yup.string().required('Required'),
  productImage: Yup.string().required('Required'),
});

const AddProduct = ({modalVisible, setModalVisible, onSubmit}) => {
  const [filePath, setFilePath] = useState('');
  const [prodName, setProdName] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  const [inVoicePrice, setInVoicePrice] = useState('');
  const [desc, setDesc] = useState('');

  const openGallery = () => {
    let options = {
      mediaType: 'photo',
      quality: 0.1,
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('user cancelled the image picker');
        setModalVisible(false);
      } else if (response.errorMessage) {
        console.log('response error', response.errorMessage);
        setModalVisible(false);
      } else {
        const image = response.assets;
        console.log(image[0]?.uri, 'picked image');
        setFilePath(image[0]?.uri);
      }
    });
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openCamera();
      } else {
        openCamera();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openCamera = () => {
    console.log('open Camera');
    let options = {
      mediaType: 'photo',
      quality: 0.1,
      includeBase64: true,
      orientation: 'portrait',
      mirrorImage: false,
    };

    launchCamera(options, response => {
      console.log('open after option');
      if (response.didCancel) {
        console.log('user cancelled the image picker');
      } else if (response.errorMessage) {
        console.log('response error', response.errorMessage);
      } else {
        const image = response.assets;
        console.log(image[0]?.uri, 'picked image');
        setFilePath(image[0]?.uri);
      }
    }).catch(e => {
      console.log('err.....', e);
    });
  };
  // const chooseFile = () => {
  //   let options = {
  //     title: 'Select Image',
  //     customButtons: [
  //       {
  //         name: 'customOptionKey',
  //         title: 'Choose Photo from Custom Option',
  //       },
  //     ],
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   launchImageLibrary(options, response => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       let source = response;
  //       // You can also display the image using data:
  //       // let source = {
  //       //   uri: 'data:image/jpeg;base64,' + response.data
  //       // };
  //       setFilePath(source);
  //     }
  //   });
  // };
  return (
    <Formik
      onSubmit={values => {
        console.log(values);
        onSubmit(values);
      }}
      validationSchema={validate}
      initialValues={{
        productName: '',
        retailPrice: '',
        inVoicePrice: '',
        productImage: filePath,
      }}>
      {({values, handleChange, handleSubmit}) => {
        return (
          <Modal visible={modalVisible} transparent={true}>
            <View style={styles.modalOuterView}>
              <Icon
                style={{position: 'absolute', top: 20, left: 30}}
                name="close"
                color="black"
                size={20}
                onPress={() => setModalVisible(false)}
              />
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{flex: 1}}>
                <View style={styles.modalInnerView}>
                  <Text
                    style={{color: 'black', fontSize: 24, fontWeight: '400'}}>
                    Add Product
                  </Text>
                  <View
                    style={{
                      height: 170,
                      width: 170,
                      borderRadius: 85,
                      backgroundColor: '#D8D8D8',
                      overflow: 'hidden',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 40,
                      borderWidth: 2,
                      borderColor: 'purple',
                    }}>
                    {filePath.length > 2 ? (
                      <Image
                        style={{height: 250, width: 250}}
                        source={{uri: filePath}}
                      />
                    ) : (
                      <Icon
                        onPress={() => requestCameraPermission()}
                        name="plus"
                        color={'purple'}
                        size={35}
                      />
                    )}
                  </View>
                  <View style={{marginVertical: 10}}>
                    <Text
                      style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
                      Product Name
                    </Text>
                    <TextInput
                      style={{
                        height: 40,
                        width: 250,
                        borderWidth: 1.5,
                        borderRadius: 8,
                        color: 'black',
                        paddingHorizontal: 10,
                        borderColor: 'purple',
                      }}
                      value={prodName}
                      onChangeText={setProdName}
                    />
                  </View>
                  <View style={{marginVertical: 10}}>
                    <Text
                      style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
                      Retail Price
                    </Text>
                    <TextInput
                      style={{
                        height: 40,
                        width: 250,
                        borderWidth: 1.5,
                        borderRadius: 8,
                        color: 'black',
                        paddingHorizontal: 10,
                        borderColor: 'purple',
                      }}
                      keyboardType="numeric"
                      value={retailPrice}
                      onChangeText={setRetailPrice}
                    />
                  </View>
                  <View style={{marginVertical: 10}}>
                    <Text
                      style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
                      InVoice Price
                    </Text>
                    <TextInput
                      style={{
                        height: 40,
                        width: 250,
                        borderWidth: 1.5,
                        borderRadius: 8,
                        color: 'black',
                        paddingHorizontal: 10,
                        borderColor: 'purple',
                      }}
                      keyboardType="numeric"
                      value={inVoicePrice}
                      onChangeText={setInVoicePrice}
                    />
                  </View>
                  <View style={{marginVertical: 10}}>
                    <Text
                      style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
                      Product Description
                    </Text>
                    <TextInput
                      style={{
                        height: 80,
                        width: 250,
                        borderWidth: 1.5,
                        borderRadius: 8,
                        color: 'black',
                        paddingHorizontal: 10,
                        borderColor: 'purple',
                        textAlignVertical: 'top',
                      }}
                      multiline
                      keyboardType="numeric"
                      value={desc}
                      onChangeText={setDesc}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      console.log(
                        JSON.stringify(
                          {
                            name: prodName,
                            retailPrice: retailPrice,
                            inVoicePrice: inVoicePrice,
                            productImage: filePath,
                            desc: desc,
                          },
                          null,
                          2,
                        ),
                      );
                      onSubmit({
                        id: Math.random() * 100,
                        name: prodName,
                        retailPrice: retailPrice,
                        inVoicePrice: inVoicePrice,
                        productImage: filePath,
                        desc: desc,
                      });
                      setDesc('');
                      setFilePath('');
                      setInVoicePrice('');
                      setProdName('');
                      setRetailPrice('');
                      setModalVisible(false);
                    }}
                    style={{
                      backgroundColor: 'purple',
                      height: 56,
                      width: 250,
                      marginVertical: 20,
                      borderRadius: 24,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: 'white', fontSize: 20, fontWeight: '500'}}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default AddProduct;
