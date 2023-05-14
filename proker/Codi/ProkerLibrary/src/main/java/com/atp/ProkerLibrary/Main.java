package com.atp.ProkerLibrary;

import java.text.DecimalFormat;
import java.util.*;


/**
 * @author atp
 */
public class Main
{
    public static void main(String[] args) {
        System.out.println();
        System.out.println("\t\t#----------#");
        System.out.println("\t\t|  PROKER  |");
        System.out.println("\t\t#----------#");
        //  bestHands(2);
        //  play();
        //  statsPlay();
        provaGetInfo();
    }

    public static void provaGetInfo() {
        Map<String,Object> parameters = new HashMap<>();
        parameters.put("players","3");
        parameters.put("hand","as ks");
        parameters.put("flop","");
        parameters.put("turn","");
        parameters.put("river","");
        Map<String,Object> response = API.getInfo(parameters);
        System.out.println(response);
    }

    public static void infoPot(List<Float> probs) {
        //  Rep una llista amb tantes probabilitats com jugadors tingui la taula
        //  Pregunta el tamany del pot i mostra la quantitat que es pot apostar en funcio de cada probabilitat
        try {
            while(true) {
                System.out.println(probs);
                System.out.print("> Pot size: ");
                String potSizeStr = (new Scanner(System.in)).nextLine();
                potSizeStr = potSizeStr.replace(",", ".");
                float potSize = Float.parseFloat(potSizeStr);
                for (int i=0; i<probs.size(); i++) {
                    //  Si la probabilitat es superior a 1/(i+2) juga si no marxa
                    Float prob = probs.get(i);
                    Float probRest = 1.0f/(i+2.0f);
                    float bet = (potSize*prob)/(1-prob);
                    String info = "\t"+(i+2)+": "+bet;
                    info += (prob >= probRest) ? " (call/raise)\n" : " (fold)\n";
                    System.out.print(info);
                }
            }
        }
        catch(Exception e) {}
    }

    public static void statsPlay() {
        while(true) {
            try {
                int posicio = 1;

                //  Preflop
                System.out.print("> Entra ma del jugador: ");
                Carta cartesJugador[] = llegeixMa();
                System.out.print("> Numero de jugadors: ");
                int numJugadors = (new Scanner(System.in)).nextInt();
                List<Float> probsWinOrTie = new ArrayList<>();
                for (int i=2; i<=numJugadors; i++) {
                    probsWinOrTie.add(probWinOrTie(i,1,cartesJugador,null,null,null));
                }
                infoPot(probsWinOrTie);

                //  Preturn
                System.out.print("> Entra el flop: ");
                Carta flop[] = llegeixMa();
                System.out.print("> Numero de jugadors: ");
                numJugadors = (new Scanner(System.in)).nextInt();
                probsWinOrTie = new ArrayList<>();
                for (int i=2; i<=numJugadors; i++) {
                    probsWinOrTie.add(probWinOrTie(i,1,cartesJugador,flop,null,null));
                }
                infoPot(probsWinOrTie);

                //  Preriver
                System.out.print("> Entra el turn: ");
                Carta turn[] = llegeixMa();
                System.out.print("> Numero de jugadors: ");
                numJugadors = (new Scanner(System.in)).nextInt();
                probsWinOrTie = new ArrayList<>();
                for (int i=2; i<=numJugadors; i++) {
                    probsWinOrTie.add(probWinOrTie(i,1,cartesJugador,flop,turn,null));
                }
                infoPot(probsWinOrTie);

                //  Final
                System.out.print("> Entra el river: ");
                Carta river[] = llegeixMa();
                System.out.print("> Numero de jugadors: ");
                numJugadors = (new Scanner(System.in)).nextInt();
                probsWinOrTie = new ArrayList<>();
                for (int i=2; i<=numJugadors; i++) {
                    probsWinOrTie.add(probWinOrTie(i,1,cartesJugador,flop,turn,river));
                }
                infoPot(probsWinOrTie);
            }
            catch(Exception e) {}
            //  { e.printStackTrace(System.err); }
        }
    }

