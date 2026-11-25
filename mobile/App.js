import { StyleSheet, View } from 'react-native'
import {SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Cabecalho from './src/components/Cabecalho'
import Creditos from './src/components/Creditos'

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Cabecalho />
        <View style={styles.conteudo} />
        <Creditos />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2E'
  },
  conteudo: {
    flex: 1
  }
})