import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 112,
  },

  loginContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    justifyContent: "space-between",
  },

  cadastroContainer: {
    paddingBottom: 18,
  },

  cadastroScrollContent: {
    paddingTop: 8,
    paddingBottom: 28,
  },

  loginContent: {
    marginTop: 40,
  },

  header: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  logoImage: {
    width: 82,
    height: 82,
    marginBottom: 10,
  },

  logo: {
    fontSize: 34,
    lineHeight: 42,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 5,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },

  loginSelector: {
    flexDirection: "row",
    borderWidth: 1.5,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 28,
  },

  loginSelectorButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },

  loginSelectorText: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 21,
  },

  fieldLabel: {
    fontWeight: "bold",
    marginBottom: 4,
    marginLeft: 4,
    fontSize: 14,
    lineHeight: 19,
  },

  loginInput: {
    borderWidth: 1.5,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 18,
    fontSize: 15,
  },

  loginButton: {
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 20,
  },

  loginButtonText: {
    fontWeight: "bold",
    letterSpacing: 2,
    fontSize: 15,
    lineHeight: 20,
  },

  loginRegisterText: {
    textAlign: "center",
    marginBottom: 34,
    fontSize: 15,
  },

  title: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 18,
  },

  input: {
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 13,
  },

  formLabel: {
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 4,
    fontSize: 13,
    lineHeight: 18,
  },

  cardInfoArea: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 10,
  },

  cardIcon: {
    marginRight: 10,
  },

  mapContainer: {
    height: 430,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 2,
    marginBottom: 18,
    position: "relative",
  },

  map: {
    width: "100%",
    height: "100%",
  },

  mapUnavailable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 26,
  },

  mapUnavailableTitle: {
    fontSize: 19,
    lineHeight: 25,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 6,
    textAlign: "center",
  },

  mapUnavailableText: {
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
  },

  mapLegend: {
    position: "absolute",
    left: 14,
    bottom: 14,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 6,
  },

  mapLegendItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  mapLegendPin: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
    transform: [{ rotate: "45deg" }],
  },

  mapLegendPinCenter: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(20, 33, 61, 0.38)",
  },


  mapLegendText: {
    fontSize: 12,
    lineHeight: 16,
  },

  mapPopupRow: {
    position: "absolute",
    top: 20,
    left: 16,
    right: 16,
    borderWidth: 1.5,
    borderRadius: 18,
    paddingTop: 14,
    paddingBottom: 12,
    paddingLeft: 14,
    paddingRight: 86,
    minHeight: 118,
  },

  popupFooter: {
    position: "absolute",
    right: 14,
    top: 62,
  },

  popupClose: {
    position: "absolute",
    top: 8,
    right: 10,
    padding: 6,
    zIndex: 10,
  },

  popupSmallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
  },

  popupSmallButtonText: {
    color: "#fff",
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "bold",
  },

  popupContent: {
    marginTop: 6,
  },

  popupLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  popupInfoLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  popupInfoIcon: {
    width: 20,
    marginRight: 6,
  },

  popupSingleLineText: {
    flexShrink: 1,
    minWidth: 0,
  },

  popupTitle: {
    flexShrink: 1,
    minWidth: 0,
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 0,
  },

  popupText: {
    fontSize: 13,
    marginBottom: 3,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 14,
  },

  button: {
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 16,
  },

  buttonText: {
    fontWeight: "bold",
    lineHeight: 20,
  },

  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
    alignSelf: "center",
  },

  smallButtonText: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold",
  },

  link: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
    fontSize: 14,
  },

  error: {
    textAlign: "center",
    marginBottom: 8,
  },

  upload: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 14,
    marginBottom: 18,
    alignItems: "center",
  },

  uploadText: {
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 6,
  },

  uploadSubtext: {
    fontSize: 12,
    marginTop: 3,
  },

  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  checkbox: {
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 16,
  },

  termsText: {
    fontSize: 13,
  },

  cardRow: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  instituicaoListContent: {
    paddingBottom: 118,
  },

  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 12,
  },

  metricCard: {
    width: "47.5%",
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  metricValue: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "bold",
    marginBottom: 3,
  },

  metricLabel: {
    fontSize: 12,
    lineHeight: 16,
  },

  cardTitle: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 6,
  },

  cardText: {
    fontSize: 13,
  },

  familyInfoLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  familyInfoIcon: {
    width: 20,
    marginRight: 6,
  },

  familyCardTitle: {
    marginBottom: 0,
  },


  locationCardRow: {
    alignItems: "flex-start",
  },

  locationInfoLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  locationInfoIcon: {
    width: 20,
    marginRight: 6,
  },

  locationSingleLineText: {
    flexShrink: 1,
    minWidth: 0,
  },

  locationCardTitle: {
    marginBottom: 0,
  },
  info: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },

  controlTitle: {
    marginTop: 8,
    marginBottom: 12,
  },

  controlPanel: {
    borderWidth: 1,
    borderRadius: 16,
    paddingTop: 12,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
  controlSummaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },

  controlMetricWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  controlMetricItem: {
    flex: 1,
    minHeight: 82,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingTop: 1,
  },

  controlMetricDivider: {
    width: 3,
    height: 56,
    borderRadius: 8,
    marginHorizontal: 4,
  },

  controlMetricValue: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "bold",
    marginTop: 3,
  },

  controlMetricValueSmall: {
    fontSize: 14,
    lineHeight: 19,
  },

  controlMetricLabel: {
    minHeight: 26,
    fontSize: 10,
    lineHeight: 13,
    textAlign: "center",
    textAlignVertical: "center",
  },

  controlTimeRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    marginBottom: 0,
  },

  controlTimeBoxWrap: {
    alignItems: "center",
  },

  controlTimeLabel: {
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 2,
  },

  controlTimeBox: {
    width: 78,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 4,
    alignItems: "center",
  },

  controlTimeText: {
    fontSize: 10,
    lineHeight: 14,
  },


  attendanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "rgba(249, 115, 22, 0.28)",
    paddingTop: 10,
  },

  attendanceTextWrap: {
    flex: 1,
    paddingRight: 12,
  },

  attendanceLabel: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "bold",
  },

  attendanceHint: {
    fontSize: 11,
    lineHeight: 15,
    marginTop: 1,
  },

  attendancePill: {
    minWidth: 82,
    borderRadius: 18,
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignItems: "center",
  },

  attendancePillText: {
    color: "#14213d",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "bold",
  },

  locationStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  locationStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  controlHistoryContent: {
    paddingTop: 2,
    paddingBottom: 118,
  },

  controlMonthBlock: {
    marginBottom: 4,
  },

  controlMonthTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "bold",
    marginBottom: 3,
  },

  controlDayBlock: {
    marginBottom: 6,
  },

  controlDayTitle: {
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 3,
  },

  controlHistoryRow: {
    minHeight: 23,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  controlHistoryNameWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },

  controlHistoryName: {
    flex: 1,
    fontSize: 11,
    lineHeight: 15,
    marginLeft: 4,
  },

  controlHistoryTime: {
    fontSize: 10,
    lineHeight: 14,
  },
  bottomNav: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 0,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 6,
    zIndex: 99,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 58,
    paddingVertical: 5,
    borderRadius: 18,
  },

  navItemActive: {
    elevation: 4,
  },

  navText: {
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 15,
    marginTop: 3,
  },

  sectionTitle: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 16,
  },

  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },


  configSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 8,
  },

  configEditButton: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 0,
  },

  configEditButtonText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "bold",
  },

  configProofUpload: {
    paddingVertical: 16,
    marginTop: 2,
  },

  configActionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },

  configSecondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: "center",
  },

  configSecondaryButtonText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold",
  },

  configSaveButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: "center",
  },

  configSaveButtonText: {
    color: "#14213d",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold",
  },
  configScrollContent: {
    paddingBottom: 0,
  },



  cardItem: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 6,
  },

  bold: {
    fontWeight: "bold",
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  logoutButton: {
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 12,
  },

  logoutText: {
    fontWeight: "bold",
    letterSpacing: 1,
    lineHeight: 20,
  },

  switchPillOn: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  switchPillOff: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  switchPillText: {
    color: "#14213d",
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 15,
  },
});

export default styles;

























