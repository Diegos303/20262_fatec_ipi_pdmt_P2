import { useEffect, useState } from "react";
import backendClient from "../utils/backendClient";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { formatarNota, formatarDuracao } from '../utils/formatacao';
import Carregando from "./Carregando";

export default function DetalhesFilmes({id, onVoltar}) { 
  const [filme, setFilme] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() =>{
    setCarregando(true)
    setErro(null)
    backendClient.get('/filme',{ params: {id}})
       .then((resposta) => {
            setFilme(resposta.data)
            setCarregando(false)
       })
       .catch((erro)=> {
            console.log(erro)
        
        setErro(
            (erro.response && erro.response.data && erro.response.data.mensagem) || 'Não foi possível carregar os detalhes.'
        )
        setCarregando(false)
    })
  }, [id]) 

  const montarInfo = () => {
    const informacoes = [];
    if(filme.ano) {
      informacoes.push(filme.ano)
    }
    if (filme.duracao) {
      informacoes.push(formatarDuracao(filme.duracao));
    }
    if (filme.generos && filme.generos.length > 0) {
      informacoes.push(filme.generos.join(' · '));
    }
    return informacoes.join(' · ');
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={onVoltar}>
        <Text style={styles.texto}>‹ Voltar</Text>
      </Pressable>
      {carregando ? (
        <Carregando mensagem="Carregando os detalhes..." />
      ) : erro ? (
        <Text style={styles.texto}>{erro}</Text>
      ) : (
        <ScrollView>
          {filme.fundo ? (
            <Image source={{ uri: filme.fundo }} style={styles.fundo} />
          ) : null}
          {filme.poster ? (
            <Image source={{ uri: filme.poster }} style={styles.poster} />
          ) : (
            <View style={[styles.poster, styles.semPoster]}>
              <Text>Sem pôster</Text>
            </View>
          )}
          <Text style={styles.titulo}>{filme.titulo}</Text>
          {montarInfo() !== '' ? (
            <Text style={styles.texto}>{montarInfo()}</Text>
          ) : null}
          <Text style={styles.texto}>{formatarNota(filme.nota)}</Text>
          <Text style={styles.texto}>Sinopse</Text>
          <Text style={styles.texto}>
            {filme.sinopse ? filme.sinopse : 'Sinopse indisponível'}
          </Text>
        </ScrollView>
      )}
    </View>
  )
                        
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fundo: {
    width: '100%',
    height: 180
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8
  },
  semPoster: {
    backgroundColor: 'gray'
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  texto: {
    color: '#FFFFFF'
  }
})

