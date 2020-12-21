import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import email from 'react-native-email';

import * as CartActions from '../../store/modules/cart/actions';

const Cart = () => {
    const products = useSelector(state => state.cart.map(product => ({
        ...product,
        subtotal: product.price * product.amount
    })));

    const total = useSelector(state => state.cart.reduce((total, product) =>
        total + product.price * product.amount,
        0
    )
    );

    console.log(total);

    const dispatch = useDispatch();

    function increment(product) {
        dispatch(CartActions.updateAmount(product.id, product.amount + 1));
    }

    function decrement(product) {
        dispatch(CartActions.updateAmount(product.id, product.amount - 1));
    }

    const logoutHandler = () => {
        dispatch(CartActions.RESET_ACTION);
    }

    const handleEmail = (productsItems) => {
        const to = ['yansantos0712@gmail.com']

        email(to, {
            subject: 'Compra Realizada com Sucesso',
            body: `Nº do pedido: ${Date.now()}


Produtos: 
            ${productsItems.map(item => item.title)},


            
Valor total da compra: R$ ${total}
            `
        }).catch(console.error)
        logoutHandler();
    }



    return (
        <>
            {products.length >= 0 ? (
                <>
                    <View style={styles.container}>
                        <Text style={styles.titlePage}>Produtos</Text>
                    </View>

                    <FlatList
                        data={products}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                        renderItem={({ item: product }) => (
                            <View style={styles.productContainer}>
                                <View style={styles.productValue}>
                                    <Text style={styles.productText}>{product.title}</Text>
                                    <Text style={styles.productPrice}>R${product.price}</Text>
                                </View>
                                <View style={styles.productAmount}>
                                    <Button title="-" onPress={() => decrement(product)} style={styles.productAmountText} />
                                    <Text style={styles.productText}>{product.amount}</Text>
                                    <Button title="+" onPress={() => increment(product)} />

                                </View>
                                <Text style={styles.productText}>R$ {product.subtotal}</Text>
                                <Button title="x" color="red" onPress={() => dispatch(CartActions.removeFromCart(product.id))} />
                            </View>
                        )} />
                </>
            ) : <Text style={{ fontSize: 25, padding: 23 }}>Carrinho vazio</Text>}
            <Text style={styles.total}>Total: R$ {total}</Text>
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.finishButton}
                onPress={() => handleEmail(products)}
            >
                <Text style={styles.finishButtonText}>FINALIZAR COMPRA</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    titlePage: {
        padding: 18,
        fontSize: 22
    },

    productValue: {
        width: 80,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

    productContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 38,
        backgroundColor: '#737588'
    },

    productText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    productPrice: {
        color: '#222',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10

    },

    productAmount: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    productAmountText: {
        // paddingLeft: 10,
        // paddingRight: 10,
        textAlign: 'center',
        margin: 5,
        fontSize: 15,
        backgroundColor: '#fff',
        width: 30,
        height: 20
    },

    total: {
        fontSize: 32,
        padding: 10
    },

    finishButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'green'
    },

    finishButtonText: {
        fontSize: 21,
        color: '#fff'
    },
})

export default Cart;