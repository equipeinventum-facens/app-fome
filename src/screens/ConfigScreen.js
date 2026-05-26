import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomFamilia, BottomInstituicao } from "../components/BottomNav";
import Header from "../components/Header";
import styles from "../styles";

function normalizarEndereco(endereco, isInstituicao = false) {
  const texto = String(endereco || "");
  if (texto.toLowerCase().includes("aguardando")) {
    return isInstituicao ? "Endereço cadastrado em análise" : "Endereço em análise";
  }
  return texto || "Endereço não informado";
}

export default function ConfigScreen({
  altoContraste,
  fonteApp,
  fonteDestaqueApp,
  fonteDislexia,
  sair,
  salvarPerfil,
  setAltoContraste,
  setFonteDislexia,
  setTela,
  tela,
  tema,
  usuarioLogado,
}) {
  const headerProps = { altoContraste, fonteApp, fonteDestaqueApp, tema };
  const bottomNavProps = { fonteApp, setTela, tela, tema };
  const [viewportHeight, setViewportHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [editando, setEditando] = useState(false);
  const [nomeEditado, setNomeEditado] = useState("");
  const [nomeInstituicaoEditado, setNomeInstituicaoEditado] = useState("");
  const [pessoasEditadas, setPessoasEditadas] = useState("");
  const [novoComprovante, setNovoComprovante] = useState(false);
  const shouldScroll = viewportHeight > 0 && contentHeight > viewportHeight + 12;
  const isInstituicao = usuarioLogado?.tipo === "instituicao";
  const enderecoTexto = normalizarEndereco(usuarioLogado?.endereco, isInstituicao);

  useEffect(() => {
    setNomeEditado(usuarioLogado?.nome || "");
    setNomeInstituicaoEditado(usuarioLogado?.nomeInstituicao || "");
    setPessoasEditadas(usuarioLogado?.pessoas || "");
    setNovoComprovante(false);
    setEditando(false);
  }, [usuarioLogado?.id]);

  function cancelarEdicao() {
    setNomeEditado(usuarioLogado?.nome || "");
    setNomeInstituicaoEditado(usuarioLogado?.nomeInstituicao || "");
    setPessoasEditadas(usuarioLogado?.pessoas || "");
    setNovoComprovante(false);
    setEditando(false);
  }

  function anexarComprovante() {
    setNovoComprovante(true);
    Alert.alert(
      "Comprovante anexado",
      "Quando salvar, o endereço ficará em análise para ser identificado pelo comprovante.",
    );
  }

  async function salvarEdicao() {
    if (isInstituicao && !nomeEditado.trim()) {
      Alert.alert("Atenção", "Informe o responsável.");
      return;
    }

    if (isInstituicao && !nomeInstituicaoEditado.trim()) {
      Alert.alert("Atenção", "Informe o nome da instituição.");
      return;
    }

    if (!isInstituicao && !pessoasEditadas.trim()) {
      Alert.alert("Atenção", "Informe a quantidade de pessoas na família.");
      return;
    }

    const dadosAtualizados = isInstituicao
      ? {
          nome: nomeEditado.trim(),
          nomeInstituicao: nomeInstituicaoEditado.trim(),
        }
      : {
          pessoas: pessoasEditadas.trim(),
          ...(novoComprovante ? { endereco: "Aguardando validação do comprovante" } : {}),
        };

    const salvou = await salvarPerfil(dadosAtualizados);
    if (!salvou) return;
    setEditando(false);
    setNovoComprovante(false);
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.fundo }]}>
      <ScrollView
        onLayout={(event) => setViewportHeight(event.nativeEvent.layout.height)}
        scrollEnabled={shouldScroll}
        showsVerticalScrollIndicator={false}
        bounces={shouldScroll}
        onContentSizeChange={(_, height) => setContentHeight(height)}
        contentContainerStyle={styles.configScrollContent}
      >
        <Header {...headerProps} />

        <View style={styles.configSectionHeader}>
          <Text style={[styles.sectionTitle, fonteApp, { color: tema.texto }]}>Conta</Text>
          {!editando && (
            <TouchableOpacity
              style={[styles.configEditButton, { borderColor: tema.destaque }]}
              onPress={() => setEditando(true)}
            >
              <Text style={[styles.configEditButtonText, fonteDestaqueApp, { color: tema.destaque }]}>EDITAR</Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: tema.card, borderColor: tema.borda },
          ]}
        >
          {editando ? (
            <>
              {isInstituicao ? (
                <>
                  <Text style={[styles.formLabel, fonteDestaqueApp, { color: tema.texto }]}>Responsável</Text>
                  <TextInput
                    style={[
                      styles.input,
                      fonteApp,
                      { backgroundColor: tema.input, borderColor: tema.destaque, color: tema.texto },
                    ]}
                    placeholder="Nome do responsável"
                    placeholderTextColor={altoContraste ? "#cccccc" : "#777"}
                    value={nomeEditado}
                    onChangeText={setNomeEditado}
                  />

                  <Text style={[styles.formLabel, fonteDestaqueApp, { color: tema.texto }]}>Nome da instituição</Text>
                  <TextInput
                    style={[
                      styles.input,
                      fonteApp,
                      { backgroundColor: tema.input, borderColor: tema.destaque, color: tema.texto },
                    ]}
                    placeholder="Nome da instituição"
                    placeholderTextColor={altoContraste ? "#cccccc" : "#777"}
                    value={nomeInstituicaoEditado}
                    onChangeText={setNomeInstituicaoEditado}
                  />
                </>
              ) : (
                <>
                  <Text style={[styles.formLabel, fonteDestaqueApp, { color: tema.texto }]}>Pessoas na família</Text>
                  <TextInput
                    style={[
                      styles.input,
                      fonteApp,
                      { backgroundColor: tema.input, borderColor: tema.destaque, color: tema.texto },
                    ]}
                    placeholder="Quantidade de pessoas"
                    placeholderTextColor={altoContraste ? "#cccccc" : "#777"}
                    value={pessoasEditadas}
                    onChangeText={setPessoasEditadas}
                    keyboardType="numeric"
                  />

                  <TouchableOpacity
                    style={[
                      styles.upload,
                      styles.configProofUpload,
                      { backgroundColor: tema.card, borderColor: tema.destaque },
                    ]}
                    onPress={anexarComprovante}
                  >
                    <Text style={[styles.uploadText, fonteDestaqueApp, { color: tema.texto }]}>
                      {novoComprovante ? "Novo comprovante anexado" : "Alterar comprovante"}
                    </Text>
                    <Text style={[styles.uploadSubtext, fonteApp, { color: tema.textoSecundario }]}>O endereço será identificado pelo novo comprovante</Text>
                  </TouchableOpacity>
                </>
              )}

              <View style={styles.configActionRow}>
                <TouchableOpacity
                  style={[styles.configSecondaryButton, { borderColor: tema.borda }]}
                  onPress={cancelarEdicao}
                >
                  <Text style={[styles.configSecondaryButtonText, fonteDestaqueApp, { color: tema.texto }]}>CANCELAR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.configSaveButton, { backgroundColor: tema.destaque }]}
                  onPress={salvarEdicao}
                >
                  <Text style={[styles.configSaveButtonText, fonteDestaqueApp]}>SALVAR</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={[styles.cardItem, fonteApp, { color: tema.texto }]}>
                <Text style={[styles.bold, fonteDestaqueApp]}>{isInstituicao ? "Responsável: " : "Nome: "}</Text>
                {usuarioLogado?.nome}
              </Text>

              {isInstituicao && (
                <Text style={[styles.cardItem, fonteApp, { color: tema.texto }]}>
                  <Text style={[styles.bold, fonteDestaqueApp]}>Instituição: </Text>
                  {usuarioLogado?.nomeInstituicao}
                </Text>
              )}

              <Text style={[styles.cardItem, fonteApp, { color: tema.texto }]}>
                <Text style={[styles.bold, fonteDestaqueApp]}>{isInstituicao ? "CNPJ: " : "CPF: "}</Text>
                {isInstituicao ? usuarioLogado?.cnpj : usuarioLogado?.cpf}
              </Text>

              {!isInstituicao && (
                <Text style={[styles.cardItem, fonteApp, { color: tema.texto }]}>
                  <Text style={[styles.bold, fonteDestaqueApp]}>Pessoas na família: </Text>
                  {usuarioLogado?.pessoas}
                </Text>
              )}

              <Text style={[styles.cardItem, fonteApp, { color: tema.texto }]}>
                <Text style={[styles.bold, fonteDestaqueApp]}>Endereço: </Text>
                {enderecoTexto}
              </Text>


            </>
          )}
        </View>

        <Text style={[styles.sectionTitle, fonteApp, { color: tema.texto }]}>Acessibilidade</Text>

        <View
          style={[
            styles.card,
            { backgroundColor: tema.card, borderColor: tema.borda },
          ]}
        >
          <TouchableOpacity
            style={styles.switchRow}
            onPress={() => setAltoContraste(!altoContraste)}
          >
            <Text style={[styles.cardItem, fonteApp, { color: tema.texto }]}>Alto contraste</Text>
            <View
              style={[
                altoContraste ? styles.switchPillOn : styles.switchPillOff,
                { backgroundColor: altoContraste ? tema.destaque : "#e5ded2" },
              ]}
            >
              <Text style={[styles.switchPillText, fonteApp]}>{altoContraste ? "ON" : "OFF"}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchRow}
            onPress={() => setFonteDislexia(!fonteDislexia)}
          >
            <Text style={[styles.cardItem, fonteApp, { color: tema.texto }]}>Fonte para dislexia</Text>
            <View
              style={[
                fonteDislexia ? styles.switchPillOn : styles.switchPillOff,
                { backgroundColor: fonteDislexia ? tema.destaque : "#e5ded2" },
              ]}
            >
              <Text style={[styles.switchPillText, fonteApp]}>{fonteDislexia ? "ON" : "OFF"}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: tema.botao }]}
          onPress={sair}
        >
          <Text style={[styles.logoutText, fonteApp, { color: tema.textoBotao }]}>SAIR DA CONTA</Text>
        </TouchableOpacity>
      </ScrollView>

      {usuarioLogado?.tipo === "familia" ? (
        <BottomFamilia {...bottomNavProps} />
      ) : (
        <BottomInstituicao {...bottomNavProps} />
      )}
    </SafeAreaView>
  );
}





