electron-packager "..\" Wakfu-Rune-Builder --asar --platform=win32 --arch=ia32 --win32metadata.requested-execution-level=requireAdministrator --overwrite
.\7z a -mx1 temp.7z .\Wakfu-Rune-Builder-win32-ia32\*
cmd /c copy /b 7zSD.sfx + config.txt + temp.7z Wakfu-Rune-Builder.exe
del .\temp.7z
rmdir .\Wakfu-Rune-Builder-win32-ia32 -Force -Recurse