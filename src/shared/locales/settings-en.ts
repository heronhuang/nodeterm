import { behaviorEn } from './settings-behavior-en'
import { settingsRestEn } from './settings-rest-en'

/** Settings section strings (English) — merged into enMessages.settings. */
export const settingsSectionEn = {
  shell: {
    title: 'Shell',
    description: 'The shell new terminals launch. Empty uses the system default.',
    rows: { shell: { title: 'Default shell' } },
    placeholderSystemDefault: 'system default'
  },
  commit: {
    title: 'Commit messages (AI)',
    description: 'Runs a local coding-agent CLI read-only on your staged diff (no built-in model).',
    rows: {
      autoFetch: { title: 'Auto-fetch git status' },
      agent: { title: 'Commit agent' },
      command: { title: 'Custom command' },
      extra: { title: 'Extra prompt' }
    },
    autoFetchLabel: 'Auto-fetch git status',
    autoFetchDescription:
      'Periodically refresh ahead/behind from the remote while Source Control is open.',
    agentLabel: 'Agent',
    agentClaude: 'Claude Code',
    agentCodex: 'Codex',
    agentCustom: 'Custom command…',
    commandLabel: 'Command',
    commandDescription:
      "The prompt goes to the command's stdin by default. {prompt} passes it inline as one argument instead (not for npm .cmd shims on Windows, nor for diffs past the Windows command-line limit); {promptFile} passes the path of a private temp file holding it.",
    commandPlaceholder: 'mycli --flag {prompt}',
    extraLabel: 'Extra prompt (optional)',
    extraPlaceholder: 'e.g. Use Conventional Commits with gitmoji'
  },
  updates: {
    title: 'Updates',
    rows: { updates: { title: 'Updates' } },
    currentVersion: 'Current version',
    checkForUpdates: 'Check for updates',
    resultsHint: 'Results appear in the update card at the bottom-right.'
  },
  debug: {
    title: 'Debug',
    rows: { logPanel: { title: 'Debug log panel' } },
    logPanelLabel: 'Debug log panel',
    logPanelDescription:
      'Captures the app\'s own console into an in-memory ring (secrets redacted at capture) and unlocks the log viewer — also in the command palette as “Show debug log”. Nothing is written to disk or sent anywhere; export is manual copy.',
    logViewerLabel: 'Log viewer',
    logViewerDescription: 'Live view of the ring, with level and text filters.',
    open: 'Open'
  },
  notch: {
    title: 'Notch',
    description:
      'Walking agent mascots inside the MacBook notch, and a mini session panel when you need it.',
    rows: {
      enabled: { title: 'Notch HUD' },
      width: { title: 'Notch width' },
      side: { title: 'Capsule side' },
      offset: { title: 'Vertical position' },
      hover: { title: 'Expand on hover' }
    },
    showHud: 'Show the notch HUD',
    showHudDescription:
      'Extends the notch into a black capsule while agents work: a walking mascot per busy agent, a red dot when one needs you, a green blob when one has finished and you haven\'t looked yet.',
    capsuleSide: 'Capsule side',
    capsuleSideDescription:
      'Center hugs the notch (on a screen without one, a floating pill in the middle). Left and Right draw a floating pill at that edge of the screen, just below the menu bar.',
    alignLeft: 'Left',
    alignCenter: 'Center',
    alignRight: 'Right',
    verticalPosition: 'Vertical position',
    verticalPositionDescription:
      'Nudges the capsule down (positive) or up (negative) from where it normally sits. Up stops at the top edge of the screen — and the capsule fused to the notch is already there, so it can only move down, which turns it into a floating pill under the notch.',
    notchWidth: 'Notch width',
    notchWidthDescription:
      "macOS doesn't tell apps how wide the notch is, so the capsule assumes it. Nudge this until the capsule sits flush against the notch — larger moves it left, smaller moves it right. Only the centered, notch-hugging capsule uses it.",
    expandOnHover: 'Expand on hover',
    expandOnHoverDescription:
      "Point at the capsule to open the session panel. Off = it only opens when you click it. Either way it closes when you move away — and that's when a finished session stops glowing green."
  },
  privacy: {
    title: 'Privacy',
    rows: {
      telemetry: { title: 'Send anonymous usage data' },
      licenseConsent: { title: 'Allow license checks while DO_NOT_TRACK is set' },
      licenseConsentLimit: { title: 'Allow license checks while DO_NOT_TRACK is set' }
    },
    telemetryLabel: 'Send anonymous usage data (version/OS, open-project count)',
    telemetryDescription:
      'No personal data; client IP is never stored. Used to see which versions are in use and how many projects people keep open (a number only — never names, paths or hosts). A lighter anonymous install count runs regardless; fully disable with the DO_NOT_TRACK environment variable.',
    machineHashSentence:
      " If you reach the free-project limit, nodeterm checks your allowance with a one-way hash of this computer's hardware id (sent whether or not this switch is on), so the allowance stays with this machine.",
    consentDescription:
      'Lets nodeterm contact api.nodeterm.dev for license checks only. Telemetry and the announcement feed stay off.',
    consentDescriptionLimit:
      'Lets nodeterm contact api.nodeterm.dev for Pro and your free-project allowance only. Telemetry and the announcement feed stay off.',
    licenseConsentLabel: 'Allow license checks while DO_NOT_TRACK is set'
  },
  language: {
    rows: { language: { title: 'Language' } }
  },
  tmux: {
    title: 'Session protection',
    description: 'Applies to new terminals / next launch.',
    rows: {
      enabled: { title: 'Persistent sessions' },
      backend: { title: 'Session backend' },
      scrollback: { title: 'Scrollback lines' },
      leadPane: { title: 'Keep lead pane wide (agent teams)' },
      parkMinutes: { title: 'Keep switched-away terminals attached' },
      parkMax: { title: 'Max attached terminals in other projects' },
      offscreen: { title: 'Release offscreen terminals' }
    },
    persistentSessions: 'Persistent sessions',
    sessionBackend: 'Session backend',
    scrollbackLines: 'Scrollback lines',
    leadPane: 'Keep lead pane wide (agent teams)',
    parkMinutes: 'Keep switched-away terminals attached',
    parkMax: 'Max attached terminals in other projects',
    offscreen: 'Release offscreen terminals',
    offscreenDescription:
      'Minutes a terminal may sit offscreen before its view is released (tmux keeps it running; it reattaches on view). 0 = never.',
    zellijUnavailable: 'Not available with Zellij: {gaps}'
  },
  signIn: {
    title: 'Sign-in',
    rows: {
      signOut: { title: 'Sign out of this browser' },
      signOutEverywhere: { title: 'Sign out everywhere' }
    },
    signOutLabel: 'Sign out of this browser',
    signOutDescription:
      "Ends this browser's session on the server, so a copy of its cookie stops working too. If you signed in through your proxy's single sign-on, sign out there as well.",
    signOutButton: 'Sign out',
    signingOut: 'Signing out…',
    signOutEverywhereLabel: 'Sign out everywhere',
    signOutEverywhereDescription:
      'Ends every browser session on this server, this one included. Every open tab is disconnected and has to sign in again with the password. Use it if a device was lost or a session may have been copied.',
    signOutEverywhereButton: 'Sign out everywhere',
    confirmMessage:
      'Sign out every browser? Every open tab on this server is disconnected and has to sign in again with the password. Running terminals keep running.',
    confirmLabel: 'Sign out everywhere'
  },
  presence: {
    title: 'Your name',
    description:
      'The name and color other people see when they connect to {machine} — in the facepile, cursor labels, and board comments.',
    rows: { identity: { title: 'Your name' } },
    displayName: 'Display name',
    placeholder: 'Your name',
    color: 'Color',
    colorAria: 'Color {color}',
    save: 'Save',
    saved: 'Saved',
    footnote:
      'If you never pick a name you appear to others as “Someone”. This is separate from your login or license — it only labels you during live collaboration.'
  },
  behavior: behaviorEn,
  ...settingsRestEn
} as const
