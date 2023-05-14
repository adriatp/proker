package com.atp.ProkerLibrary;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * atp
 */
public class Baralla 
{
    private List<Carta> pilo;
    
    Baralla() {
        pilo = new ArrayList<>();
        for (int ii=0; ii<Carta.PALS.length; ii++) {
            for (int i=0; i<=12; i++) {
                Carta c = new Carta(i,ii);
                pilo.add(c);
            }
        }
        Collections.shuffle(pilo);
    }

    public void ordena() {
        pilo = new ArrayList<>();
        for (int ii=0; ii<Carta.PALS.length; ii++) {
            for (int i=0; i<=12; i++) {
                Carta c = new Carta(i,ii);
                pilo.add(c);
            }
        }
    }
    
    public void remena()
    {
        Collections.shuffle(pilo);
    }
    
    public void treu(Carta carta)
    {
        int posRemove = -1;
        for (int i=0; i<pilo.size(); i++)
        {
            Carta c = pilo.get(i);
            if (carta.pal() == c.pal() && carta.numero() == c.numero())
            {
                posRemove = i;
                break;
            }
        }
        pilo.remove(posRemove);
    }
    
    public void posa(Carta c)
    {
        pilo.add(c);
    }
    
    public void posa(List<Carta> lc)
    {
        pilo.addAll(lc);
    }
    
    public void mostrar()
    {
        for (Carta c : pilo)
            c.mostrar();
    }
    public Carta cremaCarta()
    {
        Carta c = pilo.get(0);
        pilo.remove(0);
        return c;
    }
 
    public Carta reparteixCarta()
    {
        Carta c = pilo.get(0);
        pilo.remove(0);
        return c;
    }
    
    public int mida()
    {
        return pilo.size();
    }

    public static List<Carta[]> combsTwo() {
        Baralla b1 = new Baralla();
        Baralla b2 = new Baralla();
        b1.ordena();
        b2.ordena();
        Carta[] cartes_b1 = new Carta[b1.pilo.size()];
        Carta[] cartes_b2 = new Carta[b2.pilo.size()];
        b1.pilo.toArray(cartes_b1);
        b2.pilo.toArray(cartes_b2);
        List<Carta[]> listCombined = new ArrayList<>();
        for (int i=0; i<b1.pilo.size(); i++) {
            for (int j=i+1; j<b2.pilo.size(); j++) {
                Carta[] comb = new Carta[2];
                comb[0] = cartes_b1[i];
                comb[1] = cartes_b2[j];
                listCombined.add(comb);
            }
        }
        return listCombined;
    }

    public static List<Carta[]> combsTwoSuitedOrOff() {
        Baralla b1 = new Baralla();
        Baralla b2 = new Baralla();
        b1.ordena();
        b2.ordena();
        Carta[] cartes_b1 = new Carta[b1.pilo.size()];
        Carta[] cartes_b2 = new Carta[b2.pilo.size()];
        b1.pilo.toArray(cartes_b1);
        b2.pilo.toArray(cartes_b2);
        List<Carta[]> listCombined = new ArrayList<>();
        //  Posem els suited
        for (int i=0; i<b1.pilo.size()/4; i++) {
            for (int j=i+1; j<b2.pilo.size()/4; j++) {
                Carta[] comb = new Carta[2];
                comb[0] = cartes_b1[i];
                comb[1] = cartes_b2[j];
                listCombined.add(comb);
            }
        }
        //  Posem els off
        for (int i=0; i<b1.pilo.size()/4; i++) {
            for (int j=i; j<b1.pilo.size()/4; j++) {
                Carta[] comb = new Carta[2];
                comb[0] = cartes_b1[i];
                comb[1] = cartes_b2[j+b1.pilo.size()/4];
                listCombined.add(comb);
            }
        }
        return listCombined;
    }
}
