package com.atp.ProkerLibrary;

import java.util.ArrayList;
import java.util.List;


/**
 * @author atp
 */
public class Combinacio implements Comparable<Combinacio>
{
    List<List<Integer>> combinacio;
    
    public Combinacio()
    {
        combinacio = new ArrayList();
    }
    
    public Combinacio(List<List<Integer>> comb)
    {
        this.combinacio = new ArrayList();
        for (List<Integer> li : comb)
            this.combinacio.add(li);
    }

    @Override
    public String toString() {
        return "";
    }

    @Override
    public int compareTo(Combinacio comb)
    {
        int posicioCombinacio = 0;
        while (posicioCombinacio<combinacio.size() && posicioCombinacio<comb.combinacio.size())
        {
            if (combinacio.get(posicioCombinacio).get(0)>comb.combinacio.get(posicioCombinacio).get(0))
                return 1;
            else if (combinacio.get(posicioCombinacio).get(0)<comb.combinacio.get(posicioCombinacio).get(0))
                return -1;
            else
            {
                int posicioNums=1;
                while (posicioNums<combinacio.get(posicioCombinacio).size() && posicioNums<comb.combinacio.get(posicioCombinacio).size())
                {
                    if (combinacio.get(posicioCombinacio).get(posicioNums)>comb.combinacio.get(posicioCombinacio).get(posicioNums))
                        return 1;
                    else if (combinacio.get(posicioCombinacio).get(posicioNums)<comb.combinacio.get(posicioCombinacio).get(posicioNums))
                        return -1;
                    posicioNums++;
                }
            }
            posicioCombinacio++;
        }
        return 0;
    }
}
