import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Provedores({ titulo,provedores}) {
  if(provedores.lenght === 0) return null 

  return (
    <View>
      <Text style={styles.texto}>{}titulo</Text>
      <ScrollView horizontal>
        {provedores.map((provedor)=> (
           <View key={provedor.nome} style={styles.item}>
              <Image source={{ uri: provedor.logo }} style={styles.logo} />
              <Text style={styles.nome} numberOfLines={2}>{provedor.nome}</Text>
           </View>
        ))}
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  texto: {
    color: '#FFFFFF'
  },
  item: {
    width: 64,
    alignItems: 'center'
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 8
  },
  nome: {
    color: '#FFFFFF',
    fontSize: 11,
    textAlign: 'center'
  }

})