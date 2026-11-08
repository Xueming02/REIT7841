import './style.css'

const params = new URLSearchParams(window.location.search)
const requestedMode = params.get('mode')?.toLowerCase() || 'baseline'
const legacyModeAliases = {
  control: 'baseline',
  experiment: 'thumbnail',
  preview: 'thumbnail',
  visible: 'thumbnail',
  opaque: 'baseline',
  title: 'text',
  metadata: 'text',
  'text-preview': 'text',
}
const normalizedMode = legacyModeAliases[requestedMode] || requestedMode
const mode = ['baseline', 'thumbnail', 'text'].includes(normalizedMode)
  ? normalizedMode
  : 'baseline'
const showsMotionPreview = mode === 'thumbnail'
const showsTextPreview = mode === 'text'
const showsUpcomingPreview = showsMotionPreview || showsTextPreview
const previewFormat = showsMotionPreview
  ? 'motion_video'
  : showsTextPreview
    ? 'title_and_tags'
    : 'none'
const conditionLabels = {
  baseline: 'Baseline · no preview',
  thumbnail: 'Moving preview · next video',
  text: 'Text preview · title and tags',
}
const participant = params.get('participant')?.trim() || 'UNASSIGNED'
const debugMode = params.get('debug') === '1'
const debugVideoId = params.get('video')

