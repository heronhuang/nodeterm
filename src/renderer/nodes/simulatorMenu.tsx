import { t as menuT } from '../i18n/runtime'
import type { MenuItem } from '../components/ContextMenu'
import type {
  BatteryState,
  SimulatorAction,
  SimulatorButton,
  SimulatorCaptureTarget,
  SimulatorDeviceState
} from '@shared/simulator'

/**
 * The Simulator node's ⋯ menu: everything DeviceHub's menus offer, in the same groups. What
 * nodeterm can do runs; what it cannot (yet) is listed greyed out with "(Not Supported)" and the
 * reason as its tooltip — so the menu is a complete map of DeviceHub, not a guess at a subset.
 *
 * Pure: the node supplies the handlers and the device state, this decides labels and structure.
 */

export interface SimulatorMenuHandlers {
  button(name: SimulatorButton): void
  rotate(dir: 'left' | 'right'): void
  action(a: SimulatorAction): void
  screenshot(target: SimulatorCaptureTarget): void
  toggleRecording(): void
  shutDown(): void
  confirmErase(): void
  promptCustomLocation(): void
  promptOpenUrl(): void
  promptPush(): void
  promptPrivacy(op: 'grant' | 'revoke'): void
  pickInstall(): void
  pickMedia(): void
  /** Absent inside a run node, which the view does not size. */
  actualSize?(): void
  fitToScreen?(): void
}

export interface SimulatorMenuState {
  device: SimulatorDeviceState
  recording: boolean
}


function notSupported(label: string, why: string): MenuItem {
  return { label: label + menuT('menuItems.notSupported'), disabled: true, hint: why, onClick: () => undefined }
}

/** A View-menu sizing item: inside a run node there is no node of its own to size. */
function sizeItem(label: string, fn: (() => void) | undefined): MenuItem {
  return fn
    ? { label, onClick: () => fn() }
    : { label, disabled: true, hint: menuT('menuItems.popTheSimulatorOutOfTheRunNodeTo'), onClick: () => undefined }
}

const check = (on: boolean | undefined, label: string) => (on ? `✓ ${label}` : label)

