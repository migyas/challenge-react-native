import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import api from '../../services/api';


const Catalog = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('/products').then(response => {
            setProducts(response.data);
        })
        console.log(setProducts);
    }, []);

    async function handleAddProduct() {
        const response = await api.post('products', {
            id: `${Date.now() + 1}`,
            title: 'Novo Produto',
            price: 0
        });

        const product = response.data;

        setProducts([...products, product]);
    }


    return (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView  >
                    {products.length > 0 ?

                        <FlatList
                            style={styles.products}
                            data={products}
                            keyExtractor={(item) => item.title}
                            renderItem={({ item: project }) => (
                                <>
                                    <View style={styles.productItem}>
                                        <Text style={styles.productItemTitle}>{project.title}</Text>
                                        <Text style={styles.productItemPrice}>R$ {project.price}</Text>
                                    </View>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={styles.productButton}
                                    >
                                        <Text style={styles.productButtonText}>Adicionar ao carrinho</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        />
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                            <Text style={{ fontSize: 23, fontWeight: 'bold' }}>ERROR: Not found items</Text>
                        </View>}
                </ScrollView>



                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.addProductButton}
                    onPress={() => { navigation.navigate('Carrinho') }}
                >
                    <Text style={styles.productButtonText}>Carrinho</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    products: {
        backgroundColor: "#fff",
        padding: 25,
        paddingBottom: 0,
    },

    productItem: {
        backgroundColor: '#718989',
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },

    productItemTitle: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold'
    },
    productItemPrice: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold'
    },

    productButton: {
        width: '100%',
        backgroundColor: 'red',
        alignItems: 'center',
        padding: 15,
        marginBottom: 30,

    },
    addProductButton: {
        width: '100%',
        backgroundColor: 'red',
        alignItems: 'center',
        padding: 15,
        marginTop: 30,

    },

    productButtonText: {
        color: '#fff',
        fontSize: 20,
        textTransform: 'uppercase',

    },
});

export default Catalog;