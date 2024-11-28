import { useEffect, useState } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GameCard } from "./GameCard";

const INITAL_STATE = [
  {
    slug: "doom",
    image:
      "https://i0.wp.com/nxtgame.cl/wp-content/uploads/2023/06/doom.jpg?fit=1024%2C1024&ssl=1",
    title: "DOOM",
    description:
      "DOOM vuelve como un shooter moderno repleto de diversión y desafíos brutales desarrollado por id Software. Despiadados demonios, armas de destrucción inimaginables y un movimiento ágil y fluido constituyen la base de un intenso combate en primera persona, tanto si estáis aniquilando a las hordas demoníacas del infierno en la campaña para un jugador como si competís contra amigos en los diversos modos multijugador. Combinad un arsenal de armas emblemáticas y futuristas y un avanzado sistema de cuerpo a cuerpo para derribar, acuchillar, pisotear, aplastar y destruir a los demonios con métodos creativos y violentos. Ampliad la experiencia de juego con DOOM SnapMap, el editor de juego que permite crear, jugar y compartir contenidos con el resto del mundo.",
    score: "9",
  },
  {
    slug: "minecraft",
    image:
      "https://media.tycsports.com/files/2021/08/27/324711/como-instalar-skins-de-minecraft-en-pc-consolas-y-dispositivos-moviles_1440x810_wmk.jpg",
    title: "Minecraft",
    description:
      "Minecraft es un juego de mundo abierto, y no tiene un fin claramente definido (aunque sí que tiene una dimensión llamada a sí misma 'The End', o en español 'El Final' en donde después de entrar y matar a la dragona aparecen los créditos del juego y un poema). Esto permite una gran libertad en cuanto a la elección de su forma de jugar. A pesar de ello, el juego posee un sistema que otorga logros por completar ciertas acciones. La cámara es en primera persona, aunque los jugadores tienen la posibilidad de cambiarla a una perspectiva de tercera persona en cualquier momento.\nEl juego se centra en la colocación y destrucción de bloques, siendo que este se compone de objetos tridimensionales cúbicos, colocados sobre un patrón de rejilla fija. Estos cubos o bloques representan principalmente distintos elementos de la naturaleza, como tierra, piedra, minerales, troncos, entre otros.",
    score: "9.5",
  },
  {
    slug: "dying-light",
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202404/2512/bdd4b0a02e2cd698ecad7138f5d154f75bddcf4df5b30ecd.jpg",
    title: "Dying Light",
    description:
      "Dying Light es un videojuego de terror y supervivencia en primera persona de mundo abierto desarrollado por Techland y publicado por Warner Bros. Interactive Entertainment. La historia del juego sigue a un agente encubierto llamado Kyle Crane que es enviado a infiltrarse en una zona de cuarentena en una ciudad ficticia de Oriente Medio llamada Harran. Cuenta con una ciudad infestada de enemigos, mundo abierto con un dinámico ciclo de día-noche, en el que los zombis son lentos y torpes durante el día, pero se vuelven extremadamente agresivos por la noche. El juego se centra en el combate basado en armas y parkour, lo que permite a los jugadores elegir lucha o huida cuando se les presentan peligros. El juego también cuenta con un modo multijugador asimétrico (originalmente establecido como un bono de reserva) y un modo multijugador cooperativo para cuatro jugadores.",
    score: "9",
  },
  {
    slug: "left-4-dead",
    image:
      "https://m.media-amazon.com/images/I/71a2iZnOV+L._AC_UF1000,1000_QL80_.jpg",
    title: "Left 4 Dead",
    description:
      'Left 4 Dead es un videojuego de terror de disparos en primera persona desarrollado por Valve South y publicado por Valve. El juego utiliza el motor gráfico de Valve, Source, y está disponible para Microsoft Windows, Xbox 360 y macOS. Fue lanzado originalmente para Microsoft Windows y Xbox 360 en noviembre de 2008 y para Mac OS X en octubre de 2010, y es el primer título de la serie Left 4 Dead. Ambientado tras un brote de zombis en la costa este de Estados Unidos, el juego enfrenta a sus cuatro protagonistas, apodados los "Supervivientes", contra hordas de infectados.',
    score: "8.5",
  },
  {
    slug: "left-4-dead-2",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Left4Dead2.jpg/220px-Left4Dead2.jpg",
    title: "Left 4 Dead 2",
    description:
      "Ambientado en el apocalipsis zombi, Left 4 Dead 2 (L4D2) es la esperadísima secuela del galardonado Left 4 Dead, el juego cooperativo número 1 de 2008.\nEste FPS cooperativo de acción y terror os llevará a ti y a tus amigos por las ciudades, pantanos y cementerios del Sur Profundo, desde Savannah hasta Nueva Orleans, a lo largo de cinco extensas campañas.",
    score: "9",
  },
  {
    slug: "league-of-legends",
    image:
      "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-80471666c140f790f28dff68d72c384b",
    title: "League of Legends",
    description:
      "League of Legends (también conocido por sus siglas LoL) es un videojuego multijugador de arena de batalla en línea desarrollado y publicado por Riot Games. Inspirándose en Defense of the Ancients, un mapa personalizado para Warcraft III, los fundadores de Riot buscaron desarrollar un juego independiente del mismo género. Desde su lanzamiento en octubre de 2009, LoL ha sido un juego gratuito y se monetiza a través de la compra de elementos para la personalización de personajes y otros accesorios.",
    score: "9.2",
  },
  {
    slug: "valorant",
    image:
      "https://www.riotgames.com/darkroom/1440/8d5c497da1c2eeec8cffa99b01abc64b:5329ca773963a5b739e98e715957ab39/ps-f2p-val-console-launch-16x9.jpg",
    title: "Valorant",
    description:
      "Valorant (estilizado como VALORANT) es un shooter táctico en primera persona de estilo hero shooter, desarrollado y publicado por Riot Games. El desarrollo del juego comenzó en 2014, y fue anunciado bajo el nombre en clave Project A en octubre de 2019. La beta cerrada, con acceso limitado, se lanzó el 7 de abril de 2020, y el juego fue lanzado oficialmente el 2 de junio de 2020. Inicialmente, Valorant estaba diseñado exclusivamente para Windows, pero en junio de 2024 se añadió soporte para las consolas Xbox Series X/S y PlayStation 5, aunque sin la posibilidad de juego cruzado entre jugadores de PC y consola. ",
    score: "9",
  },
];

export function Main() {
  const insets = useSafeAreaInsets();

  const [games, setGames] = useState([]);
  useEffect(() => {
    setGames(INITAL_STATE);
  }, []);

  return (
    <View
      style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {games.length === 0 ? (
        <ActivityIndicator color={"#000"} size={"large"} />
      ) : (
        <ScrollView>
          {games.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
