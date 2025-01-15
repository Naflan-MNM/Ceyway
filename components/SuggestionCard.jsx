import React from 'react'
import { View, Text,Image,StyleSheet} from 'react-native';


const SuggestionCard = ({ data }) => {
  return (
      <View style={styles.card}>
        <Image source={data.image} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{data.title}</Text>
          <Text style={styles.cardDescription}>{data.description}</Text>
        </View>
      </View>
    );
}
 const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
 })
export default SuggestionCard
