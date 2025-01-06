import { theme } from "@/constants/Colors";
import { Alert, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState } from "react";
import { Boleto } from "@/app";
import { Movements } from "../movements";
import React from "react";

interface Product {
    id: number;
    label: string;
    value: number;
    date: string;
    type:number;
}

export function Actions() {
    const [selectedValue, setSelectedValue] = useState(2);
    const [modalVisible, setModalVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState<Product[]>([
        {
            id: 1,
            label: 'Boleto conta de água',
            value: 200,
            date: '06/' + (new Date().getMonth() + 1).toString() + '/' + (new Date().getFullYear()).toString(),
            type: 0
        },
        {
            id: 2,
            label: 'Boleto conta de luz',
            value: 350,
            date: '08/' + (new Date().getMonth() + 1).toString() + '/' + (new Date().getFullYear()).toString(),
            type: 0
        },
        {
            id: 3,
            label: 'Salário',
            value: 5500,
            date: '05/' + (new Date().getMonth() + 1).toString() + '/' + (new Date().getFullYear()).toString(),
            type: 1
        }
    ]);
    const handleSelect = (item: { label?: string; value: Number; }) => {
        setSelectedValue(Number(item.value));
        setModalVisible(false); 
      };
  
    const [newProduct, setNewProduct] = useState<Product>({
        label: '',
        value: 0,
        id: 0,
        date: '',
        type: 0
    });

    // Função para abrir o modal com o boleto selecionado
    const handlePress = (boleto: Boleto) => {
        setShow(true); 
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setShow(false);
        setNewProduct({ label: '', value: 0, id: 0, date: '', type: 0 }); 
    };

    // Função para adicionar o gasto
    const handleAddGasto = () => {
        if (!newProduct.label || newProduct.value === 0) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos!');
            return;
        }
        if (isNaN(newProduct.value)) {
            Alert.alert('Erro', 'Valor do gasto deve ser um número!');
            return;
        }

        // Adicionar o novo produto ao array
        setProduct(prevState => [
            ...prevState,
            { ...newProduct, id: prevState.length + 1, date: new Date().toLocaleDateString(), type: selectedValue }
        ]);

        // Mostrar o alerta com o gasto adicionado
        Alert.alert('Gasto Adicionado', `Descrição: ${newProduct.label}\nValor: R$ ${newProduct.value}`);

        // Limpar campos e fechar o modal
        setNewProduct({ label: '', value: 0, id: 0, date: '', type: 0 });
        handleCloseModal();
    };

    const formatCurrency = (value: number): string => {
        return `R$ ${value}`;
    };

    // Função para lidar com a entrada do usuário no campo de valor
    const handleValueChange = (text: string) => {
        const value = parseFloat(text.replace('R$', '').replace(',', '.').trim());
        if (!isNaN(value)) {
            setNewProduct(prevState => ({
                ...prevState,
                value: value
            }));
        }
    };
  
    
    return (
    <>
        <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.actionButton} onPress={() => handlePress({ id: 1, date: '01/01/2025', label: 'Boleto de Exemplo', type: 1, value: '0' })}>
                <View style={styles.areaButton}>
                    <Text style={styles.labelButton}>Adicionar</Text>
                </View>
                <FontAwesome6 name="add" size={20} color={theme.colors.grey[200]} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={show}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Adicionar Movimento</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Descrição do movimento"
                            placeholderTextColor="black"
                            onChangeText={(text) => setNewProduct({ ...newProduct, label: text })}
                            value={newProduct.label}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Valor do movimento"
                            placeholderTextColor="black"
                            keyboardType="numeric"
                            onChangeText={handleValueChange}
                            value={formatCurrency(newProduct.value)}
                        />

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {/* Botão para abrir o modal */}
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <View style={{ padding: 10, borderRadius: 5, backgroundColor: '#ddd' }}>
                                    <Text style={{ color: 'black'}}>
                                        {selectedValue === 2 ? 'Selecionar tipo' : selectedValue === 1 ? 'Entrada' : 'Saída'}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            {/* Modal com as opções */}
                            <Modal
                                transparent={true}
                                visible={modalVisible}
                                animationType="fade"
                                onRequestClose={() => setModalVisible(false)}
                            >
                                {/* Backdrop (fundo do modal) */}
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',  
                                        alignItems: 'center', 
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                                    }}
                                    onPress={() => setModalVisible(false)} 
                                >
                                    {/* Conteúdo do modal */}
                                    <View
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                            width: '70%',  
                                            maxHeight: 300,  
                                            padding: 10,
                                        }}
                                    >
                                        {/* Lista de opções */}
                                        <FlatList
                                            data={[
                                                { label: 'Entrada', value: 1 },
                                                { label: 'Saída', value: 0 },
                                            ]}
                                            keyExtractor={(item) => item.value.toString()} 
                                            renderItem={({ item }) => (
                                                <TouchableOpacity onPress={() => handleSelect(item)}>
                                                    <View style={{ padding: 15 }}>
                                                        <Text>{item.label}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </Modal>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Fechar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleAddGasto} style={styles.addButton}>
                                <Text style={styles.addButtonText}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            </ScrollView>
        <View style={styles.content}>
            <Text style={styles.title}>Últimas movimentações</Text>
            <FlatList
                data={product}
                keyExtractor={item => String(item.id)}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <Movements data={item} />}
                />
        </View>
    </>
    );
}

const styles = StyleSheet.create({
    content: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
    },
    container: {
        maxHeight: 84,
        marginBottom: 14,
        marginTop: 18,
        paddingEnd: 14,
        paddingStart: 14,
    },
    actionButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.ignite.dark,
        borderRadius: 5,
        marginVertical: 12,
        marginHorizontal: 100,
        height: 40
    },
    areaButton: {
        borderColor: theme.colors.grey[100],
        height: 60,
        width: 100,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelButton: {
        color: theme.colors.grey[100],
        marginTop: 4,
        textAlign: 'center',
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', //
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',  
        alignItems: 'center',
        maxHeight: '80%', 
    },
    
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 5,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: theme.colors.danger.base,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',  
        height: 50,  
        backgroundColor: theme.colors.grey[100],
        borderRadius: 5,
        paddingLeft: 15,  
        marginBottom: 15, 
        fontSize: 16,
    },
    addButton: {
        backgroundColor: theme.colors.ignite.light, 
        borderRadius: 5, 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20, 
        marginTop: 20,
    },
    addButtonText: {
        color: 'white', 
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 20, 
    },
    title: {
        color: theme.colors.rocketseat.light,
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 14,
        marginRight: 14,
        marginTop: 34,
        margin: 14,
    },
    subtitle: {
        fontSize: 36,
        color: theme.colors.grey[400],
    },
    textList: {
        color: "#fff",
    },
    text: {
        color: 'red', 
    },
});

