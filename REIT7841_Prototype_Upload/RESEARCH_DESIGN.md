# Prototype research design

## Conditions

- `?mode=baseline`: continuous autoplay feed with no advance information about the next video.
- `?mode=thumbnail`: the same feed and predetermined sequence, with a non-interactive, muted moving preview of the actual next video near the bottom of the current video.
- `?mode=text`: the same feed and predetermined sequence, with a short non-interactive strip showing the actual next video's title and tags.

Legacy links remain usable: `control -> baseline`; `experiment`, `preview`, and `visible -> thumbnail`; `opaque -> baseline`; `title`, `metadata`, and `text-preview -> text`.

## Manipulated interface factor

The three conditions differ in the **availability and format of advance information about the next video**: none, moving visual preview, or textual title-and-tag preview. All conditions use the same current-video interface, video sequence, autoplay, swipe navigation, tap-to-pause/resume behaviour, sound, seekable progress bar, and End Session control. Neither preview adds a recommendation page, choice, forced pause, or waiting period. The next item remains predetermined and previews cannot be clicked.

`baseline vs thumbnail` estimates the effect of adding a moving preview. `baseline vs text` estimates the effect of adding concise semantic information. `thumbnail vs text` compares two preview formats, but it should not be described as isolating information quantity alone: motion, visual salience, and semantic content also differ. The study should not be described as a direct test of addiction reduction, and it does not assume that reducing uncertainty necessarily reduces continuation.

## Interaction rules

- Participants can leave a video at any time by scrolling forward or backward.
- Participants can tap the video to pause or resume. Sound is enabled without a persistent sound icon.
- A natural video end automatically starts the predetermined next video in every condition.
- In `thumbnail`, a muted looping YouTube embed of the actual next video is displayed as soon as the current view begins and remains visible until transition. It contains no title, tags, creator, duration, decision button, or choice cards.
- In `text`, a short strip displays the actual next video's title and tags from the beginning of the current view until transition. It contains no image, moving video, creator, duration, button, or choice cards.
- Both previews are non-interactive. Tapping or swiping over their area continues to control the current feed.
- Participant and condition labels are hidden from the participant-facing interface. Add `&debug=1` to show the condition label and video-end test control.

## Prototype content pool

- The prototype currently contains 27 embeddable videos across food, cooking, travel, fitness, technology, learning, music, and gaming.
- Their verified playback durations total approximately 17 minutes 49 seconds when watched from start to finish.
- The same predetermined order is used in all three interface modes. After the twenty-seventh item, the prototype loops to the first item.
- A participant who skips frequently may therefore reach the end of the pool within a 10-minute block. Pilot logs should be checked for repeated video IDs; if repeats occur often, use additional matched content sets before the formal study.

## Logged data

Session JSON includes:

- participant, condition, start/end times, content-pool size, and experimental factors;
- video views, elapsed view time, playback position, entry method, and exit reason;
- continuous-feed transitions and whether an upcoming preview had been shown;
- preview format, source/destination, displayed title and tags, display time, exposure duration, and the action that ended the exposure;
- seeks, pauses/resumes, skips, navigation/actions, timestamps, player errors, and summary counts.

`End Session` displays the JSON and writes it to the console. `beforeunload` writes a final snapshot.

## Interpretation

Behavioural logs show what participants did after advance visual information was available. They do not directly measure curiosity or problematic social media use. Post-condition measures should distinguish:

- anticipatory uncertainty about the next item;
- curiosity to reveal the next item;
- expected interest created by advance information;
- perceived agency or intentionality;
- distraction from the current video;
- frustration or interruption.

## Before a formal study

- Use matched content sets and counterbalance condition order and content-set assignment.
- Keep the recommendation sequence predetermined across conditions.
- Pilot motion-preview playback, muting, cropping, and text-strip readability across all videos.
- Treat curiosity as a candidate mechanism rather than assuming that every continuation is curiosity-driven.
- Frame problematic social media use as the broader motivation, not as an outcome demonstrated by a short laboratory session.
