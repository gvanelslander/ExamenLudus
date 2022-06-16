#include "Struct.h"

void CreationPlateau(int taille, Caze **tab) {
	int chiffre = 1;
	int lettre = 65;
	FILE* a_fichier = fopen("../Plateau.txt", "w");
	if (a_fichier) {
		fprintf(a_fichier, "%d\n", taille);
		printf("/");
		for (int i = 0; i < taille; i++) {
			for (int j = 0; j < taille; j++) {
				//Affichage des chiffres sur la gauche du tableau
				if ((j == 0) && (i != 0)) {
					tab[i][j].ligne = chiffre;
					tab[i][j].occupe = 1;
					printf("%d", tab[i][j].ligne);
					fprintf(a_fichier, "%d", tab[i][j].ligne);
					chiffre++;
				}
				//Affichage des chiffres au dessus du tableau avec le ASCII
				else if ((i == 0) && (j != 0)) {
					tab[i][j].colonne = lettre;
					tab[i][j].occupe = 1;
					printf("%c", tab[i][j].colonne);
					fprintf(a_fichier, "%c", tab[i][j].colonne);
					lettre++;
				}
				else {
					int noub = i + j;
					//Indique la couleur des cases
					if ((i == 0) && (j == 0)) {
						tab[i][j].couleur = 0;
						tab[i][j].occupe = 1;
						fprintf(a_fichier, "%d", tab[i][j].couleur);
					}
					//Blanc
					else if (noub % 2 == 0) {
						tab[i][j].couleur = 98;
						tab[i][j].occupe = 0;
						printf("%c", tab[i][j].couleur);
						fprintf(a_fichier, "%c", tab[i][j].couleur);
					}
					//Noir
					else {
						tab[i][j].couleur = 110;
						tab[i][j].occupe = 0;
						printf("%c", tab[i][j].couleur);
						fprintf(a_fichier, "%c", tab[i][j].couleur);
					}
					
				}
			}
			printf("\n");
			fprintf(a_fichier, "\n");
		}
		fclose(a_fichier);
	}	
}

void Placement(int taille, Caze **tab) {
	int choix = 0;
	int couleur = 0;
	int ok = 0;
	int fini = 0;
	FILE* a_fichier = fopen("../Placement.txt", "w");
	if (a_fichier) {
		while (fini == 0) {
			while (ok == 0) {
				//choix de la pièce
				printf("Quel piece voulez vous placez?\n");
				printf("1: Pion\n");
				printf("2: Tour\n");
				printf("3: Cavalier\n");
				printf("4: Fou\n");
				printf("5: Reine\n");
				printf("6: Roi\n");
				scanf("%d", &choix);
				//on verifie si le joueur a bien coché entre 1 et 6 sinon il recommence
				if ((choix >= 1) && (choix <= 6)) {
					ok = 1;

				}
				else {
					printf("Aucune piece est attribue\n");
				}
			}
			ok = 0;
			while (ok == 0) {
				//Le joueur choisi la couleur et si il choisis autre chose il recommence
				printf("Quel est la couleur de la piece?\n1: Noir\n2: Blanc\n");
				scanf("%d", &couleur);
				if ((couleur == 1) || (couleur == 2)) {
					ok = 1;
				}
				else {
					printf("Aucune couleur est attribue\n");
				}
			}

			ok = 0;
			//Le joueur choisi la colonne
			char lettre =  NULL;
			int pos = 0;
			int top = 0;
			while (top == 0) {
				while (ok == 0) {
					printf("Sur quelle lettre souhaitez vous mettre la piece?\n");
					scanf("%c", &lettre);
					if ((lettre >= 65 + taille) || (lettre < 65)) {
						printf("La case n est pas accepte\n");
					}
					else {
						ok = 1;
					}
				}
				pos = 0;
				ok = 0;
				//Le joueur choisi la ligne
				while (ok == 0) {
					printf("A quelle position souhaitez placez la piece?\n");
					scanf("%d", &pos);
					if ((pos >= taille) || (pos < 1)) {
						printf("La case n est pas accepte\n");
					}
					else {
						ok = 1;
					}
				}
				//on sauvegarde la position qui est occupe
				
				top = 1;
			}
			//on garde la position qui est occupe			
			

			ok = 0;
			
			
			fprintf(a_fichier, "%d %d %c %d\n", choix, couleur, lettre, pos);
			//si le joueur veut rajoutez des pieces
			printf("Voulez vous ajoutez une nouvelle piece?\n 0 = oui\n 1 = non\n");
			scanf("%d", &ok);
			if (ok == 1) {
				fini = 5;
			}
			system("cls");

		}
		fclose(a_fichier);
	}
}

