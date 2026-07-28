# Rose des Orpellières - guide voyageurs privé

This GitHub Pages site is an encrypted guest guide for confirmed travelers.

## Access model

- The repository contains only the application shell and an AES-256-GCM ciphertext.
- The decryption key is stored in the URL fragment of the physical QR code.
- URL fragments are not sent to GitHub Pages or other servers.
- The key and plaintext source must never be committed.
- Search engines are blocked with both `robots.txt` and page-level `noindex` directives.

The root URL without a key displays only a generic access screen.

## Updating the guide

Edit the private source stored outside this repository, encrypt it with a new random 256-bit key, replace `guide.enc.json`, and print the newly generated QR code. Rotating the key invalidates every previous QR.

## Public site

The public accommodation website remains at [orb-chaux.fr](https://orb-chaux.fr/).
