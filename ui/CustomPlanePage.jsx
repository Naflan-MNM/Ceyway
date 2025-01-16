import React, { useContext } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { CeywayContext } from '../context/CeywayContext';
import CustomPageHeader from '../components/CustomPageHeader';
import ItemCard from '../components/ItemCard';

const CustomPlanePage = () => {
    const { jaffnaData, selectedItems, toggleSelection } = useContext(CeywayContext);

    return (
        <View style={styles.container}>
            <CustomPageHeader />
            <ScrollView>
                {jaffnaData.map((item) => (
                    <ItemCard 
                        key={item.id} 
                        data={item} 
                        isSelected={selectedItems.includes(item.id)} 
                        toggleSelection={toggleSelection} 
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
});

export default CustomPlanePage;