export function buildSimulatorMenu(h: SimulatorMenuHandlers, s: SimulatorMenuState): MenuItem[] {
  const d = s.device
  const battery = (level: number, state: BatteryState, label: string): MenuItem => ({
    label,
    onClick: () => h.action({ a: 'status-bar', preset: 'battery', batteryLevel: level, batteryState: state })
  })
  const bio = (kind: 'face' | 'touch'): MenuItem[] => [
    { label: menuT('menuItems.enrolled'), onClick: () => h.action({ a: 'biometric', kind, op: 'enroll' }) },
    { label: menuT('menuItems.notEnrolled'), onClick: () => h.action({ a: 'biometric', kind, op: 'unenroll' }) },
    { type: 'separator' },
    { label: kind === 'face' ? menuT('menuItems.matchingFace') : menuT('menuItems.matchingTouch'), onClick: () => h.action({ a: 'biometric', kind, op: 'match' }) },
    { label: kind === 'face' ? menuT('menuItems.nonMatchingFace') : menuT('menuItems.nonMatchingTouch'), onClick: () => h.action({ a: 'biometric', kind, op: 'nomatch' }) }
  ]

  return [
    {
      type: 'submenu',
      label: menuT('menuItems.device'),
      children: [
        { label: menuT('menuItems.home'), onClick: () => h.button('home') },
        { label: menuT('menuItems.lock'), onClick: () => h.button('lock') },
        { label: menuT('menuItems.sideButton'), onClick: () => h.button('side') },
        { label: 'Siri', onClick: () => h.button('siri') },
        notSupported(menuT('menuItems.appSwitcher'), menuT('menuItems.theSwipeUpAndHoldGestureIsNotRecognised')),
        notSupported(menuT('menuItems.actionButton'), menuT('menuItems.theActionButtonSInputCodeIsNotDocumented')),
        { type: 'separator' },
        { label: menuT('menuItems.volumeUp'), onClick: () => h.button('volup') },
        { label: menuT('menuItems.volumeDown'), onClick: () => h.button('voldown') },
        { label: menuT('menuItems.playPause'), onClick: () => h.button('playpause') },
        { type: 'separator' },
        { label: menuT('menuItems.shake'), onClick: () => h.action({ a: 'shake' }) },
        { label: menuT('menuItems.rotateLeft'), onClick: () => h.rotate('left') },
        { label: menuT('menuItems.rotateRight'), onClick: () => h.rotate('right') },
        { type: 'separator' },
        { label: menuT('menuItems.restart'), onClick: () => h.action({ a: 'restart' }) },
        { label: menuT('menuItems.resetContentAndSettings'), danger: true, onClick: () => h.confirmErase() },
        { label: menuT('menuItems.shutDown'), onClick: () => h.shutDown() },
        { type: 'separator' },
        notSupported(menuT('menuItems.directionalPad'), menuT('menuItems.appleTvOnly')),
        notSupported(menuT('menuItems.simulateTrackpad'), menuT('menuItems.appleTvOnly')),
        notSupported(menuT('menuItems.back'), menuT('menuItems.appleWatchAppleTvOnly'))
      ]
    },
    {
      type: 'submenu',
      label: menuT('menuItems.capture'),
      children: [
        { label: menuT('menuItems.saveScreenshotToDesktop'), onClick: () => h.screenshot('desktop') },
        { label: menuT('menuItems.copyScreenshot'), onClick: () => h.screenshot('clipboard') },
        { label: menuT('menuItems.addScreenshotToCanvas'), onClick: () => h.screenshot('canvas') },
        { type: 'separator' },
        { label: s.recording ? menuT('menuItems.stopRecording') : menuT('menuItems.recordScreen'), onClick: () => h.toggleRecording() }
      ]
    },
    {
      type: 'submenu',
      label: menuT('menuItems.appearance'),
      children: [
        { label: check(d.appearance === 'light', menuT('menuItems.light')), onClick: () => h.action({ a: 'appearance', value: 'light' }) },
        { label: check(d.appearance === 'dark', menuT('menuItems.dark')), onClick: () => h.action({ a: 'appearance', value: 'dark' }) },
        { type: 'separator' },
        { label: menuT('menuItems.largerText'), onClick: () => h.action({ a: 'content-size', value: 'increment' }) },
        { label: menuT('menuItems.smallerText'), onClick: () => h.action({ a: 'content-size', value: 'decrement' }) },
        {
          label: check(d.increaseContrast, menuT('menuItems.increaseContrast')),
          onClick: () => h.action({ a: 'increase-contrast', value: !d.increaseContrast })
        },
        { type: 'separator' },
        notSupported(menuT('menuItems.grayscale'), menuT('menuItems.devicehubSetsThisThroughAppleInternalsThereIsNo')),
        notSupported(menuT('menuItems.reduceMotion'), menuT('menuItems.devicehubSetsThisThroughAppleInternalsThereIsNo')),
        notSupported(menuT('menuItems.reduceTransparency'), menuT('menuItems.devicehubSetsThisThroughAppleInternalsThereIsNo')),
        notSupported(menuT('menuItems.liquidGlassLook'), menuT('menuItems.devicehubSetsThisThroughAppleInternalsThereIsNo'))
      ]
    },
    {
      type: 'submenu',
      label: menuT('menuItems.location'),
      children: [
        { label: menuT('menuItems.none'), onClick: () => h.action({ a: 'location-clear' }) },
        ...((d.locationScenarios ?? []).length ? [{ type: 'separator' } as MenuItem] : []),
        ...(d.locationScenarios ?? []).map(
          (scenario): MenuItem => ({ label: scenario, onClick: () => h.action({ a: 'location-run', scenario }) })
        ),
        { type: 'separator' },
        { label: menuT('menuItems.customLocation'), onClick: () => h.promptCustomLocation() }
      ]
    },
    {
      type: 'submenu',
      label: menuT('menuItems.statusBar'),
      children: [
        { label: menuT('menuItems.clean941FullBattery'), onClick: () => h.action({ a: 'status-bar', preset: 'clean' }) },
        {
          type: 'submenu',
          label: menuT('menuItems.battery'),
          children: [
            battery(100, 'charged', menuT('menuItems.value100Charged')),
            battery(50, 'charging', menuT('menuItems.value50Charging')),
            battery(50, 'discharging', '50%'),
            battery(20, 'discharging', '20%'),
            battery(5, 'discharging', '5%')
          ]
        },
        { type: 'separator' },
        { label: menuT('menuItems.clearOverrides'), onClick: () => h.action({ a: 'status-bar', preset: 'clear' }) }
      ]
    },
    {
      type: 'submenu',
      label: menuT('menuItems.biometrics'),
      children: [
        { type: 'submenu', label: menuT('menuItems.faceId'), children: bio('face') },
        { type: 'submenu', label: menuT('menuItems.touchId'), children: bio('touch') },
        notSupported(menuT('menuItems.opticId'), menuT('menuItems.appleVisionProOnly'))
      ]
    },
    {
      type: 'submenu',
      label: menuT('menuItems.clipboard'),
      children: [
        { label: menuT('menuItems.pasteMacClipboardIntoDeviceV'), onClick: () => h.action({ a: 'pasteboard', dir: 'to-device' }) },
        { label: menuT('menuItems.copyDeviceClipboardToMac'), onClick: () => h.action({ a: 'pasteboard', dir: 'to-mac' }) }
      ]
    },
    {
      type: 'submenu',
      label: menuT('menuItems.apps'),
      children: [
        { label: menuT('menuItems.installApp'), onClick: () => h.pickInstall() },
        { label: menuT('menuItems.addPhotoOrVideo'), onClick: () => h.pickMedia() },
        { type: 'separator' },
        { label: menuT('menuItems.openUrl'), onClick: () => h.promptOpenUrl() },
        { label: menuT('menuItems.sendPushNotification'), onClick: () => h.promptPush() },
        {
          type: 'submenu',
          label: menuT('menuItems.privacy'),
          children: [
            { label: menuT('menuItems.grantAllPermissionsToApp'), onClick: () => h.promptPrivacy('grant') },
            { label: menuT('menuItems.revokeAllPermissionsFromApp'), onClick: () => h.promptPrivacy('revoke') },
            { type: 'separator' },
            { label: menuT('menuItems.resetAllPermissions'), onClick: () => h.action({ a: 'privacy', op: 'reset', service: 'all' }) }
          ]
        },
        { type: 'separator' },
        notSupported(menuT('menuItems.provisioningProfiles'), menuT('menuItems.managedInDevicehub')),
        notSupported(menuT('menuItems.crashReports'), menuT('menuItems.managedInDevicehub'))
      ]
    },
    {
      type: 'submenu',
      label: menuT('menuItems.view'),
      children: [
        sizeItem(menuT('menuItems.actualSize'), h.actualSize),
        sizeItem(menuT('menuItems.fitToScreen'), h.fitToScreen)
      ]
    },
    { type: 'separator' },
    {
      label: menuT('menuItems.openInDevicehub'),
      hint: menuT('menuItems.whileDevicehubShowsThisDeviceItTakesTheTouch'),
      onClick: () => h.action({ a: 'open-devicehub' })
    },
    {
      type: 'submenu',
      label: menuT('menuItems.deviceManagement'),
      children: [
        notSupported(menuT('menuItems.newDevice'), menuT('menuItems.createDevicesInDevicehub')),
        notSupported(menuT('menuItems.rename2'), menuT('menuItems.renameDevicesInDevicehub')),
        notSupported(menuT('menuItems.pairAppleWatch'), menuT('menuItems.pairDevicesInDevicehub')),
        notSupported(menuT('menuItems.pairNearbyDevice'), menuT('menuItems.pairDevicesInDevicehub'))
      ]
    }
  ]
}

