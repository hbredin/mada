# Mada

Page statique : https://herve.niderb.fr/mada/

## Changer l’image ou afficher une vidéo

1. Ajouter le fichier dans `assets/`.
2. Modifier `media.js` : `type` (`image` ou `video`), `src`, `title`, `caption` et `alt`.
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
