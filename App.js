import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import * as Location from "expo-location";
import { Alert, AppState, Linking } from "react-native";
import ScreenRouter from "./src/screens/ScreenRouter";
import {
  atualizarUsuario,
  carregarDadosRemotos,
  criarEntrega,
  criarUsuario,
  salvarDadosLocais,
} from "./src/services/storageService";

function MainApp() {
  const [tela, setTela] = useState("login");
  const [tipo, setTipo] = useState("familia");

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [entregas, setEntregas] = useState([]);
  const [instituicaoSelecionada, setInstituicaoSelecionada] = useState(null);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [nomeInstituicao, setNomeInstituicao] = useState("");
  const [pessoas, setPessoas] = useState("");
  const [endereco, setEndereco] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const [loginDoc, setLoginDoc] = useState("");
  const [loginSenha, setLoginSenha] = useState("");
  const [erro, setErro] = useState("");

  const [altoContraste, setAltoContraste] = useState(false);
  const [fonteDislexia, setFonteDislexia] = useState(false);
  const [fonteCarregada, setFonteCarregada] = useState(false);
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [localizacaoUsuario, setLocalizacaoUsuario] = useState(null);
  const [statusLocalizacao, setStatusLocalizacao] = useState("carregando");
  const [coordenadasInstituicoes, setCoordenadasInstituicoes] = useState({});

  const isFamilia = tipo === "familia";
  const tema = altoContraste
    ? {
        fundo: "#000000",
        card: "#111111",
        texto: "#ffffff",
        textoSecundario: "#f5f5f5",
        borda: "#ffffff",
        destaque: "#ffb000",
        botao: "#ffffff",
        textoBotao: "#000000",
        input: "#111111",
        erro: "#ff4d4d",
      }
    : {
        fundo: "#f5e9d8",
        card: "#fff8ed",
        texto: "#14213d",
        textoSecundario: "#555",
        borda: "#e9b46f",
        destaque: "#f97316",
        botao: "#14213d",
        textoBotao: "#ffffff",
        input: "#fff8ed",
        erro: "red",
      };

  const fonteApp =
    fonteDislexia && fonteCarregada
      ? { fontFamily: "OpenDyslexic", fontWeight: "400" }
      : {};
  const fonteDestaqueApp =
    fonteDislexia && fonteCarregada
      ? { fontFamily: "OpenDyslexicBold", fontWeight: "400" }
      : {};

  const dataHoje = new Date().toLocaleDateString("pt-BR");
  const instituicoes = usuarios.filter((u) => u.tipo === "instituicao");
  const familias = usuarios.filter((u) => u.tipo === "familia");
  const entregasHoje = entregas.filter((entrega) => entrega.data === dataHoje);
  const familiasDisponiveis = familias.filter(
    (familia) => !entregasHoje.some((entrega) => entrega.familiaId === familia.id),
  );

  useEffect(() => {
    carregarDados();
    carregarLocalizacaoUsuario();
  }, []);

  useEffect(() => {
    if (!usuarioLogado) return;

    const intervalo = setInterval(() => {
      carregarDados({ silencioso: true });
    }, 3000);

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        carregarDados({ silencioso: true });
      }
    });

    return () => {
      clearInterval(intervalo);
      subscription.remove();
    };
  }, [usuarioLogado?.id]);

  useEffect(() => {
    if (dadosCarregados) {
      salvarDadosLocais({ usuarios, entregas });
    }
  }, [dadosCarregados, usuarios, entregas]);

  useEffect(() => {
    geocodificarInstituicoes(instituicoes);
  }, [usuarios]);


  useEffect(() => {
    async function carregarFonte() {
      try {
        await Font.loadAsync({
          OpenDyslexic: require("./assets/fonts/OpenDyslexic-Regular.otf"),
          OpenDyslexicBold: require("./assets/fonts/OpenDyslexicAlta-Bold.otf"),
        });
        setFonteCarregada(true);
      } catch (error) {
        console.log("Erro ao carregar fonte:", error);
      }
    }

    carregarFonte();
  }, []);

  function enderecoTemCoordenada(endereco) {
    const texto = String(endereco || "").trim();

    return (
      texto &&
      !texto.toLowerCase().includes("aguardando") &&
      !texto.includes(String.fromCharCode(0xfffd)) &&
      !texto.includes(String.fromCharCode(195))
    );
  }

  async function geocodificarInstituicoes(listaInstituicoes) {
    const proximasCoordenadas = {};

    for (const instituicao of listaInstituicoes) {
      if (!enderecoTemCoordenada(instituicao.endereco)) continue;

      try {
        const resultados = await Location.geocodeAsync(instituicao.endereco);

        if (resultados.length > 0) {
          proximasCoordenadas[instituicao.id] = {
            latitude: resultados[0].latitude,
            longitude: resultados[0].longitude,
          };
        }
      } catch (error) {
        console.log("Erro ao geocodificar endereço:", instituicao.endereco, error);
      }
    }

    setCoordenadasInstituicoes(proximasCoordenadas);
  }

  async function carregarDados({ silencioso = false } = {}) {
    try {
      const dados = await carregarDadosRemotos();
      setUsuarios(dados.usuarios);
      setEntregas(dados.entregas);
      setUsuarioLogado((usuarioAtual) => {
        if (!usuarioAtual) return usuarioAtual;

        return (
          dados.usuarios.find((usuario) => usuario.id === usuarioAtual.id) ||
          usuarioAtual
        );
      });
    } catch (error) {
      console.log("Erro ao carregar dados:", error);
      if (!silencioso) {
        Alert.alert("Atenção", "Não foi possível carregar os dados salvos.");
      }
    } finally {
      setDadosCarregados(true);
    }
  }

  async function carregarLocalizacaoUsuario() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocalizacaoUsuario(null);
        setStatusLocalizacao("negada");
        return;
      }

      const posicao = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocalizacaoUsuario({
        latitude: posicao.coords.latitude,
        longitude: posicao.coords.longitude,
      });
      setStatusLocalizacao("permitida");
    } catch (error) {
      console.log("Erro ao carregar localização:", error);
      setLocalizacaoUsuario(null);
      setStatusLocalizacao("erro");
    }
  }

  function limparCampos() {
    setNome("");
    setCpf("");
    setCnpj("");
    setNomeInstituicao("");
    setPessoas("");
    setEndereco("");
    setSenha("");
    setConfirmarSenha("");
    setAceitouTermos(false);
  }

  async function cadastrar() {
    if (!nome || !senha || !confirmarSenha) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }

    if (!aceitouTermos) {
      Alert.alert("Atenção", "Você precisa aceitar os termos e condições.");
      return;
    }

    if (tipo === "familia" && (!cpf || !pessoas)) {
      Alert.alert("Atenção", "Preencha CPF e número de pessoas.");
      return;
    }

    if (tipo === "instituicao" && (!cnpj || !nomeInstituicao)) {
      Alert.alert("Atenção", "Preencha o nome da instituição e o CNPJ.");
      return;
    }

    const novoUsuario = {
      id: Date.now(),
      tipo,
      nome,
      cpf,
      cnpj,
      nomeInstituicao,
      pessoas,
      endereco: endereco || "Aguardando validação do comprovante",
      senha,
    };

    try {
      const usuarioCriado = await criarUsuario(novoUsuario);
      setUsuarios([...usuarios, usuarioCriado]);
      limparCampos();
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      setTela("login");
    } catch (error) {
      console.log("Erro ao cadastrar:", error);
      Alert.alert("Erro", "Não foi possível realizar o cadastro.");
    }
  }

  function entrar() {
    const usuario = usuarios.find(
      (u) =>
        u.tipo === tipo &&
        (tipo === "familia" ? u.cpf === loginDoc : u.cnpj === loginDoc) &&
        u.senha === loginSenha,
    );

    if (!usuario) {
      setErro("CPF/CNPJ ou senha incorretos");
      return;
    }

    setUsuarioLogado(usuario);
    setErro("");
    setTela(tipo === "familia" ? "locais" : "familias");
  }

  function sair() {
    setUsuarioLogado(null);
    setLoginDoc("");
    setLoginSenha("");
    setTela("login");
  }

  async function entregar(familia) {
    const jaEntregueHoje = entregasHoje.some(
      (entrega) => entrega.familiaId === familia.id,
    );

    if (jaEntregueHoje) {
      Alert.alert("Atenção", "Essa família já recebeu uma cesta hoje.");
      return;
    }

    const novaEntrega = {
      id: Date.now(),
      familiaId: familia.id,
      nome: familia.nome,
      cpf: familia.cpf,
      pessoas: familia.pessoas,
      endereco: familia.endereco,
      data: new Date().toLocaleDateString("pt-BR"),
      hora: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    try {
      const entregaCriada = await criarEntrega(novaEntrega);
      setEntregas([entregaCriada, ...entregas]);
      Alert.alert("Sucesso", "Entrega realizada com sucesso!");
    } catch (error) {
      console.log("Erro ao registrar entrega:", error);
      Alert.alert("Erro", "Não foi possível registrar a entrega.");
    }
  }


  async function salvarPerfil(dadosAtualizados) {
    if (!usuarioLogado) return;

    const atualizado = {
      ...usuarioLogado,
      ...dadosAtualizados,
    };

    try {
      const usuarioAtualizado = await atualizarUsuario(atualizado);
      setUsuarioLogado(usuarioAtualizado);
      setUsuarios((lista) =>
        lista.map((usuario) =>
          usuario.id === usuarioAtualizado.id ? usuarioAtualizado : usuario,
        ),
      );
      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      return true;
    } catch (error) {
      console.log("Erro ao atualizar perfil:", error);
      Alert.alert("Erro", `Não foi possível atualizar seus dados.\n\nDetalhe: ${error.message}`);
      return false;
    }
  }

  async function alternarAtendimento() {
    if (!usuarioLogado || usuarioLogado.tipo !== "instituicao") return;
    await salvarPerfil({ atendimentoAberto: !usuarioLogado.atendimentoAberto });
  }
  function obterCoordenadas(index = 0, instituicao = null) {
    if (instituicao?.id && coordenadasInstituicoes[instituicao.id]) {
      return coordenadasInstituicoes[instituicao.id];
    }

    const pontos = [
      { latitude: -23.117, longitude: -46.556 },
      { latitude: -23.112, longitude: -46.548 },
      { latitude: -23.121, longitude: -46.563 },
      { latitude: -23.108, longitude: -46.559 },
    ];

    return pontos[index % pontos.length];
  }

  function abrirGPS(index = 0, instituicao = null) {
    if (instituicao && !instituicao.atendimentoAberto) {
      Alert.alert("Local fechado", "Este local está fechado no momento. Tente novamente quando estiver aberto.");
      return;
    }

    const endereco = String(instituicao?.endereco || "").trim();
    const enderecoValido = enderecoTemCoordenada(endereco);

    if (enderecoValido) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(endereco)}`;
      Linking.openURL(url);
      return;
    }

    const destino = obterCoordenadas(index);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destino.latitude},${destino.longitude}`;
    Linking.openURL(url);
  }

  return (
    <ScreenRouter
      abrirGPS={abrirGPS}
      aceitouTermos={aceitouTermos}
      alternarAtendimento={alternarAtendimento}
      altoContraste={altoContraste}
      cadastrar={cadastrar}
      cnpj={cnpj}
      confirmarSenha={confirmarSenha}
      cpf={cpf}
      entregas={entregas}
      entregasHoje={entregasHoje}
      entregar={entregar}
      erro={erro}
      familias={familias}
      familiasDisponiveis={familiasDisponiveis}
      fonteApp={fonteApp}
      fonteDestaqueApp={fonteDestaqueApp}
      fonteDislexia={fonteDislexia}
      instituicaoSelecionada={instituicaoSelecionada}
      instituicoes={instituicoes}
      isFamilia={isFamilia}
      loginDoc={loginDoc}
      loginSenha={loginSenha}
      localizacaoUsuario={localizacaoUsuario}
      nome={nome}
      nomeInstituicao={nomeInstituicao}
      obterCoordenadas={obterCoordenadas}
      pessoas={pessoas}
      sair={sair}
      salvarPerfil={salvarPerfil}
      senha={senha}
      setAceitouTermos={setAceitouTermos}
      setAltoContraste={setAltoContraste}
      setCnpj={setCnpj}
      setConfirmarSenha={setConfirmarSenha}
      setCpf={setCpf}
      setFonteDislexia={setFonteDislexia}
      setInstituicaoSelecionada={setInstituicaoSelecionada}
      setLoginDoc={setLoginDoc}
      setLoginSenha={setLoginSenha}
      setNome={setNome}
      setNomeInstituicao={setNomeInstituicao}
      setPessoas={setPessoas}
      setSenha={setSenha}
      setTela={setTela}
      statusLocalizacao={statusLocalizacao}
      setTipo={setTipo}
      tela={tela}
      tema={tema}
      tipo={tipo}
      usuarioLogado={usuarioLogado}
      entrar={entrar}
    />
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <MainApp />
    </SafeAreaProvider>
  );
}












