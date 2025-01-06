import { theme } from "@/constants/Colors";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import { MotiText, MotiView } from 'moti';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

type HeaderProps = {
    name: string;
}

export function Header({ name }: HeaderProps){
    return (<View style={styles.container}>
        <MotiView 
            style={styles.content}
            from={{
                translateY: -150,
                opacity: 0
            }}
            animate={{
                translateY: 0,
                opacity: 1
            }}
            transition={{
                type: "timing",
                duration: 800,
                delay: 300
            }}
        >
            <MotiText
                style={styles.username}
                from={{
                    translateX: -300
                }}
                animate={{
                    translateX: 0
                }}
                transition={{
                    type: 'timing',
                    duration: 800,
                    delay: 800
                }}
            >
                { name }
            </MotiText>
            <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser}>
                <Feather name="user" size={27} color={theme.colors.grey[200]} />
            </TouchableOpacity>
        </MotiView>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.rocketseat.dark,
        paddingTop: statusBarHeight,
        flexDirection: 'row',
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 44
    },
    content: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    username: {
        fontSize: 18,
        color: theme.colors.grey[200],
        fontWeight: 'bold'
    },
    bottomUser: {
        width: 44,
        height: 44
    },
    buttonUser:{
        width: 44,
        height: 44,
        borderColor: "rgba(255,255,255,0.5)",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 44 / 2
    }
})