import { theme } from "@/constants/Colors";
import { MotiView } from "moti";
import { StyleSheet, Text, View } from "react-native";

type BalanceProps = {
  balance: string,
  expense: string
}

export function Balance({ balance, expense }: BalanceProps){
  return (<MotiView 
    style={styles.container}
    from={{
      rotateX:'-100deg',
      opacity: 0
    }}
    animate={{
      rotateX: '0deg',
      opacity: 1
    }}
    transition={{
      type: 'timing',
      delay: 300,
      duration: 900
    }}
  >
    <View>
      <Text style={styles.itemTitle}>Saldo</Text>
      <View style={styles.content}>
          <Text style={styles.currentSymbol}>R$</Text>
          <Text style={styles.balance}>{balance}</Text>
      </View>
    </View>
    <View>
      <Text style={styles.itemTitle}>Gastos</Text>
      <View style={styles.content}>
          <Text style={styles.currentSymbol}>R$</Text>
          <Text style={styles.expenses}>-{expense}</Text>
      </View>
    </View>
  </MotiView>)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.grey[100],
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingStart: 18,
    paddingEnd: 18,
    margin: -24,
    marginStart: 14,
    marginEnd: 14,
    borderRadius: 4,
    paddingTop: 22,
    paddingBottom: 22,
    zIndex: 99
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemTitle: {
    fontSize: 20,
    color: theme.colors.grey[300]
  },
  currentSymbol: {
    color: theme.colors.grey[300],
    marginRight: 6
  },
  expenses: {
    fontSize: 22,
    color: theme.colors.danger.base
  },
  balance: {
    fontSize: 22,
    color: theme.colors.ignite.light
  }
})