import type { BlogPost } from "@/content/blog/types";

function Body() {
  return (
    <>
      <p>
        For most apps in 2026, <strong>React Native (with Expo)</strong> is the
        pragmatic default: one codebase, both platforms, faster and cheaper to
        ship. Go <strong>fully native (Swift / Kotlin)</strong> when the app
        leans hard on platform-specific capability, heavy graphics, or the last
        few percent of polish. The honest answer depends on what the app does,
        not on dogma.
      </p>

      <h2>Decision at a glance</h2>
      <table>
        <thead>
          <tr>
            <th>If your app…</th>
            <th>Lean</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Is content, commerce, dashboards, or CRUD</td>
            <td>React Native</td>
          </tr>
          <tr>
            <td>Needs both platforms fast on one budget</td>
            <td>React Native</td>
          </tr>
          <tr>
            <td>Pushes heavy 3D, AR, or real-time graphics</td>
            <td>Native</td>
          </tr>
          <tr>
            <td>Depends on the newest OS APIs day one</td>
            <td>Native</td>
          </tr>
          <tr>
            <td>Is a single-platform flagship needing max polish</td>
            <td>Native</td>
          </tr>
        </tbody>
      </table>

      <h2>Where React Native wins</h2>
      <p>
        One team and one codebase ship iOS and Android together, so you reach
        both stores faster and maintain one app instead of two. For the large
        majority of products — commerce, content, booking, dashboards,
        messaging — React Native&apos;s performance is indistinguishable from
        native to the user, and Expo handles the painful infrastructure (builds,
        updates, push, native modules) cleanly.
      </p>

      <h2>Where native earns its cost</h2>
      <p>
        Reach for Swift or Kotlin when the app is graphics-heavy (games, AR,
        custom camera, real-time video), when you need a new platform API the
        moment it ships, or when a single-platform flagship demands the absolute
        best feel and frame timing. In those cases the cross-platform layer
        becomes the bottleneck rather than the shortcut.
      </p>

      <h2>You can mix</h2>
      <p>
        It is not all-or-nothing. A React Native app can drop into a native
        module for the one performance-critical screen, giving you cross-platform
        speed everywhere else and native power where it actually matters.
      </p>

      <h2>What does not change either way</h2>
      <p>
        Auth, push notifications, deep links, offline support, in-app purchase,
        and store submission are needed regardless of stack — and getting that
        infrastructure right is most of the work in shipping a good app. At
        tilde we build native (Swift / Kotlin) or React Native + Expo depending
        on the call above, with App Store and Play Store submission included.
      </p>

      <h3>The short version</h3>
      <p>
        Default to React Native for reach and speed. Choose native for
        graphics-heavy, API-bleeding-edge, or single-platform flagship apps. Let
        the app&apos;s actual demands decide, not the framework debate.
      </p>
    </>
  );
}

export const post: BlogPost = {
  slug: "native-vs-react-native-2026",
  title: "Native vs React Native in 2026: a practical decision guide",
  description:
    "When to build a mobile app in React Native vs fully native Swift/Kotlin in 2026 — a clear decision table based on what the app actually does.",
  summary:
    "In 2026, React Native with Expo is the pragmatic default for most apps — one codebase, both platforms, faster and cheaper. Go fully native (Swift/Kotlin) for graphics-heavy apps, ones needing the newest OS APIs immediately, or single-platform flagships demanding maximum polish. You can also mix: native modules inside a React Native app for the few performance-critical screens.",
  datePublished: "2026-05-08",
  dateModified: "2026-05-08",
  topics: ["Mobile", "React Native", "App development"],
  readingTime: "5 min read",
  variant: 0,
  Body,
};
