import React, { useContext } from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';
import { CeywayContext } from '../context/CeywayContext';
import CustomPageHeader from '../components/CustomPageHeader';
import ItemCard from '../components/ItemCard';
import FooterNavigation from '../components/FooterNavigation';

/*                                              

































no in use 


























*/

const CustomPlanePage = ({ navigation }) => {
    const { destinationData, selectedItems, toggleSelection } = useContext(CeywayContext);

    return (
        <SafeAreaView style={styles.container}>
            <CustomPageHeader />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {destinationData.map((item) => (
                    <ItemCard 
                        key={item.id} 
                        data={item} 
                        isSelected={selectedItems.includes(item.id)} 
                        toggleSelection={toggleSelection} 
                    />
                ))}
            </ScrollView>
            <FooterNavigation navigation={navigation} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        flexGrow: 1, 
        paddingHorizontal: 6, 
        paddingBottom: 60, 
    },
});

export default CustomPlanePage;
