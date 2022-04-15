import React, {useState, useEffect} from 'react';
import {
  FlatList,
  TextInput,
  Image,
  StatusBar,
  Text,
  View,
  Modal,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

import ProductListItem from '../../components/ProductListItem';
import ProductDescriptionModal from '../../components/ProductDiscriptionModal';

import styles from './styles';
import AddProduct from '../../components/AddProductModal';
import AmountBox from '../../components/TotalBox';

const ProductList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [listItem, setListItem] = useState({_data: {}});
  const [products, setProducts] = useState([]);
  const [addProduct, setAddProduct] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  // const [total, seTotal] = useState({
  //   totalProducts: 0,
  //   totalRetailPrice: 0,
  //   totalInvoicePrice: 0,
  // });
  // let totalProducts = 0;
  // let totalRetailPrice = 0;
  // let totalInvoicePrice = 0;

  const addProducts = async values => {
    const date = new Date();
    const doc = await firestore()
      .collection('products')
      .doc(date.toISOString());
    // console.log({
    //   name: values?.name,
    //   desc: values?.desc,
    //   retailPrice: values?.retailPrice,
    //   inVoicePrice: values?.inVoicePrice,
    //   productImage: values?.productImage,
    // });
    doc.set({
      id: date.toISOString(),
      name: values?.name,
      desc: values?.desc,
      retailPrice: values?.retailPrice,
      inVoicePrice: values?.inVoicePrice,
      productImage: values?.productImage,
    });
  };

  const deleteProduct = async id => {
    await firestore()
      .collection('products')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Product Deleted');
      });
  };

  const filterList = list =>
    list.filter(item =>
      item?._data?.name?.toLowerCase().includes(searchText.toLowerCase()),
    );

  useEffect(() => {
    const getData = async () => {
      const doc = await firestore()
        .collection('products')
        .onSnapshot(data => setProducts(data?.docs));
    };
    getData();
    return setSearchText('');
  }, []);
  return (
    <>
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor={'purple'} />
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.header}>
            <Text style={styles.title}>ProductList</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 60,
              }}>
              {search ? (
                <Icon
                  name="close"
                  onPress={() => setSearch(!search)}
                  color={'white'}
                  size={20}
                />
              ) : (
                <Icon
                  name="search"
                  onPress={() => setSearch(!search)}
                  color={'white'}
                  size={20}
                />
              )}
              <Icon
                onPress={() => setAddProduct(true)}
                name="plus"
                color={'white'}
                size={20}
              />
            </View>
          </View>
          {search ? null : (
            <View
              style={{
                // backgroundColor: 'red',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // height: 120,
                // width: '100%',
                paddingHorizontal: 16,
              }}>
              <AmountBox text={'Total Products'} amount={products.length} />
              {/* <AmountBox
                text={'Total\nRetail Price'}
                amount={totalRetailPrice}
              />
              <AmountBox
                text={'Total\nInvoice Price'}
                amount={totalInvoicePrice}
              /> */}
            </View>
          )}
          {search ? (
            <View>
              <TextInput
                style={{
                  width: '90%',
                  height: 48,
                  backgroundColor: 'white',
                  borderWidth: 1.5,
                  borderColor: 'purple',
                  alignSelf: 'center',
                  marginTop: 20,
                  borderRadius: 24,
                  paddingHorizontal: 20,
                  fontSize: 20,
                  color: 'black',
                }}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search Product"
              />
            </View>
          ) : null}
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View style={styles.listView}>
              {filterList(products)?.map((item, index) => {
                // const listItem = item?._data;
                // // console.log(listItem);
                // totalProducts = totalProducts++;
                // totalRetailPrice = totalRetailPrice + item?.retailPrice;
                // totalInvoicePrice = totalInvoicePrice + item?.inVoicePrice;
                return (
                  <ProductListItem
                    onPress={() => (setModalVisible(true), setListItem(item))}
                    onLongPress={id => deleteProduct(id)}
                    listItem={item}
                    containerStyle={{
                      marginBottom: products.length - 1 === index ? 30 : 4,
                    }}
                  />
                );
              })}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
      <ProductDescriptionModal
        modalVisible={modalVisible}
        listItem={listItem}
        setModalVisible={setModalVisible}
      />
      <AddProduct
        modalVisible={addProduct}
        onSubmit={values => addProducts(values)}
        setModalVisible={setAddProduct}
      />
    </>
  );
};

export default ProductList;
