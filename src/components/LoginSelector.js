import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles";

export default function LoginSelector({ fonteApp, setTipo, tema, tipo }) {
  return (
    <View
      style={[
        styles.loginSelector,
        {
          borderColor: tema.destaque,
          backgroundColor: tema.card,
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.loginSelectorButton,
          tipo === "familia" && { backgroundColor: tema.destaque },
        ]}
        onPress={() => setTipo("familia")}
      >
        <Text
          style={[
            styles.loginSelectorText,
            fonteApp,
            { color: tipo === "familia" ? "#fff" : tema.texto },
          ]}
        >
          Família
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.loginSelectorButton,
          tipo === "instituicao" && { backgroundColor: tema.destaque },
        ]}
        onPress={() => setTipo("instituicao")}
      >
        <Text
          style={[
            styles.loginSelectorText,
            fonteApp,
            { color: tipo === "instituicao" ? "#fff" : tema.texto },
          ]}
        >
          Instituição
        </Text>
      </TouchableOpacity>
    </View>
  );
}