const videos = [
  {
    id: 'xJ5J4-c4Rss',
    title: 'Korean crispy potato street snack',
    tags: ['Street food', 'Korean', 'Crispy'],
    creator: '@KimchiBoyKitchen',
    duration: '0:20',
    category: 'Food',
    likes: '28.4K',
    comments: '308',
    saves: '5.8K',
    shares: '1.2K',
  },
  {
    id: 'CzSY1aTNg-g',
    title: 'Kinilaw: bright, fresh and full of flavour',
    tags: ['Cooking', 'Seafood', 'Filipino'],
    creator: '@ErwanHeussaff',
    duration: '1:30',
    category: 'Cooking',
    likes: '41.7K',
    comments: '492',
    saves: '8.9K',
    shares: '2.1K',
  },
  {
    id: 'as_NEJAP8ew',
    title: 'Every Samsung phone. Same photo.',
    tags: ['Technology', 'Camera', 'Samsung'],
    creator: '@MarquesBrownlee',
    duration: '0:42',
    category: 'Technology',
    likes: '96.2K',
    comments: '814',
    saves: '12.6K',
    shares: '4.8K',
  },
  {
    id: 'QmE_DoCcfyg',
    title: "Moving my life to the world's best city",
    tags: ['Travel', 'City life', 'Adventure'],
    creator: '@JordenTually',
    duration: '0:56',
    category: 'Travel',
    likes: '67.9K',
    comments: '603',
    saves: '10.4K',
    shares: '3.4K',
  },
  {
    id: 'iPjfQeMgvYQ',
    title: 'A quick running warm-up before training',
    tags: ['Fitness', 'Running', 'Warm-up'],
    creator: '@ChariHawkins',
    duration: '0:15',
    category: 'Fitness',
    likes: '1.2K',
    comments: '58',
    saves: '436',
    shares: '92',
  },
  {
    id: 'O9lBBEG7aIk',
    title: 'A crispy monsoon snack with Chef Anahita',
    tags: ['Recipe', 'Snack', 'Quick meal'],
    creator: '@VikhroliCucina',
    duration: '1:41',
    category: 'Cooking',
    likes: '33.1K',
    comments: '364',
    saves: '7.3K',
    shares: '1.7K',
  },
  {
    id: 'DQYc93f7FJw',
    title: 'The best places to visit in Italy',
    tags: ['Travel', 'Italy', 'Bucket list'],
    creator: '@TravelPleasure',
    duration: '0:17',
    category: 'Travel',
    likes: '21K',
    comments: '286',
    saves: '6.1K',
    shares: '1.8K',
  },
  {
    id: 'eqxk2rVPbdA',
    title: 'Satisfying street-food ideas in seconds',
    tags: ['Street food', 'Satisfying', 'Food ideas'],
    creator: '@CookingLittle',
    duration: '0:33',
    category: 'Food',
    likes: '1M',
    comments: '9.6K',
    saves: '118K',
    shares: '42K',
  },
  {
    id: 'NASPnKIaFis',
    title: 'Smartphone gadgets you will want to try',
    tags: ['Technology', 'Gadgets', 'Smartphone'],
    creator: '@GODUNBOX',
    duration: '0:14',
    category: 'Technology',
    likes: '18.7K',
    comments: '241',
    saves: '4.2K',
    shares: '1.1K',
  },
  {
    id: '3JcIJ0lf2lI',
    title: 'Running warm-up drills before training',
    tags: ['Fitness', 'Running', 'Mobility'],
    creator: '@ChariHawkins',
    duration: '0:20',
    category: 'Fitness',
    likes: '126K',
    comments: '623',
    saves: '22.8K',
    shares: '5.4K',
  },
  {
    id: 'kUcYvjrJ2hE',
    title: 'The secret to keeping a cake moist',
    tags: ['Baking', 'Cake', 'Kitchen tip'],
    creator: '@ChefCell',
    duration: '0:16',
    category: 'Cooking',
    likes: '14.9K',
    comments: '184',
    saves: '3.7K',
    shares: '906',
  },
  {
    id: 'BEaHEdix_LU',
    title: 'A quick escape through Honde Valley',
    tags: ['Travel', 'Hiking', 'Nature'],
    creator: '@HikeAndClimb263',
    duration: '0:25',
    category: 'Travel',
    likes: '8.4K',
    comments: '132',
    saves: '2.9K',
    shares: '714',
  },
  {
    id: 'LaZgJ_dC-5Y',
    title: 'A colourful street-food recipe to try',
    tags: ['Food', 'Street food', 'Recipe'],
    creator: '@CookingLittle',
    duration: '0:37',
    category: 'Food',
    likes: '1.1M',
    comments: '12.4K',
    saves: '136K',
    shares: '51K',
  },
  {
    id: 'nHw7oj2HlEQ',
    title: 'A smart-band gadget with a clever display',
    tags: ['Technology', 'Wearable', 'Gadget'],
    creator: '@UsaWego',
    duration: '0:55',
    category: 'Technology',
    likes: '217K',
    comments: '1.9K',
    saves: '31K',
    shares: '8.7K',
  },
  {
    id: 'zPswn3FzQeM',
    title: 'The perfect warm-up for your next run',
    tags: ['Fitness', 'Warm-up', 'Running'],
    creator: '@ChariHawkins',
    duration: '0:16',
    category: 'Fitness',
    likes: '60K',
    comments: '407',
    saves: '14.2K',
    shares: '3.1K',
  },
  {
    id: 'uMXw6RndBZY',
    title: 'A chef’s simple method for tender meat',
    tags: ['Cooking', 'Meat', 'Chef tip'],
    creator: '@FreelanceChef',
    duration: '0:59',
    category: 'Cooking',
    likes: '24.6K',
    comments: '316',
    saves: '7.8K',
    shares: '1.6K',
  },
  {
    id: 'yzZ4MNH9LZQ',
    title: 'A 30-second journey across Europe',
    tags: ['Travel', 'Europe', 'City views'],
    creator: '@TOP5VERSE',
    duration: '0:24',
    category: 'Travel',
    likes: '11.3K',
    comments: '197',
    saves: '3.4K',
    shares: '982',
  },
  {
    id: 'qisB_MFIO54',
    title: 'A fast kitchen trick with Chef Cell',
    tags: ['Cooking', 'Kitchen tip', 'Quick recipe'],
    creator: '@ChefCell',
    duration: '0:15',
    category: 'Cooking',
    likes: '12.8K',
    comments: '146',
    saves: '3.1K',
    shares: '802',
  },
  {
    id: 'QDO276e1iVM',
    title: 'Amazing science myths explained quickly',
    tags: ['Learning', 'Science', 'Facts'],
    creator: '@FactYT01',
    duration: '0:39',
    category: 'Learning',
    likes: '1.6M',
    comments: '736',
    saves: '94K',
    shares: '28K',
  },
  {
    id: 'ek1ZcD1XsJo',
    title: 'Does piano music sound better on guitar?',
    tags: ['Music', 'Guitar', 'Classical'],
    creator: '@BeatrixGuitar',
    duration: '0:17',
    category: 'Music',
    likes: '184K',
    comments: '1.2K',
    saves: '31K',
    shares: '8.4K',
  },
  {
    id: 'X_g90Mb_4c0',
    title: 'This is what high-level Mario Kart looks like',
    tags: ['Gaming', 'Mario Kart', 'Racing'],
    creator: '@Shortcat321',
    duration: '1:41',
    category: 'Gaming',
    likes: '512K',
    comments: '4.8K',
    saves: '38K',
    shares: '14K',
  },
  {
    id: '3NyL6XzxRVo',
    title: 'Three useful English idioms to remember',
    tags: ['Learning', 'English', 'Vocabulary'],
    creator: '@KateEnglish',
    duration: '0:38',
    category: 'Learning',
    likes: '523K',
    comments: '2.9K',
    saves: '87K',
    shares: '21K',
  },
  {
    id: 'JPlvroW0fg4',
    title: 'Golden Hour on a public-station piano',
    tags: ['Music', 'Piano', 'Live performance'],
    creator: '@JVKE',
    duration: '1:00',
    category: 'Music',
    likes: '2.2M',
    comments: '23K',
    saves: '246K',
    shares: '92K',
  },
  {
    id: 'chw8ORXZoeM',
    title: 'A quick Minecraft survival moment',
    tags: ['Gaming', 'Minecraft', 'Gameplay'],
    creator: '@GamingSMPGod',
    duration: '0:21',
    category: 'Gaming',
    likes: '133',
    comments: '18',
    saves: '41',
    shares: '12',
  },
  {
    id: 'Z_ItPQkorqg',
    title: 'English idioms for everyday conversation',
    tags: ['Learning', 'Language', 'Idioms'],
    creator: '@KateEnglish',
    duration: '0:54',
    category: 'Learning',
    likes: '138K',
    comments: '1.1K',
    saves: '29K',
    shares: '7.6K',
  },
  {
    id: 'N5DGbnhML-4',
    title: 'When six musicians meet in the subway',
    tags: ['Music', 'Subway', 'Live jam'],
    creator: '@RaphaelClarinet',
    duration: '1:00',
    category: 'Music',
    likes: '1.4M',
    comments: '9.7K',
    saves: '164K',
    shares: '71K',
  },
  {
    id: 'jcYxNrkpJi4',
    title: 'The animatronics can hear every sound',
    tags: ['Gaming', 'FNAF', 'Horror'],
    creator: '@iAriseYT',
    duration: '0:24',
    category: 'Gaming',
    likes: '40K',
    comments: '692',
    saves: '6.8K',
    shares: '2.4K',
  },
]

