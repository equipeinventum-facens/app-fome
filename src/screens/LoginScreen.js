import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomFamilia, BottomInstituicao } from "../components/BottomNav";
import Header from "../components/Header";
import LoginSelector from "../components/LoginSelector";
import styles from "../styles";

export default function LoginScreen({
  abrirGPS,
  aceitouTermos,
  altoContraste,
  cadastrar,
  cnpj,
  confirmarSenha,
  cpf,
  entregas,
  entregar,
  erro,
  familias,
  familiasDisponiveis,
  fonteApp,
  fonteDestaqueApp,
  fonteDislexia,
  instituicaoSelecionada,
  instituicoes,
  isFamilia,
  loginDoc,
  loginSenha,
  nome,
  nomeInstituicao,
  obterCoordenadas,
  pessoas,
  sair,
  senha,
  setAceitouTermos,
  setAltoContraste,
  setCnpj,
  setConfirmarSenha,
  setCpf,
  setFonteDislexia,
  setInstituicaoSelecionada,
  setLoginDoc,
  setLoginSenha,
  setNome,
  setNomeInstituicao,
  setPessoas,
  setSenha,
  setTela,
  setTipo,
  tela,
  tema,
  tipo,
  usuarioLogado,
  entrar,
}) {
  const headerProps = { altoContraste, fonteApp, fonteDestaqueApp, tema };
  const loginSelectorProps = { fonteApp, setTipo, tema, tipo };
  const bottomNavProps = { fonteApp, setTela, tela, tema };

  return (
    <SafeAreaView
      style={[styles.loginContainer, { backgroundColor: tema.fundo }]}
    >
      <View style={styles.loginContent}>
        <Header {...headerProps} />

        <LoginSelector {...loginSelectorProps} />

        <Text style={[styles.fieldLabel, fonteApp, { color: tema.texto }]}>
          {isFamilia ? "CPF" : "CNPJ"}
        </Text>
        <TextInput
          placeholder={isFamilia ? "Digite o CPF" : "Digite o CNPJ"}
          style={[
            styles.loginInput,
            fonteApp,
  fonteDestaqueApp,
            {
              backgroundColor: tema.input,
              borderColor: tema.destaque,
              color: tema.texto,
            },
          ]}
          value={loginDoc}
          onChangeText={setLoginDoc}
          placeholderTextColor={altoContraste ? "#cccccc" : "#7a7a7a"}
        />

        <Text style={[styles.fieldLabel, fonteApp, { color: tema.texto }]}>
          Senha
        </Text>
        <TextInput
          placeholder="Digite a senha"
          style={[
            styles.loginInput,
            fonteApp,
  fonteDestaqueApp,
            {
              backgroundColor: tema.input,
              borderColor: tema.destaque,
              color: tema.texto,
            },
          ]}
          value={loginSenha}
          onChangeText={setLoginSenha}
          secureTextEntry
          placeholderTextColor={altoContraste ? "#cccccc" : "#7a7a7a"}
        />

        {erro !== "" && (
          <Text style={[styles.error, fonteApp, { color: tema.erro }]}>
            {erro}
          </Text>
        )}

        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: tema.botao }]}
          onPress={entrar}
        >
          <Text
            style={[
              styles.loginButtonText,
              fonteApp,
  fonteDestaqueApp,
              { color: tema.textoBotao },
            ]}
          >
            ENTRAR
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.loginRegisterText, fonteApp, { color: tema.texto }]}>
        Ainda não tem uma conta?{" "}
        <Text
          style={{ color: tema.destaque }}
          onPress={() => setTela("cadastro")}
        >
          Cadastre-se aqui
        </Text>
      </Text>
    </SafeAreaView>
  );
}