import { Feather } from "@expo/vector-icons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomFamilia } from "../components/BottomNav";
import Header from "../components/Header";
import styles from "../styles";



function calcularDistanciaKm(origem, destino) {
  if (!origem || !destino) return "Distância indisponível";

  const grausParaRad = (valor) => (valor * Math.PI) / 180;
  const raioTerraKm = 6371;
  const deltaLat = grausParaRad(destino.latitude - origem.latitude);
  const deltaLon = grausParaRad(destino.longitude - origem.longitude);
  const lat1 = grausParaRad(origem.latitude);
  const lat2 = grausParaRad(destino.latitude);
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const distancia = raioTerraKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return distancia < 0.1 ? "menos de 100 m" : `${distancia.toFixed(1)} km`;
}
function formatarEndereco(endereco) {
  const texto = String(endereco || "");

  const temTextoQuebrado = texto.includes(String.fromCharCode(0xfffd)) || texto.includes(String.fromCharCode(195));

  if (texto.toLowerCase().includes("aguardando") || temTextoQuebrado) {
    return "Endereço em análise";
  }

  return texto || "Endereço não informado";
}


function formatarEnderecoCurto(endereco) {
  const texto = formatarEndereco(endereco);

  if (texto === "Endereço em análise" || texto === "Endereço não informado") {
    return texto;
  }

  return texto
    .replace(/\s*-\s*\d{5}-?\d{3}\s*$/g, "")
    .replace(/,\s*(Brasil|Brazil)\s*$/i, "")
    .trim();
}

export default function LocaisScreen({
  abrirGPS,
  altoContraste,
  fonteApp,
  fonteDestaqueApp,
  instituicoes,
  localizacaoUsuario,
  obterCoordenadas,
  setTela,
  tela,
  tema,
}) {
  const headerProps = { altoContraste, fonteApp, fonteDestaqueApp, tema };
  const bottomNavProps = { fonteApp, setTela, tela, tema };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Header {...headerProps} />
      <Text style={[styles.title, fonteDestaqueApp, { color: tema.texto }]}>Locais mais próximos</Text>

      <FlatList
        data={instituicoes}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.instituicaoListContent}
        ListEmptyComponent={
          <Text style={[styles.emptyText, fonteApp, { color: tema.texto }]}>Nenhuma instituição cadastrada ainda.</Text>
        }
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => {
          const atendimentoAberto = Boolean(item.atendimentoAberto);
          const coordenadasInstituicao = obterCoordenadas(index, item);

          return (
            <View
              style={[
                styles.cardRow,
                { backgroundColor: tema.card, borderColor: tema.borda },
              ]}
            >
              <View style={styles.cardInfoArea}>
                <View style={{ flex: 1 }}>
                  <View style={styles.locationInfoLine}>
                    <Feather name="home" size={16} color={tema.texto} style={styles.locationInfoIcon} />
                    <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.cardTitle, styles.locationCardTitle, fonteDestaqueApp, { color: tema.texto }]}>{item.nomeInstituicao || item.nome}</Text>
                  </View>

                  <View style={styles.locationInfoLine}>
                    <Feather name="map-pin" size={15} color={tema.textoSecundario} style={styles.locationInfoIcon} />
                    <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.cardText, styles.locationSingleLineText, fonteApp, { color: tema.textoSecundario }]}>{formatarEnderecoCurto(item.endereco)}</Text>
                  </View>

                  <View style={styles.locationInfoLine}>
                    <Feather name="navigation" size={15} color={tema.textoSecundario} style={styles.locationInfoIcon} />
                    <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.cardText, styles.locationSingleLineText, fonteApp, { color: tema.textoSecundario }]}>{calcularDistanciaKm(localizacaoUsuario, coordenadasInstituicao)} | {atendimentoAberto ? "Aberto" : "Fechado"}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.smallButton, { backgroundColor: tema.destaque }]}
                onPress={() => abrirGPS(index, item)}
              >
                <Text style={[styles.smallButtonText, fonteDestaqueApp]}>VAMOS</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <BottomFamilia {...bottomNavProps} />
    </SafeAreaView>
  );
}