if (debugMode && /^[a-zA-Z0-9_-]{11}$/.test(debugVideoId || '')) {
  videos[0] = { ...videos[0], id: debugVideoId }
}

const sessionData = {
  schemaVersion: '5.0',
  study: 'short-video-next-preview-study',
  participant,
  mode,
  requestedMode,
  contentPoolSize: videos.length,
  experimentalFactors: {
    feedContinuation: 'continuous_autoplay',
    upcomingPreviewVisibility: showsUpcomingPreview ? 'visible' : 'hidden',
    upcomingPreviewFormat: previewFormat,
    previewTiming: showsUpcomingPreview ? 'immediate_on_video_shown' : 'not_applicable',
    previewDelaySeconds: 0,
    previewInteraction: 'non_interactive',
    nextVideoSequence: 'predetermined',
    transitionInterstitial: 'absent',
    recommendationChoice: 'absent',
    forcedWaitSeconds: 0,
    playbackControl: 'tap_video',
    audioEnabledByDefault: true,
    audioControlVisible: false,
  },
  startedAt: new Date().toISOString(),
  endedAt: null,
  views: [],
  transitions: [],
  previewExposures: [],
  interactions: [],
  summary: null,
}

let currentIndex = 0
let currentView = null
let player = null
let playerReady = false
let previewPlayer = null
let previewPlayerReady = false
let transitionLocked = false
let sessionEnded = false
let touchStartY = null
let wheelCooldown = false
let progressTimer = null
let isSeeking = false
let seekStartedAt = null
let activePreviewExposure = null
let previewVisibleSinceMs = null
let previewAccumulatedMs = 0
let isPlaying = false
let suppressNextTap = false

document.querySelector('#app').innerHTML = `
  <main class="research-app" data-mode="${mode}">
    <section class="video-stage" aria-label="Short-form video player">
      <div class="video-frame">
        <div id="youtube-player" class="youtube-player" aria-label="YouTube video player"></div>
        <div class="video-shade" aria-hidden="true"></div>
        <div
          class="gesture-layer"
          data-testid="video-tap-area"
          role="button"
          tabindex="0"
          aria-label="Play or pause video"
        ></div>
        <div class="playback-indicator" hidden aria-hidden="true">▶</div>

        ${
          debugMode
            ? `<div class="debug-condition">${conditionLabels[mode]} · ${participant}</div>`
            : ''
        }

        <div class="feed-tabs" aria-label="Feed">
          <span>Following</span>
          <span class="is-active">For You</span>
        </div>

        <button
          class="end-session"
          type="button"
          data-testid="end-session"
          aria-label="End Session"
        >
          End
        </button>

        ${
          debugMode
            ? `<button class="debug-end" type="button" data-testid="simulate-end">
                Simulate video end
              </button>`
            : ''
        }

        <div class="video-meta" aria-live="polite">
          <p class="video-creator"></p>
          <h1 class="video-title"></h1>
          <div class="now-tags"></div>
          <p class="video-sound">
            <span class="video-sound-label"></span>
          </p>
        </div>

        <aside class="action-rail" aria-label="Video actions">
          <button class="creator-avatar" type="button" data-action="creator" aria-label="View creator">
            <span class="creator-initial"></span>
            <span class="creator-plus" aria-hidden="true">+</span>
          </button>
          <button class="action-button" type="button" data-action="like" aria-label="Like video">
            <span class="action-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 21s-8-4.7-8-11a4.8 4.8 0 0 1 8-3.6A4.8 4.8 0 0 1 20 10c0 6.3-8 11-8 11Z"/></svg>
            </span>
            <span class="like-count"></span>
          </button>
          <button class="action-button" type="button" data-action="comment" aria-label="Comment on video">
            <span class="action-icon" aria-hidden="true">
              <svg class="comment-svg" viewBox="0 0 24 24">
                <path d="M12 3a9 8 0 0 0-7.2 12.8L3.5 21l5.3-2.3A10.4 10.4 0 0 0 12 19a9 8 0 1 0 0-16Z"/>
                <circle cx="8.4" cy="11" r="1"/><circle cx="12" cy="11" r="1"/><circle cx="15.6" cy="11" r="1"/>
              </svg>
            </span>
            <span class="comment-count"></span>
          </button>
          <button class="action-button" type="button" data-action="save" aria-label="Save video">
            <span class="action-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-3.8L6 21V3Z"/></svg>
            </span>
            <span class="save-count"></span>
          </button>
          <button class="action-button" type="button" data-action="share" aria-label="Share video">
            <span class="action-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="m21 11-8-7v4.1C7.2 8.6 4 12.1 3 18c2.1-3.2 5.1-4.8 10-4.8V18l8-7Z"/></svg>
            </span>
            <span class="share-count"></span>
          </button>
        </aside>

        <div
          class="next-preview-panel"
          data-testid="next-video-preview"
          hidden
          aria-label="Preview of the next video"
        >
          <div class="next-motion-preview" data-testid="next-motion-preview" hidden>
            <div class="next-preview-video-host" aria-hidden="true"></div>
            <div class="next-preview-cover" aria-hidden="true"></div>
            <span class="next-preview-label">Up next</span>
            <span class="next-preview-edge" aria-hidden="true"></span>
          </div>
          <div class="next-text-preview" data-testid="next-text-preview" hidden>
            <span class="next-text-kicker">Up next</span>
            <div class="next-text-copy">
              <p class="next-text-title"></p>
              <div class="next-text-tags"></div>
            </div>
          </div>
        </div>

        <div class="progress-control">
          <input
            class="progress-slider"
            data-testid="video-progress"
            type="range"
            min="0"
            max="1"
            value="0"
            step="0.1"
            aria-label="Video progress"
            aria-valuetext="0:00 of 0:00"
            disabled
          />
          <span class="progress-time" aria-hidden="true">
            <span class="progress-current">0:00</span>
            <span>/</span>
            <span class="progress-duration">0:00</span>
          </span>
        </div>

        <nav class="bottom-nav" aria-label="Primary navigation">
          <button class="nav-item is-active" type="button" data-nav="Home">
            <span class="nav-icon">⌂</span><span>Home</span>
          </button>
          <button class="nav-item" type="button" data-nav="Search">
            <span class="nav-icon">⌕</span><span>Search</span>
          </button>
          <button class="create-button" type="button" data-nav="Create" aria-label="Create">
            <span>+</span>
          </button>
          <button class="nav-item" type="button" data-nav="Inbox">
            <span class="nav-icon">□</span><span>Inbox</span>
          </button>
          <button class="nav-item" type="button" data-nav="Me">
            <span class="nav-icon">○</span><span>Me</span>
          </button>
        </nav>
      </div>
    </section>

    <dialog class="data-dialog" data-testid="session-data-dialog">
      <div class="dialog-header">
        <div>
          <p>Research session complete</p>
          <h2>Collected session data</h2>
        </div>
        <button class="dialog-close" type="button" aria-label="Close session data">×</button>
      </div>
      <pre class="data-output"></pre>
      <p class="dialog-note">The same data has also been written to the browser console.</p>
    </dialog>

    <div class="toast" role="status" aria-live="polite"></div>
  </main>
`

