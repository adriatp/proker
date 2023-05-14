package com.atp.ProkerLibrary;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author atp
 */
public class Ma 
{        
    private final int ESCALA_COLOR=8;
    private final int POKER=7;       
    private final int FULL=6;         
    private final int COLOR=5;       
    private final int ESCALA=4;      
    private final int TRIO=3;        
    private final int DOBLE_PARELLA=2;
    private final int PARELLA=1;      
    private final int CARTA_ALTA=0;   
    
    private final String[] DESCRIPCIO_COMBINACIO = {"com.atp.ProkerServer.Carta alta", "Parella", "Doble parella", "Trio", "Escala", "Color", "Full", "Poker", "Escala de color"};
    
    // Primer enter guarda el tipus de jugada, la resta el numero de la combinacio
    private List<List<Integer>> millorsCombinacions;
    
    private List<Carta> cartesDisponibles;
    private List<Carta> millorMa;
    
    Ma(List<Carta> maJugador, List<Carta> cartesTaula) {
        //  Inicialitza cartes que es poden utilitzar per construir la millor ma
        cartesDisponibles = new ArrayList<>();
        for (Carta c : maJugador)
            cartesDisponibles.add(c);
        for (Carta c : cartesTaula)
            cartesDisponibles.add(c);
        //  Ordena les cartes per numero i dintre d'aquest per pal
        Collections.sort(cartesDisponibles);
        millorMa = new ArrayList<>();
        millorsCombinacions = new ArrayList<>();
    }
    
    public void calculaMillorCombinacio()
    {
        if (millorMa.size()<5 && !cartesDisponibles.isEmpty())
        {
            //  Comprovar cada possible opcio ordenadament
            //  cada una d'aquestes funcions ja s'encarrega de modificar
            //  els atributs millorMa i cartesDisponibles
            if      (escalaColor()) {}
            else if (poker())       {}
            else if (full())        {}
            else if (color())       {}
            else if (escala())      {}
            else if (trio())        {}
            else if (dobleParella()){}
            else if (parella())     {}
            else // if (cartaAlta()){}
                cartaAlta();
            //  Es crida recursivament per tornar a trobar la següent millor combinacio
            calculaMillorCombinacio();
        }
    }
    
    public List<Carta> millorMa()
    {
        calculaMillorCombinacio();
        return millorMa;
    }
        
    public Combinacio millorsCombinacions()
    {
        calculaMillorCombinacio();
        return new Combinacio(millorsCombinacions);
    }
    
    public List<List<Carta>> separaPals()
    {
        List<List<Carta>> palsSeparats = new ArrayList<>();
        for (int i=0; i<Carta.PALS.length; i++)
            palsSeparats.add(new ArrayList<>());
        Collections.sort(cartesDisponibles, new numberComparator());
        for (Carta c : cartesDisponibles)
            palsSeparats.get(c.pal()).add(c);
        return palsSeparats;
    }
    
    public List<List<Carta>> separaNums()
    {
        List<List<Carta>> numsSeparats = new ArrayList<>();
        for (int i=0; i<Carta.NUMS.length; i++)
            numsSeparats.add(new ArrayList<>());
        for (Carta c : cartesDisponibles)
            numsSeparats.get(c.numero()).add(c);
        return numsSeparats;
    }
    
    public List<List<Carta>> separaNums(List<Carta> lc)
    {
        List<List<Carta>> numsSeparats = new ArrayList<>();
        for (int i=0; i<Carta.NUMS.length; i++)
            numsSeparats.add(new ArrayList<>());
        for (Carta c : lc)
            numsSeparats.get(c.numero()).add(c);
        return numsSeparats;
    }
    
    public boolean escalaColor()
    {
        if (cartesDisponibles.size()<5)
            return false;
        List<List<Carta>> palsSeparats = separaPals();
        for (int i=0; i<4; i++)
        {
            if (palsSeparats.get(i).size()>=5)
            {
                List<List<Carta>> numsSeparats = separaNums(palsSeparats.get(i));
                int seguits=0;
                for (int k=numsSeparats.size()-1; k>=0; k--)
                {
                    if (!numsSeparats.get(k).isEmpty())
                    {
                        seguits++;
                        if (seguits==5)
                        {
                            List<Carta> lc = new ArrayList<>();
                            for (int j=k; j<k+5; j++)
                                lc.add(numsSeparats.get(j).get(0));
                            cartesDisponibles.removeAll(lc);
                            millorMa.addAll(lc);
                            millorsCombinacions.add(new ArrayList<>());
                            millorsCombinacions.get(millorsCombinacions.size()-1).add(ESCALA_COLOR);
                            millorsCombinacions.get(millorsCombinacions.size()-1).add(k+4);
                            return true;
                        }
                    }
                    else
                        seguits=0;
                }
                // Escala més baixa, cal tenir en compte l'AS
                if (!numsSeparats.get(0).isEmpty() && !numsSeparats.get(1).isEmpty() && !numsSeparats.get(2).isEmpty() && !numsSeparats.get(3).isEmpty() && !numsSeparats.get(numsSeparats.size()-1).isEmpty())
                {
                    List<Carta> lc = new ArrayList<>();
                    for (int j=0; j<4; j++)
                        lc.add(numsSeparats.get(j).get(0));
                    lc.add(numsSeparats.get(numsSeparats.size()-1).get(0));
                    cartesDisponibles.removeAll(lc);
                    millorMa.addAll(lc);
                    millorsCombinacions.add(new ArrayList<>());
                    millorsCombinacions.get(millorsCombinacions.size()-1).add(ESCALA_COLOR);
                    millorsCombinacions.get(millorsCombinacions.size()-1).add(3);
                    return true;
                }
            }
        }
        return false;     
    }
    
