import CadastroScreen from "./CadastroScreen";
import ConfigScreen from "./ConfigScreen";
import ControleScreen from "./ControleScreen";
import FamiliasScreen from "./FamiliasScreen";
import LocaisScreen from "./LocaisScreen";
import LoginScreen from "./LoginScreen";
import MapaScreen from "./MapaScreen";

export default function ScreenRouter(props) {
  if (props.tela === "cadastro") return <CadastroScreen {...props} />;
  if (props.tela === "locais") return <LocaisScreen {...props} />;
  if (props.tela === "mapa") return <MapaScreen {...props} />;
  if (props.tela === "familias") return <FamiliasScreen {...props} />;
  if (props.tela === "controle") return <ControleScreen {...props} />;
  if (props.tela === "config") return <ConfigScreen {...props} />;

  return <LoginScreen {...props} />;
}