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

export const stylesDetailsMovie = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  imageBackground: {
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'black',
    flex: 1,
  },
  addButton: {
    alignSelf: 'center',
    top: -20,
    backgroundColor: '#e50914',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 26,
    paddingRight: 50,
    paddingLeft: 50,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recommended: {
    color: '#30d158',
    fontSize: 14,
    fontWeight: 'bold',
  },
  originalLanguage: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginBottom: 10,
  },
  detailsBeforeDescription: {
    color: 'white',
    marginBottom: 8,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  suggestionsHeading: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
