package com.atp.ProkerLibrary;

import java.util.ArrayList;
import java.util.List;


/**
 * @author atp
 */
public class Jugador 
{
    private List<Carta> ma;
    private float cash;
    private String nom; 
    private String descripcioMillorCombinacio;


    Jugador()
    {
        cash = 500.0f;
        ma = new ArrayList();
    }
    
    Jugador(int i)
    {
        cash = 500.0f;
        ma = new ArrayList();
        nom = Integer.toString(i);
    }
    
    Jugador(float c)
    {
        cash = c;
        ma = new ArrayList();
    }
    
    public void repCarta(Carta c)
    {
        ma.add(c);
    }
    
    public List<Carta> tornaMa()
    {
        List<Carta> lc = ma;
        ma.clear();
        return lc;
    }
    
    public void mostrarMa()
    {
        ma.get(0).mostrar();
        System.out.print(" ");
        ma.get(1).mostrar();
        System.out.println();
    }
    
    List<Carta> millorMa(List<Carta> lc)
    {
        Ma maJugador = new Ma(ma,lc);
        return maJugador.millorMa();
    }
    
    Combinacio millorsCombinacions(List<Carta> lc) {
        Ma maJugador = new Ma(ma,lc);
        Combinacio millorCombinacio = maJugador.millorsCombinacions();
        this.descripcioMillorCombinacio = maJugador.descripcioMillorCombinacioResumida();
        return millorCombinacio;
    }

    public String descripcioMillorCombinacio() {
        return this.descripcioMillorCombinacio;
    }
    
    public List<Carta> ma()
    {
        return ma;
    }
    
    public String nom()
    {
        return nom;
    }
}
