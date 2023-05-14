package com.atp.ProkerLibrary;

import org.json.JSONObject;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class API {

    public static Map<String,Object> getInfo(Map<String,Object> parameters) {
        //  Passa la info dels parametres a variables
        int position = 1;
        int numJugadors = Integer.parseInt((String) parameters.get("players"));
        Carta[] hand    = llegeixCartes((String) parameters.get("hand"));
        Carta[] flop    = llegeixCartes((String) parameters.get("flop"));
        Carta[] turn    = llegeixCartes((String) parameters.get("turn"));
        Carta[] river   = llegeixCartes((String) parameters.get("river"));
        //  Retornem la informacio
        return getInfoProker(numJugadors,position,hand,flop,turn,river);
    }

    private static Carta[] llegeixCartes(String descripcioConjunt) {
        String[] descripcioCartes = descripcioConjunt.trim().split(" ");
        Carta[] cartes = new Carta[descripcioCartes.length];
        for (int i=0; i<descripcioCartes.length; i++) {
            if (Carta.descripcioValida(descripcioCartes[i]))
                cartes[i] = new Carta(descripcioCartes[i]);
            else {
                cartes = null;
                break;
            }
        }
        return cartes;
    }

    public static Map<String,Object> getInfoProker(int numJugadors, int posicio, Carta[] cartesJugador, Carta[] flop, Carta[] turn, Carta[] river) {
        int partidesGuanyades=0;
        int partidesEmpatades=0;
        int partidesPerdudes=0;
        int partidesJugades=100000;
        Map<String,Object> millorsCombinacions = new HashMap<>();
        for (int i=0; i<partidesJugades; i++) {
            Taula t = new Taula(numJugadors);
            Jugador jugador = t.getJugador(posicio-1);
            t.repartirSaltantPosicio(posicio-1,cartesJugador,flop,turn,river);
            t.calculaMillorsCombinacions();
            String descripcioMillorCombinacioJugador = t.getDescripcioMillorCombinacio(posicio-1);
            List<Jugador> jugadorsGuanyadors = t.calculaGuanyadors();

            //  Aquest tall de codi nomes s'executa si es la primera vegada que es troba aquesta combinacio
            if (!millorsCombinacions.containsKey(descripcioMillorCombinacioJugador)) {
                Map<String,Integer> mapWinLostTie = new HashMap<>();
                mapWinLostTie.put("win",0);
                mapWinLostTie.put("lost",0);
                mapWinLostTie.put("tie",0);
                mapWinLostTie.put("total",0);
                millorsCombinacions.put(descripcioMillorCombinacioJugador,mapWinLostTie);
            }

            //  Actualitzem les variables a cada iteracio
            Map<String,Object> actualBestCombination = (Map<String,Object>) millorsCombinacions.get(descripcioMillorCombinacioJugador);
            if (jugadorsGuanyadors.contains(jugador)) {
                if (jugadorsGuanyadors.size() == 1) {
                    partidesGuanyades++;
                    actualBestCombination.put("win", (Integer) actualBestCombination.get("win") + 1);
                }
                else {
                    partidesEmpatades++;
                    actualBestCombination.put("tie", (Integer) actualBestCombination.get("tie") + 1);
                }
            }
            else {
                partidesPerdudes++;
                actualBestCombination.put("lost", (Integer) actualBestCombination.get("lost") + 1);
            }
            actualBestCombination.put("total", (Integer) actualBestCombination.get("total") + 1);
            millorsCombinacions.put(descripcioMillorCombinacioJugador,actualBestCombination);

            //  Em penso que no cal ja que crea una nova taula pero per si de cas no esborra la baralla
            t.recollir();
        }

        //  Emplenem el mapa de retorn amb la informacio obtinguda
        Map<String,Object> infoProker = new HashMap<>();
        infoProker.put("playedGames", partidesJugades);
        infoProker.put("wonGames", partidesGuanyades);
        infoProker.put("tiedGames", partidesEmpatades);
        infoProker.put("lostGames", partidesPerdudes);
        infoProker.put("bestCombinations", millorsCombinacions);

        return infoProker;
    }

}