const videoFrame = document.querySelector('.video-frame')
const gestureLayer = document.querySelector('.gesture-layer')
const dataDialog = document.querySelector('.data-dialog')
const dataOutput = document.querySelector('.data-output')
const toast = document.querySelector('.toast')
const progressSlider = document.querySelector('.progress-slider')
const progressCurrent = document.querySelector('.progress-current')
const progressDuration = document.querySelector('.progress-duration')
const nextPreviewPanel = document.querySelector('.next-preview-panel')
const nextMotionPreview = document.querySelector('.next-motion-preview')
const nextTextPreview = document.querySelector('.next-text-preview')
const nextPreviewVideoHost = document.querySelector('.next-preview-video-host')
const nextPreviewCover = document.querySelector('.next-preview-cover')
const nextTextTitle = document.querySelector('.next-text-title')
const nextTextTags = document.querySelector('.next-text-tags')
const playbackIndicator = document.querySelector('.playback-indicator')

function isoNow() {
  return new Date().toISOString()
}

function secondsBetween(start, end = Date.now()) {
  return Number(((end - start) / 1000).toFixed(2))
}

function nextIndex(index = currentIndex) {
  return (index + 1) % videos.length
}

function recordInteraction(type, details = {}) {
  if (sessionEnded) return
  sessionData.interactions.push({
    type,
    at: isoNow(),
    videoId: videos[currentIndex]?.id ?? null,
    ...details,
  })
}

function recordContinuousTransition(
  trigger,
  outcome,
  destinationIndex,
  inputMethod = null,
  previewWasShown = false,
) {
  const sourceVideo = videos[currentIndex]
  const destinationVideo = videos[(destinationIndex + videos.length) % videos.length]
  sessionData.transitions.push({
    condition: mode,
    transitionInterface: 'continuous_feed',
    upcomingPreviewVisibility: showsUpcomingPreview ? 'visible' : 'hidden',
    upcomingPreviewFormat: previewFormat,
    sourceVideoId: sourceVideo.id,
    destinationVideoId: destinationVideo.id,
    trigger,
    outcome,
    inputMethod,
    previewWasShown,
    resolvedAt: isoNow(),
    transitionLatencySeconds: 0,
  })
}

function formatClock(seconds) {
  const safeSeconds = Math.max(0, Math.floor(Number(seconds) || 0))
  const minutes = Math.floor(safeSeconds / 60)
  const remainder = String(safeSeconds % 60).padStart(2, '0')
  return `${minutes}:${remainder}`
}

function durationLabelToSeconds(label) {
  const [minutes, seconds] = label.split(':').map(Number)
  return minutes * 60 + seconds
}

function resetProgress(video) {
  const expectedDuration = durationLabelToSeconds(video.duration)
  progressSlider.min = '0'
  progressSlider.max = String(expectedDuration)
  progressSlider.value = '0'
  progressSlider.style.setProperty('--progress', '0%')
  progressCurrent.textContent = '0:00'
  progressDuration.textContent = video.duration
  progressSlider.setAttribute('aria-valuetext', `0:00 of ${video.duration}`)
}

