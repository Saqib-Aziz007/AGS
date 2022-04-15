import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    padding: 16,
  },
  listItem: {
    height: 80,
    width: '100%',
    backgroundColor: 'white',
    elevation: 10,
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 4,
    borderColor: 'purple',
    borderWidth: 0.5,
  },
  titleText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  subTitle: {
    color: 'gray',
    fontSize: 12,
    // fontWeight: '500',
    marginBottom: 4,
  },
  image: {
    height: 80,
    width: 80,
    backgroundColor: 'lightgrey',
    borderColor: 'purple',
    borderRightWidth: 1,
  },
  mainView: {
    flex: 1,
    // backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  pkrText: {
    fontSize: 10,
    fontWeight: '300',
  },
});

export default styles;
