/* ==========================================================================
   Help & Fixes content, carried over from the live fix.html.

   Strings support a tiny markdown subset — **bold** and `code` — rendered by
   src/utils/richText.tsx. File paths and process names are wrapped in
   backticks so they pick up mono styling automatically.
   ========================================================================== */

export const HELP_TITLE = 'Fix it yourself in 60 seconds ⚡'
export const HELP_SUB = 'Every known problem and its exact cure. Click any question.'

export const GOLDEN_RULES: string[] = [
  '**Fully close and reopen Nova.** This fixes half of all problems.',
  '**Reboot your PC.** Boring, but it clears stuck processes and file locks.',
  '**Check your internet.** Downloads that stall are usually the connection.',
  'Open your logs: `Win+R` → `%localappdata%\\NovaClient\\logs` — the newest file is the truth.',
  'Still stuck? Share a screenshot of that log on Discord.',
]

export interface Fix {
  q: string
  steps: string[]
  note?: string
}

export interface HelpSection {
  id: string
  icon: string
  title: string
  fixes: Fix[]
}

export const HELP_SECTIONS: HelpSection[] = [
  {
    id: 'install',
    icon: '📦',
    title: 'Install',
    fixes: [
      {
        q: '“Windows protected your PC” blocks the installer',
        steps: [
          'Click **More info**, then **Run anyway**.',
          'This appears because Nova isn’t code-signed yet — not because anything is wrong with the file.',
        ],
      },
      {
        q: 'My antivirus quarantined Nova',
        steps: [
          'Restore the file from your antivirus quarantine.',
          'Add the Nova install folder as an exclusion so it doesn’t happen again.',
        ],
      },
      {
        q: 'The installer froze or failed halfway',
        steps: [
          'Delete the Nova program folder.',
          'Reboot your PC.',
          'Run the setup again, this time as administrator.',
        ],
      },
    ],
  },
  {
    id: 'launcher',
    icon: '🚀',
    title: 'Launcher',
    fixes: [
      {
        q: 'Nova won’t open at all',
        steps: [
          'Open Task Manager and end any `Nova Client` and `javaw` tasks still running.',
          'Delete the `cache` folder, then start Nova again.',
        ],
      },
      {
        q: 'The launcher opens to a white screen',
        steps: [
          'Close and reopen Nova — a white screen is usually a one-off render failure.',
          'If it keeps happening, update your GPU drivers.',
        ],
      },
    ],
  },
  {
    id: 'accounts',
    icon: '🔑',
    title: 'Accounts',
    fixes: [
      {
        q: 'The Microsoft login is blank or spins forever',
        steps: [
          'Restart Nova and try again.',
          'Sync your system clock — a wrong clock breaks the sign-in handshake.',
          'If you’ve retried a lot, wait a few minutes: Microsoft rate-limits repeated attempts.',
        ],
      },
      {
        q: '“Sign-in failed”',
        steps: [
          'Confirm the account works by logging in at minecraft.net.',
          'Once that succeeds, log in again inside Nova.',
        ],
      },
    ],
  },
  {
    id: 'crashes',
    icon: '💥',
    title: 'In-game crashes',
    fixes: [
      {
        q: 'Minecraft closes instantly / exit code 1',
        steps: [
          'Open `latest.log` and read the first error.',
          'A `Mixin` error or `NoClassDefFoundError` means one mod is broken — delete that mod.',
          'An `OutOfMemoryError` means you need more memory — enable the RAM toggle in Settings.',
        ],
        note: 'Nova has a built-in **Doctor** that removes broken mods for you automatically.',
      },
      {
        q: 'A mod jar throws ZipException',
        steps: ['The download was corrupt. Nova has auto-repaired this since v1.11 — just press Play again.'],
      },
      {
        q: 'A download is stuck',
        steps: [
          'Press **Play** to resume where it left off.',
          'If it won’t budge, delete `cache\\objects` and let Nova re-fetch.',
        ],
      },
    ],
  },
  {
    id: 'hosting',
    icon: '🖥️',
    title: 'Server hosting',
    fixes: [
      {
        q: 'My friends can’t connect to my server',
        steps: [
          'Enable **UPnP** in the Host tab, or forward the TCP port manually on your router.',
          'Share your public IP and the port with your friends.',
        ],
      },
      {
        q: '“Address already in use”',
        steps: ['End any lingering `java` processes in Task Manager, then start the server again.'],
      },
    ],
  },
  {
    id: 'skins',
    icon: '🎨',
    title: 'Skins & images',
    fixes: [
      {
        q: 'My skin won’t upload',
        steps: [
          'The file has to be a **PNG under 5 MB**.',
          'If nothing seems to happen, check behind the Nova window — the file dialog sometimes opens behind it.',
        ],
      },
      {
        q: 'My custom image pack isn’t showing in-game',
        steps: [
          'Make sure the pack was generated for the instance you’re actually playing.',
          'Enable it under resource packs.',
        ],
        note: 'Paintings only change when newly placed.',
      },
    ],
  },
  {
    id: 'discord',
    icon: '💬',
    title: 'Discord presence',
    fixes: [
      {
        q: 'My Discord status isn’t showing',
        steps: [
          'The Discord **desktop app** has to be running — browser Discord can’t show activity.',
          'Turn on **Share detected activity** in Discord settings.',
          'Fully quit Discord from the system tray, then relaunch Discord and Nova.',
        ],
      },
    ],
  },
  {
    id: 'performance',
    icon: '⚡',
    title: 'Performance',
    fixes: [
      {
        q: 'My FPS is low',
        steps: [
          'Enable **Fast Flags** in Settings.',
          'Install **Sodium** and **Lithium** from the Mods tab.',
          'Drop render distance to **8** chunks.',
          'Switch graphics to **Fast**.',
        ],
      },
    ],
  },
  {
    id: 'last-resorts',
    icon: '☢️',
    title: 'Last resorts',
    fixes: [
      {
        q: 'Nothing above worked — the nuclear options',
        steps: [
          'Delete the bundled `java` folder and let Nova re-download it.',
          'Delete the `cache` folder.',
          'Remove the instance that’s misbehaving.',
          'Reinstall Nova — your worlds are safe.',
          'Erase the whole `NovaClient` folder.',
        ],
        note: '⚠️ Export your worlds before that last one — it deletes everything.',
      },
    ],
  },
]