function updateVideoInterface(video) {
  document.querySelector('.video-creator').textContent = video.creator.replace('@', '')
  document.querySelector('.video-title').textContent = video.title
  document.querySelector('.like-count').textContent = video.likes
  document.querySelector('.comment-count').textContent = video.comments
  document.querySelector('.save-count').textContent = video.saves
  document.querySelector('.share-count').textContent = video.shares
  document.querySelector('.now-tags').innerHTML = video.tags
    .map((tag) => `<span>#${tag.replace(/\s+/g, '')}</span>`)
    .join('')
  document.querySelector('.creator-initial').textContent = video.creator
    .replace('@', '')
    .charAt(0)
    .toUpperCase()
  document.querySelector('.creator-avatar').style.backgroundImage =
    `linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.08)), url("https://img.youtube.com/vi/${video.id}/mqdefault.jpg")`
  document.querySelector('.video-sound-label').textContent =
    `original sound · ${video.creator.replace('@', '')}`
  resetProgress(video)
}

function stopPreviewVisibilityClock() {
  if (previewVisibleSinceMs === null) return
  previewAccumulatedMs += Date.now() - previewVisibleSinceMs
  previewVisibleSinceMs = null
}

function hideUpcomingPreview({ accumulate = true } = {}) {
  if (accumulate) stopPreviewVisibilityClock()
  try {
    previewPlayer?.destroy?.()
  } catch {
    // The preview host is cleared below even if the embedded player is unavailable.
  }
  previewPlayer = null
  previewPlayerReady = false
  nextPreviewPanel.hidden = true
  nextMotionPreview.hidden = true
  nextTextPreview.hidden = true
  nextPreviewPanel.dataset.playbackState = 'hidden'
  nextPreviewCover.classList.remove('is-playing')
  nextPreviewVideoHost.innerHTML = ''
  videoFrame.classList.remove('has-next-preview', 'has-motion-preview', 'has-text-preview')
}

function mountMotionPreviewPlayer(destination) {
  if (!showsMotionPreview || !window.YT?.Player || sessionEnded) return
  const mountPoint = document.querySelector('#next-preview-player')
  if (!mountPoint || mountPoint.tagName !== 'DIV') return

  previewPlayerReady = false
  previewPlayer = new window.YT.Player('next-preview-player', {
    videoId: destination.id,
    host: 'https://www.youtube.com',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      enablejsapi: 1,
      fs: 0,
      loop: 1,
      modestbranding: 1,
      mute: 1,
      playlist: destination.id,
      playsinline: 1,
      rel: 0,
    },
    events: {
      onReady(event) {
        previewPlayerReady = true
        event.target.mute?.()
        event.target.setVolume?.(0)
        event.target.playVideo?.()
      },
      onStateChange(event) {
        if (event.data !== window.YT.PlayerState.PLAYING) return
        nextPreviewPanel.dataset.playbackState = 'playing'
        nextPreviewCover.classList.add('is-playing')
        recordInteraction('motion_preview_playing', {
          destinationVideoId: destination.id,
          muted: true,
        })
      },
      onError(event) {
        nextPreviewPanel.dataset.playbackState = 'error'
        recordInteraction('motion_preview_error', {
          destinationVideoId: destination.id,
          code: event.data,
        })
      },
    },
  })
}

function renderUpcomingPreview(destination) {
  nextPreviewPanel.classList.toggle('is-motion', showsMotionPreview)
  nextPreviewPanel.classList.toggle('is-text', showsTextPreview)
  nextMotionPreview.hidden = !showsMotionPreview
  nextTextPreview.hidden = !showsTextPreview

  if (showsMotionPreview) {
    nextPreviewPanel.dataset.playbackState = 'loading'
    nextPreviewCover.classList.remove('is-playing')
    nextPreviewVideoHost.innerHTML = '<div id="next-preview-player"></div>'
    nextPreviewCover.style.backgroundImage =
      `linear-gradient(90deg, rgba(5, 5, 5, 0.08), rgba(5, 5, 5, 0.38)), url("https://img.youtube.com/vi/${destination.id}/mqdefault.jpg")`
    nextPreviewPanel.setAttribute('aria-label', 'Muted moving preview of the next video')
    mountMotionPreviewPlayer(destination)
  }

  if (showsTextPreview) {
    nextTextTitle.textContent = destination.title
    nextTextTags.replaceChildren(
      ...destination.tags.map((tag) => {
        const pill = document.createElement('span')
        pill.textContent = tag
        return pill
      }),
    )
    nextPreviewPanel.setAttribute(
      'aria-label',
      `Next video: ${destination.title}. Tags: ${destination.tags.join(', ')}`,
    )
  }
}

function showUpcomingPreview(forced = false) {
  if (!showsUpcomingPreview || sessionEnded || !currentView) return false

  const destination = videos[nextIndex()]
  if (!activePreviewExposure) {
    activePreviewExposure = {
      condition: mode,
      previewFormat,
      sourceVideoId: videos[currentIndex].id,
      destinationVideoId: destination.id,
      destinationTitle: destination.title,
      destinationTags: [...destination.tags],
      destinationCategory: destination.category,
      previewVideoUrl: showsMotionPreview
        ? `https://www.youtube.com/embed/${destination.id}`
        : null,
      shownAt: isoNow(),
      triggerPlayerSeconds: 0,
      previewDelaySeconds: 0,
      previewInteraction: 'non_interactive',
      forcedForDebug: forced,
    }
    previewAccumulatedMs = 0
    currentView.upcomingPreviewShown = true
    currentView.upcomingPreviewFormat = previewFormat
    recordInteraction('upcoming_preview_shown', {
      destinationVideoId: destination.id,
      destinationCategory: destination.category,
      previewFormat,
      triggerPlayerSeconds: activePreviewExposure.triggerPlayerSeconds,
      previewDelaySeconds: 0,
      forcedForDebug: forced,
    })
  }

  renderUpcomingPreview(destination)
  nextPreviewPanel.hidden = false
  videoFrame.classList.add('has-next-preview')
  videoFrame.classList.toggle('has-motion-preview', showsMotionPreview)
  videoFrame.classList.toggle('has-text-preview', showsTextPreview)
  if (previewVisibleSinceMs === null) previewVisibleSinceMs = Date.now()
  return true
}

