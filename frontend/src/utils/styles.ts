import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  /* ------------------- Appbar ------------------- */
  appbar: {
    height: 40,
    padding: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoAppbar: {
    margin: 10,
    height: 31,
    width: 97
  },
  /* ------------------- End Appbar ------------------- */
  /* ------------------- General ------------------- */
  simpleText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: "center",
  },
  inputContainer: {
    padding: 16,
    width: "100%",
  },
  greenText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#80C197',
    textAlign: "center",
  },
  paperContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    margin: 20,
    flex: 1,
    alignItems: 'center'
  },
  /* ------------------- End General ------------------- */
  /* ------------------- White Line ------------------- */
  whiteLine: {
    width: "90%",
    height: 1,
    backgroundColor: "#FFFFFF",
    marginVertical: 16
  },
  /* ------------------- End White Line ------------------- */
  /* ------------------- Login ------------------- */
  loginContainer: {
    flex: 1,
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundLogin: {
    backgroundColor: "#80C197",
    top: "0%",
    position: "absolute",
    height: "40%",
    width: "100%",
    paddingTop: "20%",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardLoginContainer: {
    top: "25%",
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    paddingTop: 10,
    width: "90%",
  },
  inputLogin: {
    fontSize: 14,
    width: "100%",
    borderWidth: 1,
    padding: 14,
    lineHeight: 21,
    borderRadius: 8,
    borderColor: "#F4F4F4",
    backgroundColor: "#F4F4F4",
  },
  textLogin: {
    fontSize: 12,
    color: "#000000",
    paddingVertical: 10 
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '700',
    color: "#FFFFFF",
    textAlign: "center",
  },
  bottomLogin: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flexDirection: "column",
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 32,
    width: "100%",
    marginTop: "auto",
    bottom:0,
    maxHeight: 150
  },
  inputLoginContainer: {
    paddingBottom: 16,
    width: "100%",
  },
  /* ------------------- End Login ------------------- */
  /* ------------------- Buttons ------------------- */
  greenButton: {
    color: "#ffffff",
    backgroundColor: "#80C197",
    borderRadius: 28,
    padding: 16,
    width: "100%"
  },
  greenButtonStart: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
    color: "#ffffff",
    backgroundColor: "#80C197",
    borderRadius: 28,
    padding: 16,
    width: "100%"
  },
  greenButtonDisabled: {
    color: "#ffffff",
    backgroundColor: "#80C19799",
    borderRadius: 28,
    padding: 16,
    width: "100%"
  },
  whiteButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    borderColor: "#80C197",
    borderWidth: 2,
    padding: 16,
    fontWeight: "700",
    color: "#80C197",
    width: "100%"
  },
  /* ------------------- End Buttons ------------------- */
});

export const cameraStyles = StyleSheet.create({
  cameraContainer: {
    position:"absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    zIndex: 9999
  },
  camera: {
    flex: 1,
  },
  pictureButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#fff",
    alignSelf: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "space-around",
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  container: {
    display: "flex",
    textAlign: "center",
  },
  title: {
    textAlign: "center",
  },
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  loading: {
    display: "none",
  },
});

/* ------------------- Pet Styles ------------------- */
export const petStyles = StyleSheet.create({
  avatarContainer: {
    flex: 0.45,
  },
  avatar: {
    overflow: "hidden",
    position: "relative",
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "#80C197",
    width: 145,
    minHeight: 145,
    minWidth: 145,
    height: 145,
    margin: "auto",
  },
  avatarEdit: {
    top: -30,
    left: "70%",
    overflow: "hidden",
    position: "relative",
    borderRadius: 75,
    backgroundColor: "#d9d9d9",
    width: 30,
    minHeight: 30,
    minWidth: 30,
    height: 30,
  },
  card: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 12
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  petNameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#80C197",
    padding: 10,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    marginBottom: 16,
    width: "100%",
  },
  petInfo: {
    fontWeight: "bold",
    marginBottom: 10,
    marginRight: 5,
    width: "100%",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  petInfoContainer: {
    flex: 0.55,
  },
  petInfoCard: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginTop: 15,
    backgroundColor: "#d9d9d9",
  },
  petInfoCardBottom: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginTop: -12,
    width: "98%",
    backgroundColor: "#d9d9d9",
  },
  petName: {
    fontWeight: "600",
    fontSize: 20,
    color: "#ffffff",
  },
  petBirthday: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    marginRight: 20,
    fontWeight: "600",
    fontSize: 20,
    color: "#ffffff",
  },
  innerText: {
    color: "red",
  },
  appointmentTitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "flex-start",
    height: 60,
    backgroundColor: '#80C197'
  },
  appointmentTitleContainerBlue: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "flex-start",
    height: 60,
    backgroundColor: '#2B375F'
  },
  appointmentTitleOnly: {
    margin: "auto",
    fontSize: 18,
    color: "white",
  },
  appointmentTitle: {
    paddingTop: 8,
    fontSize: 18,
    color: "white",
  },
  appointmentSubtitle: {
    fontSize: 14,
    color: "white",
  },
  appointmentContainer: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 20
  },
  appointmentCard: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 12,
    marginBottom: 20,
    borderColor: '#80C197',
    borderWidth: 1,
    backgroundColor: '#ffffff'

  },
  appointmentCardAppbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: '#80C197',
  },
  appointmentCardTitle: {
    fontSize: 18,
    color: "white",
  },
  appointmentCardTimeRemaning: {
    fontSize: 14,
    color: "white",
  },
  appointmentCardAlert: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    marginVertical: 6,
    marginHorizontal: 16,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderColor: '#80C197',
    borderWidth: 1,
    backgroundColor: '#F4F4F4',
  },
  appointmentCardInformations: {
    backgroundColor: '#F4F4F4',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: 150 
  },
  appointmentCardInformationsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 20,
  },
  historyTypeText: {

  }
});

