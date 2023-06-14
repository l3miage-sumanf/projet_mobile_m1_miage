import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
  },
  containerCard: {
    flex: 1,
    padding: 16,
  },
  headingCard: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D81F26',
    marginBottom: 10,
  },
  movieItemCard: {
    flex: 0.5,
    aspectRatio: 0.7,
    margin: 5,
  },
  posterImageCard: {
    flex: 1,
    borderRadius: 10,
  },
  emptyTextCard: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  text : {
    color: 'white'
  },
  popupContainer: {
    position: 'absolute',
    alignItems: 'center',
    left: '10%',
    width: '90%',
    backgroundColor: '#E50914',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 9999,
  },
  popupText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