function finalizePreviewExposure(outcome) {
  if (!activePreviewExposure) {
    hideUpcomingPreview({ accumulate: false })
    previewAccumulatedMs = 0
    return
  }

  stopPreviewVisibilityClock()
  sessionData.previewExposures.push({
    ...activePreviewExposure,
    resolvedAt: isoNow(),
    exposureSeconds: Number((previewAccumulatedMs / 1000).toFixed(2)),
    outcome,
  })
  activePreviewExposure = null
  previewAccumulatedMs = 0
  hideUpcomingPreview({ accumulate: false })
}

function startView(index, entryMethod) {
  const video = videos[index]
  currentView = {
    videoId: video.id,
    title: video.title,
    category: video.category,
    condition: mode,
    shownAt: isoNow(),
    shownAtMs: Date.now(),
    playbackStartedAt: null,
    entryMethod,
    upcomingPreviewShown: false,
    upcomingPreviewFormat: previewFormat,
  }
  updateVideoInterface(video)
  if (showsUpcomingPreview) showUpcomingPreview()
}

function getPlayerSeconds() {
  try {
    const value = player?.getCurrentTime?.()
    return Number.isFinite(value) ? Number(value.toFixed(2)) : null
  } catch {
    return null
  }
}

function updateProgress() {
  if (!playerReady || !player || sessionEnded) return
  try {
    const duration = Number(player.getDuration?.()) || Number(progressSlider.max) || 1
    const current = Number(player.getCurrentTime?.()) || 0
    progressSlider.max = String(duration)
    if (!isSeeking) progressSlider.value = String(current)
    const displayedCurrent = isSeeking ? Number(progressSlider.value) : current
    const progress = Math.min(100, Math.max(0, (displayedCurrent / duration) * 100))
    progressSlider.style.setProperty('--progress', `${progress}%`)
    progressCurrent.textContent = formatClock(displayedCurrent)
    progressDuration.textContent = formatClock(duration)
    progressSlider.setAttribute(
      'aria-valuetext',
      `${formatClock(displayedCurrent)} of ${formatClock(duration)}`,
    )
  } catch {
    // Keep the metadata duration visible if the player is temporarily unavailable.
  }
}

function startProgressUpdates() {
  if (progressTimer !== null) return
  updateProgress()
  progressTimer = window.setInterval(updateProgress, 250)
}

function finishCurrentView(exitReason) {
  if (!currentView) return
  const endedAtMs = Date.now()
  const { shownAtMs, ...viewForLog } = currentView
  finalizePreviewExposure(exitReason)
  sessionData.views.push({
    ...viewForLog,
    endedAt: new Date(endedAtMs).toISOString(),
    watchSeconds: secondsBetween(shownAtMs, endedAtMs),
    playerSeconds: getPlayerSeconds(),
    exitReason,
  })
  currentView = null
}

function setPlayerVideo(index) {
  const video = videos[index]
  if (playerReady && player?.loadVideoById) {
    player.loadVideoById(video.id)
    enableAudio(player)
    player.playVideo()
    return
  }
  mountFallbackIframe(video)
}

function recordManualSkip(entryMethod) {
  recordInteraction('video_skipped_mid_playback', {
    direction: entryMethod.includes('previous') ? 'previous' : 'next',
    destination: 'video',
    playerSeconds: getPlayerSeconds(),
    previewWasShown: Boolean(currentView?.upcomingPreviewShown),
    previewFormat: currentView?.upcomingPreviewFormat ?? 'none',
    entryMethod,
  })
}

function switchVideo(index, entryMethod = 'manual') {
  if (transitionLocked || sessionEnded) return
  transitionLocked = true
  if (entryMethod.includes('scroll') || entryMethod.includes('keyboard')) {
    recordManualSkip(entryMethod)
  }
  finishCurrentView(entryMethod)
  currentIndex = (index + videos.length) % videos.length
  startView(currentIndex, entryMethod)
  setPlayerVideo(currentIndex)
  window.setTimeout(() => {
    transitionLocked = false
  }, 350)
}

function nextVideo(entryMethod = 'scroll_next') {
  if (transitionLocked || sessionEnded || !currentView) return
  const previewWasShown = Boolean(currentView.upcomingPreviewShown)
  recordContinuousTransition(
    'manual_skip',
    'manual_next',
    currentIndex + 1,
    entryMethod,
    previewWasShown,
  )
  switchVideo(currentIndex + 1, entryMethod)
}

function previousVideo() {
  if (transitionLocked || sessionEnded || !currentView) return
  const previewWasShown = Boolean(currentView.upcomingPreviewShown)
  recordInteraction('manual_previous_video', {
    inputMethod: 'scroll_previous',
    playerSeconds: getPlayerSeconds(),
    previewWasShown,
    previewFormat: currentView.upcomingPreviewFormat,
  })
  recordContinuousTransition(
    'manual_skip',
    'manual_previous',
    currentIndex - 1,
    'scroll_previous',
    previewWasShown,
  )
  switchVideo(currentIndex - 1, 'scroll_previous')
}