    public static void bestHands(int numJugadors) {
        //  Executar el buclePartida amb la ma i guardar en una llista la probabilitat de guanyar
        List<Carta[]> mans = Baralla.combsTwoSuitedOrOff();
        List<Float> probs = new ArrayList<>();
        for (Carta[] c : mans)
            probs.add(probWin(numJugadors,1,c,null,null,null));
        Map<Float,Integer> probsIndices = new TreeMap<>();
        for (int i=0; i<probs.size(); i++) {
            probsIndices.put(probs.get(i),i);
        }
        List<Carta[]> sortedHands = new ArrayList<>();
        List<Float> sortedProbs = new ArrayList<>();
        for (Map.Entry<Float,Integer> entry : probsIndices.entrySet()) {
            Integer index = entry.getValue();
            sortedHands.add(mans.get(index));
            sortedProbs.add(probs.get(index));
        }
        for (int i=0; i<probsIndices.size(); i++) {
            //  System.out.println(sortedHands.get(i)[0].toString() + sortedHands.get(i)[1].toString() + ": " + sortedProbs.get(i));
            if (sortedHands.get(i)[0].pal() == sortedHands.get(i)[1].pal())
                System.out.println(Carta.REPRESENTACIO_NUMS[sortedHands.get(i)[0].numero()] + Carta.REPRESENTACIO_NUMS[sortedHands.get(i)[1].numero()] + "s: " + sortedProbs.get(i));
            else
                System.out.println(Carta.REPRESENTACIO_NUMS[sortedHands.get(i)[0].numero()] + Carta.REPRESENTACIO_NUMS[sortedHands.get(i)[1].numero()] + "o: " + sortedProbs.get(i));
        }
    }

    public static void play() {
        while(true) {
            try {
                //        System.out.print("> Posicio: ");
                //        int posicio = (new Scanner(System.in)).nextInt();
                int posicio = 1;

                //  Preflop
                System.out.print("> Entra ma del jugador: ");
                Carta cartesJugador[] = llegeixMa();
                System.out.print("> Numero de jugadors: ");
                int numJugadors = (new Scanner(System.in)).nextInt();
                buclePartida(numJugadors,posicio,cartesJugador,null,null,null);

                //  Preturn
                System.out.print("> Entra el flop: ");
                Carta flop[] = llegeixMa();
                System.out.print("> Numero de jugadors: ");
                numJugadors = (new Scanner(System.in)).nextInt();
                buclePartida(numJugadors,posicio,cartesJugador,flop,null,null);

                //  Preriver
                System.out.print("> Entra el turn: ");
                Carta turn[] = llegeixMa();
                System.out.print("> Numero de jugadors: ");
                numJugadors = (new Scanner(System.in)).nextInt();
                buclePartida(numJugadors,posicio,cartesJugador,flop,turn,null);

                //  Final
                System.out.print("> Entra el river: ");
                Carta river[] = llegeixMa();
                System.out.print("> Numero de jugadors: ");
                numJugadors = (new Scanner(System.in)).nextInt();
                buclePartida(numJugadors,posicio,cartesJugador,flop,turn,river);
            }
            catch(Exception e) {}
            //  { e.printStackTrace(System.err); }
        }
    }
    
    public static Carta[] llegeixMa() {
        String linia = (new Scanner(System.in)).nextLine();
        String[] cartesStr = linia.split(" ");
        List<Carta> ma = new ArrayList();
        for (int i=0; i<cartesStr.length; i++)
            ma.add(new Carta(cartesStr[i]));
        return ma.toArray(new Carta[0]);
    }

