# Task Plan: Pronoun Page Testing

- [x] Open the local HTML file and verify loading (banner and text). -> **FAILED: Tool blocks `file:///` URLs with "access to file URL is blocked".**
- [ ] Test "Máquina de Substituição de Pronomes" - Frase 1.
- [ ] Test "Máquina de Substituição de Pronomes" - Frase 2.
- [ ] Test Quiz - Question 1.
- [ ] Test Quiz - Question 2.
- [ ] Test Quiz - Question 3.
- [ ] Test Quiz - Question 4.
- [ ] Test Quiz - Question 5.
- [ ] Verify Quiz Results (5/5).
- [ ] Test Quiz "Tentar Novamente" button.

## Blockers
- The `open_browser_url` tool blocks access to `file:///` URLs (returns `invalid_args: access to file URL is blocked`).
- I cannot view the HTML file using `view_file` because it is outside the allowlist (`C:\Users\Escola\Desktop\Tudo sobre Pronomes\index.html` is not in `C:\Users\Escola\.gemini\antigravity-ide\brain\87efd071-9458-4e02-973e-34f7398a8148\browser`).
- There is a web server running on `http://localhost:8000/` (Secretaria Escolar), but it does not serve the pronoun page files.
- I do not have terminal tools to start a local server or copy files.