function handleVideoEnded(source = 'youtube_player') {
  if (transitionLocked || sessionEnded || !currentView) return
  const previewWasShown = Boolean(currentView.upcomingPreviewShown)
  finishCurrentView('video_ended')
  recordInteraction('video_ended', { source, previewWasShown, previewFormat })
  recordContinuousTransition(
    'video_end',
    'auto_advance',
    currentIndex + 1,
    source,
    previewWasShown,
  )
  transitionLocked = true
  window.setTimeout(() => {
    transitionLocked = false
    currentIndex = nextIndex()
    startView(currentIndex, 'autoplay_next')
    setPlayerVideo(currentIndex)
  }, 0)
}

function mountFallbackIframe(video) {
  const container = document.querySelector('#youtube-player')
  if (!container || container.tagName === 'IFRAME') return
  container.innerHTML = `
    <iframe
      title="${video.title}"
      src="https://www.youtube.com/embed/${video.id}?autoplay=1&mute=0&controls=0&playsinline=1&rel=0&enablejsapi=1"
      allow="autoplay; encrypted-media; picture-in-picture"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  `
}

function loadYouTubeAPI() {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  return new Promise((resolve, reject) => {
    const previousReady = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.()
      resolve(window.YT)
    }

    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    script.onerror = () => reject(new Error('YouTube Player API could not load'))
    document.head.append(script)

    window.setTimeout(() => {
      if (!window.YT?.Player) reject(new Error('YouTube Player API timed out'))
    }, 12000)
  })
}

function createPlayer() {
  player = new window.YT.Player('youtube-player', {
    videoId: videos[currentIndex].id,
    host: 'https://www.youtube.com',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      enablejsapi: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      mute: 0,
      playsinline: 1,
      rel: 0,
    },
    events: {
      onReady(event) {
        playerReady = true
        progressSlider.disabled = false
        enableAudio(event.target)
        event.target.playVideo()
        startProgressUpdates()
        window.setTimeout(() => {
          const playing = event.target.getPlayerState?.() === window.YT.PlayerState.PLAYING
          updatePlaybackIndicator(playing)
          if (!playing) showToast('Tap the video to start with sound.')
        }, 900)
      },
      onStateChange(event) {
        if (event.data === window.YT.PlayerState.PLAYING && currentView) {
          currentView.playbackStartedAt ||= isoNow()
          updatePlaybackIndicator(true)
        }
        if (
          event.data === window.YT.PlayerState.PAUSED ||
          event.data === window.YT.PlayerState.CUED
        ) {
          updatePlaybackIndicator(false)
        }
        if (event.data === window.YT.PlayerState.ENDED) {
          updatePlaybackIndicator(false)
          handleVideoEnded('youtube_player')
        }
      },
      onError(event) {
        recordInteraction('youtube_error', { code: event.data })
        showToast('This video could not play. Swipe up to continue.')
      },
    },
  })
}

function showToast(message) {
  toast.textContent = message
  toast.classList.add('is-visible')
  window.setTimeout(() => toast.classList.remove('is-visible'), 3200)
}

function updatePlaybackIndicator(playing) {
  isPlaying = Boolean(playing)
  playbackIndicator.hidden = isPlaying
}

function enableAudio(target = player) {
  if (!target) return
  try {
    target.setVolume?.(80)
    target.unMute?.()
  } catch {
    // Playback can still be started by tapping the video if autoplay is restricted.
  }
}

function togglePlayback() {
  if (!playerReady || sessionEnded) {
    showToast('The video player is still loading.')
    return
  }
  const currentlyPlaying = player.getPlayerState?.() === window.YT.PlayerState.PLAYING
  if (currentlyPlaying) {
    player.pauseVideo?.()
    updatePlaybackIndicator(false)
    recordInteraction('video_paused', { playerSeconds: getPlayerSeconds() })
  } else {
    enableAudio(player)
    player.playVideo?.()
    updatePlaybackIndicator(true)
    recordInteraction('video_resumed', { playerSeconds: getPlayerSeconds() })
  }
}

function buildSessionSnapshot(reason) {
  if (!sessionEnded) {
    finishCurrentView(reason)
    sessionData.endedAt = isoNow()
    const sessionDurationSeconds = Number(
      ((Date.parse(sessionData.endedAt) - Date.parse(sessionData.startedAt)) / 1000).toFixed(2),
    )
    sessionData.summary = {
      sessionDurationSeconds,
      videosViewed: sessionData.views.length,
      transitionsObserved: sessionData.transitions.length,
      upcomingPreviewsShown: sessionData.previewExposures.length,
      upcomingPreviewFormat: previewFormat,
      meanPreviewExposureSeconds:
        sessionData.previewExposures.length > 0
          ? Number(
              (
                sessionData.previewExposures.reduce(
                  (total, exposure) => total + exposure.exposureSeconds,
                  0,
                ) / sessionData.previewExposures.length
              ).toFixed(2),
            )
          : 0,
      autoAdvances: sessionData.transitions.filter(
        (transition) => transition.outcome === 'auto_advance',
      ).length,
      manualNexts: sessionData.transitions.filter(
        (transition) => transition.outcome === 'manual_next',
      ).length,
      videoEndsAfterUpcomingPreview: sessionData.previewExposures.filter(
        (exposure) => exposure.outcome === 'video_ended',
      ).length,
    }
    sessionEnded = true
  }
  return sessionData
}