    public static Float probWin(int numJugadors, int posicio, Carta[] cartesJugador, Carta[] flop, Carta[] turn, Carta[] river) {
        int partidesGuanyades=0;
        int partidesEmpatades=0;
        int partidesJugades=100000;
        for (int i=0; i<partidesJugades; i++) {
            Taula t = new Taula(numJugadors);
            t.repartirSaltantPosicio(posicio-1,cartesJugador,flop,turn,river);
            List<Jugador> guanyadors = t.guanyadors();
            Jugador j = t.getJugador(posicio-1);
            if (guanyadors.contains(j)) {
                if (guanyadors.size()>1)
                    partidesEmpatades++;
                else
                    partidesGuanyades++;
            }
            t.recollir();
        }
        return (float) partidesGuanyades/partidesJugades;
    }

    public static Float probWinOrTie(int numJugadors, int posicio, Carta[] cartesJugador, Carta[] flop, Carta[] turn, Carta[] river) {
        int partidesGuanyades=0;
        int partidesEmpatades=0;
        int partidesJugades=15000;
        for (int i=0; i<partidesJugades; i++) {
            Taula t = new Taula(numJugadors);
            t.repartirSaltantPosicio(posicio-1,cartesJugador,flop,turn,river);
            List<Jugador> guanyadors = t.guanyadors();
            Jugador j = t.getJugador(posicio-1);
            if (guanyadors.contains(j)) {
                if (guanyadors.size()>1)
                    partidesEmpatades++;
                else
                    partidesGuanyades++;
            }
            t.recollir();
        }
        return (float) (partidesGuanyades+partidesEmpatades)/partidesJugades;
    }

    public static void buclePartida(int numJugadors, int posicio, Carta[] cartesJugador, Carta[] flop, Carta[] turn, Carta[] river) {
        int partidesGuanyades=0;
        int partidesEmpatades=0;
        int partidesJugades=100000;
        for (int i=0; i<partidesJugades; i++) {
            Taula t = new Taula(numJugadors);
            t.repartirSaltantPosicio(posicio-1,cartesJugador,flop,turn,river);
            List<Jugador> guanyadors = t.guanyadors();
            Jugador j = t.getJugador(posicio-1);
            if (guanyadors.contains(j)) {
                if (guanyadors.size()>1)
                    partidesEmpatades++;
                else
                    partidesGuanyades++;
            }
            t.recollir();
        }
        List<Carta> cartesTaula = new ArrayList<>();
        if (flop!=null)
            cartesTaula.addAll(Arrays.asList(flop));
        if (turn!=null)
            cartesTaula.addAll(Arrays.asList(turn));
        if (river!= null)
            cartesTaula.addAll(Arrays.asList(river));
        System.out.print(">>> com.atp.ProkerServer.Jugador:   ");
        for (Carta c : cartesJugador)
            c.mostrar();
        System.out.print("\n>>> com.atp.ProkerServer.Taula:     ");
        for (Carta c : cartesTaula)
            c.mostrar();
        System.out.print("\n>>> Millor ma: ");
        Ma ma = new Ma(Arrays.asList(cartesJugador),cartesTaula);
        ma.mostrar();
        
        DecimalFormat df = new DecimalFormat("##.###%");
        float probGuanyar = (float) partidesGuanyades/partidesJugades;
        System.out.println(">>> Probabilitat de guanyar: " + df.format(probGuanyar).replace(',', '.'));
        float probEmpatar = (float) partidesEmpatades/partidesJugades;
        System.out.println(">>> Probabilitat d'empatar:  " + df.format(probEmpatar).replace(',', '.'));
        float probPerdre = 1 - (probGuanyar + probEmpatar);
        System.out.println(">>> Probabilitat de perdre:  " + df.format(probPerdre).replace(',', '.'));
        if (probGuanyar+probEmpatar>1.0/numJugadors)
            System.out.println(">>> Juga");
        else
            System.out.println(">>> Marxa");
        
        System.out.println();
    }


}
