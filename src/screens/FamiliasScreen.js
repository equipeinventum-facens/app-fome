import { Feather } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomInstituicao } from "../components/BottomNav";
import Header from "../components/Header";
import styles from "../styles";

function onlyDigits(value = "") {
  return String(value).replace(/\D/g, "");
}

export default function FamiliasScreen({
  altoContraste,
  entregar,
  familiasDisponiveis,
  fonteApp,
  fonteDestaqueApp,
  setTela,
  tela,
  tema,
}) {
  const headerProps = { altoContraste, fonteApp, fonteDestaqueApp, tema };
  const bottomNavProps = { fonteApp, setTela, tela, tema };
  const [buscaCpf, setBuscaCpf] = useState("");
  const cpfBuscado = onlyDigits(buscaCpf);

  const familiasFiltradas = useMemo(() => {
    if (!cpfBuscado) return familiasDisponiveis;

    return familiasDisponiveis.filter((familia) =>
      onlyDigits(familia.cpf).includes(cpfBuscado),
    );
  }, [cpfBuscado, familiasDisponiveis]);

  const mensagemVazia = cpfBuscado
    ? "Nenhuma família disponível com esse CPF."
    : "Nenhuma família disponível para entrega hoje.";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Header {...headerProps} />
      <Text style={[styles.title, fonteDestaqueApp, { color: tema.texto }]}>Famílias cadastradas</Text>

      <TextInput
        placeholder="Procure pelo CPF"
        placeholderTextColor={altoContraste ? "#cccccc" : "#777"}
        style={[
          styles.input,
          fonteApp,
          {
            backgroundColor: tema.input,
            borderColor: tema.destaque,
            color: tema.texto,
          },
        ]}
        value={buscaCpf}
        onChangeText={setBuscaCpf}
        keyboardType="numeric"
      />

      {familiasFiltradas.length === 0 ? (
        <Text
          style={[
            styles.info,
            fonteApp,
            {
              backgroundColor: tema.card,
              borderColor: tema.borda,
              color: tema.texto,
            },
          ]}
        >
          {mensagemVazia}
        </Text>
      ) : (
        <FlatList
          data={familiasFiltradas}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.instituicaoListContent}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <View
              style={[
                styles.cardRow,
                { backgroundColor: tema.card, borderColor: tema.borda },
              ]}
            >
              <View style={styles.cardInfoArea}>
                <View style={{ flex: 1 }}>
                  <View style={styles.familyInfoLine}>
                    <Feather name="user" size={16} color={tema.texto} style={styles.familyInfoIcon} />
                    <Text style={[styles.cardTitle, styles.familyCardTitle, fonteDestaqueApp, { color: tema.texto }]}>{item.nome}</Text>
                  </View>

                  <View style={styles.familyInfoLine}>
                    <Feather name="credit-card" size={15} color={tema.textoSecundario} style={styles.familyInfoIcon} />
                    <Text style={[styles.cardText, fonteApp, { color: tema.textoSecundario }]}>CPF: {item.cpf}</Text>
                  </View>

                  <View style={styles.familyInfoLine}>
                    <Feather name="users" size={15} color={tema.textoSecundario} style={styles.familyInfoIcon} />
                    <Text style={[styles.cardText, fonteApp, { color: tema.textoSecundario }]}>{item.pessoas} pessoas na família</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.smallButton, { backgroundColor: tema.destaque }]}
                onPress={() => entregar(item)}
              >
                <Text style={[styles.smallButtonText, fonteDestaqueApp]}>ENTREGUE</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <BottomInstituicao {...bottomNavProps} />
    </SafeAreaView>
  );
}