function outputSessionData(reason) {
  const snapshot = buildSessionSnapshot(reason)
  console.group('Short-video Research Prototype — Session Data')
  console.log(JSON.stringify(snapshot, null, 2))
  console.groupEnd()
  return snapshot
}

function endSession() {
  try {
    player?.pauseVideo?.()
  } catch {
    // The data dialog can still be shown if the player is unavailable.
  }
  const snapshot = outputSessionData('end_session_button')
  dataOutput.textContent = JSON.stringify(snapshot, null, 2)
  if (typeof dataDialog.showModal === 'function') {
    dataDialog.showModal()
  } else {
    window.alert(JSON.stringify(snapshot, null, 2))
  }
}

document.querySelector('.end-session').addEventListener('click', endSession)
document.querySelector('.dialog-close').addEventListener('click', () => dataDialog.close())
document.querySelector('.debug-end')?.addEventListener('click', () => handleVideoEnded('debug_button'))

document.querySelectorAll('[data-action]').forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action
    recordInteraction(action)
    if (action === 'like' || action === 'save') {
      button.classList.toggle('is-selected')
    } else {
      showToast(`${action[0].toUpperCase()}${action.slice(1)} recorded`)
    }
  })
})

document.querySelectorAll('[data-nav]').forEach((button) => {
  button.addEventListener('click', () => {
    recordInteraction('navigation_tap', { destination: button.dataset.nav })
    showToast(`${button.dataset.nav} tap recorded`)
  })
})

progressSlider.addEventListener('pointerdown', () => {
  if (!playerReady || sessionEnded) return
  isSeeking = true
  seekStartedAt = getPlayerSeconds()
})

progressSlider.addEventListener('input', () => {
  if (!playerReady || sessionEnded) return
  if (seekStartedAt === null) seekStartedAt = getPlayerSeconds()
  isSeeking = true
  const targetSeconds = Number(progressSlider.value)
  try {
    player.seekTo(targetSeconds, true)
    const duration = Number(progressSlider.max) || 1
    progressSlider.style.setProperty(
      '--progress',
      `${Math.min(100, Math.max(0, (targetSeconds / duration) * 100))}%`,
    )
    progressCurrent.textContent = formatClock(targetSeconds)
    progressSlider.setAttribute(
      'aria-valuetext',
      `${formatClock(targetSeconds)} of ${formatClock(duration)}`,
    )
  } catch {
    showToast('Seeking is not available for this video')
  }
})

function commitSeek() {
  if (!playerReady || sessionEnded || seekStartedAt === null) return
  const targetSeconds = Number(progressSlider.value)
  recordInteraction('video_seek', {
    fromSeconds: seekStartedAt,
    toSeconds: Number(targetSeconds.toFixed(2)),
  })
  isSeeking = false
  seekStartedAt = null
  updateProgress()
}

progressSlider.addEventListener('change', commitSeek)
progressSlider.addEventListener('pointerup', commitSeek)
progressSlider.addEventListener('pointercancel', commitSeek)

gestureLayer.addEventListener(
  'wheel',
  (event) => {
    if (dataDialog.open || Math.abs(event.deltaY) < 26) return
    event.preventDefault()
    if (wheelCooldown) return
    wheelCooldown = true
    if (event.deltaY > 0) nextVideo()
    else previousVideo()
    window.setTimeout(() => {
      wheelCooldown = false
    }, 650)
  },
  { passive: false },
)

gestureLayer.addEventListener(
  'touchstart',
  (event) => {
    touchStartY = event.changedTouches[0]?.clientY ?? null
  },
  { passive: true },
)

gestureLayer.addEventListener(
  'touchend',
  (event) => {
    if (touchStartY === null || dataDialog.open) return
    const endY = event.changedTouches[0]?.clientY ?? touchStartY
    const distance = touchStartY - endY
    touchStartY = null
    if (Math.abs(distance) < 54) return
    suppressNextTap = true
    if (distance > 0) nextVideo()
    else previousVideo()
    window.setTimeout(() => {
      suppressNextTap = false
    }, 500)
  },
  { passive: true },
)

gestureLayer.addEventListener('click', () => {
  if (suppressNextTap || dataDialog.open) return
  togglePlayback()
})

gestureLayer.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  togglePlayback()
})

document.addEventListener('keydown', (event) => {
  if (dataDialog.open) return
  if (event.key === 'ArrowDown') nextVideo('keyboard_next')
  if (event.key === 'ArrowUp') previousVideo()
})

window.addEventListener('beforeunload', () => {
  if (progressTimer !== null) window.clearInterval(progressTimer)
  const snapshot = buildSessionSnapshot('page_closed')
  console.log('Short-video Research Prototype — Session Data', JSON.stringify(snapshot, null, 2))
})

window.researchPrototype = {
  getSessionData: () => structuredClone(sessionData),
  simulateVideoEnd: () => handleVideoEnded('test_api'),
  showUpcomingPreview: () => showUpcomingPreview(true),
}

startView(currentIndex, 'session_start')
loadYouTubeAPI()
  .then(() => {
    createPlayer()
    if (showsMotionPreview) mountMotionPreviewPlayer(videos[nextIndex()])
  })
  .catch(() => {
    mountFallbackIframe(videos[currentIndex])
    showToast('Video loaded in compatibility mode.')
  })
