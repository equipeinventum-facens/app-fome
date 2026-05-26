import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "../styles";

function BottomNav({ fonteApp, items, setTela, tela, tema }) {
  const insets = useSafeAreaInsets();
  const bottomOffset = Math.max(insets.bottom + 10, 18);

  return (
    <View
      style={[
        styles.bottomNav,
        {
          backgroundColor: tema.card,
          borderColor: tema.borda,
          bottom: bottomOffset,
        },
      ]}
    >
      {items.map((item) => {
        const isActive = tela === item.tela;
        const activeColors = isActive
          ? {
              backgroundColor: tema.destaque,
              iconColor: tema.textoBotao,
              textColor: tema.textoBotao,
            }
          : {
              iconColor: tema.texto,
              textColor: tema.texto,
            };

        return (
          <TouchableOpacity
            key={item.tela}
            style={[
              styles.navItem,
              isActive && styles.navItemActive,
              isActive && { backgroundColor: activeColors.backgroundColor },
            ]}
            onPress={() => setTela(item.tela)}
          >
            <Feather name={item.icon} size={24} color={activeColors.iconColor} />
            <Text style={[styles.navText, fonteApp, { color: activeColors.textColor }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export function BottomFamilia(props) {
  return (
    <BottomNav
      {...props}
      items={[
        { tela: "locais", icon: "home", label: "LOCAIS" },
        { tela: "mapa", icon: "map", label: "MAPA" },
        { tela: "config", icon: "settings", label: "CONFIG" },
      ]}
    />
  );
}

export function BottomInstituicao(props) {
  return (
    <BottomNav
      {...props}
      items={[
        { tela: "familias", icon: "users", label: "FAMÍLIA" },
        { tela: "controle", icon: "bar-chart-2", label: "CONTROLE" },
        { tela: "config", icon: "settings", label: "CONFIG" },
      ]}
    />
  );
}
