import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Linking
} from 'react-native';
import { connect, useDispatch } from 'react-redux';

import * as CartActions from '../../store/modules/cart/actions';

import api from '../../services/api';


const Catalog = ({ navigation, cart }) => {
    const [products, setProducts] = useState([]);
    const dispacth = useDispatch();

    const handleAddProductToCart = useCallback((product) => {
        dispacth(CartActions.addToCart(product));
    }, [dispacth]);

    useEffect(() => {
        api.get('/products').then(response => {
            setProducts(response.data);
        })
    }, []);


    return (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.container} horizontal={true}>
                    {products.length > 0 ?

                        <FlatList
                            style={styles.products}
                            data={products}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item: product }) => (
                                <>
                                    <View style={styles.productItem}>
                                        <Text style={styles.productItemTitle}>{product.title}</Text>
                                        <Text style={styles.productItemPrice}> R${product.price}</Text>
                                    </View>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={styles.productButton}
                                        onPress={() => handleAddProductToCart(product)}
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
                    <Text style={styles.productButtonText}>Carrinho ({cart.length})</Text>
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

export default connect(state => ({
    cart: state.cart
}))(Catalog);