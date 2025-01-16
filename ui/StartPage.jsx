import React,{ useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity,ImageBackground } from 'react-native';
import SuggestionCard from '../components/SuggestionCard';
import MainStartPage from './MainStartPage';


// StartPage Component
const StartPage = ({navigation}) => {
    
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([ // Sample data for the suggestions section 
    {
      id: '1',
      title: 'Ella Sri Lanka',
      description: "Ella is not just a destination; it's a journey into nature's heart.",
      image: require('../assets/images/ella.jpg'),  
    },
    {
      id: '2',
      title: 'Casuarina Beach',
      description: 'Casuarina Beach where the horizon meets tranquility.',
      image: require('../assets/images/casuarina.jpg'),  
    },
    {
      id: '3',
      title: 'Horton Plains',
      description: 'Step into Horton Plains, where nature whispers its secrets.',
      image: require('../assets/images/horton.jpg'),  
    },
    {
      id: '4',
      title: 'Knuckles Mountain Range',
      description: 'Find serenity in the misty peaks of the Knuckles Range.',
      image: require('../assets/images/knuckles.jpg'),  
    },
  ]);

  const handleSearch = (text) => {
    setSearchText(text);

    // Check for specific search text and navigate
    if (text.toLowerCase() === 'jaffna') {
      navigation.navigate('MainStartPage');
    }

    // Filter suggestions based on search text
    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.title.toLowerCase().includes(text.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  return (
    <ImageBackground
          source={require('../assets/images/wheretogo.jpg')}
          style={styles.background}
    >
      <View >
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Where To Go</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Text>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Suggestions Section */}
      <FlatList
        data={suggestions}
        renderItem={({ item }) => <SuggestionCard data={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.suggestionsContainer}
      />
    </View>
    </ImageBackground>
    
  );
};

// Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    padding: 30,
    alignItems: 'center',
    elevation: 3,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  suggestionsContainer: {
    paddingHorizontal: 15,
  },
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
});

export default StartPage;
