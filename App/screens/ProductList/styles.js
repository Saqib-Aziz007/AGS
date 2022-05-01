import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#104F55',
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 10,
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  listView: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  listItem: {
    height: 80,
    width: '100%',
    backgroundColor: 'white',
    elevation: 10,
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
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
});

export default styles;