/**
 * The ⋯ menu for an Android virtual device. The same shape as the iOS one: what the emulator's own
 * interface (or adb) can do runs, and what it cannot is listed greyed out with "(Not Supported)".
 */
export function buildAndroidMenu(h: SimulatorMenuHandlers, s: Pick<SimulatorMenuState, 'device'>): MenuItem[] {
  const d = s.device
  const battery = (level: number, state: BatteryState, label: string): MenuItem => ({
    label,
    onClick: () => h.action({ a: 'status-bar', preset: 'battery', batteryLevel: level, batteryState: state })
  })
  return [
    {
      type: 'submenu',
      label: menuT('menuItems.device'),
      children: [
        { label: menuT('menuItems.home'), onClick: () => h.button('home') },
        { label: menuT('menuItems.back'), onClick: () => h.button('back') },
        { label: menuT('menuItems.recentApps'), onClick: () => h.button('recents') },
        { label: menuT('menuItems.power'), onClick: () => h.button('lock') },
        { type: 'separator' },
        { label: menuT('menuItems.volumeUp'), onClick: () => h.button('volup') },
        { label: menuT('menuItems.volumeDown'), onClick: () => h.button('voldown') },
        { label: menuT('menuItems.playPause'), onClick: () => h.button('playpause') },
        { type: 'separator' },
        { label: menuT('menuItems.rotateLeft'), onClick: () => h.rotate('left') },
        { label: menuT('menuItems.rotateRight'), onClick: () => h.rotate('right') },
        { type: 'separator' },
        { label: menuT('menuItems.restart'), onClick: () => h.action({ a: 'restart' }) },
        { label: menuT('menuItems.shutDown'), onClick: () => h.shutDown() },
        notSupported(menuT('menuItems.wipeData'), menuT('menuItems.useAndroidStudioSDeviceManagerWipeDataThe')),
        notSupported(menuT('menuItems.foldUnfold'), menuT('menuItems.foldablePosturesAreNotWiredUpYet'))
      ]
    },
    {
      type: 'submenu',
      label: menuT('menuItems.capture'),
      children: [
        { label: menuT('menuItems.saveScreenshotToDesktop'), onClick: () => h.screenshot('desktop') },
        { label: menuT('menuItems.copyScreenshot'), onClick: () => h.screenshot('clipboard') },
        { label: menuT('menuItems.addScreenshotToCanvas'), onClick: () => h.screenshot('canvas') },
        { type: 'separator' },
        notSupported(menuT('menuItems.recordScreen2'), menuT('menuItems.screenRecordingForAndroidDevicesIsNotWiredUp'))
      ]
    },
    {
      type: 'submenu',
      label: menuT('menuItems.appearance'),
      children: [
        { label: check(d.appearance === 'light', menuT('menuItems.light')), onClick: () => h.action({ a: 'appearance', value: 'light' }) },
        { label: check(d.appearance === 'dark', menuT('menuItems.dark')), onClick: () => h.action({ a: 'appearance', value: 'dark' }) },
        { type: 'separator' },
        { label: menuT('menuItems.largerText'), onClick: () => h.action({ a: 'content-size', value: 'increment' }) },
        { label: menuT('menuItems.smallerText'), onClick: () => h.action({ a: 'content-size', value: 'decrement' }) }
      ]
    },
    {
      type: 'submenu',
      label: menuT('menuItems.location'),
      children: [
        { label: menuT('menuItems.customLocation'), onClick: () => h.promptCustomLocation() },
        notSupported(menuT('menuItems.routes'), menuT('menuItems.gpxKmlRoutesArePlayedFromAndroidStudioS'))
      ]
    },
    {
      type: 'submenu',
      label: menuT('menuItems.statusBar'),
      children: [
        { label: menuT('menuItems.clean941FullBattery'), onClick: () => h.action({ a: 'status-bar', preset: 'clean' }) },
        {
          type: 'submenu',
          label: menuT('menuItems.battery'),
          children: [
            battery(100, 'charged', menuT('menuItems.value100Charged')),
            battery(50, 'charging', menuT('menuItems.value50Charging')),
            battery(50, 'discharging', '50%'),
            battery(20, 'discharging', '20%'),
            battery(5, 'discharging', '5%')
          ]
        },
        { type: 'separator' },
        { label: menuT('menuItems.clearOverrides'), onClick: () => h.action({ a: 'status-bar', preset: 'clear' }) }
      ]
    },
    {
      type: 'submenu',
      label: menuT('menuItems.biometrics'),
      children: [
        { label: menuT('menuItems.matchingFingerprint'), onClick: () => h.action({ a: 'biometric', kind: 'touch', op: 'match' }) },
        { label: menuT('menuItems.nonMatchingFingerprint'), onClick: () => h.action({ a: 'biometric', kind: 'touch', op: 'nomatch' }) },
        notSupported(menuT('menuItems.faceUnlock'), menuT('menuItems.theEmulatorHasNoFaceSensorToSimulate'))
      ]
    },
    {
      type: 'submenu',
      label: menuT('menuItems.clipboard'),
      children: [
        { label: menuT('menuItems.pasteMacClipboardIntoDeviceV'), disabled: true, hint: menuT('menuItems.pressVWhileTheScreenHasFocus'), onClick: () => undefined },
        { label: menuT('menuItems.copyDeviceClipboardToMac'), onClick: () => h.action({ a: 'pasteboard', dir: 'to-mac' }) }
      ]
    },
    {
      type: 'submenu',
      label: menuT('menuItems.apps'),
      children: [
        { label: menuT('menuItems.installApk'), onClick: () => h.pickInstall() },
        { label: menuT('menuItems.addPhotoOrVideo'), onClick: () => h.pickMedia() },
        { type: 'separator' },
        { label: menuT('menuItems.openUrl'), onClick: () => h.promptOpenUrl() },
        notSupported(menuT('menuItems.sendPushNotification'), menuT('menuItems.androidPushGoesThroughFirebaseCloudMessagingWhichThe')),
        notSupported(menuT('menuItems.permissions'), menuT('menuItems.grantOrRevokePermissionsWithAdbShellPmGrant'))
      ]
    },
    {
      type: 'submenu',
      label: menuT('menuItems.view'),
      children: [
        sizeItem(menuT('menuItems.actualSize'), h.actualSize),
        sizeItem(menuT('menuItems.fitToScreen'), h.fitToScreen)
      ]
    },
    { type: 'separator' },
    {
      type: 'submenu',
      label: menuT('menuItems.deviceManagement'),
      children: [
        notSupported(menuT('menuItems.newDevice'), menuT('menuItems.createVirtualDevicesInAndroidStudioSDeviceManager')),
        notSupported(menuT('menuItems.rename2'), menuT('menuItems.renameVirtualDevicesInAndroidStudioSDeviceManager'))
      ]
    }
  ]
}
