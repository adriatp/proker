package com.atp.ProkerLibrary;

/**
 * atp
 */
public class Carta implements Comparable<Carta>
{
    public static final int SPADES   = 0;
    public static final int HEARTS   = 1;
    public static final int DIAMONDS = 2;
    public static final int CORBLES  = 3;
    public static final int PALS[] = {SPADES,HEARTS,DIAMONDS,CORBLES};
    public static final int NUMS[] = {0,1,2,3,4,5,6,7,8,9,10,11,12};
    public static final String[] REPRESENTACIO_NUMS = {"2","3","4","5","6","7","8","9","T","J","Q","K","A"};
    public static final String[] REPRESENTACIO_PALS = {"\u2660","\u2665","\u2666","\u2663"};
    
    private int numero; 
    private int pal;

    Carta(int n, int p) {
        numero = n;
        pal = p;
    }

    Carta(String s) {
        char numStr = s.charAt(0);        
        switch(numStr)
        {
            case '2':
                numero = 0;
                break;
            case '3':
                numero = 1;
                break;
            case '4':
                numero = 2;
                break;
            case '5':
                numero = 3;
                break;
            case '6':
                numero = 4;
                break;
            case '7':
                numero = 5;
                break;
            case '8':
                numero = 6;
                break;
            case '9':
                numero = 7;
                break;
            case 'T':
            case 't':
                numero = 8;
                break;
            case 'J':
            case 'j':
                numero = 9;
                break;
            case 'Q':
            case 'q':
                numero = 10;
                break;
            case 'K':
            case 'k':
                numero = 11;
                break;
            case 'A':
            case 'a':
                numero = 12;
                break;
        }
        char palStr = s.charAt(1);
        switch(palStr) {
            case 'S':
            case 's':
                pal = SPADES;
                break;
            case 'H':
            case 'h':
                pal = HEARTS;
                break;
            case 'D':
            case 'd':
                pal = DIAMONDS;
                break;
            case 'C':
            case 'c':
                pal = CORBLES;
                break;
        }
    }

    public static boolean descripcioValida(String descripcioCarta) {
        if (descripcioCarta.length() != 2)
            return false;
        char num = descripcioCarta.charAt(0);
        char pal = descripcioCarta.charAt(1);

        if (num != '2' && num != '3' && num != '4' && num != '5' && num != '6' &&
            num != '7' && num != '8' && num != '9' && num != 'T' && num != 't' &&
            num != 'J' && num != 'j' && num != 'Q' && num != 'q' && num != 'K' &&
            num != 'k' && num != 'A' && num != 'a')
            return false;

        if (pal != 'S' && pal != 's' && pal != 'H' && pal != 'h' &&
            pal != 'D' && pal != 'd' && pal != 'C' && pal != 'c')
            return false;

        return true;
    }

    public void mostrar() {
        System.out.print(REPRESENTACIO_NUMS[numero]+REPRESENTACIO_PALS[pal]+" ");
    }
    
    public int numero() {
        return numero;
    }
    
    public int pal() {
        return pal;
    }

    public String toString() {
        return REPRESENTACIO_NUMS[numero]+REPRESENTACIO_PALS[pal];
    }

    @Override
    public int compareTo(Carta c) {
        if (numero!=c.numero) {
            if (numero<c.numero)
                return -1;
            else
                return 1;
        }
        else if (pal!=c.pal) {
            if (pal<c.pal)
                return -1;
            else
                return 1;
        }
        else
            return 0;
    }
}
