# PROKER

## Resum

Proker és una aplicació escrita en Java que permet obtenir prediccions de poker en funció de la mà del jugador, el nombre de jugadors i les cartes de la taula.

Aquest repositori consta de dues parts:

* **ProkerLibrary**: Rep la configuració de la taula actual i retorna la llista de probabilitats de cada combinació i la probabilitat de guanyar, empatar o perdre (WTL).
* **ProkerServer**:  Desplega un servidor en Spring que mostra la interfície gràfica del servidor. Fa crides a la ProkerLibrary per mostrar els resultats.

## TODO

* S'ha d'afegir noves funcionalitats a la llibreria, sobretot els rangs dels altres jugadors
* Millorar la interfície gràfica de ProkerServer.
* Migrar a rails.
* Facilitar el canvi de port.
* Facilitar l'accés a la llibreria ProkerLibrary.

## Prerrequisits

* Tenir instal·lat una versió de Java >= 8.0

## HowTo

1. Descarregar el projecte
2. Localitzar el path del jar que conté tota la lògica de ProkerLibrary
3. Canviar els path al fitxer build.gradle
4. Per canviar el port cal especificar-ho al fitxer application.properties i a totes les línies del js de la carpeta resources on hi apareixi
5. Compilar i executar i ja s'hi pot accedir des del navegador  
