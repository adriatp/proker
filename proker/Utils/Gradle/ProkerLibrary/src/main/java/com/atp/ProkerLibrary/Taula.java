package com.atp.ProkerLibrary;

import java.util.ArrayList;
import java.util.List;

/**
 * @author atp
 */
public class Taula {
    public List<Jugador> jugadors;
    public Baralla baralla;
    public List<Carta> cartesTaula;
    public List<Carta> cartesCremades;
    
    Taula(int nj) {
        baralla = new Baralla();
        cartesTaula = new ArrayList<>();
        cartesCremades = new ArrayList<>();
        jugadors = new ArrayList<>();
        for (int i=0; i<nj; i++)
            jugadors.add(new Jugador(i));
    }
    
    public void repartir() {
        baralla.remena();
        for (int j=0; j<2; j++)
            for (int i=0; i<jugadors.size(); i++)
                jugadors.get(i).repCarta(baralla.reparteixCarta());
        cartesCremades.add(baralla.cremaCarta());
        // flop
        for (int i=0; i<3; i++)
            cartesTaula.add(baralla.reparteixCarta());
        cartesCremades.add(baralla.cremaCarta());
        // turn
        cartesTaula.add(baralla.reparteixCarta());
        cartesCremades.add(baralla.cremaCarta());
        // river
        cartesTaula.add(baralla.reparteixCarta());
    }
    
    public void repartirSaltantPosicio(int posicio, Carta[] cartesInicials) {
        baralla.remena();
        baralla.treu(cartesInicials[0]);
        baralla.treu(cartesInicials[1]);
        for (int j=0; j<2; j++) {
            for (int i=0; i<jugadors.size(); i++) {
                if (i!=posicio)
                    jugadors.get(i).repCarta(baralla.reparteixCarta());
                else
                    jugadors.get(i).repCarta(cartesInicials[j]);
            }
        }
        // crema
        cartesCremades.add(baralla.cremaCarta());
        // flop
        for (int i=0; i<3; i++)
            cartesTaula.add(baralla.reparteixCarta());
        // crema
        cartesCremades.add(baralla.cremaCarta());
        // turn
        cartesTaula.add(baralla.reparteixCarta());
        // crema
        cartesCremades.add(baralla.cremaCarta());
        // river
        cartesTaula.add(baralla.reparteixCarta());
    }    
    
    public void repartirSaltantPosicio(int posicio, Carta[] cartesInicials, Carta[] flop, Carta[] turn, Carta[] river) {
        baralla.remena();
        baralla.treu(cartesInicials[0]);
        baralla.treu(cartesInicials[1]);
        if (flop != null)
            for (int i=0; i<3; i++)
                baralla.treu(flop[i]);
        if (turn != null)
            baralla.treu(turn[0]);
        if (river != null)
            baralla.treu(river[0]);
        for (int j=0; j<2; j++)
        {
            for (int i=0; i<jugadors.size(); i++)
            {
                if (i!=posicio)
                    jugadors.get(i).repCarta(baralla.reparteixCarta());
                else
                    jugadors.get(i).repCarta(cartesInicials[j]);
            }
        }
        // crema
        cartesCremades.add(baralla.cremaCarta());
        // flop
        if (flop == null)
            for (int i=0; i<3; i++)
                cartesTaula.add(baralla.reparteixCarta());
        else
            for (int i=0; i<3; i++)
                cartesTaula.add(flop[i]);
        
        // crema
        cartesCremades.add(baralla.cremaCarta());
        // turn
        if (turn == null)
            cartesTaula.add(baralla.reparteixCarta());
        else
            cartesTaula.add(turn[0]);
        
        // crema
        cartesCremades.add(baralla.cremaCarta());
        // river
        if (river == null)
            cartesTaula.add(baralla.reparteixCarta());
        else
            cartesTaula.add(river[0]);
    }
    
    public void recollir() {
        for (Jugador j : jugadors)
            baralla.posa(j.tornaMa());
        baralla.posa(cartesTaula);
        baralla.posa(cartesCremades);
        cartesTaula.clear();
        cartesCremades.clear();
    }
    
    public void mostrarBaralla()
    {
        baralla.mostrar();
    }
    
    public void mostrar() {
        mostrarCartesTaula();
        mostrarCartesJugadors();        
        mostrarClassificacio();
    }
    
    public void mostrarCartesTaula() {
        System.out.print("\tTAULA:\t   ");
        for (Carta c : cartesTaula)
            c.mostrar();
        System.out.println();
    }
    
    public void mostrarCartesJugadors() {
        for (int i=0; i<jugadors.size(); i++) {
            System.out.print("\tJUGADOR "+(i+1)+": ");
            jugadors.get(i).mostrarMa();
        }
    }
    
    public void mostrarClassificacio() {
        for (int i=0; i<jugadors.size(); i++) {
            System.out.print("\tMA JUGADOR "+(i+1)+": ");
            Ma m = new Ma(jugadors.get(i).ma(), cartesTaula);
            m.mostrar();
            System.out.println();
        }
    }
    
    public List<Jugador> guanyadors() {
        List<Jugador> jugadorsGuanyadors = new ArrayList();
        List<Combinacio> millorsCombinacionsTots = new ArrayList();        
        for (Jugador j : jugadors)
            millorsCombinacionsTots.add(j.millorsCombinacions(cartesTaula));
        Combinacio millorCombinacio = millorsCombinacionsTots.get(0);
        jugadorsGuanyadors.add(jugadors.get(0));
        // Ens quedem amb els jugadors que tinguin una combinacio millor
        for (int i=1; i<millorsCombinacionsTots.size(); i++) {
            int resultatComparacio = millorsCombinacionsTots.get(i).compareTo(millorCombinacio);
            if (resultatComparacio==0)
                jugadorsGuanyadors.add(jugadors.get(i));
            else if (resultatComparacio>0) {
                millorCombinacio = millorsCombinacionsTots.get(i);
                jugadorsGuanyadors.clear();
                jugadorsGuanyadors.add(jugadors.get(i));
            }
        }
        return jugadorsGuanyadors;
    }

    public Jugador getJugador(int posicio)
    {
        return jugadors.get(posicio);
    }
    
    public void midaBaralla()
    {
        System.out.println(baralla.mida());
    }
}
