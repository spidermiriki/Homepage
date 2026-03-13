// scripts/sync-letterboxd.js
// Lit le RSS Letterboxd et met à jour src/data/films.json

import fetch from 'node-fetch'
import { parseStringPromise } from 'xml2js'
import fs from 'fs'
import path from 'path'

// ── CONFIG — change ton pseudo ici ──────────────────
const LETTERBOXD_USER = 'Homelo'
const FILMS_JSON_PATH = path.resolve('./Portfolio/src/data/films.json')
// ────────────────────────────────────────────────────

const RSS_URL = `https://letterboxd.com/${LETTERBOXD_USER}/rss/`

async function main() {
  console.log(`Fetching RSS: ${RSS_URL}`)
  const res = await fetch(RSS_URL)
  const xml = await res.text()
  const parsed = await parseStringPromise(xml)

  const items = parsed?.rss?.channel?.[0]?.item ?? []
  console.log(`Found ${items.length} entries in RSS`)

  // Charge le films.json existant
  let existingFilms = []
  if (fs.existsSync(FILMS_JSON_PATH)) {
    existingFilms = JSON.parse(fs.readFileSync(FILMS_JSON_PATH, 'utf-8'))
  }

  // Index par titre+année pour éviter les doublons
  const existingMap = new Map(
    existingFilms.map(f => [`${f.title}__${f.year}`, f])
  )

  let newCount = 0
  let updatedCount = 0

  for (const item of items) {
    const link = item.link?.[0] ?? ''
    if (link.includes('/list/')) continue
    // Le RSS Letterboxd utilise des namespaces letterboxd:
    const title       = item['letterboxd:filmTitle']?.[0] ?? item.title?.[0] ?? ''
    const year        = parseInt(item['letterboxd:filmYear']?.[0] ?? '0')
    const ratingRaw   = item['letterboxd:memberRating']?.[0]  // ex: "3.5"
    const note        = ratingRaw ? parseFloat(ratingRaw) : null
    const liked       = item['letterboxd:like']?.[0] === 'Yes'
    const review      = item['description']?.[0] ?? ''
    const watchedDate = item['letterboxd:watchedDate']?.[0] ?? ''

    // Extrait le lien de l'affiche depuis le contenu HTML du RSS
    const content = item['content:encoded']?.[0] ?? ''
    const coverMatch = content.match(/src="(https:\/\/a\.ltrbxd\.com\/resized\/film-poster[^"]+)"/)
    const cover = coverMatch?.[1]?.replace(/0-230-0-345/, '0-1000-0-1500') ?? ''

    // Nettoie la review (retire les balises HTML)
    const cleanReview = review
      .replace(/<[^>]*>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim()

    const key = `${title}__${year}`

    if (existingMap.has(key)) {
      // Met à jour uniquement les champs venant de Letterboxd
      const existing = existingMap.get(key)
      const updated = {
        ...existing,
        note:   note ?? existing.note,
        like:   liked || existing.like,
        cover:  cover || existing.cover,
        review: cleanReview || existing.review,
      }
      existingMap.set(key, updated)
      updatedCount++
    } else {
      // Nouveau film — on l'ajoute avec les infos disponibles
      // genre et director restent vides (pas dans le RSS)
      const newFilm = {
        id:       existingFilms.length + newCount + 1,
        title,
        year,
        note:     note ?? 0,
        genre:    '',
        director: '',
        cover,
        review:   cleanReview,
        like:     liked,
        watchedDate,
      }
      existingMap.set(key, newFilm)
      newCount++
      console.log(`  ➕ Nouveau film: ${title} (${year})`)
    }
  }

  // Reconstruit le tableau et trie par note décroissante
  const updatedFilms = Array.from(existingMap.values())
    .sort((a, b) => (b.note ?? 0) - (a.note ?? 0))
    .map((f, i) => ({ ...f, id: i + 1 }))

  fs.writeFileSync(FILMS_JSON_PATH, JSON.stringify(updatedFilms, null, 2), 'utf-8')
  console.log(`✅ films.json mis à jour — ${newCount} ajoutés, ${updatedCount} mis à jour`)
}

main().catch(err => {
  console.error('❌ Erreur:', err)
  process.exit(1)
})