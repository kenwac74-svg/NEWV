from pathlib import Path

cpp = Path("FastQSP/gui/fastqspwindow.cpp")
hpp = Path("FastQSP/gui/fastqspwindow.h")

c = cpp.read_text(encoding="utf-8")
h = hpp.read_text(encoding="utf-8")

if '#include <QUrlQuery>' not in c:
    c = c.replace('#include <QSettings>\n', '#include <QSettings>\n#include <QUrlQuery>\n#include <QImageReader>\n#include <QFileInfo>\n')

needle = '  otherMenu->addAction(muteAction);\n\n  menuBar()->addMenu(otherMenu);'
replacement = '''  otherMenu->addAction(muteAction);

  otherMenu->addSeparator();
  otherMenu->addAction("Place Workshop", this, SLOT(placeWorkshop()));

  menuBar()->addMenu(otherMenu);'''
if needle not in c:
    raise SystemExit("Other menu anchor not found")
c = c.replace(needle, replacement, 1)

slot_needle = '  void showHtml();\n'
if '  void placeWorkshop();\n' not in h:
    if slot_needle not in h:
        raise SystemExit("showHtml slot anchor not found")
    h = h.replace(slot_needle, slot_needle + '  void placeWorkshop();\n', 1)

func_anchor = 'void FastQSPWindow::openFileDialog() {'
if 'void FastQSPWindow::placeWorkshop()' not in c:
    func = r'''
static QString jo9NormalizedPath(QString p)
{
  return p.replace('\\', '/').trimmed();
}

static QString jo9BaseName(const QString &p)
{
  QFileInfo fi(p);
  return fi.completeBaseName();
}

static void jo9AddAssetQuery(QUrlQuery &query,
                             const QString &prefix,
                             const QString &gameDirectory,
                             const QString &path)
{
  if (path.isEmpty())
    return;

  QString p = jo9NormalizedPath(path);
  QFileInfo fi(gameDirectory + p);
  QImageReader reader(fi.absoluteFilePath());
  QSize sz = reader.size();

  query.addQueryItem(prefix + "Path", p);
  query.addQueryItem(prefix, jo9BaseName(p));
  query.addQueryItem(prefix + "File", fi.fileName());
  if (fi.exists())
    query.addQueryItem(prefix + "Size", QString::number(fi.size()));
  if (sz.isValid()) {
    query.addQueryItem(prefix + "Width", QString::number(sz.width()));
    query.addQueryItem(prefix + "Height", QString::number(sz.height()));
  }
}

void FastQSPWindow::placeWorkshop()
{
  // Read-only bridge: inspect the current page, pass metadata to an external browser,
  // then return. The browser never calls back into the JO9 process.
  QString html = webView->page()->mainFrame()->toHtml();
  QStringList imgs = scanHTMLForImages(html);

  QString bgPath;
  QString npcPath;

  foreach (QString src, imgs) {
    QString p = jo9NormalizedPath(src);

    if (p.contains("content/pic/bg/", Qt::CaseInsensitive) &&
        (p.endsWith(".png", Qt::CaseInsensitive) ||
         p.endsWith(".jpg", Qt::CaseInsensitive) ||
         p.endsWith(".jpeg", Qt::CaseInsensitive) ||
         p.endsWith(".webp", Qt::CaseInsensitive) ||
         p.endsWith(".gif", Qt::CaseInsensitive))) {
      bgPath = p; // last visible place background wins
    }

    if (p.contains("content/pic/characters/", Qt::CaseInsensitive) &&
        (p.endsWith(".png", Qt::CaseInsensitive) ||
         p.endsWith(".jpg", Qt::CaseInsensitive) ||
         p.endsWith(".jpeg", Qt::CaseInsensitive) ||
         p.endsWith(".webp", Qt::CaseInsensitive) ||
         p.endsWith(".gif", Qt::CaseInsensitive))) {
      npcPath = p; // named character preferred
    }
  }

  if (npcPath.isEmpty()) {
    foreach (QString src, imgs) {
      QString p = jo9NormalizedPath(src);
      if (p.contains("content/pic/girls/full/", Qt::CaseInsensitive) &&
          p.endsWith(".png", Qt::CaseInsensitive)) {
        npcPath = p;
      }
    }
  }

  QString toolPath = gameDirectory + "modtools/place/JO9_Place_Workshop.html";
  QUrl toolUrl = QUrl::fromLocalFile(toolPath);
  QUrlQuery query;

  query.addQueryItem("mode", "place");
  if (bgPath.isEmpty())
    query.addQueryItem("status", "no_place");
  else
    query.addQueryItem("status", "ok");

  jo9AddAssetQuery(query, "bg", gameDirectory, bgPath);
  jo9AddAssetQuery(query, "npc", gameDirectory, npcPath);

  // A readable fallback name. The HTML tool may later map this key to a Korean label.
  if (!bgPath.isEmpty())
    query.addQueryItem("place", jo9BaseName(bgPath));

  toolUrl.setQuery(query);

  // Failure to open the external tool is deliberately non-fatal to the game.
  QDesktopServices::openUrl(toolUrl);
}

'''
    if func_anchor not in c:
        raise SystemExit("openFileDialog anchor not found")
    c = c.replace(func_anchor, func + func_anchor, 1)

cpp.write_text(c, encoding="utf-8")
hpp.write_text(h, encoding="utf-8")
print("FastQSP source patched")
