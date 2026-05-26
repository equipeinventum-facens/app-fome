import { Feather } from "@expo/vector-icons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomInstituicao } from "../components/BottomNav";
import Header from "../components/Header";
import styles from "../styles";

function parseDateParts(date = "") {
  const [day = "", month = "", year = ""] = String(date).split("/");
  return { day, month, year };
}

function getDateKey(entrega) {
  const { day, month, year } = parseDateParts(entrega.data);
  return `${year}-${month}-${day}`;
}

function compareDateDesc(a, b) {
  return getDateKey(b).localeCompare(getDateKey(a));
}

function getMonthTitle(date = "") {
  const { month, year } = parseDateParts(date);
  return month && year ? `MÊS ${month}/${year}` : "MÊS";
}

function getDayTitle(date = "") {
  return date ? `Dia ${date}` : "Dia sem data";
}

function groupEntregas(entregas = []) {
  const sorted = [...entregas].sort((a, b) => {
    const dateCompare = compareDateDesc(a, b);
    if (dateCompare !== 0) return dateCompare;
    return String(b.hora || "").localeCompare(String(a.hora || ""));
  });

  const groups = [];

  sorted.forEach((entrega) => {
    const monthTitle = getMonthTitle(entrega.data);
    const dayTitle = getDayTitle(entrega.data);
    let monthGroup = groups.find((group) => group.title === monthTitle);

    if (!monthGroup) {
      monthGroup = { title: monthTitle, days: [] };
      groups.push(monthGroup);
    }

    let dayGroup = monthGroup.days.find((group) => group.title === dayTitle);

    if (!dayGroup) {
      dayGroup = { title: dayTitle, data: entrega.data, items: [] };
      monthGroup.days.push(dayGroup);
    }

    dayGroup.items.push(entrega);
  });

  return groups;
}

function getComparacaoTexto(entregasHoje, entregas) {
  const dataHoje = entregasHoje[0]?.data;
  const datasAnteriores = [...new Set(entregas.map((entrega) => entrega.data))]
    .filter((data) => data && data !== dataHoje)
    .sort((a, b) => getDateKey({ data: b }).localeCompare(getDateKey({ data: a })));
  const ultimaData = datasAnteriores[0];

  if (!ultimaData) return "--";

  const totalUltimaData = entregas.filter((entrega) => entrega.data === ultimaData).length;
  const diferenca = entregasHoje.length - totalUltimaData;

  if (diferenca > 0) return `+${diferenca}`;
  if (diferenca < 0) return String(diferenca);
  return "0";
}

export default function ControleScreen({
  alternarAtendimento,
  altoContraste,
  entregas,
  entregasHoje,
  familias,
  fonteApp,
  fonteDestaqueApp,
  setTela,
  tela,
  tema,
  usuarioLogado,
}) {
  const headerProps = { altoContraste, fonteApp, fonteDestaqueApp, tema };
  const bottomNavProps = { fonteApp, setTela, tela, tema };
  const atendimentoAberto = Boolean(usuarioLogado?.atendimentoAberto);
  const comparacao = getComparacaoTexto(entregasHoje, entregas);
  const historico = groupEntregas(entregas);

  const metricas = [
    { icon: "users", value: familias.length, label: "Famílias cadastradas" },
    { icon: "package", value: entregasHoje.length, label: "Cestas entregues hoje" },
    { icon: "trending-up", value: comparacao, label: "Comparação anterior" },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Header {...headerProps} />
      <Text style={[styles.title, styles.controlTitle, fonteDestaqueApp, { color: tema.texto }]}>Controle</Text>

      <View style={[styles.controlPanel, { backgroundColor: tema.card, borderColor: tema.borda }]}>
        <View style={styles.controlSummaryRow}>
          {metricas.map((metrica, index) => (
            <View key={metrica.label} style={styles.controlMetricWrap}>
              <View style={styles.controlMetricItem}>
                <Feather name={metrica.icon} size={32} color={tema.texto} />
                <Text
                  style={[
                    styles.controlMetricValue,
                    String(metrica.value).length > 3 && styles.controlMetricValueSmall,
                    fonteDestaqueApp,
                    { color: tema.texto },
                  ]}
                  numberOfLines={1}
                >
                  {metrica.value}
                </Text>
                <Text style={[styles.controlMetricLabel, fonteApp, { color: tema.texto }]}>{metrica.label}</Text>
              </View>

              {index < metricas.length - 1 && (
                <View style={[styles.controlMetricDivider, { backgroundColor: tema.destaque }]} />
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.attendanceRow}
          onPress={alternarAtendimento}
          activeOpacity={0.85}
        >
          <View style={styles.attendanceTextWrap}>
            <Text style={[styles.attendanceLabel, fonteDestaqueApp, { color: tema.texto }]}>Atendimento</Text>
            <Text style={[styles.attendanceHint, fonteApp, { color: tema.textoSecundario }]}>Visível para as famílias</Text>
          </View>

          <View
            style={[
              styles.attendancePill,
              { backgroundColor: atendimentoAberto ? tema.destaque : "#e5ded2" },
            ]}
          >
            <Text style={[styles.attendancePillText, fonteDestaqueApp]}>
              {atendimentoAberto ? "ABERTO" : "FECHADO"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {historico.length === 0 ? (
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
          Nenhuma entrega registrada.
        </Text>
      ) : (
        <FlatList
          data={historico}
          keyExtractor={(item) => item.title}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.controlHistoryContent}
          renderItem={({ item: monthGroup }) => (
            <View style={styles.controlMonthBlock}>
              <Text style={[styles.controlMonthTitle, fonteDestaqueApp, { color: tema.texto }]}>{monthGroup.title}</Text>

              {monthGroup.days.map((dayGroup) => (
                <View key={dayGroup.title} style={styles.controlDayBlock}>
                  <Text style={[styles.controlDayTitle, fonteApp, { color: tema.textoSecundario }]}>{dayGroup.title}</Text>

                  {dayGroup.items.map((entrega) => (
                    <View
                      key={entrega.id}
                      style={[
                        styles.controlHistoryRow,
                        { backgroundColor: tema.card, borderColor: tema.destaque },
                      ]}
                    >
                      <View style={styles.controlHistoryNameWrap}>
                        <Feather name="user" size={15} color={tema.textoSecundario} />
                        <Text style={[styles.controlHistoryName, fonteApp, { color: tema.texto }]} numberOfLines={1}>{entrega.nome}</Text>
                      </View>
                      <Text style={[styles.controlHistoryTime, fonteApp, { color: tema.texto }]}>{entrega.hora}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
        />
      )}

      <BottomInstituicao {...bottomNavProps} />
    </SafeAreaView>
  );
}

