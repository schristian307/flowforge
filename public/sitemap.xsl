<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  exclude-result-prefixes="sitemap"
>
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, follow" />
        <title>XML Sitemap — Operator Mode</title>
        <style>
          :root {
            color-scheme: dark;
            --background: #000000;
            --foreground: #ffffff;
            --surface: #0f0f0f;
            --muted: #a1a1aa;
            --border: #222222;
            --primary: #3b82f6;
            --primary-soft: rgba(59, 130, 246, 0.12);
            --radius: 0.625rem;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            min-height: 100vh;
            background:
              radial-gradient(circle at top, rgba(59, 130, 246, 0.08), transparent 40%),
              var(--background);
            color: var(--foreground);
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            line-height: 1.5;
          }

          .container {
            max-width: 960px;
            margin: 0 auto;
            padding: 3rem 1.5rem 4rem;
          }

          header {
            margin-bottom: 2rem;
          }

          .eyebrow {
            display: inline-block;
            margin-bottom: 0.75rem;
            padding: 0.25rem 0.625rem;
            border: 1px solid var(--border);
            border-radius: 999px;
            color: var(--muted);
            font-size: 0.75rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          h1 {
            margin: 0 0 0.75rem;
            font-size: clamp(1.75rem, 4vw, 2.5rem);
            font-weight: 700;
            letter-spacing: -0.03em;
          }

          .intro {
            max-width: 42rem;
            margin: 0;
            color: var(--muted);
          }

          .meta {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-top: 1.5rem;
          }

          .meta-item {
            padding: 0.625rem 0.875rem;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            background: var(--surface);
            font-size: 0.875rem;
          }

          .meta-item strong {
            color: var(--foreground);
          }

          table {
            width: 100%;
            border-collapse: collapse;
            overflow: hidden;
            border: 1px solid var(--border);
            border-radius: calc(var(--radius) + 0.125rem);
            background: var(--surface);
          }

          thead {
            background: rgba(255, 255, 255, 0.03);
          }

          th,
          td {
            padding: 0.875rem 1rem;
            text-align: left;
            border-bottom: 1px solid var(--border);
            vertical-align: top;
          }

          th {
            color: var(--muted);
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
          }

          tbody tr:last-child td {
            border-bottom: 0;
          }

          tbody tr:hover {
            background: rgba(59, 130, 246, 0.05);
          }

          a {
            color: var(--primary);
            text-decoration: none;
            word-break: break-all;
          }

          a:hover {
            text-decoration: underline;
          }

          .badge {
            display: inline-block;
            padding: 0.125rem 0.5rem;
            border-radius: 999px;
            background: var(--primary-soft);
            color: #93c5fd;
            font-size: 0.75rem;
            font-weight: 600;
          }

          footer {
            margin-top: 1.5rem;
            color: var(--muted);
            font-size: 0.875rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <span class="eyebrow">SEO</span>
            <h1>XML Sitemap</h1>
            <p class="intro">
              This sitemap helps search engines discover and index public pages on Operator Mode.
              The styled view is for humans; crawlers read the underlying XML.
            </p>
            <div class="meta">
              <div class="meta-item">
                <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)" /></strong>
                indexed URL<xsl:if test="count(sitemap:urlset/sitemap:url) != 1">s</xsl:if>
              </div>
              <div class="meta-item">
                Generated for <strong>Operator Mode</strong>
              </div>
            </div>
          </header>

          <table>
            <thead>
              <tr>
                <th scope="col">URL</th>
                <th scope="col">Last Modified</th>
                <th scope="col">Change Frequency</th>
                <th scope="col">Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}">
                      <xsl:value-of select="sitemap:loc" />
                    </a>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:lastmod" />
                  </td>
                  <td>
                    <span class="badge">
                      <xsl:value-of select="sitemap:changefreq" />
                    </span>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:priority" />
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>

          <footer>
            Learn more about sitemaps at
            <a href="https://www.sitemaps.org/">sitemaps.org</a>.
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
