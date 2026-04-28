═══════════════════════════════════════════════════════════════════
  MOMENTUM COMBAT CLUB · Asset-Anleitung
═══════════════════════════════════════════════════════════════════

So funktioniert's:

  Du speicherst deine Bilder/Videos mit den unten aufgelisteten
  EXAKTEN Dateinamen in diesem Ordner. Die Seite zieht sie
  automatisch. Wenn ein File fehlt, fällt sie auf einen
  Unsplash-Platzhalter zurück, die Seite ist also nie kaputt.

  Format: WebP für Bilder. MP4 (zusätzlich WebM) für das Video.

───────────────────────────────────────────────────────────────────
  HERO + FINAL CTA  (gemeinsamer Asset)
───────────────────────────────────────────────────────────────────

  Hero-Hintergrund (Landingpage) und Final-CTA-Sektion benutzen
  denselben Asset-Namen. Du musst nur EIN Set hochladen.

  cta-bg.mp4             → Hero-Hintergrund-Video
                           Empfehlung: 1920×1080 oder 1280×720,
                           5-15 Sek. Loop, max. 10 MB,
                           H.264, OHNE Ton (wird stumm abgespielt).

  cta-bg.webm            → Optional. Kleinere Dateigröße als MP4.
                           Browser zieht WebM bevorzugt, MP4 als Fallback.

  cta-bg.webp            → Standbild. Wird verwendet als:
                           - Poster fürs Hero-Video (vor dem Start)
                           - Hintergrund der Final-CTA-Sektion
                           Format 16:9, ~1600×900 px.

  Wo bekomme ich freie Videos?
    · pexels.com/videos/search/martial+arts/
    · coverr.co/categories/sport
    · mixkit.co/free-stock-video/sports/
    · Eigenes Material aus dem Gym (Handy reicht)

  Wie komprimieren?
    · handbrake.fr  (Desktop, kostenlos)
    · cloudconvert.com  (online)
    · squoosh.app  (online, eher für Bilder)

  Falls du keinen lokalen File droppst, läuft automatisch
  ein Pexels-Combat-Video als Fallback.

───────────────────────────────────────────────────────────────────
  LOGO
───────────────────────────────────────────────────────────────────

  logo.webp              → Vereinslogo. Quadratisch, 80×80 oder 120×120 px.
                           Wird in Header und Footer angezeigt.
                           Tipp: Mit transparentem Hintergrund exportieren,
                           damit es auf dem dunklen Hintergrund wirkt.

  Falls die Datei fehlt, fällt es auf das eingebaute SVG-Symbol zurück
  (Dreieck mit rotem Inneren-Stroke).

───────────────────────────────────────────────────────────────────
  COACH
───────────────────────────────────────────────────────────────────

  jonas-ried.webp        → Foto von Jonas. Hochformat 4:5,
                           empfohlen 1000×1250.
                           (Das Foto aus dem Chat, schulterfrei
                           im Käfig, eignet sich perfekt.)

───────────────────────────────────────────────────────────────────
  TRAINING-KARTEN  (3 Disziplinen)
───────────────────────────────────────────────────────────────────

  card-bjj.webp          → Brazilian Jiu-Jitsu (Gi).
                           Querformat 4:3, 900×675

  card-kickboxing.webp   → Kickboxen.
                           Querformat 4:3, 900×675

  card-mma.webp          → MMA Basics + Fitness.
                           Querformat 4:3, 900×675

───────────────────────────────────────────────────────────────────
  INSTAGRAM-GRID  (5 Tiles)
───────────────────────────────────────────────────────────────────

  ig-01.webp             → Großes Tile (links). Quadratisch 800×800.
                           Aktuell 39 Likes.
  ig-02.webp             → Tile 2.  Quadratisch 400×400.   49 Likes.
  ig-03.webp             → Tile 3.  Quadratisch 400×400.   37 Likes.
  ig-04.webp             → Tile 4.  Quadratisch 400×400.   34 Likes.
  ig-05.webp             → Tile 5.  Quadratisch 400×400.   27 Likes.

───────────────────────────────────────────────────────────────────
  TUTORIALS  (4 Episoden, alle verlinkt zu Instagram)
───────────────────────────────────────────────────────────────────

  tutorial-01.webp       → EP 01: Back Mount Szenarios pt. 2
                           16:10, 1000×625 (Featured-Tile, groß)
                           Link: instagram.com/p/DP9ObS-DA0l/

  tutorial-02.webp       → EP 02: Side Mount Attacks pt. 1
                           16:10, 600×375
                           Link: instagram.com/p/DPMJScSDEJZ/

  tutorial-03.webp       → EP 03: Rear Body Lock Counter pt. 1
                           16:10, 600×375
                           Link: instagram.com/p/DPHZyBBjXuy/

  tutorial-04.webp       → EP 04: Butterfly Sweep pt. 1
                           16:10, 600×375
                           Link: instagram.com/p/DN_LFX3jOfI/

  Tipp: Nimm die ersten Frames der Reels als Thumbnails,
  oder einen Screenshot mit klar sichtbarer Pose.

───────────────────────────────────────────────────────────────────
  MITGLIEDERERFOLGE
───────────────────────────────────────────────────────────────────

  success-talha.webp     → Talha K.   Hochformat 4:5, 1000×1250 (Featured)
  success-batu.webp      → Batu G.    Hochformat 4:5, 600×750
  success-tim.webp       → Tim F.     Hochformat 4:5, 600×750

═══════════════════════════════════════════════════════════════════
  WIE GEBE ICH DIR EXTERNE LINKS?
═══════════════════════════════════════════════════════════════════

  Du hast 2 Möglichkeiten:

  1) LOKAL  (empfohlen, am stabilsten)
     · File herunterladen / aufnehmen
     · in WebP/MP4 konvertieren
     · mit korrektem Namen in /assets/ ablegen
     · fertig, Seite zieht es automatisch

  2) EXTERNE URL  (für Videos akzeptabel)
     · Du schickst mir die direkte CDN-URL im Chat
       (z.B. https://videos.pexels.com/video-files/12345/foo.mp4)
     · Ich update den <source>-Eintrag im HTML

     ⚠ Funktioniert NUR mit direkten Datei-URLs.
        YouTube/Vimeo-Links gehen nicht (CORS, Player-UI).

═══════════════════════════════════════════════════════════════════
  WEBP-KONVERTIERUNG
═══════════════════════════════════════════════════════════════════

  Einfachste Variante:
    · squoosh.app im Browser öffnen
    · Bild reinziehen
    · rechts „WebP" wählen
    · Quality 75 bis 80
    · Download

  Per CLI auf macOS:
    brew install webp
    cwebp -q 78 input.jpg -o output.webp

═══════════════════════════════════════════════════════════════════
