import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({
  currentTime,
  setCurrentTime,
  setTime,
  setIsActive,
}) {
  // Se utiliza para manejar cuando se hace un cambio de opción
  function handlePress(index) {
    // Cada vez que se cambie de pantalla, detenemos la cuenta regresiva
    setIsActive(false);
    // Calculamos el tiempo nuevo según la opción seleccionada
    const newTime = index === 0 ? 25 : index === 1 ? 0.5 : 1;
    // Indicamos cuál fue la opción seleccionada
    setCurrentTime(index);
    // Indicamos cuál es el nuevo tiempo según la opción seleccionada
    setTime(newTime * 60);
  }

  return (
    <View style={{ flexDirection: "row" }}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[
            styles.itemStyle,
            currentTime !== index && { borderColor: "transparent" },
          ]}
        >
          <Text style={{ fontWeight: "bold" }}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    width: "33%",
    alignItems: "center",
    borderWidth: 3,
    padding: 5,
    borderRadius: 10,
    borderColor: "white",
    marginVertical: 20,
  },
});