    //  COMPLETAT
    public boolean poker()
    {
        if (cartesDisponibles.size()<4)
            return false;
        List<List<Carta>> numsSeparats = separaNums();
        for (int i=numsSeparats.size()-1; i>=0; i--)
        {
            List<Carta> lc = numsSeparats.get(i);
            if (lc.size()>=4)
            {
                cartesDisponibles.removeAll(lc);
                millorMa.addAll(lc);
                millorsCombinacions.add(new ArrayList<>());
                millorsCombinacions.get(millorsCombinacions.size()-1).add(POKER);
                millorsCombinacions.get(millorsCombinacions.size()-1).add(i);
                return true;
            }
        }
        return false;
    }
        
    //  COMPLETAT
    public boolean full()
    {
        if (cartesDisponibles.size()<5)
            return false;
        List<List<Carta>> numsSeparats = separaNums();
        List<Carta> lcTrio, lcParella;
        for (int i=numsSeparats.size()-1; i>=0; i--)
        {
            lcTrio = numsSeparats.get(i);
            if (lcTrio.size()>=3)
            {
                for (int j=numsSeparats.size()-1; j>=0; j--)
                {
                    if (i!=j)
                    {
                        lcParella = numsSeparats.get(j);
                        if (lcParella.size()>=2)
                        {
                            // Hi ha full, el retirem 
                            cartesDisponibles.removeAll(lcTrio);
                            cartesDisponibles.removeAll(lcParella);
                            millorMa.addAll(lcTrio);
                            millorMa.addAll(lcParella);
                            millorsCombinacions.add(new ArrayList<>());
                            millorsCombinacions.get(millorsCombinacions.size()-1).add(FULL);
                            millorsCombinacions.get(millorsCombinacions.size()-1).add(i);
                            millorsCombinacions.get(millorsCombinacions.size()-1).add(j);
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
        
    //  COMPLETAT
    public boolean color()
    {
        if (cartesDisponibles.size()<5)
            return false;
        List<List<Carta>> palsSeparats = separaPals();
        for (int i=0; i<4; i++)
        {
            if (palsSeparats.get(i).size()>=5)
            {
                List<Carta> lc = new ArrayList<>();
                for (int j=0; j<5; j++)
                    lc.add(palsSeparats.get(i).get(palsSeparats.get(i).size()-1-j));
                cartesDisponibles.removeAll(lc);
                millorMa.addAll(lc);
                millorsCombinacions.add(new ArrayList<>());
                millorsCombinacions.get(millorsCombinacions.size()-1).add(COLOR);
                for (Carta c : lc)
                    millorsCombinacions.get(millorsCombinacions.size()-1).add(c.numero());
                return true;
            }
        }
        return false;
    }
    
    // COMPLETAT
    public boolean escala()
    {
        if (cartesDisponibles.size()<5)
            return false;
        List<List<Carta>> numsSeparats = separaNums();
        int seguits=0;
        for (int i=numsSeparats.size()-1; i>=0; i--)
        {
            if (!numsSeparats.get(i).isEmpty())
            {
                seguits++;
                if (seguits==5)
                {
                    List<Carta> lc = new ArrayList<>();
                    for (int j=i; j<i+5; j++)
                        lc.add(numsSeparats.get(j).get(0));
                    cartesDisponibles.removeAll(lc);
                    millorMa.addAll(lc);
                    millorsCombinacions.add(new ArrayList<>());
                    millorsCombinacions.get(millorsCombinacions.size()-1).add(ESCALA);
                    millorsCombinacions.get(millorsCombinacions.size()-1).add(i+4);
                    return true;
                }
            }
            else
                seguits=0;
        }
        // Escala més baixa
        if (!numsSeparats.get(0).isEmpty() && !numsSeparats.get(1).isEmpty() && !numsSeparats.get(2).isEmpty() && !numsSeparats.get(3).isEmpty() && !numsSeparats.get(numsSeparats.size()-1).isEmpty())
        {
            List<Carta> lc = new ArrayList<>();
            for (int j=0; j<4; j++)
                lc.add(numsSeparats.get(j).get(0));
            lc.add(numsSeparats.get(numsSeparats.size()-1).get(0));
            cartesDisponibles.removeAll(lc);
            millorMa.addAll(lc);
            millorsCombinacions.add(new ArrayList<>());
            millorsCombinacions.get(millorsCombinacions.size()-1).add(ESCALA);
            millorsCombinacions.get(millorsCombinacions.size()-1).add(3);
            return true;
        }
        return false;
    }
        
    // COMPLETAT
    public boolean trio()
    {
        if (cartesDisponibles.size()<3)
            return false;
        List<List<Carta>> numsSeparats = separaNums();
        for (int i=numsSeparats.size()-1; i>=0; i--)
        {
            if (numsSeparats.get(i).size()>=3)
            {
                List<Carta> lc = new ArrayList<>();
                for (int j=0; j<3; j++)
                   lc.add(numsSeparats.get(i).get(j));
                cartesDisponibles.removeAll(lc);
                millorMa.addAll(lc);
                millorsCombinacions.add(new ArrayList<>());
                millorsCombinacions.get(millorsCombinacions.size()-1).add(TRIO);
                millorsCombinacions.get(millorsCombinacions.size()-1).add(i);
                return true;
            }
        }
        return false;
    }
        
    // COMPLETAT
    public boolean dobleParella()
    {
        if (cartesDisponibles.size()<4)
            return false;
        List<List<Carta>> numsSeparats = separaNums();
        for (int i=numsSeparats.size()-1; i>=0; i--)
        {
            if (numsSeparats.get(i).size()>=2)
            {
                for (int j=i-1; j>=0; j--)
                {
                    if (numsSeparats.get(j).size()>=2)
                    {
                        List<Carta> lc = new ArrayList<>();
                        lc.add(numsSeparats.get(i).get(0));
                        lc.add(numsSeparats.get(i).get(1));
                        lc.add(numsSeparats.get(j).get(0));
                        lc.add(numsSeparats.get(j).get(1));
                        cartesDisponibles.removeAll(lc);
                        millorMa.addAll(lc);
                        millorsCombinacions.add(new ArrayList<>());
                        millorsCombinacions.get(millorsCombinacions.size()-1).add(DOBLE_PARELLA);
                        millorsCombinacions.get(millorsCombinacions.size()-1).add(i);
                        millorsCombinacions.get(millorsCombinacions.size()-1).add(j);
                        return true;
                    }
                }
            }
        }
        return false;
    }
        
    // COMPLETAT
    public boolean parella()
    {
        if (cartesDisponibles.size()<2)
            return false;
        List<List<Carta>> numsSeparats = separaNums();
        for (int i=numsSeparats.size()-1; i>=0; i--)
        {
            if (numsSeparats.get(i).size()>=2)
            {
                List<Carta> lc = new ArrayList<>();
                lc.add(numsSeparats.get(i).get(0));
                lc.add(numsSeparats.get(i).get(1));
                cartesDisponibles.removeAll(lc);
                millorMa.addAll(lc);
                millorsCombinacions.add(new ArrayList<>());
                millorsCombinacions.get(millorsCombinacions.size()-1).add(PARELLA);
                millorsCombinacions.get(millorsCombinacions.size()-1).add(i);
                return true;
            }
        }
        return false;
    }
            
    // COMPLETAT
    public boolean cartaAlta()
    {
        if (cartesDisponibles.isEmpty())
            return false;
        Collections.sort(cartesDisponibles, new numberComparator());
        Carta c = cartesDisponibles.get(cartesDisponibles.size()-1);
        millorMa.add(c);
        cartesDisponibles.remove(c);
        millorsCombinacions.add(new ArrayList<>());
        millorsCombinacions.get(millorsCombinacions.size()-1).add(CARTA_ALTA);
        millorsCombinacions.get(millorsCombinacions.size()-1).add(c.numero());
        return true;
    }
    
    public void mostrar()
    {
        millorMa();
//        for (com.atp.ProkerServer.Carta c : millorMa)
//            c.mostrar();
//        System.out.println();
        for (int i=0; i<millorsCombinacions.size(); i++)
        {
            if (i!=0)
                System.out.print("\t       ");
            System.out.print(DESCRIPCIO_COMBINACIO[millorsCombinacions.get(i).get(0)]+" amb ");
            for (int j=1; j<millorsCombinacions.get(i).size(); j++)
                System.out.print(Carta.REPRESENTACIO_NUMS[millorsCombinacions.get(i).get(j)]+" ");
            System.out.println();
        }
    }
}
