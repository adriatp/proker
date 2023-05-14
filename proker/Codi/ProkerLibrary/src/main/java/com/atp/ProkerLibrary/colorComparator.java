package com.atp.ProkerLibrary;

import java.util.Comparator;


/**
 * @author atp
 */
public class colorComparator implements Comparator<Carta>
{
    @Override
    public int compare(Carta a, Carta b) {
        if (a.pal()<b.pal())
            return -1;
        else if (a.pal()>b.pal())
            return 1;
        else {
            if (a.numero()<b.numero())
                return -1;
            else if (a.numero()>b.numero())
                return 1;
            else
                return 0;
        }
    }
}
