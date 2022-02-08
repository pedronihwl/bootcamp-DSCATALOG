import { Dimensions, StyleSheet } from "react-native"

const wid = Dimensions.get('window').width;

const colors = {
    white: "#FFF",
    lightGray: "#F2F2F2",
    mediumGray: "#9E9E9E",
    darkGray: "#263238",
    borderGray: "#E1E1E1",
    black: "#000",
    primary: "#407BEE",
    secondary: "#33569B",
    bluePill: "#406BFF61",
    red: "#DF5753"
}

const text = StyleSheet.create({
        bold: {
            fontSize: 26,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 15,
            color: colors.darkGray
        },
        regular: {
            fontSize: 16,
            fontWeight: "400",
            textAlign: "center",
            color: colors.mediumGray
        },
        primaryText: {
            textTransform: "uppercase",
            fontSize: 16,
            fontWeight: "bold",
            color: colors.white,
            marginLeft: 20,
        },
        productName: {
            fontSize: 16,
            fontWeight: "bold"
        },
        currency: {
            fontSize: 16,
            fontWeight: "400",
            color: colors.mediumGray
        },
        productValue: {
            fontSize: 30,
            fontWeight: "bold",
            color: colors.primary
        },
        goBackText: {
            fontWeight: "bold",
            fontSize: 18,
            textTransform: "uppercase",
            color: colors.darkGray,
            marginLeft: 16
        },
        productDetailName: {
            fontWeight: "bold",
            fontSize: 30,
            marginTop: 10,
            color: colors.darkGray
        },
        productDescription: {
            fontSize: 16,
            fontWeight: "400",
            color: colors.mediumGray
        },
        textLoginTitle: {
            fontSize: 30,
            fontWeight: "400",
            color: colors.darkGray,
            textTransform: "uppercase",
            marginBottom: 20
        },
        textLogout: {
            color: colors.white
        }
    }
)

const theme = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    card: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        alignItems: "center",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        justifyContent: "space-around"
    },
    loginCard: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        alignItems: "center",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        justifyContent: "center"
    },
    draw: {
        width: 315,
        height: 225
    },
    primaryButton: {
        width: 290,
        height: 50,
        backgroundColor: colors.primary,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
    },
    textContainer: {
        paddingHorizontal: 25
    },
    arrowContainer: {
        width: 50,
        height: 50,
        backgroundColor: colors.secondary,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    scrollContainer: {
        padding: 10
    },
    productCard: {
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "space-around"
    },
    productPrice: {
        flexDirection: "row",
        marginTop: 10
    },
    productDescription: {
        width: "100%",
        padding: 20,
        borderTopColor: colors.lightGray,
        borderTopWidth: 1.5
    },
    inputContainer: {
        width: '100%',
        height: 60,
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        marginVertical: 10,
        alignItems: "center",
    },
    textInput: {
        width: "90%",
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderGray
    },
    detailCard: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        justifyContent: "space-around",
        padding: 20
    },
    productImageContainer: {
        width: "100%",
        borderWidth: 1,
        borderColor: colors.lightGray,
        alignItems: "center",
        borderRadius: 20

    },
    goBackContainer: {
        width: 290,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        justifyContent: "flex-start"
    },
    scrollTextContainer: {
        marginVertical: 20,
        padding: 20,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: colors.lightGray
    },
    passwordGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 25,
        width: 290,
        height: 50,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        borderRadius: 10,
        padding: 10
    },
    textInputLogin: {
        width: 290,
        height: 50,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        borderRadius: 10,
        padding: 10
    }
})

const nav = StyleSheet.create({
    leftText: {
        color: colors.white,
        fontWeight: "bold",
        marginLeft: 10,
    },
    drawer: {
        marginRight: 10
    },
    options: {
        width: wid,
        height: 150,
        backgroundColor: colors.primary,
        marginTop: 150,
        padding: 20,
        justifyContent: "space-between"
    },
    option: {
        paddingVertical: 5
    },
    textOption: {
        color: colors.white,
        textTransform: "uppercase"
    },
    active: {
        fontWeight: "bold"
    },
    logout: {
        width: 60,
        height: 30,
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10
    }
})

const tab = StyleSheet.create({
    container: {
        width: wid,
        height: 80,
        flexDirection: "row",
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "space-around"
    },
    pill: {
        padding: 15,
        backgroundColor: colors.lightGray,
        borderRadius: 30
    },
    pillActive: {
        backgroundColor: colors.bluePill
    },
    pillText: {
        fontWeight: "bold",
        color: colors.mediumGray
    },
    pillTextActive: {
        color: colors.primary
    }
})

const admin = StyleSheet.create({
    container: {
        padding: 10
    },
    addButton: {
        width: '100%',
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    addButtonText: {
        color: colors.white,
        textTransform: "uppercase",
        fontWeight: "bold"
    },
    buttonContainer: {
        width: '100%',        
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    deleteBtn: {
        width: 130,
        height: 40,
        borderWidth: 1,
        borderColor: colors.red,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    editBtn: {
        width: 130,
        height: 40,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10

    },
    deleteText: {
        textTransform: "uppercase",
        fontWeight: "bold",
        color: colors.red
    },
    editText: {
        textTransform: "uppercase",
        fontWeight: "bold",
        color: colors.mediumGray
    }
})

export { colors, theme, text, nav, tab, admin };
