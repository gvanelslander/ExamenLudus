#pragma once
#include "Header.h"
typedef struct Caze {
	int colonne;
	int ligne;
	int couleur;
	int occupe;
};
void CreationPlateau(int taille, Caze** tab);
void Placement(int taille, Caze** tab);