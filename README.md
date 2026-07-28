# Rose des Orpellières - guide voyageurs privé

This GitHub Pages site is an encrypted guest guide for confirmed travelers.

## Access model

- The repository contains only the application shell and an AES-256-GCM ciphertext.
- The decryption key is stored in the URL fragment of the physical QR code.
- Short message-friendly tokens can unwrap the same key through additional AES-256-GCM envelopes.
- URL fragments are not sent to GitHub Pages or other servers.
- Neither the key, the short token, nor the plaintext source may be committed.
- Search engines are blocked with both `robots.txt` and page-level `noindex` directives.
- The Wi-Fi sharing QR is generated locally in the browser after decryption; credentials are never sent to a QR service.

The root URL without a key displays only a generic access screen.

`qr-generator.min.js` is a self-hosted browser bundle of `qrcode-generator` by Kazuhiko Arase, distributed under the MIT License.

## Updating the guide

Edit the private source stored outside this repository and re-encrypt it with the existing guide key. Preserve the `access` and `accessLinks` envelopes in `guide.enc.json` so the physical QR and existing short links continue to work. Rotating the guide key requires generating new access links and QR codes.

## Public site

The public accommodation website remains at [orb-chaux.fr](https://orb-chaux.fr/).
