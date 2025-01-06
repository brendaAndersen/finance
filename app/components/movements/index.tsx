import { theme } from "@/constants/Colors";
import { AnimatePresence, MotiText, MotiView } from "moti";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type MovementsProps = {
    data: {
        id: number;
        label: string;
        value: string;
        date: string;
        type: number;
      }
}

export function Movements({ data } : any){
    const [show, setShow] = useState(false);

    return (<TouchableOpacity style={styles.container} onPress={() => setShow(!show)}>
        <Text style={styles.date}>{data?.date}</Text>
        <View style={styles.content}>
            <Text style={styles.label}>{data?.label}</Text>
            {show ? (
                <AnimatePresence exitBeforeEnter>
                    <MotiText 
                        style={data.type === 1 ? styles.value :  styles.expense}
                        from={{
                            translateX: 0
                        }}
                        animate={{
                            translateX: 0
                        }}
                        transition={{
                            type: 'spring',
                            duration: 500 
                        }}
                    >
                    {data.type === 1 ? 
                    `R$ ${data.value}` :
                    `R$ -${data.value}`}</MotiText>
                </AnimatePresence>
            ) : (
                <AnimatePresence exitBeforeEnter>
                    <MotiView 
                        style={styles.view}
                        from={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            type: 'timing'
                        }}
                    ></MotiView>
                </AnimatePresence>
            )}
        </View>
    </TouchableOpacity>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        borderBottomWidth: 0.5,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 8,
        
    },
    date: {
        color: theme.colors.grey[300],
        fontWeight: 'bold',
        fontSize: 16
    },
    label: {
        color: theme.colors.rocketseat.light,
        fontWeight: 'bold',
        fontSize: 16
    }, 
    expense: {
        color: theme.colors.danger.base,
        fontWeight: 'bold',
        fontSize: 16
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.ignite.light
    },
    view: {
        marginTop: 6,
        width: 80,
        height: 15,
        backgroundColor: theme.colors.grey[500],
        borderRadius: 5
    }
})