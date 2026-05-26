import { Image, Text, View } from "react-native";
import styles from "../styles";

const logoPadrao = require("../../assets/logo.png");
const logoContraste = require("../../assets/logo-contraste.png");
const subtitle = "Fraterno Oferecimento de Mantimentos e Esperan\u00e7a";

export default function Header({ altoContraste, fonteApp, fonteDestaqueApp, tema }) {
  const logoSource = altoContraste ? logoContraste : logoPadrao;

  return (
    <View style={styles.header}>
      <Image source={logoSource} style={styles.logoImage} resizeMode="contain" />

      <Text style={[styles.logo, fonteDestaqueApp, { color: tema.texto }]}>F.O.M.E.</Text>

      <Text
        style={[
          styles.subtitle,
          fonteApp,
          { color: altoContraste ? "#ffffff" : "#444" },
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
}