import { Feather } from "@expo/vector-icons";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import LoginSelector from "../components/LoginSelector";
import styles from "../styles";

export default function CadastroScreen({
  aceitouTermos,
  altoContraste,
  cadastrar,
  cnpj,
  confirmarSenha,
  cpf,
  fonteApp,
  fonteDestaqueApp,
  isFamilia,
  nome,
  nomeInstituicao,
  pessoas,
  senha,
  setAceitouTermos,
  setCnpj,
  setConfirmarSenha,
  setCpf,
  setNome,
  setNomeInstituicao,
  setPessoas,
  setSenha,
  setTela,
  setTipo,
  tema,
  tipo,
}) {
  const headerProps = { altoContraste, fonteApp, fonteDestaqueApp, tema };
  const loginSelectorProps = { fonteApp, setTipo, tema, tipo };

  const inputStyle = [
    styles.input,
    fonteApp,
    {
      backgroundColor: tema.input,
      borderColor: tema.destaque,
      color: tema.texto,
    },
  ];

  return (
    <SafeAreaView
      style={[
        styles.container,
        styles.cadastroContainer,
        { backgroundColor: tema.fundo },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.cadastroScrollContent}
      >
        <Header {...headerProps} />

        <LoginSelector {...loginSelectorProps} />

        <Text style={[styles.title, fonteDestaqueApp, { color: tema.texto }]}>
          {isFamilia ? "Cadastro Família" : "Cadastro Instituição"}
        </Text>

        {isFamilia ? (
          <>
            <Text style={[styles.formLabel, fonteDestaqueApp, { color: tema.texto }]}>Nome completo*</Text>
            <TextInput
              placeholder="Digite seu nome completo"
              style={inputStyle}
              placeholderTextColor={altoContraste ? "#cccccc" : "#777"}
              value={nome}
              onChangeText={setNome}
            />

            <Text style={[styles.formLabel, fonteDestaqueApp, { color: tema.texto }]}>CPF*</Text>
            <TextInput
              placeholder="Digite o CPF"
              style={inputStyle}
              placeholderTextColor={altoContraste ? "#cccccc" : "#777"}
              value={cpf}
              onChangeText={setCpf}
            />

            <Text style={[styles.formLabel, fonteDestaqueApp, { color: tema.texto }]}>Nº de pessoas na família*</Text>
            <TextInput
              placeholder="Digite quantas pessoas moram com você"
              style={inputStyle}
              placeholderTextColor={altoContraste ? "#cccccc" : "#777"}
              value={pessoas}
              onChangeText={setPessoas}
              keyboardType="numeric"
            />
          </>
        ) : (
          <>
            <Text style={[styles.formLabel, fonteDestaqueApp, { color: tema.texto }]}>Responsável*</Text>
            <TextInput
              placeholder="Digite seu nome completo"
              style={inputStyle}
              placeholderTextColor={altoContraste ? "#cccccc" : "#777"}
              value={nome}
              onChangeText={setNome}
            />

            <Text style={[styles.formLabel, fonteDestaqueApp, { color: tema.texto }]}>Nome da instituição*</Text>
            <TextInput
              placeholder="Digite o nome da instituição"
              style={inputStyle}
              placeholderTextColor={altoContraste ? "#cccccc" : "#777"}
              value={nomeInstituicao}
              onChangeText={setNomeInstituicao}
            />

            <Text style={[styles.formLabel, fonteDestaqueApp, { color: tema.texto }]}>CNPJ*</Text>
            <TextInput
              placeholder="Digite o CNPJ"
              style={inputStyle}
              placeholderTextColor={altoContraste ? "#cccccc" : "#777"}
              value={cnpj}
              onChangeText={setCnpj}
            />
          </>
        )}

        <Text style={[styles.formLabel, fonteDestaqueApp, { color: tema.texto }]}>Senha*</Text>
        <TextInput
          placeholder="Mínimo 6 caracteres"
          style={inputStyle}
          placeholderTextColor={altoContraste ? "#cccccc" : "#777"}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <Text style={[styles.formLabel, fonteDestaqueApp, { color: tema.texto }]}>Confirmar senha*</Text>
        <TextInput
          placeholder="Repita a senha"
          style={inputStyle}
          placeholderTextColor={altoContraste ? "#cccccc" : "#777"}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={[
            styles.upload,
            { backgroundColor: tema.card, borderColor: tema.destaque },
          ]}
          onPress={() =>
            Alert.alert("Upload", "Seleção de comprovante será implementada.")
          }
        >
          <Feather name="upload-cloud" size={34} color={tema.destaque} />
          <Text style={[styles.uploadText, fonteDestaqueApp, { color: tema.texto }]}>Faça upload do comprovante de residência</Text>
          <Text style={[styles.uploadSubtext, fonteApp, { color: tema.textoSecundario }]}>Tipo de arquivo: PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.termsRow}
          onPress={() => setAceitouTermos(!aceitouTermos)}
        >
          <View
            style={[
              styles.checkboxBox,
              { borderColor: tema.destaque, backgroundColor: tema.card },
            ]}
          >
            <Text style={[styles.checkbox, fonteApp, { color: tema.texto }]}>
              {aceitouTermos ? "✓" : ""}
            </Text>
          </View>

          <Text style={[styles.termsText, fonteApp, { color: tema.texto }]}>Li e aceito os termos e condições</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: tema.botao }]}
          onPress={cadastrar}
        >
          <Text style={[styles.buttonText, fonteDestaqueApp, { color: tema.textoBotao }]}>CADASTRAR</Text>
        </TouchableOpacity>

        <Text style={[styles.link, fonteApp, { color: tema.texto }]}>
          Já tem uma conta?{" "}
          <Text style={{ color: tema.destaque }} onPress={() => setTela("login")}>
            Faça login aqui
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}




