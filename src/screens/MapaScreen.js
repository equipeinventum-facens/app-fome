import { Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
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

export default function MapaScreen({
  abrirGPS,
  altoContraste,
  fonteApp,
  fonteDestaqueApp,
  instituicaoSelecionada,
  instituicoes,
  localizacaoUsuario,
  obterCoordenadas,
  setInstituicaoSelecionada,
  setTela,
  statusLocalizacao,
  tela,
  tema,
}) {
  const insets = useSafeAreaInsets();
  const headerProps = { altoContraste, fonteApp, fonteDestaqueApp, tema };
  const bottomNavProps = { fonteApp, setTela, tela, tema };
  const mapaDisponivel = Boolean(localizacaoUsuario);
  const bottomNavSpace = Math.max(insets.bottom + 128, 128);
  const coordenadasSelecionadas = instituicaoSelecionada
    ? obterCoordenadas(instituicaoSelecionada.index, instituicaoSelecionada)
    : null;
  const atendimentoSelecionado = Boolean(instituicaoSelecionada?.atendimentoAberto);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: tema.fundo,
          paddingBottom: bottomNavSpace,
        },
      ]}
    >
      <Header {...headerProps} />

      <Text style={[styles.title, fonteApp, { color: tema.texto }]}>Pontos de doação</Text>

      <View
        style={[
          styles.mapContainer,
          {
            borderColor: tema.destaque,
            flex: 1,
            height: "auto",
            minHeight: 260,
          },
        ]}
      >
        {mapaDisponivel ? (
          <>
            <MapView
              key={`${localizacaoUsuario.latitude}-${localizacaoUsuario.longitude}`}
              style={styles.map}
              initialRegion={{
                latitude: localizacaoUsuario.latitude,
                longitude: localizacaoUsuario.longitude,
                latitudeDelta: 0.012,
                longitudeDelta: 0.012,
              }}
              onPress={() => setInstituicaoSelecionada(null)}
            >
              <Marker coordinate={localizacaoUsuario} title="Você está aqui" pinColor="#14213d" />

              {instituicoes.map((item, index) => (
                <Marker
                  key={item.id}
                  coordinate={obterCoordenadas(index, item)}
                  onPress={() => setInstituicaoSelecionada({ ...item, index })}
                  pinColor={tema.destaque}
                />
              ))}
            </MapView>

            <View style={[styles.mapLegend, { backgroundColor: tema.card, borderColor: tema.borda }]}>
              <View style={styles.mapLegendItem}>
                <View style={[styles.mapLegendPin, { backgroundColor: "#2f6eea" }]}>
                  <View style={styles.mapLegendPinCenter} />
                </View>
                <Text style={[styles.mapLegendText, fonteApp, { color: tema.texto }]}>Você</Text>
              </View>

              <View style={styles.mapLegendItem}>
                <View style={[styles.mapLegendPin, { backgroundColor: tema.destaque }]}>
                  <View style={styles.mapLegendPinCenter} />
                </View>
                <Text style={[styles.mapLegendText, fonteApp, { color: tema.texto }]}>Locais</Text>
              </View>
            </View>

            {instituicaoSelecionada && (
              <View
                style={[
                  styles.mapPopupRow,
                  { backgroundColor: tema.card, borderColor: tema.destaque },
                ]}
              >
                <TouchableOpacity
                  style={styles.popupClose}
                  onPress={() => setInstituicaoSelecionada(null)}
                >
                  <Feather name="x" size={18} color={tema.texto} />
                </TouchableOpacity>

                <View style={styles.popupContent}>
                  <View style={styles.popupInfoLine}>
                    <Feather name="home" size={16} color={tema.texto} style={styles.popupInfoIcon} />
                    <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.popupTitle, fonteDestaqueApp, { color: tema.texto }]}>
                      {instituicaoSelecionada.nomeInstituicao || instituicaoSelecionada.nome}
                    </Text>
                  </View>

                  <View style={styles.popupInfoLine}>
                    <Feather name="map-pin" size={15} color={tema.textoSecundario} style={styles.popupInfoIcon} />
                    <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.popupText, styles.popupSingleLineText, fonteApp, { color: tema.textoSecundario }]}>
                      {formatarEnderecoCurto(instituicaoSelecionada.endereco)}
                    </Text>
                  </View>

                  <View style={styles.popupInfoLine}>
                    <Feather name="navigation" size={15} color={tema.textoSecundario} style={styles.popupInfoIcon} />
                    <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.popupText, styles.popupSingleLineText, fonteApp, { color: tema.textoSecundario }]}>
                      {calcularDistanciaKm(localizacaoUsuario, coordenadasSelecionadas)} | {atendimentoSelecionado ? "Aberto" : "Fechado"}
                    </Text>
                  </View>
                </View>


                <View style={styles.popupFooter}>
                  <TouchableOpacity
                    style={[styles.popupSmallButton, { backgroundColor: tema.destaque }]}
                    onPress={() => abrirGPS(instituicaoSelecionada.index, instituicaoSelecionada)}
                  >
                    <Text style={[styles.popupSmallButtonText, fonteApp]}>VAMOS</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        ) : (
          <View style={[styles.mapUnavailable, { backgroundColor: tema.card }]}>
            <Feather name="map-pin" size={34} color={tema.destaque} />
            <Text style={[styles.mapUnavailableTitle, fonteDestaqueApp, { color: tema.texto }]}>Mapa indisponível</Text>
            <Text style={[styles.mapUnavailableText, fonteApp, { color: tema.textoSecundario }]}>
              {statusLocalizacao === "carregando"
                ? "Carregando sua localização..."
                : "Permita o acesso à localização para ver sua posição no mapa e encontrar os locais próximos."}
            </Text>
          </View>
        )}
      </View>

      <BottomFamilia {...bottomNavProps} />
    </SafeAreaView>
  );
}
