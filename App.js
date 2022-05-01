import {firebase} from '@react-native-firebase/app';
import React, {useEffect} from 'react';
import ProductList from './App/screens/ProductList/index';

const App = () => {
  useEffect(() => {
    // firebase.initializeApp();
  }, []);

  return <ProductList />;
};

export default App;
