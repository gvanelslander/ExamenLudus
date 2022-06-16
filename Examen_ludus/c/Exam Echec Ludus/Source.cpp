#include "Struct.h"

void main() {
	int taille = 0;
	printf("Quelle est la taille de votre plateau?\n");
	scanf("%d", &taille);

	while (taille <= 0) {
		printf("La taille minimal est de 1, et la taille maximal est de 26.\n Veuillez entrez une nouvelle taille.\n");
		scanf("%d", &taille);
	}
	taille = taille + 1;
	//Création de la taille du Plateau de jeu
	Caze** tab = (Caze**)calloc(taille + 1, sizeof(Caze*));

	for (int i = 0; i < taille + 1; i++) {
		tab[i] = (Caze*)calloc(taille + 1, sizeof(Caze));
	}
	CreationPlateau(taille, tab);
	int tempsj1min = 0;
	int tempsj2min = 0;
	int tempsj1sec = 0;
	int tempsj2sec = 0;

	printf("Quel est le temps definit pour le joueur 1?(minute)\n");
	scanf("%d", &tempsj1min);
	printf("Quel est le temps definit pour le joueur 1?(seconde)\n");
	scanf("%d", &tempsj1sec);
	tempsj1sec = tempsj1sec + (tempsj1min * 60);
	printf("Quel est le temps definit pour le joueur 2?(minute)\n");
	scanf("%d", &tempsj2min);
	printf("Quel est le temps definit pour le joueur 2?(seconde)\n");
	scanf("%d", &tempsj2sec);
	tempsj2sec = tempsj2sec + (tempsj2min * 60);
	FILE* a_fichier = fopen("../Temps.txt", "w");
	if (a_fichier) {
		fprintf(a_fichier, "%d\n%d",tempsj1sec, tempsj2sec);
		fclose(a_fichier);
	}
	Placement(taille, tab);
	system("pause");
	free(tab);
}