ProkerServer i ProkerLibrary son exemples del codi on:
- S'ha inclos la llibreria al servidor
- La llibreria conte totes les dependencies
- El servidor es pot exportar com a war amb totes les llibreries
- El servidor te el MANIFEST correcte
- Estan construits utilitzant Gradle

Comandes per generar el jar de la llibreria (des de l'arrel del projecte):

>	gradle clean
>	gradle fatJar 

Comandes per generar el war del servidor (des de l'arrel del projecte):

>	gradle clean
>	gradle build 