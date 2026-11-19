# Mada

Page statique : https://herve.niderb.fr/mada/

## Changer l’image ou afficher une vidéo

1. Ajouter le fichier dans `assets/`.
2. Modifier la liste `MADA_MEDIA_LIST` dans `media.js` (un objet par média) : `type` (`image` ou `video`), `src`, `title`, `caption` et `alt`.
3. Committer et pousser sur `main`. GitHub Pages publie automatiquement la racine du dépôt.

Pour une vidéo, privilégier MP4 (H.264), avec éventuellement `poster` pour l’aperçu. La lecture se lance avec les contrôles natifs du navigateur. Les fichiers Git doivent rester sous la limite GitHub de 100 Mo ; pour des vidéos volumineuses, utiliser une URL d’hébergement externe dans `src`.

Le QR code est local et encode `https://herve.niderb.fr/mada/`. La fenêtre se ferme avec son bouton, la touche Échap ou un clic à l’extérieur.

Le domaine est hérité du site GitHub Pages du compte : aucun fichier CNAME n’est nécessaire dans ce dépôt.

## Prévisualiser

```sh
python3 -m http.server 8000
```

## Image initiale

`assets/artichaut-volant.jpg`, générée avec l’outil intégré ImageGen.

Prompt : « Use case: stylized-concept. Asset type: main image for a minimal art web gallery. Primary request: un artichaut volant. A beautifully detailed fresh green artichoke with two elegant feathered wings soaring in a luminous blue sky among soft white clouds. Playful surreal fine-art photography, realistic botanical textures, soft sunlight, airy dreamlike atmosphere. Wide landscape composition, entire artichoke and wings visible centered with breathing room. No text, no logo, no watermark. »

Le carrousel affiche les boutons Précédent/Suivant dès que la liste contient plusieurs médias. Il accepte aussi les flèches du clavier quand il a le focus, sans lecture automatique.

## Webcam et validation locale

Le bouton « Prendre une photo » demande l’accès à la caméra (sans micro), affiche un aperçu et laisse l’utilisateur déclencher. Il peut recommencer ou choisir « Valider et télécharger ». La photo validée s’ajoute uniquement au carrousel de cet onglet et se télécharge ; aucune image n’est envoyée automatiquement. La caméra s’arrête après la capture, à la fermeture de la fenêtre ou lorsque la page est masquée.

Pour publier une photo, transmettre explicitement le fichier validé, l’ajouter dans `assets/` et dans `media.js`, puis pousser sur GitHub. GitHub Pages héberge des fichiers statiques : le site ne dispose pas de service d’envoi ni d’identifiants GitHub.
